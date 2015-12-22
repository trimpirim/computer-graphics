class Shaders extends ListObject
  constructor: ->
    super()
    @uniforms = new Uniforms()
    @program = null

  getShaderTypeAndContent: (id) ->
    shaderScript = document.getElementById id

    return null if !shaderScript?

    result = 
      type: @getShaderType shaderScript
      content: @getShaderContent shaderScript

  getShaderContent: (script) ->
    str = ''
    fChild = script.firstChild
    while fChild 
      str += fChild.textContent if fChild.nodeType == 3
      fChild = fChild.nextSibling

    str

  getShaderType: (script) ->
    if script.type == 'x-shader/x-fragment'
      type = 'FRAGMENT_SHADER'
    else if script.type == 'x-shader/x-vertex'
      type = 'VERTEX_SHADER'

    type

  getShader: (gl, id) ->
    shader = null
    shaderTypeAndContent = @getShaderTypeAndContent id
    shader = gl.createShader(gl[shaderTypeAndContent.type])
    gl.shaderSource shader, shaderTypeAndContent.content
    gl.compileShader shader

    status = gl.getShaderParameter shader, gl.COMPILE_STATUS
    console.log gl.getShaderInfoLog shader if !status
    return null if !status

    return shader

  addUniform: (name, location, type) ->
    @uniforms.add name, location, type

  useProgram: ->
    fShader = @getShader GL.gl, 'shader-fs'
    vShader = @getShader GL.gl, 'shader-vs'

    @program = GL.gl.createProgram()

    GL.gl.attachShader @program, vShader
    GL.gl.attachShader @program, fShader

    GL.gl.linkProgram @program

    console.log 'CAN NOT INITIALISE SHADERS' if !GL.gl.getProgramParameter @program, GL.gl.LINK_STATUS

    GL.gl.useProgram @program