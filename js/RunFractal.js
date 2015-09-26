var RunFractal,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RunFractal = (function(superClass) {
  extend(RunFractal, superClass);

  function RunFractal() {
    this.gl = new GL();
  }

  RunFractal.prototype.run = function() {
    var createObj, first, second;
    createObj = (function(_this) {
      return function(count) {
        var color, colorVertices, faces, obj, vertices;
        vertices = new Vertices();
        vertices.fromArray(Fractal.vertices);
        faces = new Vertices();
        faces.fromArray(Fractal.faces);
        obj = new Object("object-" + count, vertices, GL.gl['TRIANGLES'], faces);
        colorVertices = new Vertices();
        colorVertices.fromArray(Fractal.colors);
        color = new Object('color', colorVertices);
        obj.color = color;
        return obj;

        /*obj.ondrag = (positions) ->
          matrix = mat4.create()
          mat4.identity matrix
          mat4.rotate matrix, matrix, MathUtils.toRadians(positions.deltas.x / 5), [0, 1, 0]
          mat4.rotate matrix, matrix, MathUtils.toRadians(positions.deltas.y / 5), [1, 0, 0]
          mat4.multiply @modelMatrix, matrix, @modelMatrix
         */
      };
    })(this);
    first = createObj(1);
    first.onkeydown = function(ev) {
      var matrix;
      switch (ev.keyCode) {
        case 32:
          matrix = mat4.create();
          mat4.identity(matrix);
          mat4.translate(matrix, matrix, [-1, 0, 0]);
          return mat4.multiply(this.modelMatrix, matrix, this.modelMatrix);
      }
    };
    second = createObj(2);
    second.onkeydown = function(ev) {
      var matrix;
      switch (ev.keyCode) {
        case 32:
          matrix = mat4.create();
          mat4.identity(matrix);
          mat4.translate(matrix, matrix, [1, 0, 0]);
          return mat4.multiply(this.modelMatrix, matrix, this.modelMatrix);
      }
    };
    this.gl.addObject(first);
    this.gl.addObject(second);
    this.gl.ondrag();
    this.gl.onkeydown();
    return this.gl.startGL();
  };

  return RunFractal;

})(Run);
