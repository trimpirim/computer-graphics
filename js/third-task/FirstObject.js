var FirstObject,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

FirstObject = (function(superClass) {
  extend(FirstObject, superClass);

  function FirstObject() {
    return FirstObject.__super__.constructor.apply(this, arguments);
  }

  FirstObject.vertices = [[-1, 0, 0], [-1, -1, 0], [0, -1, 0], [0, 0, 0], [0, 1, 0], [-1, 0, -1], [0, 0, -1], [0, 1, -1], [1, 1, -1], [1, 0, -1], [0, -1, -1], [1, -1, -1], [-1, -1, -1], [-1, 0, 0], [-1, -1, 0], [-1, 0, -1], [-1, -1, -1], [0, -1, 0], [0, 0, 0], [1, -1, 0], [1, 0, 0], [0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [1, 0, -1], [1, 1, -1], [1, 1, 0], [1, 0, 0], [1, -1, 0], [1, 0, 0], [1, 0, -1], [1, -1, -1], [0, 1, 0], [1, 1, 0], [0, 1, -1], [1, 1, -1], [0, -1, 0], [1, -1, 0], [0, -1, -1], [1, -1, -1], [-1, -1, 0], [0, -1, 0], [0, -1, -1], [-1, -1, -1]];

  FirstObject.faces = [[0, 1, 2], [0, 2, 3], [0, 3, 5], [3, 5, 6], [3, 4, 6], [4, 6, 7], [5, 10, 12], [5, 6, 10], [6, 10, 11], [6, 9, 11], [7, 6, 9], [7, 8, 9], [13, 15, 16], [13, 14, 16], [17, 18, 19], [18, 19, 20], [21, 22, 23], [22, 23, 24], [25, 26, 28], [26, 27, 28], [29, 30, 31], [29, 31, 32], [33, 34, 35], [34, 35, 36], [37, 38, 39], [38, 39, 40], [41, 42, 43], [41, 43, 44]];

  FirstObject.textureCoords = [[0, 0.2], [0, 0], [0.2, 0], [0.2, 0.2], [1, 1], [1, 1], [0, 0], [1, 0], [0, 0], [1, 0], [1, 0], [0, 0], [0, 0], [1, 0.2], [1.0, 0.0], [0.8, 0.2], [0.8, 0.0], [0.2, 0], [0.2, 0.2], [0.4, 0], [0.4, 0.2], [0.2, 0.2], [0.4, 0.2], [0.2, 0.4], [0.4, 0.4], [0.2, 0.2], [0.2, 0.4], [0, 0.4], [0, 0.2], [0, 0], [0, 0.2], [0.2, 0.2], [0.2, 0], [0.8, 1.0], [0.6, 1.0], [0.8, 0.8], [0.6, 0.8], [0.8, 1.0], [0.6, 1.0], [0.8, 0.8], [0.6, 0.8], [1.0, 1.0], [0.8, 1.0], [0.8, 0.8], [1.0, 0.8]];

  FirstObject.normals = [[0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 1, 0], [-1, 0, -1], [0, 0, -1], [0, 1, -1], [1, 1, -1], [1, 0, -1], [0, -1, -1], [1, -1, -1], [-1, -1, -1], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0]];

  FirstObject.connectionsCoords = [[0, 0.2], [0, 0], [0.2, 0], [0.2, 0.2], [1, 1], [1, 1], [0, 0], [1, 0], [0, 0], [1, 0], [1, 0], [0, 0], [0, 0], [1, 0.2], [1.0, 0.0], [0.8, 0.2], [0.8, 0.0], [0.2, 0], [0.2, 0.2], [0.4, 0], [0.4, 0.2], [0.2, 0.2], [0.4, 0.2], [0.2, 0.4], [0.4, 0.4], [0.2, 0.2], [0.2, 0.4], [0, 0.4], [0, 0.2], [0, 0], [0, 0.2], [0.2, 0.2], [0.2, 0], [0.8, 1.0], [0.6, 1.0], [0.8, 0.8], [0.6, 0.8], [0.8, 1.0], [0.6, 1.0], [0.8, 0.8], [0.6, 0.8], [1.0, 1.0], [0.8, 1.0], [0.8, 0.8], [1.0, 0.8]];

  FirstObject.generate = function() {
    var faces, object, texture, vertices;
    vertices = new Vertices();
    vertices.fromArray(FirstObject.vertices);
    faces = new Vertices();
    faces.fromArray(FirstObject.faces);
    faces.faceColumnsCount();
    object = new ThirdTaskObject("first-object", vertices, GL.gl['TRIANGLES'], faces);
    object.normals = new SimpleObject('normals', new Vertices().fromArray(FirstObject.normals));
    object.initialTranslation(Axis.TYPES.X, -15, true);
    texture = new Texture('images/third-task/fibonacci.jpg', Texture.fromArray(FirstObject.textureCoords), 'GLSampler');
    object.textures.add('fibonacci', texture);
    object.endMatrix = [-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 5, 0, -3, 1];
    return object;
  };

  return FirstObject;

})(Shape);
