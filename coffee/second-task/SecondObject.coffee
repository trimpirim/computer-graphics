class SecondObject extends Shape
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
  ]

  @faces: [
    [0, 1, 2]
    [0, 2, 3]
    [2, 3, 4]
    [3, 4, 5]
    [3, 5, 6]
    [5, 6, 7]
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
  ]

  @colors: [
    [1.0, 1.0, 0.0],
    [1.0, 1.0, 0.0],
    [1.0, 1.0, 0.0],
    [1.0, 1.0, 0.0],
    [1.0, 1.0, 0.0],
    [1.0, 1.0, 0.0],
    [1.0, 1.0, 0.0],
    [1.0, 1.0, 0.0],
    [1.0, 1.0, 0.0],
    [1.0, 1.0, 0.0],
    [1.0, 1.0, 0.0],
    [1.0, 1.0, 0.0],
    [1.0, 1.0, 0.0],
    [1.0, 1.0, 0.0],
    [1.0, 1.0, 0.0],
    [1.0, 1.0, 0.0],
    [1.0, 1.0, 0.0],
    [1.0, 1.0, 0.0],
    [1.0, 1.0, 0.0],
    [1.0, 1.0, 0.0],
  ]

  @generate: ->
    vertices = new Vertices()
    vertices.fromArray SecondObject.vertices

    faces = new Vertices()
    faces.fromArray SecondObject.faces

    object = new StateObject "second-object", vertices, GL.gl['TRIANGLES'], faces

    color = new Vertices()
    color.fromArray SecondObject.colors
    color = new SimpleObject 'color', color
    object.color = color

    object.ondrag = (positions) ->
      mat4.rotate @modelMatrix, @modelMatrix, MathUtils.toRadians(positions.deltas.x / 5), [0, 1, 0]
      mat4.rotate @modelMatrix, @modelMatrix, MathUtils.toRadians(positions.deltas.y / 5), [1, 0, 0]

    object.onkeydown = (ev) ->
      switch ev.which
        when 70
          #mat4.translate @modelMatrix, @modelMatrix, [3, 0, 1]
          mat4.translate @modelMatrix, @modelMatrix, [13, 0, 1]
          mat4.rotate @modelMatrix, @modelMatrix, MathUtils.toRadians(0), [0, 1, 0]

    object.ondraw = ->
      mat4.translate @modelMatrix, @modelMatrix, [-10, 0, 0]

    object