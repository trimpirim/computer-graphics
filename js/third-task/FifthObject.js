var FifthObject,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

FifthObject = (function(superClass) {
  extend(FifthObject, superClass);

  function FifthObject() {
    return FifthObject.__super__.constructor.apply(this, arguments);
  }

  FifthObject.vertices = [[-1, 0, 0], [-1, -1, 0], [0, -1, 0], [0, 0, 0], [1, 0, 0], [0, 1, 0], [-1, 0, -1], [0, 0, -1], [0, 1, -1], [0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1], [0, 0, -1], [0, 1, -1], [1, 1, -1], [1, 0, -1], [0, 0, -1], [1, 0, -1], [0, -1, -1], [1, -1, -1], [-1, 0, 0], [-1, -1, 0], [-1, 0, -1], [-1, -1, -1], [1, -1, 0], [1, 0, 0], [1, 0, -1], [1, -1, -1], [0, -1, 0], [0, 0, 0], [1, -1, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [1, 1, 1], [0, 1, 1], [1, 0, 0], [1, 1, 0], [1, 0, 1], [1, 1, 1], [-1, 0, -1], [0, 0, -1], [0, -1, -1], [-1, -1, -1], [1, 0, 0], [1, 1, 0], [1, 1, -1], [1, 0, -1], [-1, -1, 0], [0, -1, 0], [0, -1, -1], [-1, -1, -1], [0, -1, 0], [1, -1, 0], [0, -1, -1], [1, -1, -1], [0, 1, 0], [1, 1, 0], [0, 1, -1], [1, 1, -1]];

  FifthObject.faces = [[0, 1, 2], [0, 2, 3], [0, 3, 6], [3, 6, 7], [3, 5, 12], [3, 9, 12], [3, 4, 9], [4, 9, 10], [3, 5, 7], [5, 7, 8], [9, 10, 11], [9, 11, 12], [13, 14, 16], [14, 15, 16], [17, 18, 20], [17, 19, 20], [21, 22, 24], [21, 23, 24], [25, 26, 27], [25, 27, 28], [29, 30, 31], [30, 31, 32], [33, 34, 35], [33, 35, 36], [37, 38, 39], [38, 39, 40], [41, 42, 43], [41, 43, 44], [45, 46, 47], [45, 47, 48], [49, 50, 51], [49, 51, 52], [53, 54, 55], [54, 55, 56], [57, 58, 59], [58, 59, 60]];

  FifthObject.textureCoords = [[1, 0], [1, 0], [1, 1], [0, 0], [0, 1], [0, 1], [0, 1], [1, 1], [1, 1], [0.2, 0.2], [0.0, 0.2], [0.0, 0.0], [0.2, 0.0], [0.8, 0.2], [0.8, 0.0], [1.0, 0.0], [1.0, 0.2], [0.8, 0.2], [1.0, 0.2], [0.8, 0.4], [1.0, 0.4], [0.8, 0.2], [0.8, 0.4], [1, 0.2], [1, 0.4], [0.2, 0.4], [0.2, 0.2], [0.0, 0.2], [0.0, 0.4], [0, 1], [0, 1], [1, 0], [1, 1], [0.2, 0.2], [0.2, 0.0], [0.4, 0.0], [0.4, 0.2], [0.2, 0.2], [0.2, 0.0], [0.4, 0.2], [0.4, 0.0], [0.6, 0.2], [0.8, 0.2], [0.8, 0.4], [0.6, 0.4], [0.2, 0.2], [0.2, 0.0], [0.0, 0.0], [0.0, 0.2], [0.2, 0.4], [0.2, 0.2], [0.0, 0.2], [0.0, 0.4], [0.2, 0.2], [0.2, 0.0], [0.0, 0.2], [0.0, 0.0], [0.2, 0.2], [0.2, 0.0], [0.0, 0.2], [0.0, 0.0]];

  FifthObject.normals = [[-1, 0, 0], [-1, -1, 0], [0, -1, 0], [0, 0, 0], [1, 0, 0], [0, 1, 0], [-1, 0, -1], [0, 0, -1], [0, 1, -1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0], [0, -1, 0], [0, 0, 0], [1, -1, 0], [1, 0, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1], [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0]];

  FifthObject.generate = function() {
    var faces, object, texture, textureCoords, vertices;
    vertices = new Vertices();
    vertices.fromArray(FifthObject.vertices);
    faces = new Vertices();
    faces.fromArray(FifthObject.faces);
    object = new ThirdTaskObject("fifth-object", vertices, GL.gl['TRIANGLES'], faces);
    object.normals = new SimpleObject('normals', new Vertices().fromArray(FifthObject.normals));
    object.initialTranslation(Axis.TYPES.X, 5, true);
    object.endMatrix = [0, 0, 1, 0, 0, -1, 0, 0, 1, 0, 0, 0, 2, 0, 1, 1];
    textureCoords = new Vertices();
    textureCoords.fromTextureArray(FifthObject.textureCoords);
    texture = new Texture('images/third-task/fibonacci.jpg', textureCoords, 'GLSampler');
    object.textures.add('fibonacci', texture);
    return object;
  };

  return FifthObject;

})(Shape);
