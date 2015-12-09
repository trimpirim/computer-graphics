var Texture;

Texture = (function() {
  function Texture(url1) {
    this.url = url1;
    this.id = Textures.generateID();
    this.texture = GL.gl.createTexture();
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

  return Texture;

})();
