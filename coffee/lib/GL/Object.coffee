class SimpleObject
  @fromCSG: (csg, name, mode) ->
    indexer = new Indexer()
    faces = new Vertices()
    csg.toPolygons().map (polygon) =>
      indices = polygon.vertices.map (vertex) =>
        vertex.color = polygon.shared || [1, 1, 1]
        return indexer.add vertex
      for i in [2..indices.length - 1] by 1
        faces.add [indices[0], indices[i - 1], indices[i]]

    vertices = new Vertices()
    vertices.fromArray indexer.unique.map (v) -> 
      [v.pos.x, v.pos.y, v.pos.z]

    vColor = new Vertices()
    colors = indexer.unique.map (v) ->
      v.color

    vColor.fromArray colors

    color = new SimpleObject 'color', vColor

    obj = new SimpleObject name, vertices, mode, faces
    obj.color = color
    obj


  constructor: (@name, @vertices, @mode, @faces, @coordinates, @index) ->
    @buffers = new Buffers()
    @color = null
    @modelMatrix = mat4.create()
    mat4.identity @modelMatrix
    @ondrag = null
    @onkeydown = null

  getVertices: () ->
    @vertices

  getName: () ->
    @name

  addBuffer: (name, buffer) ->
    @buffers.add name, buffer

  compileBuffers: () ->
    @buffers.compile()

  draw: () ->
    if @buffers.indexExist
      GL.gl.drawElements @mode, @faces.toArray().length, GL.gl['UNSIGNED_SHORT'], 0
    else 
      GL.gl.drawArrays @mode, 0, @vertices.getRowsCount()

  createColor: (color = null) ->
    if @vertices?
      j = @vertices.getRowsCount()
      vertices = new Vertices()

      for x in [0..j] by 4
        
        rand = null
        vertex = null
        for i in [0..4] by 1
          vertex = new Vertex4()
          for z in [0..3] by 1
            vertex.loadCoordinate color
          ###if !rand?
            vertex = new Vertex4()
            for z in [0..3] by 1
              rand = Math.floor(Math.random() * 2)
              vertex.loadCoordinate rand###

          vertices.add vertex


      color = new SimpleObject 'color', vertices

      @color = color

  clone: (obj) ->
    if !obj?
      obj = @

    copy = new SimpleObject()
    for key, value of obj
      if obj.hasOwnProperty(key)
        copy[key] = obj[key]

    return copy

  animate: (interval, callback) ->
    savedInterval = setInterval ->
      callback(savedInterval) if callback?
    , interval


