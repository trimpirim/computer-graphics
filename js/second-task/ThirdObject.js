var ThirdObject,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ThirdObject = (function(superClass) {
  extend(ThirdObject, superClass);

  function ThirdObject() {
    return ThirdObject.__super__.constructor.apply(this, arguments);
  }

  ThirdObject.vertices = [[-1, 0, 0], [-1, -1, 0], [0, -1, 0], [0, 0, 0], [1, -1, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [-1, 0, -1], [0, 0, -1], [0, 1, -1], [1, 1, -1], [1, 0, -1], [0, -1, -1], [1, -1, -1], [-1, -1, -1], [-2, 0, 0], [-2, -1, 0], [-2, 0, -1], [-2, -1, -1], [-1, 1, 0], [-1, 1, -1]];

  ThirdObject.faces = [[0, 1, 2], [0, 2, 3], [2, 3, 4], [3, 4, 5], [3, 5, 9], [5, 9, 12], [2, 4, 13], [4, 13, 14], [1, 2, 13], [1, 13, 15], [8, 13, 15], [8, 9, 13], [9, 13, 14], [9, 12, 14], [4, 5, 12], [4, 12, 14], [0, 1, 16], [1, 16, 17], [0, 8, 16], [8, 16, 18], [8, 15, 18], [15, 18, 19], [1, 15, 19], [1, 17, 19], [16, 18, 19], [16, 17, 19], [0, 3, 6], [3, 6, 9], [6, 10, 9], [0, 6, 20], [0, 8, 20], [8, 20, 21], [8, 9, 21], [9, 10, 21], [6, 10, 20], [10, 20, 21]];

  ThirdObject.colors = [[0.5, 0.0, 0.5], [0.5, 0.0, 0.5], [0.5, 0.0, 0.5], [0.5, 0.0, 0.5], [0.5, 0.0, 0.5], [0.5, 0.0, 0.5], [0.5, 0.0, 0.5], [0.5, 0.0, 0.5], [0.5, 0.0, 0.5], [0.5, 0.0, 0.5], [0.5, 0.0, 0.5], [0.5, 0.0, 0.5], [0.5, 0.0, 0.5], [0.5, 0.0, 0.5], [0.5, 0.0, 0.5], [0.5, 0.0, 0.5], [0.5, 0.0, 0.5], [0.5, 0.0, 0.5], [0.5, 0.0, 0.5], [0.5, 0.0, 0.5], [0.5, 0.0, 0.5], [0.5, 0.0, 0.5]];

  ThirdObject.generate = function() {
    var color, faces, object, vertices;
    vertices = new Vertices();
    vertices.fromArray(ThirdObject.vertices);
    faces = new Vertices();
    faces.fromArray(ThirdObject.faces);
    object = new StateObject("third-object", vertices, GL.gl['TRIANGLES'], faces);
    color = new Vertices();
    color.fromArray(ThirdObject.colors);
    color = new SimpleObject('color', color);
    object.color = color;
    object.ondrag = function(positions) {
      mat4.rotate(this.modelMatrix, this.modelMatrix, MathUtils.toRadians(positions.deltas.x / 5), [0, 1, 0]);
      return mat4.rotate(this.modelMatrix, this.modelMatrix, MathUtils.toRadians(positions.deltas.y / 5), [1, 0, 0]);
    };
    object.onkeydown = function(ev) {
      switch (ev.which) {
        case 70:
          mat4.translate(this.modelMatrix, this.modelMatrix, [8, 1, 0]);
          return mat4.rotate(this.modelMatrix, this.modelMatrix, MathUtils.toRadians(90), [0, 1, 0]);
      }
    };
    object.ondraw = function() {
      return mat4.translate(this.modelMatrix, this.modelMatrix, [-5, 0, 0]);
    };
    return object;
  };

  return ThirdObject;

})(Shape);
