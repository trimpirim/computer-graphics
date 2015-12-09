var SimpleObject;

SimpleObject = (function() {
  SimpleObject.fromCSG = function(csg, name, mode) {
    var color, colors, faces, indexer, obj, vColor, vertices;
    indexer = new Indexer();
    faces = new Vertices();
    csg.toPolygons().map((function(_this) {
      return function(polygon) {
        var i, indices, k, ref, results;
        indices = polygon.vertices.map(function(vertex) {
          vertex.color = polygon.shared || [1, 1, 1];
          return indexer.add(vertex);
        });
        results = [];
        for (i = k = 2, ref = indices.length - 1; k <= ref; i = k += 1) {
          results.push(faces.add([indices[0], indices[i - 1], indices[i]]));
        }
        return results;
      };
    })(this));
    vertices = new Vertices();
    vertices.fromArray(indexer.unique.map(function(v) {
      return [v.pos.x, v.pos.y, v.pos.z];
    }));
    vColor = new Vertices();
    colors = indexer.unique.map(function(v) {
      return v.color;
    });
    vColor.fromArray(colors);
    color = new SimpleObject('color', vColor);
    obj = new SimpleObject(name, vertices, mode, faces);
    obj.color = color;
    return obj;
  };

  function SimpleObject(name1, vertices1, mode1, faces1, coordinates, index) {
    this.name = name1;
    this.vertices = vertices1;
    this.mode = mode1;
    this.faces = faces1;
    this.coordinates = coordinates;
    this.index = index;
    this.buffers = new Buffers();
    this.color = null;
    this.normals = null;
    this.modelMatrix = mat4.create();
    mat4.identity(this.modelMatrix);
    this.texture = null;
  }

  SimpleObject.prototype.getVertices = function() {
    return this.vertices;
  };

  SimpleObject.prototype.getName = function() {
    return this.name;
  };

  SimpleObject.prototype.addBuffer = function(name, buffer) {
    return this.buffers.add(name, buffer);
  };

  SimpleObject.prototype.compileBuffers = function() {
    return this.buffers.compile();
  };

  SimpleObject.prototype.draw = function() {
    if (this.buffers.indexExist) {
      return GL.gl.drawElements(this.mode, this.faces.toArray().length, GL.gl['UNSIGNED_SHORT'], 0);
    } else {
      return GL.gl.drawArrays(this.mode, 0, this.vertices.getRowsCount());
    }
  };

  SimpleObject.prototype.createColor = function(color) {
    var i, j, k, l, m, rand, ref, vertex, vertices, x, z;
    if (color == null) {
      color = null;
    }
    if (this.vertices != null) {
      j = this.vertices.getRowsCount();
      vertices = new Vertices();
      for (x = k = 0, ref = j; k <= ref; x = k += 4) {
        rand = null;
        vertex = null;
        for (i = l = 0; l <= 4; i = l += 1) {
          vertex = new Vertex4();
          for (z = m = 0; m <= 3; z = m += 1) {
            vertex.loadCoordinate(color);
          }

          /*if !rand?
            vertex = new Vertex4()
            for z in [0..3] by 1
              rand = Math.floor(Math.random() * 2)
              vertex.loadCoordinate rand
           */
          vertices.add(vertex);
        }
      }
      color = new SimpleObject('color', vertices);
      return this.color = color;
    }
  };

  SimpleObject.prototype.clone = function(obj) {
    var copy, key, value;
    if (obj == null) {
      obj = this;
    }
    copy = new SimpleObject();
    for (key in obj) {
      value = obj[key];
      if (obj.hasOwnProperty(key)) {
        copy[key] = obj[key];
      }
    }
    return copy;
  };

  SimpleObject.prototype.animate = function(interval, callback) {
    var savedInterval;
    return savedInterval = setInterval(function() {
      if (callback != null) {
        return callback(savedInterval);
      }
    }, interval);
  };

  return SimpleObject;

})();
