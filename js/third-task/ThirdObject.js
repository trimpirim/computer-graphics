var ThirdObject,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ThirdObject = (function(superClass) {
  extend(ThirdObject, superClass);

  function ThirdObject() {
    return ThirdObject.__super__.constructor.apply(this, arguments);
  }

  ThirdObject.vertices = [[-1, 0, 0], [-1, -1, 0], [0, -1, 0], [0, 0, 0], [1, -1, 0], [1, 0, 0], [-1, 0, -1], [0, 0, -1], [0, -1, -1], [1, -1, -1], [-1, -1, -1], [-2, 0, 0], [-2, -1, 0], [-2, 0, -1], [-2, -1, -1], [1, -1, 0], [1, 0, 0], [1, 0, -1], [1, -1, -1], [0, 0, 0], [0, 1, 0], [0, 0, -1], [0, 1, -1], [0, 0, -1], [1, 0, -1], [0, -1, -1], [1, -1, -1], [-1, 0, -1], [0, 0, -1], [0, 1, -1], [-1, 1, -1], [-1, 0, 0], [0, 0, 0], [0, 1, 0], [-1, 1, 0], [-1, 0, 0], [-1, -1, 0], [-2, 0, 0], [-2, -1, 0], [-1, 0, 0], [-1, 0, -1], [-1, 1, 0], [-1, 1, -1], [0, 0, 0], [1, 0, 0], [0, 0, -1], [1, 0, -1], [-1, 0, 0], [-1, 0, -1], [-2, 0, 0], [-2, 0, -1], [0, 1, 0], [0, 1, -1], [-1, 1, 0], [-1, 1, -1]];

  ThirdObject.faces = [[0, 1, 2], [0, 2, 3], [1, 10, 14], [1, 12, 14], [1, 2, 8], [1, 8, 10], [2, 3, 4], [3, 4, 5], [2, 4, 8], [4, 8, 9], [6, 8, 10], [6, 7, 8], [6, 10, 13], [10, 13, 14], [11, 13, 14], [11, 12, 14], [15, 16, 17], [15, 17, 18], [19, 20, 21], [20, 21, 22], [23, 24, 26], [23, 25, 26], [27, 28, 30], [28, 29, 30], [31, 32, 33], [31, 33, 34], [35, 36, 37], [36, 37, 38], [39, 40, 41], [40, 41, 42], [43, 44, 45], [44, 45, 46], [47, 48, 49], [48, 49, 50], [51, 52, 53], [52, 53, 54]];

  ThirdObject.textureCoords = [[-1, 0], [-1, -1], [0, -1], [0, 0], [1, -1], [1, 0], [-1, 0], [0, 0], [0, -1], [1, -1], [-1, -1], [0.4, 0.4], [0.4, 0.2], [0.2, 0.4], [0.2, 0.2], [0.6, 0.2], [0.6, 0.4], [0.8, 0.4], [0.8, 0.2], [0.6, 0.4], [0.6, 0.6], [0.8, 0.4], [0.8, 0.6], [0.6, 0.4], [0.4, 0.4], [0.6, 0.2], [0.4, 0.2], [0.8, 0.4], [0.6, 0.4], [0.6, 0.6], [0.8, 0.6], [0.2, 0.4], [0.4, 0.4], [0.4, 0.6], [0.2, 0.6], [0.2, 0.4], [0.2, 0.2], [0.0, 0.4], [0.0, 0.2], [0.4, 0.4], [0.2, 0.4], [0.4, 0.6], [0.2, 0.6], [0.4, 0.4], [0.4, 0.6], [0.2, 0.4], [0.2, 0.6], [0.4, 0.2], [0.2, 0.2], [0.4, 0.0], [0.2, 0.0], [0.4, 0.4], [0.2, 0.4], [0.4, 0.2], [0.2, 0.2]];

  ThirdObject.normals = [[-1, 0, 0], [-1, -1, 0], [0, -1, 0], [0, 0, 0], [1, -1, 0], [1, 0, 0], [-1, 0, -1], [0, 0, -1], [0, -1, -1], [1, -1, -1], [-1, -1, -1], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0]];

  ThirdObject.generate = function() {
    var faces, object, texture, textureCoords, vertices;
    vertices = new Vertices();
    vertices.fromArray(ThirdObject.vertices);
    faces = new Vertices();
    faces.fromArray(ThirdObject.faces);
    object = new ThirdTaskObject("third-object", vertices, GL.gl['TRIANGLES'], faces);
    object.normals = new SimpleObject('normals', new Vertices().fromArray(ThirdObject.normals));
    object.initialTranslation(Axis.TYPES.X, -5, true);
    textureCoords = new Vertices();
    textureCoords.fromTextureArray(ThirdObject.textureCoords);
    texture = new Texture('images/third-task/fibonacci.jpg', textureCoords, 'GLSampler');
    object.textures.add('fibonacci', texture);
    object.endMatrix = [0, 0, -1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 3, 1, 0, 1];
    return object;
  };

  return ThirdObject;

})(Shape);
