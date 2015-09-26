var Triangle,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Triangle = (function(superClass) {
  extend(Triangle, superClass);

  function Triangle() {
    return Triangle.__super__.constructor.apply(this, arguments);
  }

  Triangle.vertices = [0.0, 1.0, 0.0, -1.0, -1.0, 0.0, 1.0, -1.0, 0.0];

  Triangle.colors = [0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0];

  return Triangle;

})(Shape);
