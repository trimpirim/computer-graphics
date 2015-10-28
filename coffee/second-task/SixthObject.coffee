class SixthObject extends Shape
  @vertices: [
    [-1, 1, 1]#0
    [-1, 0, 1]#1
    [0, 0, 1]#2
    [0, 1, 1]#3
    [1, 0, 1]#4
    [1, 1, 1]#5
    [0, 2, 1]#6
    [1, 2, 1]#7
    [-1, 1, 0]#8
    [0, 1, 0]#9
    [0, 2, 0]#10
    [1, 2, 0]#11
    [1, 1, 0]#12
    [0, 0, 0]#13
    [1, 0, 0]#14
    [-1, 0, 0]#15
    [1, -1, 1]#16
    [0, -1, 1]#17
    [0, -1, 0]#18
    [1, -1, 0]#19
    [-1, 0, -1]#20
    [0, 0, -1]#21
    [-1, 1, -1]#22
    [0, 1, -1]#23
    #24
  ]

  @faces: [
    [0, 1, 2]
    [0, 2, 3]
    [2, 3, 4]
    [3, 4, 5]
    [0, 3, 8]
    [3, 8, 9]
    [1, 2, 13]
    [1, 13, 15]
    [9, 13, 14]
    [9, 12, 14]
    [0, 8, 15]
    [0, 1, 15]
    [4, 5, 12]
    [4, 12, 14]
    [3, 5, 9]
    [5, 9, 12]
    [2, 4, 16]
    [2, 16, 17]
    [2, 13, 17]
    [13, 17, 18]
    [4, 14, 16]
    [14, 16, 19]
    [13, 14, 18]
    [14, 18, 19]
    [16, 17, 18]
    [16, 18, 19]
    [13, 15, 20]
    [13, 20, 21]
    [8, 15, 20]
    [8, 20, 22]
    [13, 21, 23]
    [9, 13, 23]
    [8, 9, 23]
    [8, 22, 23]
    [20, 22, 23]
    [20, 21, 23]
  ]

  @colors: [
    [1.0, 0.0, 0.5],
    [1.0, 0.0, 0.5],
    [1.0, 0.0, 0.5],
    [1.0, 0.0, 0.5],
    [1.0, 0.0, 0.5],
    [1.0, 0.0, 0.5],
    [1.0, 0.0, 0.5],
    [1.0, 0.0, 0.5],
    [1.0, 0.0, 0.5],
    [1.0, 0.0, 0.5],
    [1.0, 0.0, 0.5],
    [1.0, 0.0, 0.5],
    [1.0, 0.0, 0.5],
    [1.0, 0.0, 0.5],
    [1.0, 0.0, 0.5],
    [1.0, 0.0, 0.5],
    [1.0, 0.0, 0.5],
    [1.0, 0.0, 0.5],
    [1.0, 0.0, 0.5],
    [1.0, 0.0, 0.5],
    [1.0, 0.0, 0.5],
    [1.0, 0.0, 0.5],
    [1.0, 0.0, 0.5],
    [1.0, 0.0, 0.5],
  ]

  @generate: ->
    vertices = new Vertices()
    vertices.fromArray SixthObject.vertices

    faces = new Vertices()
    faces.fromArray SixthObject.faces

    object = new StateObject "sixth-object", vertices, GL.gl['TRIANGLES'], faces

    color = new Vertices()
    color.fromArray SixthObject.colors
    color = new Object 'color', color
    object.color = color

    object.ondrag = (positions) ->
      mat4.rotate @modelMatrix, @modelMatrix, MathUtils.toRadians(positions.deltas.x / 5), [0, 1, 0]
      mat4.rotate @modelMatrix, @modelMatrix, MathUtils.toRadians(positions.deltas.y / 5), [1, 0, 0]

    object.ondraw = ->
      #mat4.translate @modelMatrix, @modelMatrix, [10, 0, 0]
      mat4.translate @modelMatrix, @modelMatrix, [4, 0, 0]
      #mat4.translate @modelMatrix, @modelMatrix, [0, 0, 10]
      #mat4.rotate @modelMatrix, @modelMatrix, MathUtils.toRadians(-90), [0, 0, -1]

    object