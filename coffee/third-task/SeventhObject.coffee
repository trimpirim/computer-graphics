class SeventhObject extends Shape
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
    [0, 0, -1]#20
    [0, 1, -1]#21
    [1, 1, -1]#22
    [1, 0, -1]#23
    [0, 0, -1]#20 24
    [1, 0, -1]#23 25
    [0, 1, -1]#21 26
    [1, 1, -1]#22 27
    [1, 0, 1]#4 28
    [1, 1, 1]#5 29
    [1, 1, 0]#12 30
    [1, 0, 0]#14 31
    [1, 0, 1]#4 32
    [1, 0, 0]#14 33
    [1, -1, 1]#16 34
    [1, -1, 0]#19 35
    [1, 1, 0]#12 36
    [1, 0, 0]#14 37
    [1, 1, -1]#22 38
    [1, 0, -1]#23 39
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
    [0, 8, 15]
    [0, 1, 15]
    [28, 29, 30]#right
    [28, 30, 31]#right
    [3, 5, 9]
    [5, 9, 12]
    [2, 4, 16]
    [2, 16, 17]
    [2, 13, 17]
    [13, 17, 18]
    [32, 33, 34]#right
    [33, 34, 35]#right
    [13, 14, 18]
    [14, 18, 19]
    [16, 17, 18]
    [16, 18, 19]
    [8, 13, 15]
    [8, 9, 13]

    [9, 13, 20]
    [9, 20, 21]
    [9, 12, 21]
    [12, 21, 22]
    [36, 37, 38]#right
    [37, 38, 39]#right
    [13, 14, 23]
    [13, 20, 23]
    [24, 25, 26] #back
    [25, 26, 27] #back
  ]


  # isslindes
  ###[13, 15, 20]
    [13, 20, 21]
    [8, 15, 20]
    [8, 20, 22]
    [13, 21, 23]
    [9, 13, 23]
    [8, 9, 23]
    [8, 22, 23]
    [20, 22, 23]
    [20, 21, 23]###

  @normals: [
    [-1, 1]#0
    [-1, 0]#1
    [0, 0]#2
    [0, 1]#3
    [1, 0]#4
    [1, 1]#5
    [0, 2]#6
    [1, 2]#7
    [-1, 1]#8
    [0, 1]#9
    [0, 2]#10
    [1, 2]#11
    [1, 1]#12
    [0, 0]#13
    [1, 0]#14
    [-1, 0]#15
    [1, -1]#16
    [0, -1]#17
    [0, -1]#18
    [1, -1]#19
    [0, 0]#20
    [0, 1]#21
    [1, 1]#22
    [1, 0]#23
    [0.2, 0.2]#24
    [0, 0.2]#25
    [0.2, 0.4]#26
    [0, 0.4]#27
    [0.6, 0.2]#28
    [0.6, 0.4]#29
    [0.8, 0.4]#30
    [0.8, 0.2]#31
    [0.6, 0.2]#32
    [0.8, 0.2]#33
    [0.6, 0.0]#34
    [0.8, 0.0]#35
    [0.8, 0.4]#36
    [0.8, 0.2]#37
    [1.0, 0.4]#38
    [1.0, 0.2]#39
  ]

  @generate: ->
    vertices = new Vertices()
    vertices.fromArray SeventhObject.vertices

    faces = new Vertices()
    faces.fromArray SeventhObject.faces

    object = new ThirdTaskObject "seventh-object", vertices, GL.gl['TRIANGLES'], faces
    object.initialTranslation Axis.TYPES.X, 15, true
    # object.initialTranslation Axis.TYPES.X, 0, true
    # object.initialTranslation Axis.TYPES.Z, 12, true
    object.endMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 5, 0, -2, 1]

    normals = new Vertices()
    normals.fromNormalsArray SeventhObject.normals
    normals = new SimpleObject 'normals', normals
    object.normals = normals
    
    texture = new Texture 'images/third-task/fibonacci.jpg'
    object.texture = texture
    
    object