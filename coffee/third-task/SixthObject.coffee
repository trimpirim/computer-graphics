class SixthObject extends Shape
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
    [-1, 0, -1]#20
    [0, 0, -1]#21
    [-1, 1, -1]#22
    [0, 1, -1]#23
    [-1, 0, -1]#24
    [0, 0, -1]#25
    [-1, 1, -1]#26
    [0, 1, -1]#27
    [-1, 1, 0]#8 28
    [-1, 0, 0]#15 29
    [-1, 0, -1]#20 30
    [-1, 1, -1]#22 31
    [1, 0, 1]#4 32
    [1, 1, 1]#5 33
    [1, 1, 0]#12 34
    [1, 0, 0]#14 35
    [1, 0, 1]#4 36
    [1, 0, 0]#14 37
    [1, -1, 1]#16 38
    [1, -1, 0]#19 39
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
    [9, 13, 14]
    [9, 12, 14]
    [0, 8, 15]
    [0, 1, 15]
    [32, 33, 34]#right
    [32, 34, 35]#right
    [3, 5, 9]
    [5, 9, 12]
    [2, 4, 16]
    [2, 16, 17]
    [2, 13, 17]
    [13, 17, 18]
    [36, 37, 38]#right
    [37, 38, 39]#right
    [13, 14, 18]
    [14, 18, 19]
    [16, 17, 18]
    [16, 18, 19]
    [13, 15, 20]
    [13, 20, 21]
    [28, 29, 30] #kaire
    [28, 30, 31] #kaire
    [13, 21, 23]
    [9, 13, 23]
    [8, 9, 23]
    [8, 22, 23]
    [24, 26, 27] #back
    [24, 25, 27] #back
  ]

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
    [-1, 0]#20
    [0, 0]#21
    [-1, 1]#22
    [0, 1]#23
    [0.6, 0.2]#24
    [0.4, 0.2]#25
    [0.6, 0.4]#26
    [0.4, 0.4]#27
    [0.4, 0.4]#28
    [0.4, 0.2]#29
    [0.2, 0.2]#30
    [0.2, 0.4]#31
    [0.4, 0.2]#32
    [0.4, 0.4]#33
    [0.6, 0.4]#35
    [0.6, 0.2]#34
    [0.4, 0.2]#37
    [0.6, 0.2]#39
    [0.4, 0.0]#36
    [0.6, 0.0]#38
  ]

  @generate: ->
    vertices = new Vertices()
    vertices.fromArray SixthObject.vertices

    faces = new Vertices()
    faces.fromArray SixthObject.faces

    object = new ThirdTaskObject "sixth-object", vertices, GL.gl['TRIANGLES'], faces
    object.initialTranslation Axis.TYPES.X, 10, true
    # object.initialTranslation Axis.TYPES.X, 0, true
    # object.initialTranslation Axis.TYPES.Z, 12, true
    object.endMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 4, 0, -1, 1]
    
    normals = new Vertices()
    normals.fromNormalsArray SixthObject.normals
    normals = new SimpleObject 'normals', normals
    object.normals = normals
    
    texture = new Texture 'images/third-task/fibonacci.jpg'
    object.texture = texture

    object