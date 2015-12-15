var SeventhObject,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SeventhObject = (function(superClass) {
  extend(SeventhObject, superClass);

  function SeventhObject() {
    return SeventhObject.__super__.constructor.apply(this, arguments);
  }

  SeventhObject.vertices = [[-1, 1, 1], [-1, 0, 1], [0, 0, 1], [0, 1, 1], [1, 0, 1], [1, 1, 1], [-1, 1, 0], [0, 1, 0], [0, 0, 0], [1, 0, 0], [-1, 0, 0], [1, -1, 1], [0, -1, 1], [0, -1, 0], [1, -1, 0], [0, 0, -1], [0, 1, -1], [1, 0, -1], [0, 0, -1], [1, 0, -1], [0, 1, -1], [1, 1, -1], [1, 0, 1], [1, 1, 1], [1, 1, 0], [1, 0, 0], [1, 0, 1], [1, 0, 0], [1, -1, 1], [1, -1, 0], [1, 1, 0], [1, 0, 0], [1, 1, -1], [1, 0, -1], [0, 0, 1], [1, 0, 1], [1, -1, 1], [0, -1, 1], [-1, 1, 1], [0, 1, 1], [-1, 1, 0], [0, 1, 0], [0, 1, 1], [1, 1, 1], [0, 1, 0], [1, 1, 0], [0, 1, 0], [1, 1, 0], [0, 1, -1], [1, 1, -1]];

  SeventhObject.faces = [[0, 1, 2], [0, 2, 3], [0, 6, 10], [0, 1, 10], [1, 2, 8], [1, 8, 10], [2, 3, 4], [3, 4, 5], [2, 8, 12], [8, 12, 13], [6, 8, 10], [6, 7, 8], [7, 8, 15], [7, 15, 16], [8, 9, 17], [8, 15, 17], [8, 9, 13], [9, 13, 14], [11, 12, 13], [11, 13, 14], [18, 19, 20], [19, 20, 21], [22, 23, 24], [22, 24, 25], [26, 27, 28], [27, 28, 29], [30, 31, 32], [31, 32, 33], [34, 35, 36], [34, 36, 37], [38, 39, 40], [39, 40, 41], [42, 43, 44], [43, 44, 45], [46, 47, 48], [47, 48, 49]];

  SeventhObject.textureCoords = [[-1, 1], [-1, 0], [0.8, 0.2], [0.8, 0.4], [1, 0.2], [1, 0.4], [-1, 1], [0, 1], [0, 0], [1, 0], [-1, 0], [1.0, 0.6], [0.8, 0.6], [0.8, 0.8], [1.0, 0.8], [0, 0], [0, 1], [1, 0], [0.2, 0.2], [0, 0.2], [0.2, 0.4], [0, 0.4], [0.6, 0.2], [0.6, 0.4], [0.8, 0.4], [0.8, 0.2], [0.6, 0.2], [0.8, 0.2], [0.6, 0.0], [0.8, 0.0], [0.8, 0.4], [0.8, 0.2], [1.0, 0.4], [1.0, 0.2], [0.8, 0.2], [1.0, 0.2], [1.0, 0.0], [0.8, 0.0], [0.6, 0.6], [0.8, 0.6], [0.6, 0.8], [0.8, 0.8], [0.8, 0.6], [1.0, 0.6], [0.8, 0.8], [1.0, 0.8], [0.8, 0.8], [1.0, 0.8], [0.8, 1.0], [1.0, 1.0]];

  SeventhObject.generate = function() {
    var faces, object, texture, textureCoords, vertices;
    vertices = new Vertices();
    vertices.fromArray(SeventhObject.vertices);
    faces = new Vertices();
    faces.fromArray(SeventhObject.faces);
    object = new ThirdTaskObject("seventh-object", vertices, GL.gl['TRIANGLES'], faces);
    object.computeNormals();
    object.initialTranslation(Axis.TYPES.X, 15, true);
    object.endMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 5, 0, -2, 1];
    textureCoords = new Vertices();
    textureCoords.fromTextureArray(SeventhObject.textureCoords);
    texture = new Texture('images/third-task/fibonacci.jpg');
    texture.vertices = textureCoords;
    object.texture = texture;
    return object;
  };

  return SeventhObject;

})(Shape);
