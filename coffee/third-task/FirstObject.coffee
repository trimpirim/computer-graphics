class FirstObject extends Shape
  @vertices: [
    [-1, 0, 0]#0
    [-1, -1, 0]#1
    [0, -1, 0]#2
    [0, 0, 0]#3
    [0, 1, 0]#4
    [-1, 0, -1]#5
    [0, 0, -1]#6
    [0, 1, -1]#7
    [1, 1, -1]#8
    [1, 0, -1]#9
    [0, -1, -1]#10
    [1, -1, -1]#11
    [-1, -1, -1]#12
    [-1, 0, 0]#13
    [-1, -1, 0]#14
    [-1, 0, -1]#15
    [-1, -1, -1]#16
    [0, -1, 0]#17
    [0, 0, 0]#18
    [1, -1, 0]#17
    [1, 0, 0]#20
    [0, 0, 0]#21
    [1, 0, 0]#22
    [0, 1, 0]#23
    [1, 1, 0]#24
    [1, 0, -1]#25
    [1, 1, -1]#26
    [1, 1, 0]#27
    [1, 0, 0]#28
    [1, -1, 0]#29
    [1, 0, 0]#30
    [1, 0, -1]#31
    [1, -1, -1]#32
    [0, 1, 0]#33
    [1, 1, 0]#34
    [0, 1, -1]#35
    [1, 1, -1]#36
    [0, -1, 0]#37
    [1, -1, 0]#38
    [0, -1, -1]#39
    [1, -1, -1]#40
    [-1, -1, 0]#41
    [0, -1, 0]#42
    [0, -1, -1]#43
    [-1, -1, -1]#44
  ]

  @faces: [
    [0, 1, 2] # back
    [0, 2, 3] # back
    [0, 3, 5]
    [3, 5, 6]
    [3, 4, 6]
    [4, 6, 7]
    [5, 10, 12]
    [5, 6, 10]
    [6, 10, 11]
    [6, 9, 11]
    [7, 6, 9]
    [7, 8, 9]
    [13, 15, 16]#right
    [13, 14, 16]#right
    [17, 18, 19] # back
    [18, 19, 20] # back
    [21, 22, 23] # back
    [22, 23, 24] # back
    [25, 26, 28] #kaire
    [26, 27, 28] #kaire
    [29, 30, 31] #kaire
    [29, 31, 32] #kaire
    [33, 34, 35]#top
    [34, 35, 36]#top
    [37, 38, 39]#bottom
    [38, 39, 40]#bottom
    [41, 42, 43]#bottom
    [41, 43, 44]#bottom
  ]

  @textureCoords: [
    [0, 0.2]#0
    [0, 0]#1
    [0.2, 0]#2
    [0.2, 0.2]#3
    [1, 1]#4
    [1, 1]#5
    [0, 0]#6
    [1, 0]#7
    [0, 0]#8
    [1, 0]#9
    [1, 0]#10
    [0, 0]#11
    [0, 0]#12
    [1, 0.2]#13
    [1.0, 0.0]#14
    [0.8, 0.2]#15
    [0.8, 0.0]#16
    [0.2, 0]#17
    [0.2, 0.2]#18
    [0.4, 0]#19
    [0.4, 0.2]#20
    [0.2, 0.2]#21
    [0.4, 0.2]#22
    [0.2, 0.4]#23
    [0.4, 0.4]#24
    [0.2, 0.2]#25
    [0.2, 0.4]#26
    [0, 0.4]#27
    [0, 0.2]#28
    [0, 0]#29
    [0, 0.2]#30
    [0.2, 0.2]#31
    [0.2, 0]#32
    [0.8, 1.0]#33
    [0.6, 1.0]#34
    [0.8, 0.8]#35
    [0.6, 0.8]#36
    [0.8, 1.0]#37
    [0.6, 1.0]#38
    [0.8, 0.8]#39
    [0.6, 0.8]#40
    [1.0, 1.0]#41
    [0.8, 1.0]#42
    [0.8, 0.8]#43
    [1.0, 0.8]#44
  ]

  @generate: ->
    vertices = new Vertices()
    vertices.fromArray FirstObject.vertices

    faces = new Vertices()
    faces.fromArray FirstObject.faces
    faces.faceColumnsCount();

    object = new ThirdTaskObject "first-object", vertices, GL.gl['TRIANGLES'], faces
    object.computeNormals()
    # object.initialTranslation Axis.TYPES.X, 0, true
    # object.initialTranslation Axis.TYPES.Z, 12, true
    object.initialTranslation Axis.TYPES.X, -15, true

    texture = new Texture 'images/third-task/fibonacci.jpg', Texture.fromArray FirstObject.textureCoords
    object.texture = texture

    object.endMatrix = [-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 5, 0, -3, 1]

    object