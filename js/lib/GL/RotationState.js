var RotationState,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RotationState = (function(superClass) {
  extend(RotationState, superClass);

  function RotationState(x, y, z) {
    this.x = x != null ? x : 0;
    this.y = y != null ? y : 0;
    this.z = z != null ? z : 0;
    RotationState.__super__.constructor.call(this, this.x, this.y, this.z);
  }

  return RotationState;

})(Vertex);
