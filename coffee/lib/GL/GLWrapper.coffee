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

  addObject: (obj) ->
    @objects.add obj

  initObjects: () ->
    @objects.loopAll (item) =>
      item.addBuffers()
      item.compileBuffers()

      item.textures.load()

  drawScene: () ->
    @gl.viewport 0, 0, @gl.viewportWidth, @gl.viewportHeight
    @gl.clear @gl.COLOR_BUFFER_BIT | @gl.DEPTH_BUFFER_BIT

    GL.setCamera new Camera()
    GL.camera.draw()

    @loadObjects()

  loopOnlyShapes: (callback) ->
    @objects.loopOnlyShapes (item, index) ->
      callback item if callback?

  loadObjects: () ->
    @objects.loopOnlyShapes (item, index) =>
      Matrices.pushMatrix 'modelViewMatrix'
      mat4.multiply Matrices.getMatrix('modelViewMatrix'), Matrices.getMatrix('modelViewMatrix'), item.modelMatrix
      @loadColor item.color if item.color?
      @loadTextures item.textures
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

  loadTextures: (textures) ->
    textures.loopAll (texture) =>
      texture.buffers.loopAll (buffer, key) =>
        @textures.disableColor @shaders.get 'GLColor'
        @gl.bindBuffer buffer.target, buffer.buffer
        @gl.enableVertexAttribArray @shaders.get 'GLTextureCoord'
        @gl.vertexAttribPointer @shaders.get('GLTextureCoord'), texture.vertices.getColumnsCount(), @gl.FLOAT, false, 0, 0

        @textures.bind texture
        @gl.uniform1i @shaders.uniforms.get(texture.sampler).location, texture.id

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

  attributeLocation: (attr) ->
    @gl.getAttribLocation @shaders.program, attr

  uniformLocation: (uniform) ->
    @gl.getUniformLocation @shaders.program, uniform

  create: ->
    @initGL() if !@gl?

  createObjects: ->
    @initObjects()

  doRest: ->
    @gl.clearColor 0.0, 0.0, 0.0, 1.0
    @gl.enable @gl.DEPTH_TEST
    @gl.depthFunc @gl.LEQUAL
    @runRenderLoop()
    # @drawScene()
    @ondraw()

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