class SecondObject extends Shape
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
    [1, 0, 0]#20
    [1, 1, 0]#21
    [1, 1, -1]#22
    [1, 0, -1]#23
    [-1, -1, 0]#24
    [0, -1, 0]#25
    [0, -1, -1]#26
    [-1, -1, -1]#27
    [1, -1, 0]#28
    [1, 0, 0]#29 
    [1, 0, -1]#30
    [1, -1, -1]#31
    [-1, -1, 0]#32
    [-1, -1, -1]#33
    [-2, -1, 0]#34
    [-2, -1, -1]#35
    [-2, 0, 0]#36
    [-2, -1, 0]#37
    [-2, 0, -1]#38
    [-2, -1, -1]#39
    [-1, 0, -1]#8 40
    [-1, -1, -1]#15 41
    [-2, 0, -1]#18 42
    [-2, -1, -1]#19 43
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
    [20, 21, 22]#right
    [20, 22, 23]#right
    [10, 9, 12]
    [10, 11, 12]
    [2, 4, 13]
    [4, 13, 14]
    [24, 25, 26]
    [24, 26, 27]
    [8, 13, 15]
    [8, 9, 13]
    [9, 13, 14]
    [9, 12, 14]
    [28, 29, 30]#right
    [28, 30, 31]#right
    [0, 1, 16]
    [1, 16, 17]
    [0, 8, 16]
    [8, 16, 18]
    [40, 41, 42] #back
    [41, 42, 43] #back
    [32, 33, 35]
    [32, 34, 35]
    [36, 38, 39] #left
    [36, 37, 39] #left
  ]

  @normals: [
    [0, 0]#0
    [1, 1]#1
    [0, 0]#2
    [0, 1]#3
    [1, 0]#4
    [1, 1]#5
    [0, 0]#6
    [1, 0]#7
    [0, 1]#8
    [0, 0]#9
    [0, 1]#10
    [1, 1]#11
    [1, 0]#12
    [0, -1]#13
    [1, -1]#14
    [0, 0]#15
    [1, 0]#16
    [0, 1]#17
    [1, 1]#18
    [1, 0]#19
    [0.2, 0.2]#20
    [0.2, 0.4]#21
    [0.4, 0.4]#23
    [0.4, 0.2]#22
    [1, 1]#24
    [0, 1]#25
    [0, 0]#26
    [1, 0]#27
    [0.2, 0]#28
    [0.2, 0.2]#29
    [0.4, 0.2]#31
    [0.4, 0]#30
    [0, 1]#32
    [0, 0]#33
    [1, 1]#34
    [1, 0]#35
    [0.8, 0.2]#39
    [0.8, 0]#37
    [0.6, 0.2]#38
    [0.6, 0]#36
    [0.8, 0.2]#41
    [0.8, 0]#40
    [1.0, 0.2]#42
    [1.0, 0]#43
  ]

  @generate: ->
    vertices = new Vertices()
    vertices.fromArray SecondObject.vertices

    faces = new Vertices()
    faces.fromArray SecondObject.faces
    faces.columnsCount = 1

    object = new ThirdTaskObject "second-object", vertices, GL.gl['TRIANGLES'], faces
    object.initialTranslation Axis.TYPES.X, -10, true
    # object.initialTranslation Axis.TYPES.X, 0, true
    # object.initialTranslation Axis.TYPES.Z, 12, true

    normals = new Vertices()
    normals.fromNormalsArray SecondObject.normals
    normals = new SimpleObject 'normals', normals
    object.normals = normals
    
    texture = new Texture 'images/third-task/fibonacci.jpg'
    object.texture = texture
    
    object.endMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 3, 0, 1, 1]

    object