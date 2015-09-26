var Fractal,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Fractal = (function(superClass) {
  extend(Fractal, superClass);

  function Fractal() {
    return Fractal.__super__.constructor.apply(this, arguments);
  }

  Fractal.vertices = [[0, 0, 0], [0.75, 0, 0], [0, -0.75, 0], [1, -1, 0]];

  Fractal.faces = [[0, 1, 2], [1, 2, 3]];

  Fractal.colors = [[0.0, 1.0, 0.0], [0.0, 1.0, 0.0], [0.0, 1.0, 0.0], [0.0, 1.0, 0.0]];

  return Fractal;

})(Shape);
