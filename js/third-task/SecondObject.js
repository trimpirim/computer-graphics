var SecondObject,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SecondObject = (function(superClass) {
  extend(SecondObject, superClass);

  function SecondObject() {
    return SecondObject.__super__.constructor.apply(this, arguments);
  }

  SecondObject.vertices = [[-1, 0, 0], [-1, -1, 0], [0, -1, 0], [0, 0, 0], [1, -1, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [-1, 0, -1], [0, 0, -1], [0, 1, -1], [1, 1, -1], [1, 0, -1], [0, -1, -1], [1, -1, -1], [-1, -1, -1], [-2, 0, 0], [-2, -1, 0], [-2, 0, -1], [-2, -1, -1], [1, 0, 0], [1, 1, 0], [1, 1, -1], [1, 0, -1], [-1, -1, 0], [0, -1, 0], [0, -1, -1], [-1, -1, -1], [1, -1, 0], [1, 0, 0], [1, 0, -1], [1, -1, -1], [-1, -1, 0], [-1, -1, -1], [-2, -1, 0], [-2, -1, -1], [-2, 0, 0], [-2, -1, 0], [-2, 0, -1], [-2, -1, -1], [-1, 0, -1], [-1, -1, -1], [-2, 0, -1], [-2, -1, -1], [0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0]];

  SecondObject.faces = [[6, 7, 10], [7, 10, 11]];

  SecondObject.normals = [[0, 0], [1, 1], [0.4, 0.0], [0.4, 0.2], [0.6, 0.0], [0.6, 0.2], [0, 0], [1, 0], [0, 1], [0, 0], [0, 1], [1, 1], [1, 0], [0, -1], [1, -1], [0, 0], [1, 0], [0, 1], [1, 1], [1, 0], [0.2, 0.2], [0.2, 0.4], [0.4, 0.4], [0.4, 0.2], [1, 1], [0, 1], [0, 0], [1, 0], [0.2, 0], [0.2, 0.2], [0.4, 0.2], [0.4, 0], [0, 1], [0, 0], [1, 1], [1, 0], [0.8, 0.2], [0.8, 0], [0.6, 0.2], [0.6, 0], [0.8, 0.2], [0.8, 0], [1.0, 0.2], [1.0, 0], [0.4, 0.2], [0.6, 0.2], [0.4, 0.4], [0.6, 0.4]];

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
