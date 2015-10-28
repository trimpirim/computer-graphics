var TransformationState;

TransformationState = (function() {
  function TransformationState(x, y, z) {
    if (x == null) {
      x = 0;
    }
    if (y == null) {
      y = 0;
    }
    if (z == null) {
      z = 0;
    }
    this.current = {
      x: x,
      y: y,
      z: z
    };
  }

  TransformationState.prototype.increase = function(amount, which) {
    if (exists(which)) {
      return false;
    }
    return this.current[which] += amount;
  };

  TransformationState.prototype.decrease = function(amount, which) {
    if (exists(which)) {
      return false;
    }
    return this.current[which] -= amount;
  };

  TransformationState.prototype.exists = function(which) {
    return this.current[which];
  };

  return TransformationState;

})();
