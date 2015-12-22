class SeventhObject extends Shape
  @vertices: [
    [-1, 1, 1]#0
    [-1, 0, 1]#1
    [0, 0, 1]#2
    [0, 1, 1]#3
    [1, 0, 1]#4
    [1, 1, 1]#5
    # [0, 2, 1]#6
    # [1, 2, 1]#7
    [-1, 1, 0]#6
    [0, 1, 0]#7
    # [0, 2, 0]#10
    # [1, 2, 0]#11
    # [1, 1, 0]#12
    [0, 0, 0]#8
    [1, 0, 0]#9
    [-1, 0, 0]#10
    [1, -1, 1]#11
    [0, -1, 1]#12
    [0, -1, 0]#13
    [1, -1, 0]#14
    [0, 0, -1]#15
    [0, 1, -1]#16
    # [1, 1, -1]#22
    [1, 0, -1]#17
    [0, 0, -1]#18
    [1, 0, -1]#19
    [0, 1, -1]#20
    [1, 1, -1]#21
    [1, 0, 1]#22
    [1, 1, 1]#23
    [1, 1, 0]#24
    [1, 0, 0]#25
    [1, 0, 1]#26
    [1, 0, 0]#27
    [1, -1, 1]#28
    [1, -1, 0]#29
    [1, 1, 0]#30
    [1, 0, 0]#31
    [1, 1, -1]#32
    [1, 0, -1]#33
    [0, 0, 1]#34
    [1, 0, 1]#35
    [1, -1, 1]#36
    [0, -1, 1]#37
    [-1, 1, 1]#38
    [0, 1, 1]#39
    [-1, 1, 0]#40
    [0, 1, 0]#41
    [0, 1, 1]#42
    [1, 1, 1]#43
    [0, 1, 0]#44
    [1, 1, 0]#45
    [0, 1, 0]#46
    [1, 1, 0]#47
    [0, 1, -1]#48
    [1, 1, -1]#49
  ]

  @faces: [
    [0, 1, 2]
    [0, 2, 3]
    [0, 6, 10]
    [0, 1, 10]
    [1, 2, 8]
    [1, 8, 10]
    [2, 3, 4]#front
    [3, 4, 5]#front
    [2, 8, 12]
    [8, 12, 13]
    [6, 8, 10]
    [6, 7, 8]
    [7, 8, 15]
    [7, 15, 16]
    [8, 9, 17]
    [8, 15, 17]
    [8, 9, 13]
    [9, 13, 14]
    [11, 12, 13]#bottom
    [11, 13, 14]#bottom
    [18, 19, 20] #back
    [19, 20, 21] #back
    [22, 23, 24]#right
    [22, 24, 25]#right
    [26, 27, 28]#right
    [27, 28, 29]#right
    [30, 31, 32]#right
    [31, 32, 33]#right
    [34, 35, 36]#front
    [34, 36, 37]#front
    [38, 39, 40]#top
    [39, 40, 41]#top
    [42, 43, 44]#top
    [43, 44, 45]#top
    [46, 47, 48]#top
    [47, 48, 49]#top
  ]

  @textureCoords: [
    [-1, 1]#0
    [-1, 0]#1
    [0.8, 0.2]#2
    [0.8, 0.4]#3
    [1, 0.2]#4
    [1, 0.4]#5
    [-1, 1]#6
    [0, 1]#7
    [0, 0]#8
    [1, 0]#9
    [-1, 0]#10
    [1.0, 0.6]#11
    [0.8, 0.6]#12
    [0.8, 0.8]#13
    [1.0, 0.8]#14
    [0, 0]#15
    [0, 1]#16
    [1, 0]#17
    [0.2, 0.2]#18
    [0, 0.2]#19
    [0.2, 0.4]#20
    [0, 0.4]#21
    [0.6, 0.2]#22
    [0.6, 0.4]#23
    [0.8, 0.4]#24
    [0.8, 0.2]#25
    [0.6, 0.2]#26
    [0.8, 0.2]#27
    [0.6, 0.0]#28
    [0.8, 0.0]#29
    [0.8, 0.4]#30
    [0.8, 0.2]#31
    [1.0, 0.4]#32
    [1.0, 0.2]#33
    [0.8, 0.2]#34
    [1.0, 0.2]#35
    [1.0, 0.0]#36
    [0.8, 0.0]#37
    [0.6, 0.6]#38
    [0.8, 0.6]#39
    [0.6, 0.8]#40
    [0.8, 0.8]#41
    [0.8, 0.6]#42
    [1.0, 0.6]#43
    [0.8, 0.8]#44
    [1.0, 0.8]#45
    [0.8, 0.8]#46
    [1.0, 0.8]#47
    [0.8, 1.0]#48
    [1.0, 1.0]#49
  ]

  @normals: [
    [-1, 1, 1]#0
    [-1, 0, 1]#1
    [0, 0, 1]#2
    [0, 0, 1]#3
    [0, 0, 1]#4
    [0, 0, 1]#5
    [-1, 1, 0]#6
    [0, 1, 0]#7
    [0, 0, 0]#8
    [1, 0, 0]#9
    [-1, 0, 0]#10
    [0, -1, 0]#11
    [0, -1, 0]#12
    [0, -1, 0]#13
    [0, -1, 0]#14
    [0, 0, -1]#15
    [0, 1, -1]#16
    [1, 0, -1]#17
    [0, 0, -1]#18
    [0, 0, -1]#19
    [0, 0, -1]#20
    [0, 0, -1]#21
    [1, 0, 0]#22
    [1, 0, 0]#23
    [1, 0, 0]#24
    [1, 0, 0]#25
    [1, 0, 0]#26
    [1, 0, 0]#27
    [1, 0, 0]#28
    [1, 0, 0]#29
    [1, 0, 0]#30
    [1, 0, 0]#31
    [1, 0, 0]#32
    [1, 0, 0]#33
    [0, 0, 1]#34
    [0, 0, 1]#35
    [0, 0, 1]#36
    [0, 0, 1]#37
    [0, 1, 0]#38
    [0, 1, 0]#39
    [0, 1, 0]#40
    [0, 1, 0]#41
    [0, 1, 0]#42
    [0, 1, 0]#43
    [0, 1, 0]#44 
    [0, 1, 0]#45
    [0, 1, 0]#46
    [0, 1, 0]#47
    [0, 1, 0]#48
    [0, 1, 0]#49
  ]

  @generate: ->
    vertices = new Vertices()
    vertices.fromArray SeventhObject.vertices

    faces = new Vertices()
    faces.fromArray SeventhObject.faces

    object = new ThirdTaskObject "seventh-object", vertices, GL.gl['TRIANGLES'], faces
    object.normals = new SimpleObject 'normals', new Vertices().fromArray SeventhObject.normals
    # object.computeNormals()
    object.initialTranslation Axis.TYPES.X, 15, true
    # object.initialTranslation Axis.TYPES.X, 0, true
    # object.initialTranslation Axis.TYPES.Z, 12, true
    object.endMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 5, 0, -2, 1]

    textureCoords = new Vertices()
    textureCoords.fromTextureArray SeventhObject.textureCoords
    
    texture = new Texture 'images/third-task/fibonacci.jpg', textureCoords, 'GLSampler'
    object.textures.add 'fibonacci', texture
    
    object