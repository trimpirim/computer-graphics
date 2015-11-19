var ScaleTransformationState,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ScaleTransformationState = (function(superClass) {
  extend(ScaleTransformationState, superClass);

  function ScaleTransformationState(x, y, z) {
    if (x == null) {
      x = 0;
    }
    if (y == null) {
      y = 0;
    }
    if (z == null) {
      z = 0;
    }
    ScaleTransformationState.__super__.constructor.call(this, x, y, z);
  }

  return ScaleTransformationState;

})(TransformationState);
