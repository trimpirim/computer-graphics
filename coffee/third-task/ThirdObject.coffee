class ThirdObject extends Shape
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
    [-2, 0, 0]#16
    [-2, -1, 0]#17
    [-2, 0, -1]#18
    [-2, -1, -1]#19
    [-1, 1, 0]#20
    [-1, 1, -1]#21
    [1, -1, 0]#22
    [1, 0, 0]#23
    [1, 0, -1]#24
    [1, -1, -1]#25
    [0, 0, 0]#3 26
    [0, 1, 0]#6 27
    [0, 0, -1]#9 28
    [0, 1, -1]#10 29
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
    [22, 23, 24]# back lower
    [22, 24, 25]# back lower
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
    [0, 6, 20]
    [26, 27, 28]# back upper
    [27, 28, 29]# back upper
    [0, 8, 20]
    [8, 20, 21]
    [8, 9, 21]
    [9, 10, 21]
    [6, 10, 20]
    [10, 20, 21]
  ]

  @normals: [
    [-1, 0]#0
    [-1, -1]#1
    [0, -1]#2
    [0, 0]#3
    [1, -1]#4
    [1, 0]#5
    [0, 1]#6
    [1, 1]#7
    [-1, 0]#8
    [0, 0]#9
    [0, 1]#10
    [1, 1]#11
    [1, 0]#12
    [0, -1]#13
    [1, -1]#14
    [-1, -1]#15
    [-2, 0]#16
    [-2, -1]#17
    [-2, 0]#18
    [-2, -1]#19
    [-1, 1]#20
    [-1, 1]#21
    [0.6, 0.2]#22
    [0.6, 0.4]#23
    [0.8, 0.4]#24
    [0.8, 0.2]#25
    [0.6, 0.4]#28
    [0.6, 0.6]#29
    [0.8, 0.4]#26
    [0.8, 0.6]#27
  ]

  @generate: ->
    vertices = new Vertices()
    vertices.fromArray ThirdObject.vertices

    faces = new Vertices()
    faces.fromArray ThirdObject.faces

    object = new ThirdTaskObject "third-object", vertices, GL.gl['TRIANGLES'], faces
    object.initialTranslation Axis.TYPES.X, -5, true
    # object.initialTranslation Axis.TYPES.X, 0, true
    # object.initialTranslation Axis.TYPES.Z, 12, true

    normals = new Vertices()
    normals.fromNormalsArray ThirdObject.normals
    normals = new SimpleObject 'normals', normals
    object.normals = normals
    
    texture = new Texture 'images/third-task/fibonacci.jpg'
    object.texture = texture

    object.endMatrix = [0, 0, -1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 3, 1, 0, 1]
    
    object