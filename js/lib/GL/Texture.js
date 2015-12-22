var Texture;

Texture = (function() {
  Texture.from1DArray = function(coordinates) {
    var coordinate, i, len, vertex, vertices;
    vertices = new Vertices();
    vertices.columnsCount = 2;
    vertex = new Vertex2;
    for (i = 0, len = coordinates.length; i < len; i++) {
      coordinate = coordinates[i];
      if (vertex.isFull()) {
        vertices.coords.push(vertex);
        vertex = new Vertex();
      }
      vertex.loadCoordinate(coordinate);
    }
    vertices.coords.push(vertex);
    return vertices;
  };

  Texture.fromArray = function(coordinates) {
    var coordinate, i, len, vertex, vertices;
    vertices = new Vertices();
    vertices.columnsCount = 2;
    for (i = 0, len = coordinates.length; i < len; i++) {
      coordinate = coordinates[i];
      vertex = new Vertex2();
      vertex.fromArray(coordinate);
      vertices.coords.push(vertex);
    }
    return vertices;
  };

  function Texture(url1, vertices1, sampler) {
    this.url = url1;
    this.vertices = vertices1 != null ? vertices1 : new Vertices();
    this.sampler = sampler != null ? sampler : null;
    this.id = 0;
    this.texture = GL.gl.createTexture();
    this.buffers = new Buffers();
  }

  Texture.prototype.fromURL = function(url) {
    GL.textures.bindWhite(this.texture);
    this.texture.image = new Image();
    this.texture.image.onload = (function(_this) {
      return function() {
        return GL.textures.handle(_this.texture);
      };
    })(this);
    return this.texture.image.src = url;
  };

  Texture.prototype.get = function() {
    return this.texture;
  };

  Texture.prototype.load = function() {
    return this.fromURL(this.url);
  };

  Texture.prototype.compileBuffers = function() {
    return this.buffers.compile();
  };

  return Texture;

})();
