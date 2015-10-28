var Camera, Rotation, Translation,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Translation = (function(superClass) {
  extend(Translation, superClass);

  function Translation(x, y, z) {
    this.x = x != null ? x : 0;
    this.y = y != null ? y : 0;
    this.z = z != null ? z : 0;
    Translation.__super__.constructor.call(this, this.x, this.y, this.z);
  }

  return Translation;

})(Vertex);

Rotation = (function(superClass) {
  extend(Rotation, superClass);

  function Rotation(x, y, z) {
    this.x = x != null ? x : 0;
    this.y = y != null ? y : 0;
    this.z = z != null ? z : 0;
    Rotation.__super__.constructor.call(this, this.x, this.y, this.z);
  }

  return Rotation;

})(Vertex);

Camera = (function() {
  function Camera() {
    this.translation = new Translation(0, 0, -15);
    this.rotation = new Rotation(90);
  }

  Camera.prototype.draw = function() {
    mat4.perspective(Matrices.getMatrix('projectionMatrix'), 45, GL.gl.viewportWidth / GL.gl.viewportHeight, 0.1, 1000.0);
    mat4.identity(Matrices.getMatrix('modelViewMatrix'));
    mat4.translate(Matrices.getMatrix('modelViewMatrix'), Matrices.getMatrix('modelViewMatrix'), this.translation.toArray());
    mat4.rotateY(Matrices.getMatrix('modelViewMatrix'), Matrices.getMatrix('modelViewMatrix'), MathUtils.toRadians(this.rotation.y));
    mat4.rotateX(Matrices.getMatrix('modelViewMatrix'), Matrices.getMatrix('modelViewMatrix'), MathUtils.toRadians(this.rotation.x));
    return mat4.rotateZ(Matrices.getMatrix('modelViewMatrix'), Matrices.getMatrix('modelViewMatrix'), MathUtils.toRadians(this.rotation.z));
  };

  Camera.prototype.update = function(ev) {
    switch (ev.which) {
      case 33:
        return this.translation.decrease('y', 1);
      case 34:
        return this.translation.increase('y', 1);
      case 37:
        return this.translation.increase('x', 1);
      case 39:
        return this.translation.decrease('x', 1);
      case 38:
        return this.translation.increase('z', 1);
      case 40:
        return this.translation.decrease('z', 1);
      case 100:
        return this.rotation.increase('y', 1);
      case 102:
        return this.rotation.decrease('y', 1);
      case 98:
        return this.rotation.decrease('x', 1);
      case 104:
        return this.rotation.increase('x', 1);
    }
  };

  return Camera;

})();
