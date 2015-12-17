var Textures;

Textures = (function() {
  Textures.COUNTER = 0;

  Textures.increase = function() {
    return Textures.COUNTER;
  };

  Textures.generateID = function() {
    var result;
    result = Textures.COUNTER;
    Textures.increase();
    return result;
  };

  function Textures() {}

  Textures.prototype.bindWhite = function(texture) {
    GL.gl.bindTexture(GL.gl.TEXTURE_2D, texture);
    return GL.gl.texImage2D(GL.gl.TEXTURE_2D, 0, GL.gl.RGBA, 1, 1, 0, GL.gl.RGBA, GL.gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 255]));
  };

  Textures.prototype.bindWhiteAndDisable = function(location) {
    this.white = GL.gl.createTexture();
    this.bindWhite(this.white);
    GL.gl.bindTexture(GL.gl.TEXTURE_2D, this.white);
    return GL.gl.disableVertexAttribArray(location);
  };

  Textures.prototype.disableColor = function(location) {
    GL.gl.disableVertexAttribArray(location);
    return GL.gl.vertexAttrib4f(location, 1, 1, 1, 1);
  };

  Textures.prototype.bind = function(texture) {
    GL.gl.activeTexture(GL.gl["TEXTURE" + texture.id]);
    return GL.gl.bindTexture(GL.gl.TEXTURE_2D, texture.get());
  };

  Textures.prototype.handle = function(texture) {
    GL.gl.bindTexture(GL.gl.TEXTURE_2D, texture);
    GL.gl.pixelStorei(GL.gl.UNPACK_FLIP_Y_WEBGL, true);
    GL.gl.texImage2D(GL.gl.TEXTURE_2D, 0, GL.gl.RGBA, GL.gl.RGBA, GL.gl.UNSIGNED_BYTE, texture.image);
    GL.gl.texParameteri(GL.gl.TEXTURE_2D, GL.gl.TEXTURE_MAG_FILTER, GL.gl.LINEAR);
    GL.gl.texParameteri(GL.gl.TEXTURE_2D, GL.gl.TEXTURE_MIN_FILTER, GL.gl.LINEAR_MIPMAP_NEAREST);
    this.filterAndMips(texture.image.width, texture.image.height);
    return GL.gl.bindTexture(GL.gl.TEXTURE_2D, null);
  };

  Textures.prototype.isPowerOf2 = function(value) {
    return (value & (value - 1)) === 0;
  };

  Textures.prototype.filterAndMips = function(width, height) {
    if (this.isPowerOf2(width) && this.isPowerOf2(height)) {
      return GL.gl.generateMipmap(GL.gl.TEXTURE_2D);
    } else {
      GL.gl.texParameteri(GL.gl.TEXTURE_2D, GL.gl.TEXTURE_WRAP_S, GL.gl.CLAMP_TO_EDGE);
      GL.gl.texParameteri(GL.gl.TEXTURE_2D, GL.gl.TEXTURE_WRAP_T, GL.gl.CLAMP_TO_EDGE);
      return GL.gl.texParameteri(GL.gl.TEXTURE_2D, GL.gl.TEXTURE_MIN_FILTER, GL.gl.LINEAR);
    }
  };

  return Textures;

})();
