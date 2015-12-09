var SeventhObject,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SeventhObject = (function(superClass) {
  extend(SeventhObject, superClass);

  function SeventhObject() {
    return SeventhObject.__super__.constructor.apply(this, arguments);
  }

  SeventhObject.vertices = [[-1, 1, 1], [-1, 0, 1], [0, 0, 1], [0, 1, 1], [1, 0, 1], [1, 1, 1], [0, 2, 1], [1, 2, 1], [-1, 1, 0], [0, 1, 0], [0, 2, 0], [1, 2, 0], [1, 1, 0], [0, 0, 0], [1, 0, 0], [-1, 0, 0], [1, -1, 1], [0, -1, 1], [0, -1, 0], [1, -1, 0], [0, 0, -1], [0, 1, -1], [1, 1, -1], [1, 0, -1], [0, 0, -1], [1, 0, -1], [0, 1, -1], [1, 1, -1]];

  SeventhObject.faces = [[0, 1, 2], [0, 2, 3], [2, 3, 4], [3, 4, 5], [0, 3, 8], [3, 8, 9], [1, 2, 13], [1, 13, 15], [0, 8, 15], [0, 1, 15], [4, 5, 12], [4, 12, 14], [3, 5, 9], [5, 9, 12], [2, 4, 16], [2, 16, 17], [2, 13, 17], [13, 17, 18], [4, 14, 16], [14, 16, 19], [13, 14, 18], [14, 18, 19], [16, 17, 18], [16, 18, 19], [8, 13, 15], [8, 9, 13], [9, 13, 20], [9, 20, 21], [9, 12, 21], [12, 21, 22], [12, 14, 22], [14, 22, 23], [13, 14, 23], [13, 20, 23], [24, 25, 26], [25, 26, 27]];


  /*[13, 15, 20]
    [13, 20, 21]
    [8, 15, 20]
    [8, 20, 22]
    [13, 21, 23]
    [9, 13, 23]
    [8, 9, 23]
    [8, 22, 23]
    [20, 22, 23]
    [20, 21, 23]
   */

  SeventhObject.normals = [[-1, 1], [-1, 0], [0, 0], [0, 1], [1, 0], [1, 1], [0, 2], [1, 2], [-1, 1], [0, 1], [0, 2], [1, 2], [1, 1], [0, 0], [1, 0], [-1, 0], [1, -1], [0, -1], [0, -1], [1, -1], [0, 0], [0, 1], [1, 1], [1, 0], [0.2, 0.2], [0, 0.2], [0.2, 0.4], [0, 0.4]];

  SeventhObject.generate = function() {
    var faces, normals, object, texture, vertices;
    vertices = new Vertices();
    vertices.fromArray(SeventhObject.vertices);
    faces = new Vertices();
    faces.fromArray(SeventhObject.faces);
    object = new ThirdTaskObject("seventh-object", vertices, GL.gl['TRIANGLES'], faces);
    object.initialTranslation(Axis.TYPES.X, 15, true);
    object.endMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 5, 0, -2, 1];
    normals = new Vertices();
    normals.fromNormalsArray(SeventhObject.normals);
    normals = new SimpleObject('normals', normals);
    object.normals = normals;
    texture = new Texture('images/third-task/fibonacci.jpg');
    object.texture = texture;
    return object;
  };

  return SeventhObject;

})(Shape);
