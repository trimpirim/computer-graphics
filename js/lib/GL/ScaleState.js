var ScaleState,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ScaleState = (function(superClass) {
  extend(ScaleState, superClass);

  function ScaleState(x, y, z) {
    this.x = x != null ? x : 1;
    this.y = y != null ? y : 1;
    this.z = z != null ? z : 1;
    ScaleState.__super__.constructor.call(this, this.x, this.y, this.z);
  }

  return ScaleState;

})(Vertex);
