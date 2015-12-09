var SixthObject,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SixthObject = (function(superClass) {
  extend(SixthObject, superClass);

  function SixthObject() {
    return SixthObject.__super__.constructor.apply(this, arguments);
  }

  SixthObject.vertices = [[-1, 1, 1], [-1, 0, 1], [0, 0, 1], [0, 1, 1], [1, 0, 1], [1, 1, 1], [0, 2, 1], [1, 2, 1], [-1, 1, 0], [0, 1, 0], [0, 2, 0], [1, 2, 0], [1, 1, 0], [0, 0, 0], [1, 0, 0], [-1, 0, 0], [1, -1, 1], [0, -1, 1], [0, -1, 0], [1, -1, 0], [-1, 0, -1], [0, 0, -1], [-1, 1, -1], [0, 1, -1], [-1, 0, -1], [0, 0, -1], [-1, 1, -1], [0, 1, -1], [-1, 1, 0], [-1, 0, 0], [-1, 0, -1], [-1, 1, -1]];

  SixthObject.faces = [[28, 29, 30], [28, 30, 31]];

  SixthObject.normals = [[-1, 1], [-1, 0], [0, 0], [0, 1], [1, 0], [1, 1], [0, 2], [1, 2], [-1, 1], [0, 1], [0, 2], [1, 2], [1, 1], [0, 0], [1, 0], [-1, 0], [1, -1], [0, -1], [0, -1], [1, -1], [-1, 0], [0, 0], [-1, 1], [0, 1], [0.6, 0.2], [0.4, 0.2], [0.6, 0.4], [0.4, 0.4], [0.4, 0.4], [0.4, 0.2], [0.2, 0.2], [0.2, 0.4]];

  SixthObject.generate = function() {
    var faces, normals, object, texture, vertices;
    vertices = new Vertices();
    vertices.fromArray(SixthObject.vertices);
    faces = new Vertices();
    faces.fromArray(SixthObject.faces);
    object = new ThirdTaskObject("sixth-object", vertices, GL.gl['TRIANGLES'], faces);
    object.initialTranslation(Axis.TYPES.X, 10, true);
    object.endMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 4, 0, -1, 1];
    normals = new Vertices();
    normals.fromNormalsArray(SixthObject.normals);
    normals = new SimpleObject('normals', normals);
    object.normals = normals;
    texture = new Texture('images/third-task/fibonacci.jpg');
    object.texture = texture;
    return object;
  };

  return SixthObject;

})(Shape);
