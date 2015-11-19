class GL
  @gl: null
  @canvas: null
  @camera: null
  @getGL: ->
    @gl

  @setGL: (gl) ->
    @gl = gl

  @setCamera: (camera) ->
    if !@camera?
      @camera = camera

  constructor: () ->
    @gl = null
    @camera = null
    #@canvas = document.getElementById 'canvas'
    GL.canvas = document.getElementById 'canvas'
    @shaders = new Shaders()
    #@matrices = new Matrices()
    @objects = new Objects()
    @shaderProgram = null
    @initGL()

  initGL: (canvas = GL.canvas) ->
    try 
      gl = canvas.getContext 'experimental-webgl'
      @setGL gl
      xyOfScreen = Utils.getXYOfScreen()
      GL.canvas.width = xyOfScreen.x
      GL.canvas.height = xyOfScreen.y
      @gl.viewportWidth = xyOfScreen.x
      @gl.viewportHeight = xyOfScreen.y
      
    catch e
      console.log "Error initializing GL: #{e}"

    console.log "Error initializing GL." if !@gl?

  setGL: (gl) ->
    GL.setGL gl
    @gl = gl

  setCamera: (camera) ->
    GL.setCamera camera
    @camera = camera if !@camera?

  initShaders: () ->
    fShader = @shaders.getShader @gl, 'shader-fs'
    vShader = @shaders.getShader @gl, 'shader-vs'

    @shaderProgram = @gl.createProgram()

    @gl.attachShader @shaderProgram, vShader
    @gl.attachShader @shaderProgram, fShader

    @gl.linkProgram @shaderProgram

    console.log 'CAN NOT INITIALISE SHADERS' if !@gl.getProgramParameter @shaderProgram, @gl.LINK_STATUS

    @gl.useProgram @shaderProgram

    @shaderProgram.vertexPositionAttribute = @gl.getAttribLocation @shaderProgram, 'aVertexPosition'
    @gl.enableVertexAttribArray @shaderProgram.vertexPositionAttribute

    @shaderProgram.vertexColorAttribute = @gl.getAttribLocation @shaderProgram, "aVertexColor"
    @gl.enableVertexAttribArray @shaderProgram.vertexColorAttribute

    @shaderProgram.pMatrixUniform = @gl.getUniformLocation @shaderProgram, 'uPMatrix'
    @shaderProgram.mvMatrixUniform = @gl.getUniformLocation @shaderProgram, 'uMVMatrix'
    @shaderProgram.pointSize = @gl.getUniformLocation @shaderProgram, 'pointSize'

  setMatricesUniforms: () ->

  setMatrixUniform: (shaderMatrixUniform, matrix) ->
    @gl.uniformMatrix4fv shaderMatrixUniform, false, matrix

  addObject: (obj) ->
    @objects.add obj

  initObjects: () ->
    @objects.loopAll (item) =>
      item.buffers.addVertex 'vertices', item.vertices.toArray()
      item.color.buffers.addVertex 'vertices', item.color.vertices.toArray() if item.color?
      item.buffers.addIndex 'indices', item.faces.toArray() if item.faces?
      item.compileBuffers()
      item.color.compileBuffers() if item.color?

  drawScene: () ->
    @gl.viewport 0, 0, @gl.viewportWidth, @gl.viewportHeight
    @gl.clear @gl.COLOR_BUFFER_BIT | @gl.DEPTH_BUFFER_BIT

    GL.setCamera new Camera()
    GL.camera.draw()
    #mat4.rotate Matrices.getMatrix('modelViewMatrix'), Matrices.getMatrix('modelViewMatrix'), MathUtils.toRadians(90), [1, 0, 0]
    #@setMatrixUniform @shaderProgram.pMatrixUniform, Matrices.getMatrix('projectionMatrix')

    @loadObjects()

  loopOnlyShapes: (callback) ->
    @objects.loopOnlyShapes (item, index) ->
      callback item if callback?

  loadObjects: () ->
    @gl.uniform1f @shaderProgram.pointSize, 5.0
    
    @objects.loopOnlyShapes (item, index) =>
      #item.ondraw() if item.ondraw?
      mat4.translate Matrices.getMatrix('modelViewMatrix'), item.coordinates if item.coordinates?
      Matrices.pushMatrix 'modelViewMatrix'
      mat4.multiply Matrices.getMatrix('modelViewMatrix'), Matrices.getMatrix('modelViewMatrix'), item.modelMatrix
      @loadBuffers item
      @loadColor item.color if item.color?
      #@ondraw()
      #item.ondraw() if item.ondraw?
      #@setMatricesUniforms()

      @setMatrixUniform @shaderProgram.pMatrixUniform, Matrices.getMatrix('projectionMatrix')
      @setMatrixUniform @shaderProgram.mvMatrixUniform, Matrices.getMatrix('modelViewMatrix')

      item.draw()
      Matrices.popMatrix 'modelViewMatrix'

  loadColor: (item) ->
    item.buffers.loopAll (buffer, key) =>
      @gl.bindBuffer buffer.target, buffer.buffer
      @gl.vertexAttribPointer @shaderProgram.vertexColorAttribute, item.vertices.getColumnsCount(), @gl.FLOAT, false, 0, 0

  loadBuffers: (item) ->
    item.buffers.loopAll (buffer, key) =>
      @gl.bindBuffer buffer.target, buffer.buffer
      if (buffer.target == @gl.ARRAY_BUFFER)
        @gl.vertexAttribPointer @shaderProgram.vertexPositionAttribute, item.vertices.getColumnsCount(), @gl.FLOAT, false, 0, 0

  loadObject: (item) ->
    @gl.bindBuffer @gl.ARRAY_BUFFER, item.buffer
    @gl.vertexAttribPointer @shaderProgram.vertexPositionAttribute, item.columnsCount, @gl.FLOAT, false, 0, 0
  
  startGL: () ->
    @initGL() if !@gl?
    @initShaders()
    @initObjects()
    @gl.clearColor 0.0, 0.0, 0.0, 1.0
    @gl.enable @gl.DEPTH_TEST
    @runRenderLoop()
    @ondraw()
    #drawScene()

  runRenderLoop: () =>
    requestAnimFrame @runRenderLoop
    #@onredraw()
    @drawScene()

  ondrag: () ->
    @draggable = new Draggable GL.canvas
    @draggable.ondrag = (positions) =>
      @objects.loopOnlyShapes (item) ->
        item.ondrag positions if item.ondrag?

  onkeydown: () ->
    GL.canvas.addEventListener 'keydown', (ev) =>
      @objects.loopOnlyShapes (item) ->
        item.onkeydown ev if item.onkeydown?
      GL.camera.update ev
    , false

  ondraw: () ->
    @objects.loopOnlyShapes (item) ->
      item.ondraw() if item.ondraw?

  onredraw: ->
    @objects.loopOnlyShapes (item) ->
      item.onredraw() if item.onredraw?