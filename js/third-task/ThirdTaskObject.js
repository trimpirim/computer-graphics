var ThirdTaskObject,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ThirdTaskObject = (function(superClass) {
  extend(ThirdTaskObject, superClass);

  function ThirdTaskObject(name, vertices, mode, faces, coordinates, index) {
    this.name = name;
    this.vertices = vertices;
    this.mode = mode;
    this.faces = faces;
    this.coordinates = coordinates;
    this.index = index;
    ThirdTaskObject.__super__.constructor.call(this, this.name, this.vertices, this.mode, this.faces, this.coordinates, this.index);
    this.previousTime = 0;
  }

  ThirdTaskObject.prototype.onkeydown = function(ev) {
    switch (ev.which) {
      case 16:
        return this.ondraw = function() {
          var now;
          now = (new Date().getTime() / 1000) % 60;
          if (now !== this.previousTime && !this.transformationDone) {
            this.previousTime = now;
            return this.modelMatrix = this.increaseMatrixBy(this.modelMatrix, 0.03);
          }
        };
      case 83:
        return this.texture.fromURL('images/third-task/bricks.png');
    }
  };

  ThirdTaskObject.prototype.ondrag = function(positions) {};

  ThirdTaskObject.prototype.initialTranslation = function(which, amount, force) {
    if (force == null) {
      force = false;
    }
    this.translate(which, amount, force);
    return this.translation.original(which, amount);
  };

  return ThirdTaskObject;

})(StateObject);
