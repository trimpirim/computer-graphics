var SecondObject,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SecondObject = (function(superClass) {
  extend(SecondObject, superClass);

  function SecondObject() {
    return SecondObject.__super__.constructor.apply(this, arguments);
  }

  SecondObject.vertices = [[-1, 0, 0], [-1, -1, 0], [0, -1, 0], [0, 0, 0], [1, -1, 0], [1, 0, 0], [0, 1, 0], [-1, 0, -1], [0, 0, -1], [0, 1, -1], [1, 1, -1], [1, 0, -1], [0, -1, -1], [1, -1, -1], [-1, -1, -1], [-2, 0, 0], [-2, -1, 0], [-2, 0, -1], [1, 0, 0], [1, 1, 0], [1, 1, -1], [1, 0, -1], [-1, -1, 0], [0, -1, 0], [0, -1, -1], [-1, -1, -1], [1, -1, 0], [1, 0, 0], [1, 0, -1], [1, -1, -1], [-1, -1, 0], [-1, -1, -1], [-2, -1, 0], [-2, -1, -1], [-2, 0, 0], [-2, -1, 0], [-2, 0, -1], [-2, -1, -1], [-1, 0, -1], [-1, -1, -1], [-2, 0, -1], [-2, -1, -1], [0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [0, 1, 0], [1, 1, 0], [0, 1, -1], [1, 1, -1], [0, -1, 0], [1, -1, 0], [0, -1, -1], [1, -1, -1]];

  SecondObject.faces = [[0, 1, 2], [0, 2, 3], [0, 1, 15], [1, 15, 16], [2, 3, 4], [3, 4, 5], [0, 3, 7], [3, 7, 8], [3, 6, 8], [6, 8, 9], [7, 12, 14], [7, 8, 12], [0, 7, 15], [7, 15, 17], [8, 12, 13], [8, 11, 13], [9, 8, 11], [9, 10, 11], [18, 19, 20], [18, 20, 21], [22, 23, 24], [22, 24, 25], [26, 27, 28], [26, 28, 29], [30, 31, 33], [30, 32, 33], [34, 35, 37], [34, 36, 37], [38, 39, 40], [39, 40, 41], [42, 43, 44], [43, 44, 45], [46, 47, 48], [47, 48, 49], [50, 51, 52], [51, 52, 53]];

  SecondObject.textureCoords = [[0, 0], [1, 1], [0.4, 0.0], [0.4, 0.2], [0.6, 0.0], [0.6, 0.2], [0, 0], [0, 1], [0, 0], [0, 1], [1, 1], [1, 0], [0, -1], [1, -1], [0, 0], [1, 0], [0, 1], [1, 1], [0.2, 0.2], [0.2, 0.4], [0.4, 0.4], [0.4, 0.2], [0.2, 0.2], [0.4, 0.2], [0.4, 0.4], [0.2, 0.4], [0.2, 0], [0.2, 0.2], [0.4, 0.2], [0.4, 0], [0.2, 0.2], [0.2, 0.4], [0.0, 0.2], [0.0, 0.4], [0.8, 0.2], [0.8, 0], [0.6, 0.2], [0.6, 0], [0.8, 0.2], [0.8, 0], [1.0, 0.2], [1.0, 0], [0.4, 0.2], [0.6, 0.2], [0.4, 0.4], [0.6, 0.4], [0.4, 0.2], [0.6, 0.2], [0.4, 0.4], [0.6, 0.4], [0.4, 0.2], [0.6, 0.2], [0.4, 0.4], [0.6, 0.4]];

  SecondObject.normals = [[-1, 0, 0], [-1, -1, 0], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 1, 0], [-1, 0, -1], [0, 0, -1], [0, 1, -1], [1, 1, -1], [1, 0, -1], [0, -1, -1], [1, -1, -1], [-1, -1, -1], [-2, 0, 0], [-2, -1, 0], [-2, 0, -1], [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0]];

  SecondObject.generate = function() {
    var faces, object, texture, textureCoords, vertices;
    vertices = new Vertices();
    vertices.fromArray(SecondObject.vertices);
    faces = new Vertices();
    faces.fromArray(SecondObject.faces);
    faces.columnsCount = 1;
    object = new ThirdTaskObject("second-object", vertices, GL.gl['TRIANGLES'], faces);
    object.normals = new SimpleObject('normals', new Vertices().fromArray(SecondObject.normals));
    object.initialTranslation(Axis.TYPES.X, -10, true);
    textureCoords = new Vertices();
    textureCoords.fromTextureArray(SecondObject.textureCoords);
    texture = new Texture('images/third-task/fibonacci.jpg', textureCoords, 'GLSampler');
    object.textures.add('fibonacci', texture);
    object.endMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 3, 0, 1, 1];
    return object;
  };

  return SecondObject;

})(Shape);
