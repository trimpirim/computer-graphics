var SixthObject,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SixthObject = (function(superClass) {
  extend(SixthObject, superClass);

  function SixthObject() {
    return SixthObject.__super__.constructor.apply(this, arguments);
  }

  SixthObject.vertices = [[-1, 1, 1], [-1, 0, 1], [0, 0, 1], [0, 1, 1], [1, 0, 1], [1, 1, 1], [-1, 1, 0], [0, 1, 0], [1, 1, 0], [0, 0, 0], [1, 0, 0], [-1, 0, 0], [1, -1, 1], [0, -1, 1], [0, -1, 0], [1, -1, 0], [-1, 0, -1], [0, 0, -1], [0, 1, -1], [-1, 0, -1], [0, 0, -1], [-1, 1, -1], [0, 1, -1], [-1, 1, 0], [-1, 0, 0], [-1, 0, -1], [-1, 1, -1], [1, 0, 1], [1, 1, 1], [1, 1, 0], [1, 0, 0], [1, 0, 1], [1, 0, 0], [1, -1, 1], [1, -1, 0], [0, 0, 1], [1, 0, 1], [1, -1, 1], [0, -1, 1], [-1, 1, 1], [0, 1, 1], [-1, 1, 0], [0, 1, 0], [0, 1, 1], [1, 1, 1], [0, 1, 0], [1, 1, 0], [-1, 1, 0], [0, 1, 0], [-1, 1, -1], [0, 1, -1]];

  SixthObject.faces = [[0, 1, 2], [0, 2, 3], [0, 6, 11], [0, 1, 11], [1, 2, 9], [1, 9, 11], [2, 3, 4], [3, 4, 5], [7, 9, 10], [7, 8, 10], [2, 9, 13], [7, 9, 18], [9, 17, 18], [9, 13, 14], [9, 11, 16], [9, 16, 17], [9, 10, 14], [10, 14, 15], [12, 13, 14], [12, 14, 15], [19, 20, 22], [19, 21, 22], [23, 24, 25], [23, 25, 26], [27, 28, 29], [27, 29, 30], [31, 32, 33], [32, 33, 34], [35, 36, 37], [35, 37, 38], [39, 40, 41], [40, 41, 42], [43, 44, 45], [44, 45, 46], [47, 48, 50], [47, 49, 50]];

  SixthObject.textureCoords = [[-1, 1], [-1, 0], [0.6, 0.2], [0.6, 0.4], [0.8, 0.2], [0.8, 0.4], [-1, 1], [0, 1], [1, 1], [0, 0], [1, 0], [-1, 0], [0.8, 0.4], [0.6, 0.4], [0.6, 0.6], [0.8, 0.6], [-1, 0], [0, 0], [0, 1], [0.6, 0.2], [0.4, 0.2], [0.6, 0.4], [0.4, 0.4], [0.4, 0.4], [0.4, 0.2], [0.2, 0.2], [0.2, 0.4], [0.4, 0.2], [0.4, 0.4], [0.6, 0.4], [0.6, 0.2], [0.4, 0.2], [0.6, 0.2], [0.4, 0.0], [0.6, 0.0], [0.6, 0.2], [0.8, 0.2], [0.8, 0.0], [0.6, 0.0], [0.4, 0.4], [0.6, 0.4], [0.4, 0.6], [0.6, 0.6], [0.6, 0.4], [0.8, 0.4], [0.6, 0.6], [0.8, 0.6], [0.4, 0.6], [0.6, 0.6], [0.4, 0.8], [0.6, 0.8]];

  SixthObject.generate = function() {
    var faces, object, texture, textureCoords, vertices;
    vertices = new Vertices();
    vertices.fromArray(SixthObject.vertices);
    faces = new Vertices();
    faces.fromArray(SixthObject.faces);
    object = new ThirdTaskObject("sixth-object", vertices, GL.gl['TRIANGLES'], faces);
    object.computeNormals();
    object.initialTranslation(Axis.TYPES.X, 10, true);
    object.endMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 4, 0, -1, 1];
    textureCoords = new Vertices();
    textureCoords.fromTextureArray(SixthObject.textureCoords);
    texture = new Texture('images/third-task/fibonacci.jpg');
    texture.vertices = textureCoords;
    object.texture = texture;
    return object;
  };

  return SixthObject;

})(Shape);
