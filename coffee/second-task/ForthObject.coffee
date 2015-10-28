class ForthObject extends Shape
  @colors: [
    [0.0, 1.0, 1.0],
    [0.0, 1.0, 1.0],
    [0.0, 1.0, 1.0],
    [0.0, 1.0, 1.0],
    [0.0, 1.0, 1.0],
    [0.0, 1.0, 1.0],
    [0.0, 1.0, 1.0],
    [0.0, 1.0, 1.0],
    [0.0, 1.0, 1.0],
    [0.0, 1.0, 1.0],
    [0.0, 1.0, 1.0],
    [0.0, 1.0, 1.0],
    [0.0, 1.0, 1.0],
    [0.0, 1.0, 1.0],
    [0.0, 1.0, 1.0],
    [0.0, 1.0, 1.0],
  ]

  @generate: ->
    vertices = new Vertices()
    vertices.fromArray FirstObject.vertices

    faces = new Vertices()
    faces.fromArray FirstObject.faces

    object = new StateObject "forth-object", vertices, GL.gl['TRIANGLES'], faces

    color = new Vertices()
    color.fromArray ForthObject.colors
    color = new Object 'color', color
    object.color = color

    object.ondrag = (positions) ->
      mat4.rotate @modelMatrix, @modelMatrix, MathUtils.toRadians(positions.deltas.x / 5), [0, 1, 0]
      mat4.rotate @modelMatrix, @modelMatrix, MathUtils.toRadians(positions.deltas.y / 5), [1, 0, 0]

    object.ondraw = ->
      #mat4.translate @modelMatrix, @modelMatrix, [0, 0, 0]
      mat4.translate @modelMatrix, @modelMatrix, [4, 0, -1]
      #mat4.translate @modelMatrix, @modelMatrix, [0, 0, 10]
      mat4.rotate @modelMatrix, @modelMatrix, MathUtils.toRadians(180), [0, 1, 0]
      mat4.rotate @modelMatrix, @modelMatrix, MathUtils.toRadians(-90), [1, 0, 0]
      #mat4.translate @modelMatrix, @modelMatrix, [0, 0, 10]

    object