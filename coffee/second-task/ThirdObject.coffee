class ThirdObject extends Shape
  @vertices: [
    [-1, 0, 0]#1
    [-1, -1, 0]#2
    [0, -1, 0]#3
    [0, 0, 0]#4
    [1, -1, 0]#5
    [1, 0, 0]#6
    [0, 1, 0]#7
    [1, 1, 0]#8
    [-1, 0, -1]#9
    [0, 0, -1]#10
    [0, 1, -1]#11
    [1, 1, -1]#12
    [1, 0, -1]#13
    [0, -1, -1]#14
    [1, -1, -1]#15
    [-1, -1, -1]#16
    [-2, 0, 0]#17
    [-2, -1, 0]#18
    [-2, 0, -1]#19
    [-2, -1, -1]#20
    [-1, 1, 0]#21
    [-1, 1, -1]#22
  ]

  @faces: [
    [0, 1, 2]
    [0, 2, 3]
    [2, 3, 4]
    [3, 4, 5]
    [3, 5, 9]
    [5, 9, 12]
    [2, 4, 13]
    [4, 13, 14]
    [1, 2, 13]
    [1, 13, 15]
    [8, 13, 15]
    [8, 9, 13]
    [9, 13, 14]
    [9, 12, 14]
    [4, 5, 12]
    [4, 12, 14]
    [0, 1, 16]
    [1, 16, 17]
    [0, 8, 16]
    [8, 16, 18]
    [8, 15, 18]
    [15, 18, 19]
    [1, 15, 19]
    [1, 17, 19]
    [16, 18, 19]
    [16, 17, 19]
    [0, 3, 6]
    [3, 6, 9]
    [6, 10, 9]
    [0, 6, 20]
    [0, 8, 20]
    [8, 20, 21]
    [8, 9, 21]
    [9, 10, 21]
    [6, 10, 20]
    [10, 20, 21]
  ]

  @colors: [
    [0.5, 0.0, 0.5],
    [0.5, 0.0, 0.5],
    [0.5, 0.0, 0.5],
    [0.5, 0.0, 0.5],
    [0.5, 0.0, 0.5],
    [0.5, 0.0, 0.5],
    [0.5, 0.0, 0.5],
    [0.5, 0.0, 0.5],
    [0.5, 0.0, 0.5],
    [0.5, 0.0, 0.5],
    [0.5, 0.0, 0.5],
    [0.5, 0.0, 0.5],
    [0.5, 0.0, 0.5],
    [0.5, 0.0, 0.5],
    [0.5, 0.0, 0.5],
    [0.5, 0.0, 0.5],
    [0.5, 0.0, 0.5],
    [0.5, 0.0, 0.5],
    [0.5, 0.0, 0.5],
    [0.5, 0.0, 0.5],
    [0.5, 0.0, 0.5],
    [0.5, 0.0, 0.5],
  ]

  @generate: ->
    vertices = new Vertices()
    vertices.fromArray ThirdObject.vertices

    faces = new Vertices()
    faces.fromArray ThirdObject.faces

    object = new StateObject "third-object", vertices, GL.gl['TRIANGLES'], faces

    color = new Vertices()
    color.fromArray ThirdObject.colors
    color = new Object 'color', color
    object.color = color

    object.ondrag = (positions) ->
      mat4.rotate @modelMatrix, @modelMatrix, MathUtils.toRadians(positions.deltas.x / 5), [0, 1, 0]
      mat4.rotate @modelMatrix, @modelMatrix, MathUtils.toRadians(positions.deltas.y / 5), [1, 0, 0]

    object.ondraw = ->
      mat4.translate @modelMatrix, @modelMatrix, [-5, 0, 0]
      #mat4.translate @modelMatrix, @modelMatrix, [0, 0, 10]
      #mat4.rotate @modelMatrix, @modelMatrix, MathUtils.toRadians(positions.deltas.y / 5), [1, 0, 0]

    object