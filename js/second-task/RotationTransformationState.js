var RotationTransformationState,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RotationTransformationState = (function(superClass) {
  extend(RotationTransformationState, superClass);

  function RotationTransformationState(angle, x, y, z) {
    if (angle == null) {
      angle = 0;
    }
    if (x == null) {
      x = 0;
    }
    if (y == null) {
      y = 0;
    }
    if (z == null) {
      z = 0;
    }
    this.current = {
      angle: angle,
      x: x,
      y: y,
      z: z
    };
  }

  return RotationTransformationState;

})(TransformationState);
