class ForthObject extends Shape
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
    [2, 0, 0]#16
    [2, 0, -1]#17
    [2, 1, 0]#18
    [2, 1, -1]#19
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
    #[5, 7, 11]
    #[5, 11, 12]
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

    [5, 12, 16]
    [12, 16, 17]

    [5, 7, 16]
    [7, 16, 18]

    [7, 11, 18]
    [11, 18, 19]

    [12, 11, 19]
    [12, 17, 19]

    [17, 18, 19]
    [16, 17, 18]
  ]


  @colors: [
    [0.0, 0.5, 1.0],
    [0.0, 0.5, 1.0],
    [0.0, 0.5, 1.0],
    [0.0, 0.5, 1.0],
    [0.0, 0.5, 1.0],
    [0.0, 0.5, 1.0],
    [0.0, 0.5, 1.0],
    [0.0, 0.5, 1.0],
    [0.0, 0.5, 1.0],
    [0.0, 0.5, 1.0],
    [0.0, 0.5, 1.0],
    [0.0, 0.5, 1.0],
    [0.0, 0.5, 1.0],
    [0.0, 0.5, 1.0],
    [0.0, 0.5, 1.0],
    [0.0, 0.5, 1.0],
    [0.0, 0.5, 1.0],
    [0.0, 0.5, 1.0],
    [0.0, 0.5, 1.0],
    [0.0, 0.5, 1.0],
  ]

  @generate: ->
    vertices = new Vertices()
    vertices.fromArray ForthObject.vertices

    faces = new Vertices()
    faces.fromArray ForthObject.faces

    object = new StateObject "forth-object", vertices, GL.gl['TRIANGLES'], faces
    object.initialTranslation Axis.TYPES.X, 0, true

    object.endMatrix = [1, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 3, 0, -1, 1]

    color = new Vertices()
    color.fromArray ForthObject.colors
    color = new SimpleObject 'color', color
    object.color = color

    object.ondrag = (positions) ->
      @rotateY positions.deltas.x / 5
      @rotateX positions.deltas.y / 5
    
    ###object.onkeydown = (ev) ->
      switch ev.which
        when 16
          interval = setInterval =>
            clearInterval interval if @transformationDone
            @modelMatrix = @increaseMatrixBy @modelMatrix, 0.1
          , 10
        when 70
          mat4.translate @modelMatrix, @modelMatrix, [3, 0, -1]
          mat4.rotate @modelMatrix, @modelMatrix, MathUtils.toRadians(-90), [1, 0, 0]###

    object