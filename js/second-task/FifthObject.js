var FifthObject,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

FifthObject = (function(superClass) {
  extend(FifthObject, superClass);

  function FifthObject() {
    return FifthObject.__super__.constructor.apply(this, arguments);
  }

  FifthObject.vertices = [[-1, 0, 0], [-1, -1, 0], [0, -1, 0], [0, 0, 0], [1, -1, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [-1, 0, -1], [0, 0, -1], [0, 1, -1], [1, 1, -1], [1, 0, -1], [0, -1, -1], [1, -1, -1], [-1, -1, -1], [0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]];

  FifthObject.faces = [[0, 1, 2], [0, 2, 3], [2, 3, 4], [3, 4, 5], [0, 3, 8], [3, 8, 9], [3, 6, 9], [6, 9, 10], [6, 7, 10], [7, 10, 11], [5, 7, 11], [5, 11, 12], [10, 9, 12], [10, 11, 12], [2, 4, 13], [4, 13, 14], [1, 2, 13], [1, 13, 15], [8, 13, 15], [8, 9, 13], [9, 13, 14], [9, 12, 14], [0, 8, 15], [0, 1, 15], [4, 5, 12], [4, 12, 14], [3, 5, 16], [5, 16, 17], [5, 7, 17], [7, 17, 18], [6, 7, 18], [6, 18, 19], [3, 6, 19], [3, 16, 19], [16, 18, 19], [16, 17, 18]];

  FifthObject.colors = [[1.0, 1.0, 1.0], [1.0, 1.0, 1.0], [1.0, 1.0, 1.0], [1.0, 1.0, 1.0], [1.0, 1.0, 1.0], [1.0, 1.0, 1.0], [1.0, 1.0, 1.0], [1.0, 1.0, 1.0], [1.0, 1.0, 1.0], [1.0, 1.0, 1.0], [1.0, 1.0, 1.0], [1.0, 1.0, 1.0], [1.0, 1.0, 1.0], [1.0, 1.0, 1.0], [1.0, 1.0, 1.0], [1.0, 1.0, 1.0], [1.0, 1.0, 1.0], [1.0, 1.0, 1.0], [1.0, 1.0, 1.0], [1.0, 1.0, 1.0]];

  FifthObject.generate = function() {
    var color, faces, object, vertices;
    vertices = new Vertices();
    vertices.fromArray(FifthObject.vertices);
    faces = new Vertices();
    faces.fromArray(FifthObject.faces);
    object = new StateObject("fifth-object", vertices, GL.gl['TRIANGLES'], faces);
    color = new Vertices();
    color.fromArray(FifthObject.colors);
    color = new SimpleObject('color', color);
    object.color = color;
    object.ondrag = function(positions) {
      mat4.rotate(this.modelMatrix, this.modelMatrix, MathUtils.toRadians(positions.deltas.x / 5), [0, 1, 0]);
      return mat4.rotate(this.modelMatrix, this.modelMatrix, MathUtils.toRadians(positions.deltas.y / 5), [1, 0, 0]);
    };
    object.onkeydown = function(ev) {
      switch (ev.which) {
        case 70:
          mat4.translate(this.modelMatrix, this.modelMatrix, [-3, 0, 1]);
          mat4.rotate(this.modelMatrix, this.modelMatrix, MathUtils.toRadians(-180), [1, 0, 0]);
          return mat4.rotate(this.modelMatrix, this.modelMatrix, MathUtils.toRadians(90), [0, 1, 0]);
      }
    };
    object.ondraw = function() {
      return mat4.translate(this.modelMatrix, this.modelMatrix, [5, 0, 0]);
    };
    return object;
  };

  return FifthObject;

})(Shape);
