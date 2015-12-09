var FifthObject,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

FifthObject = (function(superClass) {
  extend(FifthObject, superClass);

  function FifthObject() {
    return FifthObject.__super__.constructor.apply(this, arguments);
  }

  FifthObject.vertices = [[-1, 0, 0], [-1, -1, 0], [0, -1, 0], [0, 0, 0], [1, -1, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [-1, 0, -1], [0, 0, -1], [0, 1, -1], [1, 1, -1], [1, 0, -1], [0, -1, -1], [1, -1, -1], [-1, -1, -1], [0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1], [0, 0, -1], [0, 1, -1], [1, 1, -1], [1, 0, -1], [0, -1, -1], [-1, -1, -1], [0, 0, -1], [1, 0, -1], [0, -1, -1], [1, -1, -1], [-1, 0, 0], [-1, -1, 0], [-1, 0, -1], [-1, -1, -1], [1, -1, 0], [1, 0, 0], [1, 0, -1], [1, -1, -1], [0, -1, 0], [0, 0, 0], [1, -1, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [1, 1, 1], [0, 1, 1], [1, 0, 0], [1, 1, 0], [1, 0, 1], [1, 1, 1]];

  FifthObject.faces = [[21, 20, 23], [21, 22, 23], [8, 24, 25], [8, 9, 24], [26, 28, 29], [26, 27, 29]];

  FifthObject.normals = [[1, 0], [1, 0], [1, 1], [0, 0], [1, 0], [0, 1], [0, 1], [0, 0], [0, 1], [1, 1], [1, 1], [1, 0], [1, 1], [0, 1], [0, 0], [0, 0], [1, 1], [0, 1], [0, 0], [1, 0], [1, 1], [1, 0], [0, 0], [0, 1], [1, 0], [0, 0], [1, 1], [0, 1], [1, 0], [0, 0], [0.8, 0.2], [0.8, 0.4], [1, 0.2], [1, 0.4], [0, 0], [0, 1], [1, 1], [1, 0], [0, 0], [0, 1], [1, 0], [1, 1], [1, 1], [1, 0], [0, 0], [0, 1], [1, 1], [1, 0], [0, 1], [0, 0]];

  FifthObject.generate = function() {
    var faces, normals, object, texture, vertices;
    vertices = new Vertices();
    vertices.fromArray(FifthObject.vertices);
    faces = new Vertices();
    faces.fromArray(FifthObject.faces);
    object = new ThirdTaskObject("fifth-object", vertices, GL.gl['TRIANGLES'], faces);
    object.initialTranslation(Axis.TYPES.X, 5, true);
    object.endMatrix = [0, 0, 1, 0, 0, -1, 0, 0, 1, 0, 0, 0, 2, 0, 1, 1];
    normals = new Vertices();
    normals.fromNormalsArray(FifthObject.normals);
    normals = new SimpleObject('normals', normals);
    object.normals = normals;
    texture = new Texture('images/third-task/fibonacci.jpg');
    object.texture = texture;
    return object;
  };

  return FifthObject;

})(Shape);
