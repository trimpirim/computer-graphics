var ForthObject,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ForthObject = (function(superClass) {
  extend(ForthObject, superClass);

  function ForthObject() {
    return ForthObject.__super__.constructor.apply(this, arguments);
  }

  ForthObject.vertices = [[-1, 0, 0], [-1, -1, 0], [0, -1, 0], [0, 0, 0], [1, -1, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [0, 0, -1], [0, 1, -1], [1, 1, -1], [1, 0, -1], [0, -1, -1], [1, -1, -1], [-1, -1, -1], [2, 0, 0], [2, 0, -1], [2, 1, 0], [2, 1, -1], [0, 1, 0], [1, 1, 0], [0, 1, -1], [1, 1, -1], [-1, 0, 0], [0, 0, 0], [-1, 0, -1], [0, 0, -1], [0, 0, 0], [0, 1, 0], [0, 0, -1], [0, 1, -1], [-1, 0, 0], [-1, -1, 0], [-1, 0, -1], [-1, -1, -1], [-1, 0, -1], [0, 0, -1], [0, -1, -1], [-1, -1, -1], [0, 0, -1], [1, 0, -1], [0, -1, -1], [1, -1, -1], [1, 1, -1], [1, 0, -1], [2, 0, -1], [2, 1, -1]];

  ForthObject.faces = [[0, 1, 2], [0, 2, 3], [1, 2, 12], [1, 12, 14], [2, 4, 12], [2, 3, 4], [3, 4, 5], [3, 5, 6], [5, 6, 7], [4, 12, 13], [4, 5, 11], [4, 11, 13], [5, 7, 15], [7, 15, 17], [5, 11, 15], [11, 15, 16], [7, 10, 17], [8, 9, 11], [9, 10, 11], [10, 17, 18], [16, 17, 18], [15, 16, 17], [19, 20, 21], [20, 21, 22], [23, 24, 25], [24, 25, 26], [27, 28, 29], [28, 29, 30], [31, 32, 34], [31, 33, 34], [35, 36, 37], [35, 37, 38], [39, 40, 42], [39, 41, 42], [43, 44, 46], [44, 45, 46]];

  ForthObject.textureCoords = [[-1, 0], [-1, -1], [0, -1], [0, 0], [1, -1], [1, 0], [0, 1], [1, 1], [0.4, 0.6], [0.4, 0.8], [0.6, 0.8], [0.6, 0.6], [0, -1], [1, -1], [-1, -1], [2, 0], [2, 0], [2, 1], [2, 1], [0.6, 0.2], [0.4, 0.2], [0.6, 0], [0.4, 0], [0.8, 0.2], [0.6, 0.2], [0.8, 0], [0.6, 0], [0.4, 0.2], [0.2, 0.2], [0.4, 0], [0.2, 0], [0.4, 0.2], [0.6, 0.2], [0.4, 0], [0.6, 0], [0.2, 0.6], [0.4, 0.6], [0.4, 0.4], [0.2, 0.4], [0.4, 0.6], [0.6, 0.6], [0.4, 0.4], [0.6, 0.4], [0.6, 0.8], [0.6, 0.6], [0.8, 0.6], [0.8, 0.8]];

  ForthObject.normals = [[-1, 0, 0], [-1, -1, 0], [0, -1, 0], [0, 0, 0], [1, -1, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, -1, -1], [1, -1, -1], [-1, -1, -1], [2, 0, 0], [2, 0, -1], [2, 1, 0], [2, 1, -1], [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1]];

  ForthObject.generate = function() {
    var faces, object, texture, textureCoords, vertices;
    vertices = new Vertices();
    vertices.fromArray(ForthObject.vertices);
    faces = new Vertices();
    faces.fromArray(ForthObject.faces);
    object = new ThirdTaskObject("forth-object", vertices, GL.gl['TRIANGLES'], faces);
    object.normals = new SimpleObject('normals', new Vertices().fromArray(ForthObject.normals));
    object.initialTranslation(Axis.TYPES.X, 0, true);
    object.endMatrix = [1, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 3, 0, -1, 1];
    textureCoords = new Vertices();
    textureCoords.fromTextureArray(ForthObject.textureCoords);
    texture = new Texture('images/third-task/fibonacci.jpg', textureCoords, 'GLSampler');
    object.textures.add('fibonacci', texture);
    return object;
  };

  return ForthObject;

})(Shape);
