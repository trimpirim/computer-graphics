var SeventhObject,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SeventhObject = (function(superClass) {
  extend(SeventhObject, superClass);

  function SeventhObject() {
    return SeventhObject.__super__.constructor.apply(this, arguments);
  }

  SeventhObject.vertices = [[-1, 1, 1], [-1, 0, 1], [0, 0, 1], [0, 1, 1], [1, 0, 1], [1, 1, 1], [0, 2, 1], [1, 2, 1], [-1, 1, 0], [0, 1, 0], [0, 2, 0], [1, 2, 0], [1, 1, 0], [0, 0, 0], [1, 0, 0], [-1, 0, 0], [1, -1, 1], [0, -1, 1], [0, -1, 0], [1, -1, 0], [0, 0, -1], [0, 1, -1], [1, 1, -1], [1, 0, -1]];

  SeventhObject.faces = [[0, 1, 2], [0, 2, 3], [2, 3, 4], [3, 4, 5], [0, 3, 8], [3, 8, 9], [1, 2, 13], [1, 13, 15], [0, 8, 15], [0, 1, 15], [4, 5, 12], [4, 12, 14], [3, 5, 9], [5, 9, 12], [2, 4, 16], [2, 16, 17], [2, 13, 17], [13, 17, 18], [4, 14, 16], [14, 16, 19], [13, 14, 18], [14, 18, 19], [16, 17, 18], [16, 18, 19], [8, 13, 15], [8, 9, 13], [9, 13, 20], [9, 20, 21], [9, 12, 21], [12, 21, 22], [12, 14, 22], [14, 22, 23], [13, 14, 23], [13, 20, 23], [21, 22, 23], [20, 21, 23]];


  /*[13, 15, 20]
    [13, 20, 21]
    [8, 15, 20]
    [8, 20, 22]
    [13, 21, 23]
    [9, 13, 23]
    [8, 9, 23]
    [8, 22, 23]
    [20, 22, 23]
    [20, 21, 23]
   */

  SeventhObject.colors = [[1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0]];

  SeventhObject.generate = function() {
    var color, faces, object, vertices;
    vertices = new Vertices();
    vertices.fromArray(SeventhObject.vertices);
    faces = new Vertices();
    faces.fromArray(SeventhObject.faces);
    object = new StateObject("seventh-object", vertices, GL.gl['TRIANGLES'], faces);
    color = new Vertices();
    color.fromArray(SeventhObject.colors);
    color = new SimpleObject('color', color);
    object.color = color;
    object.ondrag = function(positions) {
      mat4.rotate(this.modelMatrix, this.modelMatrix, MathUtils.toRadians(positions.deltas.x / 5), [0, 1, 0]);
      return mat4.rotate(this.modelMatrix, this.modelMatrix, MathUtils.toRadians(positions.deltas.y / 5), [1, 0, 0]);
    };
    object.onkeydown = function(ev) {
      switch (ev.which) {
        case 70:
          mat4.translate(this.modelMatrix, this.modelMatrix, [-10, 0, -2]);
          return mat4.rotate(this.modelMatrix, this.modelMatrix, MathUtils.toRadians(0), [1, 0, 0]);
      }
    };
    object.ondraw = function() {
      return mat4.translate(this.modelMatrix, this.modelMatrix, [15, 0, 0]);
    };
    return object;
  };

  return SeventhObject;

})(Shape);
