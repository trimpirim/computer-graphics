var Vertices,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Vertices = (function() {
  Vertices.fromArray = function(coordinates, callback) {
    var coordinate, coords, i, len, vertex;
    coords = [];
    for (i = 0, len = coordinates.length; i < len; i++) {
      coordinate = coordinates[i];
      if (callback != null) {
        coordinate = callback(coordinate);
      }
      vertex = new Vertex();
      vertex.fromArray(coordinate);
      coords.push(vertex);
    }
    return coords;
  };

  Vertices.from1DArray = function(coordinates) {
    var coordinate, i, len, vertex;
    vertex = new Vertex;
    for (i = 0, len = coordinates.length; i < len; i++) {
      coordinate = coordinates[i];
      if (vertex.isFull()) {
        coords.push(vertex);
        vertex = new Vertex();
      }
      vertex.loadCoordinate(coordinate);
    }
    return coords.push(vertex);
  };

  function Vertices() {
    this.toArray = bind(this.toArray, this);
    this.coords = [];
    this.columnsCount = 3;
    this;
  }

  Vertices.prototype.faceColumnsCount = function() {
    return this.columnsCount = 1;
  };

  Vertices.prototype.fromArray = function(coordinates, callback) {
    this.coords = Vertices.fromArray(coordinates, callback);
    this.columnsCount = 3;
    return this;
  };

  Vertices.prototype.fromColorArray = function(coordinates) {
    var coordinate, i, len, vertex;
    for (i = 0, len = coordinates.length; i < len; i++) {
      coordinate = coordinates[i];
      vertex = new Vertex4();
      vertex.fromArray(coordinate);
      this.coords.push(vertex);
    }
    return this.columnsCount = 4;
  };

  Vertices.prototype.fromTextureArray = function(coordinates) {
    var coordinate, i, len, vertex;
    for (i = 0, len = coordinates.length; i < len; i++) {
      coordinate = coordinates[i];
      vertex = new Vertex2();
      vertex.fromArray(coordinate);
      this.coords.push(vertex);
    }
    return this.columnsCount = 2;
  };

  Vertices.prototype.toArray = function() {
    var i, len, ref, result, vertex;
    result = [];
    ref = this.coords;
    for (i = 0, len = ref.length; i < len; i++) {
      vertex = ref[i];
      vertex.loopAll((function(_this) {
        return function(item) {
          return result.push(item);
        };
      })(this));
    }
    return result;
  };

  Vertices.prototype.from1DArray = function(coordinates) {
    return this.coords = Vertices.from1DArray(coordinates);
  };

  Vertices.prototype.getColumnsCount = function() {
    return this.columnsCount;
  };

  Vertices.prototype.getRowsCount = function() {
    return this.coords.length;
  };

  Vertices.prototype.add = function(vertex) {
    var _v;
    if (vertex instanceof Array) {
      _v = new Vertex();
      _v.fromArray(vertex);
      vertex = _v;
    }
    return this.coords.push(vertex);
  };

  Vertices.prototype.getElementsCount = function() {
    return this.coords.toArray().length;
  };

  return Vertices;

})();
