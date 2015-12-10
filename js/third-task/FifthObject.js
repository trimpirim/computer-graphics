var FifthObject,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

FifthObject = (function(superClass) {
  extend(FifthObject, superClass);

  function FifthObject() {
    return FifthObject.__super__.constructor.apply(this, arguments);
  }

  FifthObject.vertices = [[-1, 0, 0], [-1, -1, 0], [0, -1, 0], [0, 0, 0], [1, -1, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [-1, 0, -1], [0, 0, -1], [0, 1, -1], [1, 1, -1], [1, 0, -1], [0, -1, -1], [1, -1, -1], [-1, -1, -1], [0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1], [0, 0, -1], [0, 1, -1], [1, 1, -1], [1, 0, -1], [0, -1, -1], [-1, -1, -1], [0, 0, -1], [1, 0, -1], [0, -1, -1], [1, -1, -1], [-1, 0, 0], [-1, -1, 0], [-1, 0, -1], [-1, -1, -1], [1, -1, 0], [1, 0, 0], [1, 0, -1], [1, -1, -1], [0, -1, 0], [0, 0, 0], [1, -1, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [1, 1, 1], [0, 1, 1], [1, 0, 0], [1, 1, 0], [1, 0, 1], [1, 1, 1], [-1, 0, -1], [0, 0, -1], [0, -1, -1], [-1, -1, -1]];

  FifthObject.faces = [[0, 1, 2], [0, 2, 3], [38, 39, 40], [39, 40, 41], [0, 3, 8], [3, 8, 9], [3, 6, 9], [6, 9, 10], [6, 7, 10], [7, 10, 11], [5, 7, 11], [5, 11, 12], [20, 21, 23], [21, 22, 23], [2, 4, 13], [4, 13, 14], [1, 2, 13], [1, 13, 15], [50, 51, 52], [50, 52, 53], [26, 28, 29], [26, 27, 29], [30, 32, 33], [30, 31, 33], [34, 35, 36], [34, 36, 37], [3, 5, 16], [5, 16, 17], [46, 47, 48], [47, 48, 49], [42, 43, 44], [42, 44, 45], [3, 6, 19], [3, 16, 19], [16, 18, 19], [16, 17, 18]];

  FifthObject.normals = [[1, 0], [1, 0], [1, 1], [0, 0], [1, 0], [0, 1], [0, 1], [0, 0], [0, 1], [1, 1], [1, 1], [1, 0], [1, 1], [0, 1], [0, 0], [0, 0], [0.2, 0.2], [0.0, 0.2], [0.0, 0.0], [0.2, 0.0], [0.8, 0.2], [0.8, 0.0], [1.0, 0.0], [1.0, 0.2], [1, 0], [0, 0], [0.8, 0.2], [1.0, 0.2], [0.8, 0.4], [1.0, 0.4], [0.8, 0.2], [0.8, 0.4], [1, 0.2], [1, 0.4], [0, 0], [0, 1], [1, 1], [1, 0], [0, 0], [0, 1], [1, 0], [1, 1], [1, 1], [1, 0], [0, 0], [0, 1], [1, 1], [1, 0], [0, 1], [0, 0], [0.6, 0.2], [0.8, 0.2], [0.8, 0.4], [0.6, 0.4]];

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
