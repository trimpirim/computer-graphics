var StateObject,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

StateObject = (function(superClass) {
  extend(StateObject, superClass);

  function StateObject(name, vertices, mode, faces, coordinates, index) {
    this.name = name;
    this.vertices = vertices;
    this.mode = mode;
    this.faces = faces;
    this.coordinates = coordinates;
    this.index = index;
    StateObject.__super__.constructor.call(this, this.name, this.vertices, this.mode, this.faces, this.coordinates, this.index);
    this.translation = new TranslationState();
    this.rotation = new RotationState();
    this.scale = new ScaleState();
    this.endMatrix = mat4.create();
    this.transformationDone = false;
  }

  StateObject.prototype.rotate = function(which, amount) {
    switch (which) {
      case Axis.TYPES.X:
        return this.rotateX(amount);
      case Axis.TYPES.Y:
        return this.rotateY(amount);
      case Axis.TYPES.Z:
        return this.rotateZ(amount);
    }
  };

  StateObject.prototype.rotateX = function(amount, force) {
    if (force == null) {
      force = false;
    }
    this.rotation.change(Axis.TYPES.X, amount);
    if (force) {
      return this.modelMatrix = this.generateModel();
    } else {
      return mat4.rotate(this.modelMatrix, this.modelMatrix, MathUtils.toRadians(this.rotation.x), [1, 0, 0]);
    }
  };

  StateObject.prototype.rotateY = function(amount, force) {
    if (force == null) {
      force = false;
    }
    this.rotation.change(Axis.TYPES.Y, amount);
    if (force) {
      return this.modelMatrix = this.generateModel();
    } else {
      return mat4.rotate(this.modelMatrix, this.modelMatrix, MathUtils.toRadians(this.rotation.y), [0, 1, 0]);
    }
  };

  StateObject.prototype.rotateZ = function(amount, force) {
    if (force == null) {
      force = false;
    }
    this.rotation.change(Axis.TYPES.Z, amount);
    if (force) {
      return this.modelMatrix = this.generateModel();
    } else {
      return mat4.rotate(this.modelMatrix, this.modelMatrix, MathUtils.toRadians(this.rotation.z), [0, 0, 1]);
    }
  };

  StateObject.prototype.translateOnce = function(which, amount, force) {
    if (force == null) {
      force = true;
    }
    this.translate(which, amount, force);
    return this.translation.reset(which);
  };

  StateObject.prototype.translate = function(which, amount, force) {
    if (force == null) {
      force = false;
    }
    this.translation.change(which, amount);
    if (force) {
      return this.modelMatrix = this.generateModel();
    }
  };

  StateObject.prototype.scale = function(which, amount) {
    return this.scale.change(which, amount);
  };

  StateObject.prototype.increaseMatrixBy = function(matrix, amount) {
    var m;
    m = matrix.map((function(_this) {
      return function(item, key) {
        var abs, current, end, operator, start;
        start = +(item.toFixed(3));
        end = +(_this.endMatrix[key].toFixed(3));
        current = start;
        operator = amount;
        if (start > end) {
          abs = Math.abs(start - end);
          operator = abs < operator ? -abs : -operator;
        } else if (start < end) {
          abs = Math.abs(end - start);
          operator = abs < operator ? abs : operator;
        }
        if (start !== end) {
          current += operator;
        }
        return current;
      };
    })(this));
    this.transformationDone = Utils.array(m).equals(Utils.array(matrix));
    return m;
  };

  StateObject.prototype.generateModel = function() {
    var mat;
    mat = mat4.create();
    mat4.translate(mat, mat, this.translation.toArray());
    mat4.rotate(mat, mat, MathUtils.toRadians(this.rotation.x), [1, 0, 0]);
    mat4.rotate(mat, mat, MathUtils.toRadians(this.rotation.y), [0, 1, 0]);
    mat4.rotate(mat, mat, MathUtils.toRadians(this.rotation.z), [0, 0, 1]);
    return mat;
  };

  return StateObject;

})(SimpleObject);
