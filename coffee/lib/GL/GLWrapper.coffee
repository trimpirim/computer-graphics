class GL
  @gl: null
  @canvas: null
  @camera: null
  @textures: null
  @getGL: ->
    @gl

  @setGL: (gl) ->
    @gl = gl

  @setCamera: (camera) ->
    if !@camera?
      @camera = camera

  @setTextures: (textures) ->
    @textures = textures

  constructor: () ->
    @gl = null
    @camera = null
    GL.canvas = document.getElementById 'canvas'
    @shaders = new Shaders()
    @objects = new Objects()
    @textures = null
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

      @setTextures new Textures()
      
    catch e
      console.log "Error initializing GL: #{e}"

    console.log "Error initializing GL." if !@gl?

  setGL: (gl) ->
    GL.setGL gl
    @gl = gl

  setCamera: (camera) ->
    GL.setCamera camera
    @camera = camera if !@camera?

  setTextures: (textures) ->
    GL.setTextures textures
    @textures = textures

  initShaders: () ->
    fShader = @shaders.getShader @gl, 'shader-fs'
    vShader = @shaders.getShader @gl, 'shader-vs'

    @shaderProgram = @gl.createProgram()

    @gl.attachShader @shaderProgram, vShader
    @gl.attachShader @shaderProgram, fShader

    @gl.linkProgram @shaderProgram

    console.log 'CAN NOT INITIALISE SHADERS' if !@gl.getProgramParameter @shaderProgram, @gl.LINK_STATUS

    @gl.useProgram @shaderProgram

    @shaders.add 'GLTextureCoord', @gl.getAttribLocation @shaderProgram, 'GLTextureCoord'
    @shaders.add 'GLColor', @gl.getAttribLocation @shaderProgram, 'GLColor'
    @shaders.add 'GLPosition', @gl.getAttribLocation @shaderProgram, 'GLPosition'
    @shaders.add 'GLNormal', @gl.getAttribLocation @shaderProgram, 'GLNormal'

    @shaders.addUniform 'GLProjectionMatrix', @gl.getUniformLocation(@shaderProgram, 'GLProjectionMatrix')
    @shaders.addUniform 'GLModelViewMatrix', @gl.getUniformLocation(@shaderProgram, 'GLModelViewMatrix')
    @shaders.addUniform 'GLSampler', @gl.getUniformLocation(@shaderProgram, 'GLSampler')
    @shaders.addUniform 'GLNormalMatrix', @gl.getUniformLocation(@shaderProgram, 'GLNormalMatrix'), Uniform.TYPES.NORMALS

    ###@shaderProgram.pMatrixUniform = @gl.getUniformLocation @shaderProgram, 'GLProjectionMatrix'
    @shaderProgram.mvMatrixUniform = @gl.getUniformLocation @shaderProgram, 'GLModelViewMatrix'
    @shaderProgram.mvMatrixUniform = @gl.getUniformLocation @shaderProgram, 'GLSampler'###
    #@shaderProgram.pointSize = @gl.getUniformLocation @shaderProgram, 'pointSize'

  ###setMatrixUniform: (shaderMatrixUniform, matrix) ->
    @gl.uniformMatrix4fv shaderMatrixUniform, false, matrix###

  addObject: (obj) ->
    @objects.add obj

  initObjects: () ->
    @objects.loopAll (item) =>
      ###item.buffers.addVertex 'vertices', item.vertices.toArray()
      item.color.buffers.addVertex 'vertices', item.color.vertices.toArray() if item.color?
      item.normals.buffers.addVertex 'vertices', item.normals.vertices.toArray() if item.normals?
      item.buffers.addIndex 'indices', item.faces.toArray() if item.faces?###
      ###item.compileBuffers()
      item.color.compileBuffers() if item.color?
      item.normals.compileBuffers() if item.normals?###

      item.addBuffers()
      item.compileBuffers()

      item.texture.load() if item.texture?

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
    # @gl.uniform1f @shaderProgram.pointSize, 5.0
    
    @objects.loopOnlyShapes (item, index) =>
      Matrices.pushMatrix 'modelViewMatrix'
      mat4.multiply Matrices.getMatrix('modelViewMatrix'), Matrices.getMatrix('modelViewMatrix'), item.modelMatrix
      @loadColor item.color if item.color?
      @loadTexture item.texture if item.texture?
      @loadNormals item.normals if item.normals?
      @loadBuffers item

      @shaders.uniforms.uniformMatrices ['GLProjectionMatrix', 'GLModelViewMatrix', 'GLNormalMatrix'], [Matrices.getMatrix('projectionMatrix'), Matrices.getMatrix('modelViewMatrix'), Matrices.getMatrix('modelViewMatrix')]

      item.draw()
      Matrices.popMatrix 'modelViewMatrix'

  loadNormals: (normals) ->
    normals.buffers.loopAll (buffer, key) =>
      @gl.bindBuffer buffer.target, buffer.buffer
      @gl.enableVertexAttribArray @shaders.get 'GLNormal'
      @gl.vertexAttribPointer @shaders.get('GLNormal'), normals.vertices.getColumnsCount(), @gl.FLOAT, false, 0, 0

  loadTexture: (texture) ->
    texture.buffers.loopAll (buffer, key) =>
      @textures.disableColor @shaders.get 'GLColor'
      @gl.bindBuffer buffer.target, buffer.buffer
      @gl.enableVertexAttribArray @shaders.get 'GLTextureCoord'
      @gl.vertexAttribPointer @shaders.get('GLTextureCoord'), texture.vertices.getColumnsCount(), @gl.FLOAT, false, 0, 0

      @textures.bind texture
      @gl.uniform1i @shaders.uniforms.get('GLSampler').location, 0

  loadColor: (item) ->
    item.buffers.loopAll (buffer, key) =>
      @textures.bindWhiteAndDisable @shaders.get 'GLTextureCoord'
      @gl.bindBuffer buffer.target, buffer.buffer
      @gl.enableVertexAttribArray @shaders.get 'GLColor'
      @gl.vertexAttribPointer @shaders.get('GLColor'), item.vertices.getColumnsCount(), @gl.FLOAT, false, 0, 0

  loadBuffers: (item) ->
    item.buffers.loopAll (buffer, key) =>
      @gl.bindBuffer buffer.target, buffer.buffer
      if (buffer.target == @gl.ARRAY_BUFFER)
        @gl.enableVertexAttribArray @shaders.get 'GLPosition'
        @gl.vertexAttribPointer @shaders.get('GLPosition'), item.vertices.getColumnsCount(), @gl.FLOAT, false, 0, 0

  startGL: () ->
    @initGL() if !@gl?
    @initShaders()
    @initObjects()
    @gl.clearColor 0.0, 0.0, 0.0, 1.0
    @gl.enable @gl.DEPTH_TEST
    @gl.depthFunc @gl.LEQUAL
    @runRenderLoop()
    @ondraw()
    # @drawScene()

  runRenderLoop: () =>
    requestAnimFrame @runRenderLoop
    #@onredraw()
    @drawScene()

  ondrag: () ->
    @draggable = new Draggable GL.canvas
    @draggable.ondrag = (positions) =>
      @objects.loopOnlyShapes (item) ->
        item.ondrag positions if item.ondrag?
      GL.camera.ondrag positions

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