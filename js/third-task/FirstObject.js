var FirstObject,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

FirstObject = (function(superClass) {
  extend(FirstObject, superClass);

  function FirstObject() {
    return FirstObject.__super__.constructor.apply(this, arguments);
  }

  FirstObject.vertices = [[-1, 0, 0], [-1, -1, 0], [0, -1, 0], [0, 0, 0], [1, -1, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [-1, 0, -1], [0, 0, -1], [0, 1, -1], [1, 1, -1], [1, 0, -1], [0, -1, -1], [1, -1, -1], [-1, -1, -1], [1, 1, -1], [1, 1, 0], [1, 0, 0], [-1, 0, 0], [-1, -1, 0], [-1, 0, -1], [-1, -1, -1], [1, -1, -1], [0, -1, 0], [0, 0, 0], [1, -1, 0], [1, 0, 0], [0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [1, 0, -1], [1, 1, -1], [1, 1, 0], [1, 0, 0], [1, -1, 0], [1, 0, 0], [1, 0, -1], [1, -1, -1]];

  FirstObject.faces = [[6, 7, 10], [7, 10, 11]];

  FirstObject.normals = [[0, 0.2], [0, 0], [0.2, 0], [0.2, 0.2], [1, 0], [1, 1], [1, 1], [0, 1], [1, 1], [0, 0], [1, 0], [0, 0], [1, 0], [1, 0], [0, 0], [0, 0], [1, 1], [0, 1], [0, 0], [1, 0.2], [1.0, 0.0], [0.8, 0.2], [0.8, 0.0], [1, 1], [0.2, 0], [0.2, 0.2], [0.4, 0], [0.4, 0.2], [0.2, 0.2], [0.4, 0.2], [0.2, 0.4], [0.4, 0.4], [0.2, 0.2], [0.2, 0.4], [0, 0.4], [0, 0.2], [0, 0], [0, 0.2], [0.2, 0.2], [0.2, 0]];

  FirstObject.generate = function() {
    var faces, normals, object, texture, vertices;
    vertices = new Vertices();
    vertices.fromArray(FirstObject.vertices);
    faces = new Vertices();
    faces.fromArray(FirstObject.faces);
    faces.faceColumnsCount();
    object = new ThirdTaskObject("first-object", vertices, GL.gl['TRIANGLES'], faces);
    object.initialTranslation(Axis.TYPES.X, -15, true);
    normals = new Vertices();
    normals.fromNormalsArray(FirstObject.normals);
    normals = new SimpleObject('normals', normals);
    object.normals = normals;
    texture = new Texture('images/third-task/fibonacci.jpg');
    object.texture = texture;

    /*color = new SimpleObject 'color', color
    object.color = color
     */
    object.endMatrix = [-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 5, 0, -3, 1];
    return object;
  };

  return FirstObject;

})(Shape);
