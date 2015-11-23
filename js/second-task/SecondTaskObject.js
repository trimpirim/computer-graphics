var SecondTaskObject,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SecondTaskObject = (function(superClass) {
  extend(SecondTaskObject, superClass);

  function SecondTaskObject(name, vertices, mode, faces, coordinates, index) {
    this.name = name;
    this.vertices = vertices;
    this.mode = mode;
    this.faces = faces;
    this.coordinates = coordinates;
    this.index = index;
    SecondTaskObject.__super__.constructor.call(this, this.name, this.vertices, this.mode, this.faces, this.coordinates, this.index);
  }

  SecondTaskObject.prototype.onkeydown = function(ev) {
    var interval;
    switch (ev.which) {
      case 16:
        return interval = setInterval((function(_this) {
          return function() {
            if (_this.transformationDone) {
              clearInterval(interval);
            }
            return _this.modelMatrix = _this.increaseMatrixBy(_this.modelMatrix, 0.01);
          };
        })(this), 50);
    }
  };

  SecondTaskObject.prototype.ondrag = function(positions) {

    /*@rotateY positions.deltas.x / 5, false
    @rotateX positions.deltas.y / 5, false
     */
  };

  SecondTaskObject.prototype.initialTranslation = function(which, amount, force) {
    if (force == null) {
      force = false;
    }
    this.translate(which, amount, force);
    return this.translation.original(which, amount);
  };

  return SecondTaskObject;

})(StateObject);
