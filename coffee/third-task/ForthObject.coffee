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
    [0, 1, 0]#20
    [1, 1, 0]#21
    [0, 1, -1]#22
    [1, 1, -1]#23
    [-1, 0, 0]#24
    [0, 0, 0]#25
    [-1, 0, -1]#26 
    [0, 0, -1]#27
    [0, 0, 0]#28
    [0, 1, 0]#29
    [0, 0, -1]#30
    [0, 1, -1]#31
    [-1, 0, 0]#0 32 
    [-1, -1, 0]#1 33
    [-1, 0, -1]#8 34
    [-1, -1, -1]#15 35
  ]

  @faces: [
    # [0, 1, 2]
    # [0, 2, 3]
    # [2, 3, 4]
    # [3, 4, 5]
    # [3, 5, 6]
    # [5, 6, 7]
    # [24, 25, 26]# back
    # [25, 26, 27]# back
    [28, 29, 30] #kaire
    [29, 30, 31] #kaire
    # [20, 21, 22]# back
    # [21, 22, 23]# back
    # [10, 9, 12]
    # [10, 11, 12]
    # [2, 4, 13]
    # [4, 13, 14]
    # [1, 2, 13]
    # [1, 13, 15]
    # [8, 13, 15]
    # [8, 9, 13]
    # [9, 13, 14]
    # [9, 12, 14]
    [32, 34, 35] #kaire
    [32, 33, 35] #kaire
    # [4, 5, 12]
    # [4, 12, 14]

    # [5, 12, 16]
    # [12, 16, 17]

    # [5, 7, 16]
    # [7, 16, 18]

    # [7, 11, 18]
    # [11, 18, 19]

    # [12, 11, 19]
    # [12, 17, 19]

    # [17, 18, 19]
    # [16, 17, 18]
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
    [2, 0]#16
    [2, 0]#17
    [2, 1]#18
    [2, 1]#19
    [0.6, 0.2]#20
    [0.4, 0.2]#21
    [0.6, 0]#22
    [0.4, 0]#23
    [0.8, 0.2]#24
    [0.6, 0.2]#25
    [0.8, 0]#26
    [0.6, 0]#27
    [0.4, 0.2]#28
    [0.2, 0.2]#29
    [0.4, 0]#30
    [0.2, 0]#31
    [0.4, 0.2]#34
    [0.6, 0.2]#35
    [0.4, 0]#32
    [0.6, 0]#33
  ]

  @generate: ->
    vertices = new Vertices()
    vertices.fromArray ForthObject.vertices

    faces = new Vertices()
    faces.fromArray ForthObject.faces

    object = new ThirdTaskObject "forth-object", vertices, GL.gl['TRIANGLES'], faces
    # object.initialTranslation Axis.TYPES.X, 0, true
    object.initialTranslation Axis.TYPES.X, 0, true
    object.initialTranslation Axis.TYPES.Z, 12, true

    object.endMatrix = [1, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 3, 0, -1, 1]

    normals = new Vertices()
    normals.fromNormalsArray ForthObject.normals
    normals = new SimpleObject 'normals', normals
    object.normals = normals
    
    texture = new Texture 'images/third-task/fibonacci.jpg'
    object.texture = texture

    object