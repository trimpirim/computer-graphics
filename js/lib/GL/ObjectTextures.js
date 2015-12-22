var ObjectTextures,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ObjectTextures = (function(superClass) {
  extend(ObjectTextures, superClass);

  function ObjectTextures() {
    ObjectTextures.__super__.constructor.call(this);
  }

  ObjectTextures.prototype.addBuffers = function() {
    if (this.length > 0) {
      return this.loopAll(function(texture) {
        return texture.buffers.addVertex('vertices', texture.vertices.toArray());
      });
    }
  };

  ObjectTextures.prototype.compileBuffers = function() {
    if (this.length > 0) {
      return this.loopAll(function(texture) {
        return texture.compileBuffers();
      });
    }
  };

  ObjectTextures.prototype.load = function() {
    if (this.length > 0) {
      return this.loopAll(function(texture) {
        return texture.load();
      });
    }
  };

  return ObjectTextures;

})(ListObject);
