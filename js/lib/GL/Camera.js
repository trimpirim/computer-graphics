var Camera;

Camera = (function() {
  function Camera(rotation, translation, scale) {
    if (rotation == null) {
      rotation = {
        x: 0,
        y: 0,
        z: 0
      };
    }
    if (translation == null) {
      translation = {
        x: 0,
        y: 0,
        z: -15
      };
    }
    if (scale == null) {
      scale = {
        x: 1,
        y: 1,
        z: 1
      };
    }
    this.translation = new TranslationState(translation.x, translation.y, translation.z);
    this.rotation = new RotationState(rotation.x, rotation.y, rotation.z);
    this.scale = new ScaleState(scale.x, scale.y, scale.z);
  }

  Camera.prototype.draw = function() {
    mat4.perspective(Matrices.getMatrix('projectionMatrix'), 45, GL.gl.viewportWidth / GL.gl.viewportHeight, 0.1, 1000.0);
    mat4.identity(Matrices.getMatrix('modelViewMatrix'));
    mat4.translate(Matrices.getMatrix('modelViewMatrix'), Matrices.getMatrix('modelViewMatrix'), this.translation.toArray());
    mat4.rotateY(Matrices.getMatrix('modelViewMatrix'), Matrices.getMatrix('modelViewMatrix'), MathUtils.toRadians(this.rotation.y));
    mat4.rotateX(Matrices.getMatrix('modelViewMatrix'), Matrices.getMatrix('modelViewMatrix'), MathUtils.toRadians(this.rotation.x));
    mat4.rotateZ(Matrices.getMatrix('modelViewMatrix'), Matrices.getMatrix('modelViewMatrix'), MathUtils.toRadians(this.rotation.z));
    return mat4.scale(Matrices.getMatrix('modelViewMatrix'), Matrices.getMatrix('modelViewMatrix'), [this.scale.x, this.scale.y, this.scale.z]);
  };

  Camera.prototype.ondrag = function(positions) {
    this.rotation.increase(Axis.TYPES.Y, positions.deltas.x / 5);
    return this.rotation.increase(Axis.TYPES.X, positions.deltas.y / 5);
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
      case 49:
        return this.scale.increase('x', 0.05);
      case 50:
        return this.scale.increase('y', 0.05);
      case 51:
        return this.scale.increase('z', 0.05);
      case 52:
        return this.scale.decrease('x', 0.05);
      case 53:
        return this.scale.decrease('y', 0.05);
      case 54:
        return this.scale.decrease('z', 0.05);
    }
  };

  return Camera;

})();
