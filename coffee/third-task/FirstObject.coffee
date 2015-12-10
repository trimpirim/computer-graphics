class FirstObject extends Shape
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
    [1, 1, -1]#16
    [1, 1, 0]#17
    [1, 0, 0]#18
    [-1, 0, 0]#19
    [-1, -1, 0]#20
    [-1, 0, -1]#21
    [-1, -1, -1]#22
    [1, -1, -1]#23
    [0, -1, 0]#24
    [0, 0, 0]#25
    [1, -1, 0]#26
    [1, 0, 0]#27
    [0, 0, 0]#3 28
    [1, 0, 0]#5 29
    [0, 1, 0]#6 30
    [1, 1, 0]#7 31
    [1, 0, -1]#12 32
    [1, 1, -1]#16 33
    [1, 1, 0]#17 34
    [1, 0, 0]#18 35
    [1, -1, 0]#4 36
    [1, 0, 0]#5 37
    [1, 0, -1]#12 38
    [1, -1, -1]#23 39
  ]

  @faces: [
    [0, 1, 2] # back
    [0, 2, 3] # back
    [24, 25, 26] # back
    [25, 26, 27] # back
    [28, 29, 30] # back
    [29, 30, 31] # back
    [0, 3, 8]
    [3, 8, 9]
    [3, 6, 9]
    [6, 9, 10]
    [6, 7, 10]
    [7, 10, 11]
    [33, 34, 35] #kaire
    [32, 33, 35] #kaire
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
    [19, 21, 22]#right
    [19, 20, 22]#right
    [36, 37, 38] #kaire
    [36, 38, 39] #kaire
  ]

  @normals: [
    [0, 0.2]#0
    [0, 0]#1
    [0.2, 0]#2
    [0.2, 0.2]#3
    [1, 0]#4
    [1, 1]#5
    [1, 1]#6
    [0, 1]#7
    [1, 1]#8
    [0, 0]#9
    [1, 0]#10
    [0, 0]#11
    [1, 0]#12
    [1, 0]#13
    [0, 0]#14
    [0, 0]#15
    [1, 1]#16
    [0, 1]#17
    [0, 0]#18
    [1, 0.2]#22
    [1.0, 0.0]#21
    [0.8, 0.2]#20
    [0.8, 0.0]#19
    [1, 1]#23
    [0.2, 0]#24
    [0.2, 0.2]#25
    [0.4, 0]#26
    [0.4, 0.2]#27
    [0.2, 0.2]#28
    [0.4, 0.2]#29
    [0.2, 0.4]#30
    [0.4, 0.4]#31
    [0.2, 0.2]#35
    [0.2, 0.4]#34
    [0, 0.4]#33
    [0, 0.2]#32
    [0, 0]#36
    [0, 0.2]#37
    [0.2, 0.2]#38
    [0.2, 0]#39
  ]

  @generate: ->
    vertices = new Vertices()
    vertices.fromArray FirstObject.vertices

    faces = new Vertices()
    faces.fromArray FirstObject.faces
    faces.faceColumnsCount();

    object = new ThirdTaskObject "first-object", vertices, GL.gl['TRIANGLES'], faces
    # object.initialTranslation Axis.TYPES.X, 0, true
    # object.initialTranslation Axis.TYPES.Z, 12, true
    object.initialTranslation Axis.TYPES.X, -15, true

    normals = new Vertices()
    normals.fromNormalsArray FirstObject.normals
    normals = new SimpleObject 'normals', normals
    object.normals = normals
    
    texture = new Texture 'images/third-task/fibonacci.jpg'
    object.texture = texture

    ###color = new SimpleObject 'color', color
    object.color = color###

    object.endMatrix = [-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 5, 0, -3, 1]

    object