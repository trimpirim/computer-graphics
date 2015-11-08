class FifthObject extends Shape
  @vertices: [
    [-1, 0, 0]#0
    [-1, -1, 0]#1
    [0, -1, 0]#2
    [0, 0, 0]#3
    [1, -1, 0]#4
    [1, 0, 0]#5
    [0, 1, 0]#6
    [1, 1, 0]#7
    [-1, 0, -1]#8
    [0, 0, -1]#9
    [0, 1, -1]#10
    [1, 1, -1]#11
    [1, 0, -1]#12
    [0, -1, -1]#13
    [1, -1, -1]#14
    [-1, -1, -1]#15
    [0, 0, 1]#16
    [1, 0, 1]#17
    [1, 1, 1]#18
    [0, 1, 1]#19
  ]

  @faces: [
    [0, 1, 2]
    [0, 2, 3]
    [2, 3, 4]
    [3, 4, 5]
    #[3, 5, 6]
    #[5, 6, 7]
    [0, 3, 8]
    [3, 8, 9]
    [3, 6, 9]
    [6, 9, 10]
    [6, 7, 10]
    [7, 10, 11]
    [5, 7, 11]
    [5, 11, 12]
    [10, 9, 12]
    [10, 11, 12]
    [2, 4, 13]
    [4, 13, 14]
    [1, 2, 13]
    [1, 13, 15]
    [8, 13, 15]
    [8, 9, 13]
    [9, 13, 14]
    [9, 12, 14]
    [0, 8, 15]
    [0, 1, 15]
    [4, 5, 12]
    [4, 12, 14]

    [3, 5, 16]
    [5, 16, 17]

    [5, 7, 17]
    [7, 17, 18]

    [6, 7, 18]
    [6, 18, 19]

    [3, 6, 19]
    [3, 16, 19]

    [16, 18, 19]
    [16, 17, 18]
  ]

  @colors: [
    [1.0, 1.0, 1.0],
    [1.0, 1.0, 1.0],
    [1.0, 1.0, 1.0],
    [1.0, 1.0, 1.0],
    [1.0, 1.0, 1.0],
    [1.0, 1.0, 1.0],
    [1.0, 1.0, 1.0],
    [1.0, 1.0, 1.0],
    [1.0, 1.0, 1.0],
    [1.0, 1.0, 1.0],
    [1.0, 1.0, 1.0],
    [1.0, 1.0, 1.0],
    [1.0, 1.0, 1.0],
    [1.0, 1.0, 1.0],
    [1.0, 1.0, 1.0],
    [1.0, 1.0, 1.0],
    [1.0, 1.0, 1.0],
    [1.0, 1.0, 1.0],
    [1.0, 1.0, 1.0],
    [1.0, 1.0, 1.0],
  ]

  @generate: ->
    vertices = new Vertices()
    vertices.fromArray FifthObject.vertices

    faces = new Vertices()
    faces.fromArray FifthObject.faces

    object = new StateObject "fifth-object", vertices, GL.gl['TRIANGLES'], faces

    color = new Vertices()
    color.fromArray FifthObject.colors
    color = new SimpleObject 'color', color
    object.color = color

    object.ondrag = (positions) ->
      mat4.rotate @modelMatrix, @modelMatrix, MathUtils.toRadians(positions.deltas.x / 5), [0, 1, 0]
      mat4.rotate @modelMatrix, @modelMatrix, MathUtils.toRadians(positions.deltas.y / 5), [1, 0, 0]

    object.onkeydown = (ev) ->
      switch ev.which
        when 70
          #mat4.translate @modelMatrix, @modelMatrix, [2, 0, 1]
          mat4.translate @modelMatrix, @modelMatrix, [-3, 0, 1]
          mat4.rotate @modelMatrix, @modelMatrix, MathUtils.toRadians(-180), [1, 0, 0]
          mat4.rotate @modelMatrix, @modelMatrix, MathUtils.toRadians(90), [0, 1, 0]

    object.ondraw = ->
      mat4.translate @modelMatrix, @modelMatrix, [5, 0, 0]

    object