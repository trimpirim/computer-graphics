var SeventhObject,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SeventhObject = (function(superClass) {
  extend(SeventhObject, superClass);

  function SeventhObject() {
    return SeventhObject.__super__.constructor.apply(this, arguments);
  }

  SeventhObject.colors = [[1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0], [1.0, 0.0, 1.0]];

  SeventhObject.generate = function() {
    var color, faces, object, vertices;
    vertices = new Vertices();
    vertices.fromArray(SixthObject.vertices);
    faces = new Vertices();
    faces.fromArray(SixthObject.faces);
    object = new StateObject("seventh-object", vertices, GL.gl['TRIANGLES'], faces);
    color = new Vertices();
    color.fromArray(SeventhObject.colors);
    color = new Object('color', color);
    object.color = color;
    object.ondrag = function(positions) {
      mat4.rotate(this.modelMatrix, this.modelMatrix, MathUtils.toRadians(positions.deltas.x / 5), [0, 1, 0]);
      return mat4.rotate(this.modelMatrix, this.modelMatrix, MathUtils.toRadians(positions.deltas.y / 5), [1, 0, 0]);
    };
    object.ondraw = function() {
      return mat4.translate(this.modelMatrix, this.modelMatrix, [6, 0, -2]);
    };
    return object;
  };

  return SeventhObject;

})(Shape);
