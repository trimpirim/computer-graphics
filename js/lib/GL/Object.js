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
    this.vertices = vertices1 != null ? vertices1 : new Vertices();
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

  SimpleObject.prototype.addBuffers = function() {
    this.buffers.addVertex('vertices', this.vertices.toArray());
    if (this.color != null) {
      this.color.buffers.addVertex('vertices', this.color.vertices.toArray());
    }
    if (this.normals != null) {
      this.normals.buffers.addVertex('vertices', this.normals.vertices.toArray());
    }
    if (this.texture != null) {
      this.texture.buffers.addVertex('vertices', this.texture.vertices.toArray());
    }
    if (this.faces != null) {
      return this.buffers.addIndex('indices', this.faces.toArray());
    }
  };

  SimpleObject.prototype.compileBuffers = function() {
    this.buffers.compile();
    if (this.color != null) {
      this.color.compileBuffers();
    }
    if (this.normals != null) {
      this.normals.compileBuffers();
    }
    if (this.texture != null) {
      return this.texture.compileBuffers();
    }
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

  SimpleObject.prototype.computeNormals = function() {
    var a, b, c, f, k, key, l, len, len1, len2, m, normal, normals, ref, ref1, ref2, vertice;
    this.normals = new SimpleObject('normals');
    normals = [];
    ref = this.vertices.coords;
    for (key = k = 0, len = ref.length; k < len; key = ++k) {
      vertice = ref[key];
      normals[key] = new Vector();
    }
    ref1 = this.faces.coords;
    for (key = l = 0, len1 = ref1.length; l < len1; key = ++l) {
      f = ref1[key];
      a = Vector.fromArray(this.vertices.coords[f.x].toArray());
      b = Vector.fromArray(this.vertices.coords[f.y].toArray());
      c = Vector.fromArray(this.vertices.coords[f.z].toArray());
      normal = b.subtract(a).cross(c.subtract(a)).unit();
      normals[f.x] = normals[f.x].add(normal);
      normals[f.y] = normals[f.y].add(normal);
      normals[f.z] = normals[f.z].add(normal);
    }
    ref2 = this.vertices.coords;
    for (key = m = 0, len2 = ref2.length; m < len2; key = ++m) {
      vertice = ref2[key];
      normals[key] = normals[key].unit().toArray();
    }
    return this.normals.vertices.fromArray(normals);
  };

  return SimpleObject;

})();
