class CubeObject extends Shape
  @vertices: [
    [-1.0, -1.0,  1.0]
    [1.0, -1.0,  1.0]
    [1.0,  1.0,  1.0]
    [-1.0,  1.0,  1.0]
    [-1.0, -1.0, -1.0]
    [-1.0,  1.0, -1.0]
    [1.0,  1.0, -1.0]
    [1.0, -1.0, -1.0]
    [-1.0,  1.0, -1.0]
    [-1.0,  1.0,  1.0]
    [1.0,  1.0,  1.0]
    [1.0,  1.0, -1.0]
    [-1.0, -1.0, -1.0]
    [1.0, -1.0, -1.0]
    [1.0, -1.0,  1.0]
    [-1.0, -1.0,  1.0]
    [1.0, -1.0, -1.0]
    [1.0,  1.0, -1.0]
    [1.0,  1.0,  1.0]
    [1.0, -1.0,  1.0]
    [-1.0, -1.0, -1.0]
    [-1.0, -1.0,  1.0]
    [-1.0,  1.0,  1.0]
    [-1.0,  1.0, -1.0]
  ]

  @faces: [
    [0,  1,  2]
    [0,  2,  3]
    [4,  5,  6]
    [4,  6,  7]
    [8,  9,  10]
    [8,  10, 11]
    [12, 13, 14]
    [12, 14, 15]
    [16, 17, 18]
    [16, 18, 19]
    [20, 21, 22]
    [20, 22, 23]
  ]

  @textureCoords: [
    [0.0,  0.0]
    [1.0,  0.0]
    [1.0,  1.0]
    [0.0,  1.0]
    [0.0,  0.0]
    [1.0,  0.0]
    [1.0,  1.0]
    [0.0,  1.0]
    [0.0,  0.0]
    [1.0,  0.0]
    [1.0,  1.0]
    [0.0,  1.0]
    [0.0,  0.0]
    [1.0,  0.0]
    [1.0,  1.0]
    [0.0,  1.0]
    [0.0,  0.0]
    [1.0,  0.0]
    [1.0,  1.0]
    [0.0,  1.0]
    [0.0,  0.0]
    [1.0,  0.0]
    [1.0,  1.0]
    [0.0,  1.0]
  ]

  @normals: [
    [0.0,  0.0,  1.0]
    [0.0,  0.0,  1.0]
    [0.0,  0.0,  1.0]
    [0.0,  0.0,  1.0]
    [0.0,  0.0, -1.0]
    [0.0,  0.0, -1.0]
    [0.0,  0.0, -1.0]
    [0.0,  0.0, -1.0]
    [0.0,  1.0,  0.0]
    [0.0,  1.0,  0.0]
    [0.0,  1.0,  0.0]
    [0.0,  1.0,  0.0]
    [0.0, -1.0,  0.0]
    [0.0, -1.0,  0.0]
    [0.0, -1.0,  0.0]
    [0.0, -1.0,  0.0]
    [1.0,  0.0,  0.0]
    [1.0,  0.0,  0.0]
    [1.0,  0.0,  0.0]
    [1.0,  0.0,  0.0]
    [-1.0,  0.0,  0.0]
    [-1.0,  0.0,  0.0]
    [-1.0,  0.0,  0.0]
    [-1.0,  0.0,  0.0]
  ]

  @generate: ->
    vertices = new Vertices()
    vertices.fromArray CubeObject.vertices

    faces = new Vertices()
    faces.fromArray CubeObject.faces

    normals = new Vertices()
    normals.fromArray CubeObject.normals
    normals = new SimpleObject 'normals', normals

    object = new ThirdTaskObject "seventh-object", vertices, GL.gl['TRIANGLES'], faces
    object.normals = normals
    object.initialTranslation Axis.TYPES.X, 0, true
    # object.initialTranslation Axis.TYPES.X, 0, true
    # object.initialTranslation Axis.TYPES.Z, 12, true
    object.endMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 5, 0, -2, 1]

    textureCoords = new Vertices()
    textureCoords.fromTextureArray CubeObject.textureCoords
    
    texture = new Texture 'images/third-task/crate.gif'
    texture.vertices = textureCoords
    object.texture = texture
    
    object