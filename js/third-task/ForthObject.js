var ForthObject,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ForthObject = (function(superClass) {
  extend(ForthObject, superClass);

  function ForthObject() {
    return ForthObject.__super__.constructor.apply(this, arguments);
  }

  ForthObject.vertices = [[-1, 0, 0], [-1, -1, 0], [0, -1, 0], [0, 0, 0], [1, -1, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [-1, 0, -1], [0, 0, -1], [0, 1, -1], [1, 1, -1], [1, 0, -1], [0, -1, -1], [1, -1, -1], [-1, -1, -1], [2, 0, 0], [2, 0, -1], [2, 1, 0], [2, 1, -1], [0, 1, 0], [1, 1, 0], [0, 1, -1], [1, 1, -1], [-1, 0, 0], [0, 0, 0], [-1, 0, -1], [0, 0, -1], [0, 0, 0], [0, 1, 0], [0, 0, -1], [0, 1, -1], [-1, 0, 0], [-1, -1, 0], [-1, 0, -1], [-1, -1, -1]];

  ForthObject.faces = [[0, 1, 2], [0, 2, 3], [2, 3, 4], [3, 4, 5], [3, 5, 6], [5, 6, 7], [24, 25, 26], [25, 26, 27], [28, 29, 30], [29, 30, 31], [20, 21, 22], [21, 22, 23], [10, 9, 12], [10, 11, 12], [2, 4, 13], [4, 13, 14], [1, 2, 13], [1, 13, 15], [8, 13, 15], [8, 9, 13], [9, 13, 14], [9, 12, 14], [32, 34, 35], [32, 33, 35], [4, 5, 12], [4, 12, 14], [5, 12, 16], [12, 16, 17], [5, 7, 16], [7, 16, 18], [7, 11, 18], [11, 18, 19], [12, 11, 19], [12, 17, 19], [17, 18, 19], [16, 17, 18]];

  ForthObject.normals = [[-1, 0], [-1, -1], [0, -1], [0, 0], [1, -1], [1, 0], [0, 1], [1, 1], [-1, 0], [0, 0], [0, 1], [1, 1], [1, 0], [0, -1], [1, -1], [-1, -1], [2, 0], [2, 0], [2, 1], [2, 1], [0.6, 0.2], [0.4, 0.2], [0.6, 0], [0.4, 0], [0.8, 0.2], [0.6, 0.2], [0.8, 0], [0.6, 0], [0.4, 0.2], [0.2, 0.2], [0.4, 0], [0.2, 0], [0.4, 0.2], [0.6, 0.2], [0.4, 0], [0.6, 0]];

  ForthObject.generate = function() {
    var faces, normals, object, texture, vertices;
    vertices = new Vertices();
    vertices.fromArray(ForthObject.vertices);
    faces = new Vertices();
    faces.fromArray(ForthObject.faces);
    object = new ThirdTaskObject("forth-object", vertices, GL.gl['TRIANGLES'], faces);
    object.initialTranslation(Axis.TYPES.X, 0, true);
    object.endMatrix = [1, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 3, 0, -1, 1];
    normals = new Vertices();
    normals.fromNormalsArray(ForthObject.normals);
    normals = new SimpleObject('normals', normals);
    object.normals = normals;
    texture = new Texture('images/third-task/fibonacci.jpg');
    object.texture = texture;
    return object;
  };

  return ForthObject;

})(Shape);
