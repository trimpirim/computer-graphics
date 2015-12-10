var SecondObject,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SecondObject = (function(superClass) {
  extend(SecondObject, superClass);

  function SecondObject() {
    return SecondObject.__super__.constructor.apply(this, arguments);
  }

  SecondObject.vertices = [[-1, 0, 0], [-1, -1, 0], [0, -1, 0], [0, 0, 0], [1, -1, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [-1, 0, -1], [0, 0, -1], [0, 1, -1], [1, 1, -1], [1, 0, -1], [0, -1, -1], [1, -1, -1], [-1, -1, -1], [-2, 0, 0], [-2, -1, 0], [-2, 0, -1], [-2, -1, -1], [1, 0, 0], [1, 1, 0], [1, 1, -1], [1, 0, -1], [-1, -1, 0], [0, -1, 0], [0, -1, -1], [-1, -1, -1], [1, -1, 0], [1, 0, 0], [1, 0, -1], [1, -1, -1], [-1, -1, 0], [-1, -1, -1], [-2, -1, 0], [-2, -1, -1], [-2, 0, 0], [-2, -1, 0], [-2, 0, -1], [-2, -1, -1], [-1, 0, -1], [-1, -1, -1], [-2, 0, -1], [-2, -1, -1]];

  SecondObject.faces = [[0, 1, 2], [0, 2, 3], [2, 3, 4], [3, 4, 5], [3, 5, 6], [5, 6, 7], [0, 3, 8], [3, 8, 9], [3, 6, 9], [6, 9, 10], [6, 7, 10], [7, 10, 11], [20, 21, 22], [20, 22, 23], [10, 9, 12], [10, 11, 12], [2, 4, 13], [4, 13, 14], [24, 25, 26], [24, 26, 27], [8, 13, 15], [8, 9, 13], [9, 13, 14], [9, 12, 14], [28, 29, 30], [28, 30, 31], [0, 1, 16], [1, 16, 17], [0, 8, 16], [8, 16, 18], [40, 41, 42], [41, 42, 43], [32, 33, 35], [32, 34, 35], [36, 38, 39], [36, 37, 39]];

  SecondObject.normals = [[0, 0], [1, 1], [0, 0], [0, 1], [1, 0], [1, 1], [0, 0], [1, 0], [0, 1], [0, 0], [0, 1], [1, 1], [1, 0], [0, -1], [1, -1], [0, 0], [1, 0], [0, 1], [1, 1], [1, 0], [0.2, 0.2], [0.2, 0.4], [0.4, 0.4], [0.4, 0.2], [1, 1], [0, 1], [0, 0], [1, 0], [0.2, 0], [0.2, 0.2], [0.4, 0.2], [0.4, 0], [0, 1], [0, 0], [1, 1], [1, 0], [0.8, 0.2], [0.8, 0], [0.6, 0.2], [0.6, 0], [0.8, 0.2], [0.8, 0], [1.0, 0.2], [1.0, 0]];

  SecondObject.generate = function() {
    var faces, normals, object, texture, vertices;
    vertices = new Vertices();
    vertices.fromArray(SecondObject.vertices);
    faces = new Vertices();
    faces.fromArray(SecondObject.faces);
    faces.columnsCount = 1;
    object = new ThirdTaskObject("second-object", vertices, GL.gl['TRIANGLES'], faces);
    object.initialTranslation(Axis.TYPES.X, -10, true);
    normals = new Vertices();
    normals.fromNormalsArray(SecondObject.normals);
    normals = new SimpleObject('normals', normals);
    object.normals = normals;
    texture = new Texture('images/third-task/fibonacci.jpg');
    object.texture = texture;
    object.endMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 3, 0, 1, 1];
    return object;
  };

  return SecondObject;

})(Shape);
