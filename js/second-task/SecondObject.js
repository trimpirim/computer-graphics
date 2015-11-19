var SecondObject,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SecondObject = (function(superClass) {
  extend(SecondObject, superClass);

  function SecondObject() {
    return SecondObject.__super__.constructor.apply(this, arguments);
  }

  SecondObject.vertices = [[-1, 0, 0], [-1, -1, 0], [0, -1, 0], [0, 0, 0], [1, -1, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [-1, 0, -1], [0, 0, -1], [0, 1, -1], [1, 1, -1], [1, 0, -1], [0, -1, -1], [1, -1, -1], [-1, -1, -1], [-2, 0, 0], [-2, -1, 0], [-2, 0, -1], [-2, -1, -1]];

  SecondObject.faces = [[0, 1, 2], [0, 2, 3], [2, 3, 4], [3, 4, 5], [3, 5, 6], [5, 6, 7], [0, 3, 8], [3, 8, 9], [3, 6, 9], [6, 9, 10], [6, 7, 10], [7, 10, 11], [5, 7, 11], [5, 11, 12], [10, 9, 12], [10, 11, 12], [2, 4, 13], [4, 13, 14], [1, 2, 13], [1, 13, 15], [8, 13, 15], [8, 9, 13], [9, 13, 14], [9, 12, 14], [4, 5, 12], [4, 12, 14], [0, 1, 16], [1, 16, 17], [0, 8, 16], [8, 16, 18], [8, 15, 18], [15, 18, 19], [1, 15, 19], [1, 17, 19], [16, 18, 19], [16, 17, 19]];

  SecondObject.colors = [[1.0, 1.0, 0.0], [1.0, 1.0, 0.0], [1.0, 1.0, 0.0], [1.0, 1.0, 0.0], [1.0, 1.0, 0.0], [1.0, 1.0, 0.0], [1.0, 1.0, 0.0], [1.0, 1.0, 0.0], [1.0, 1.0, 0.0], [1.0, 1.0, 0.0], [1.0, 1.0, 0.0], [1.0, 1.0, 0.0], [1.0, 1.0, 0.0], [1.0, 1.0, 0.0], [1.0, 1.0, 0.0], [1.0, 1.0, 0.0], [1.0, 1.0, 0.0], [1.0, 1.0, 0.0], [1.0, 1.0, 0.0], [1.0, 1.0, 0.0]];

  SecondObject.generate = function() {
    var color, faces, object, vertices;
    vertices = new Vertices();
    vertices.fromArray(SecondObject.vertices);
    faces = new Vertices();
    faces.fromArray(SecondObject.faces);
    object = new StateObject("second-object", vertices, GL.gl['TRIANGLES'], faces);
    object.initialTranslation(Axis.TYPES.X, -10, true);
    color = new Vertices();
    color.fromArray(SecondObject.colors);
    color = new SimpleObject('color', color);
    object.color = color;
    object.endMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 3, 0, 1, 1];

    /*object.ondrag = (positions) ->
      @rotateY positions.deltas.x / 5
      @rotateX positions.deltas.y / 5
     */

    /*object.onkeydown = (ev) ->
      switch ev.which
        when 16
          interval = setInterval =>
            clearInterval interval if @transformationDone
            @modelMatrix = @increaseMatrixBy @modelMatrix, 0.1
          , 10
        when 70
          mat4.translate @modelMatrix, @modelMatrix, [13, 0, 1]
          mat4.rotate @modelMatrix, @modelMatrix, MathUtils.toRadians(0), [0, 1, 0]
     */
    return object;
  };

  return SecondObject;

})(Shape);
