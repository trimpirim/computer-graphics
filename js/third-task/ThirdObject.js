var ThirdObject,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ThirdObject = (function(superClass) {
  extend(ThirdObject, superClass);

  function ThirdObject() {
    return ThirdObject.__super__.constructor.apply(this, arguments);
  }

  ThirdObject.vertices = [[-1, 0, 0], [-1, -1, 0], [0, -1, 0], [0, 0, 0], [1, -1, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [-1, 0, -1], [0, 0, -1], [0, 1, -1], [1, 1, -1], [1, 0, -1], [0, -1, -1], [1, -1, -1], [-1, -1, -1], [-2, 0, 0], [-2, -1, 0], [-2, 0, -1], [-2, -1, -1], [-1, 1, 0], [-1, 1, -1], [1, -1, 0], [1, 0, 0], [1, 0, -1], [1, -1, -1], [0, 0, 0], [0, 1, 0], [0, 0, -1], [0, 1, -1], [0, 0, -1], [1, 0, -1], [0, -1, -1], [1, -1, -1], [-1, 0, -1], [0, 0, -1], [0, 1, -1], [-1, 1, -1], [-1, 0, 0], [0, 0, 0], [0, 1, 0], [-1, 1, 0], [-1, 0, 0], [-1, -1, 0], [-2, 0, 0], [-2, -1, 0], [-1, 0, 0], [-1, 0, -1], [-1, 1, 0], [-1, 1, -1]];

  ThirdObject.faces = [[3, 5, 9], [5, 9, 12], [0, 8, 16], [8, 16, 18], [6, 10, 20], [10, 20, 21]];

  ThirdObject.normals = [[-1, 0], [-1, -1], [0, -1], [0, 0], [1, -1], [1, 0], [0, 1], [1, 1], [-1, 0], [0, 0], [0, 1], [1, 1], [1, 0], [0, -1], [1, -1], [-1, -1], [0.4, 0.4], [0.4, 0.2], [0.2, 0.4], [0.2, 0.2], [-1, 1], [-1, 1], [0.6, 0.2], [0.6, 0.4], [0.8, 0.4], [0.8, 0.2], [0.6, 0.4], [0.6, 0.6], [0.8, 0.4], [0.8, 0.6], [0.6, 0.4], [0.4, 0.4], [0.6, 0.2], [0.4, 0.2], [0.8, 0.4], [0.6, 0.4], [0.6, 0.6], [0.8, 0.6], [0.2, 0.4], [0.4, 0.4], [0.4, 0.6], [0.2, 0.6], [0.2, 0.4], [0.2, 0.2], [0.0, 0.4], [0.0, 0.2], [0.4, 0.4], [0.2, 0.4], [0.4, 0.6], [0.2, 0.6]];

  ThirdObject.generate = function() {
    var faces, normals, object, texture, vertices;
    vertices = new Vertices();
    vertices.fromArray(ThirdObject.vertices);
    faces = new Vertices();
    faces.fromArray(ThirdObject.faces);
    object = new ThirdTaskObject("third-object", vertices, GL.gl['TRIANGLES'], faces);
    object.initialTranslation(Axis.TYPES.X, -5, true);
    normals = new Vertices();
    normals.fromNormalsArray(ThirdObject.normals);
    normals = new SimpleObject('normals', normals);
    object.normals = normals;
    texture = new Texture('images/third-task/fibonacci.jpg');
    object.texture = texture;
    object.endMatrix = [0, 0, -1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 3, 1, 0, 1];
    return object;
  };

  return ThirdObject;

})(Shape);
