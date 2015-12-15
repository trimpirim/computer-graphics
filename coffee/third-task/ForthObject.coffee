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
    [0, 0, -1]#8
    [0, 1, -1]#9
    [1, 1, -1]#10
    [1, 0, -1]#11
    [0, -1, -1]#12
    [1, -1, -1]#13
    [-1, -1, -1]#14
    [2, 0, 0]#15
    [2, 0, -1]#16
    [2, 1, 0]#17
    [2, 1, -1]#18
    [0, 1, 0]#19
    [1, 1, 0]#20
    [0, 1, -1]#21
    [1, 1, -1]#22
    [-1, 0, 0]#23
    [0, 0, 0]#24
    [-1, 0, -1]#25 
    [0, 0, -1]#26
    [0, 0, 0]#27
    [0, 1, 0]#28
    [0, 0, -1]#29
    [0, 1, -1]#30
    [-1, 0, 0]#31 
    [-1, -1, 0]#32
    [-1, 0, -1]#33
    [-1, -1, -1]#34
    [-1, 0, -1]#35
    [0, 0, -1]#36
    [0, -1, -1]#37
    [-1, -1, -1]#38
    [0, 0, -1]#39
    [1, 0, -1]#40
    [0, -1, -1]#41
    [1, -1, -1]#42
    [1, 1, -1]#43
    [1, 0, -1]#44
    [2, 0, -1]#45
    [2, 1, -1]#46
  ]

  @faces: [
    [0, 1, 2]
    [0, 2, 3]
    [1, 2, 12]
    [1, 12, 14]
    [2, 4, 12]
    [2, 3, 4]
    [3, 4, 5]
    [3, 5, 6]
    [5, 6, 7]
    [4, 12, 13]
    [4, 5, 11]
    [4, 11, 13]
    [5, 7, 15]
    [7, 15, 17]
    [5, 11, 15]
    [11, 15, 16]
    [7, 10, 17]
    [8, 9, 11]#bottom
    [9, 10, 11]#bottom
    [10, 17, 18]
    [16, 17, 18]
    [15, 16, 17]
    [19, 20, 21]# back
    [20, 21, 22]# back
    [23, 24, 25]# back
    [24, 25, 26]# back
    [27, 28, 29] #kaire
    [28, 29, 30] #kaire
    [31, 32, 34] #kaire
    [31, 33, 34] #kaire
    [35, 36, 37]#bottom
    [35, 37, 38]#bottom
    [39, 40, 42]#bottom
    [39, 41, 42]#bottom
    [43, 44, 46]#bottom
    [44, 45, 46]#bottom

  ]


  @textureCoords: [
    [-1, 0]#0
    [-1, -1]#1
    [0, -1]#2
    [0, 0]#3
    [1, -1]#4
    [1, 0]#5
    [0, 1]#6
    [1, 1]#7
    [0.4, 0.6]#8
    [0.4, 0.8]#9
    [0.6, 0.8]#10
    [0.6, 0.6]#11
    [0, -1]#12
    [1, -1]#13
    [-1, -1]#14
    [2, 0]#15
    [2, 0]#16
    [2, 1]#17
    [2, 1]#18
    [0.6, 0.2]#19
    [0.4, 0.2]#20
    [0.6, 0]#21
    [0.4, 0]#22
    [0.8, 0.2]#23
    [0.6, 0.2]#24
    [0.8, 0]#25
    [0.6, 0]#26
    [0.4, 0.2]#27
    [0.2, 0.2]#28
    [0.4, 0]#29
    [0.2, 0]#30
    [0.4, 0.2]#31
    [0.6, 0.2]#32
    [0.4, 0]#33
    [0.6, 0]#34
    [0.2, 0.6]#35
    [0.4, 0.6]#36
    [0.4, 0.4]#37
    [0.2, 0.4]#38
    [0.4, 0.6]#39
    [0.6, 0.6]#40
    [0.4, 0.4]#41
    [0.6, 0.4]#42
    [0.6, 0.8]#43
    [0.6, 0.6]#44
    [0.8, 0.6]#45
    [0.8, 0.8]#46
  ]

  @generate: ->
    vertices = new Vertices()
    vertices.fromArray ForthObject.vertices

    faces = new Vertices()
    faces.fromArray ForthObject.faces

    object = new ThirdTaskObject "forth-object", vertices, GL.gl['TRIANGLES'], faces
    object.computeNormals()
    object.initialTranslation Axis.TYPES.X, 0, true
    # object.initialTranslation Axis.TYPES.X, 0, true
    # object.initialTranslation Axis.TYPES.Z, 12, true

    object.endMatrix = [1, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 3, 0, -1, 1]

    textureCoords = new Vertices()
    textureCoords.fromTextureArray ForthObject.textureCoords
    
    texture = new Texture 'images/third-task/fibonacci.jpg'
    texture.vertices = textureCoords
    object.texture = texture

    object