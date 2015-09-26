class RunFractal extends Run
  constructor: () ->
    @gl = new GL()

  run: () ->
    createObj = (count) =>
      vertices = new Vertices()
      vertices.fromArray Fractal.vertices

      faces = new Vertices()
      faces.fromArray Fractal.faces

      obj = new Object "object-#{count}", vertices, GL.gl['TRIANGLES'], faces

      colorVertices = new Vertices()
      colorVertices.fromArray Fractal.colors
      color = new Object 'color', colorVertices
      obj.color = color

      obj

      ###obj.ondrag = (positions) ->
        matrix = mat4.create()
        mat4.identity matrix
        mat4.rotate matrix, matrix, MathUtils.toRadians(positions.deltas.x / 5), [0, 1, 0]
        mat4.rotate matrix, matrix, MathUtils.toRadians(positions.deltas.y / 5), [1, 0, 0]
        mat4.multiply @modelMatrix, matrix, @modelMatrix###

    first = createObj(1)

    first.onkeydown = (ev) ->
      switch ev.keyCode
        when 32 #space
          matrix = mat4.create()
          mat4.identity matrix
          mat4.translate matrix, matrix, [-1, 0, 0]
          mat4.multiply @modelMatrix, matrix, @modelMatrix

    second = createObj(2)
    second.onkeydown = (ev) ->
      switch ev.keyCode
        when 32
          matrix = mat4.create()
          mat4.identity matrix
          mat4.translate matrix, matrix, [1, 0, 0]
          mat4.multiply @modelMatrix, matrix, @modelMatrix
        
      

    @gl.addObject first
    @gl.addObject second

    @gl.ondrag()
    @gl.onkeydown()

    @gl.startGL()

