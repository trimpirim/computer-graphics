var ForthObject,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ForthObject = (function(superClass) {
  extend(ForthObject, superClass);

  function ForthObject() {
    return ForthObject.__super__.constructor.apply(this, arguments);
  }

  ForthObject.colors = [[0.0, 1.0, 1.0], [0.0, 1.0, 1.0], [0.0, 1.0, 1.0], [0.0, 1.0, 1.0], [0.0, 1.0, 1.0], [0.0, 1.0, 1.0], [0.0, 1.0, 1.0], [0.0, 1.0, 1.0], [0.0, 1.0, 1.0], [0.0, 1.0, 1.0], [0.0, 1.0, 1.0], [0.0, 1.0, 1.0], [0.0, 1.0, 1.0], [0.0, 1.0, 1.0], [0.0, 1.0, 1.0], [0.0, 1.0, 1.0]];

  ForthObject.generate = function() {
    var color, faces, object, vertices;
    vertices = new Vertices();
    vertices.fromArray(FirstObject.vertices);
    faces = new Vertices();
    faces.fromArray(FirstObject.faces);
    object = new StateObject("forth-object", vertices, GL.gl['TRIANGLES'], faces);
    color = new Vertices();
    color.fromArray(ForthObject.colors);
    color = new Object('color', color);
    object.color = color;
    object.ondrag = function(positions) {
      mat4.rotate(this.modelMatrix, this.modelMatrix, MathUtils.toRadians(positions.deltas.x / 5), [0, 1, 0]);
      return mat4.rotate(this.modelMatrix, this.modelMatrix, MathUtils.toRadians(positions.deltas.y / 5), [1, 0, 0]);
    };
    object.ondraw = function() {
      mat4.translate(this.modelMatrix, this.modelMatrix, [4, 0, -1]);
      mat4.rotate(this.modelMatrix, this.modelMatrix, MathUtils.toRadians(180), [0, 1, 0]);
      return mat4.rotate(this.modelMatrix, this.modelMatrix, MathUtils.toRadians(-90), [1, 0, 0]);
    };
    return object;
  };

  return ForthObject;

})(Shape);
