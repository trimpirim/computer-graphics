var Vertex2;

Vertex2 = (function() {
  function Vertex2(x, y) {
    this.x = x;
    this.y = y;
    this.originals = {
      x: this.x,
      y: this.y
    };
    this.changed = {
      x: 0,
      y: 0
    };
  }

  Vertex2.prototype.original = function(which, amount) {
    if (amount != null) {
      this.originals[which] = amount;
      this.changed[which] = amount;
    }
    return this.originals[which];
  };

  Vertex2.prototype.fromArray = function(array) {
    if (array[0] != null) {
      this.x = array[0];
    }
    if (array[1] != null) {
      return this.y = array[1];
    }
  };

  Vertex2.prototype.loopAll = function(callback) {
    if (callback != null) {
      callback(this.x);
    }
    if (callback != null) {
      return callback(this.y);
    }
  };

  Vertex2.prototype.isFull = function() {
    if ((this.x != null) && (this.y != null)) {
      return true;
    } else {
      return false;
    }
  };

  Vertex2.prototype.length = function() {
    return 2;
  };

  Vertex2.prototype.loadCoordinate = function(coordinate) {
    if (this.x == null) {
      return this.x = coordinate;
    } else if (this.y == null) {
      return this.y = coordinate;
    }
  };

  Vertex2.prototype.toArray = function() {
    return [this.x, this.y];
  };

  Vertex2.prototype.increase = function(which, amount) {
    return this[which] += amount;
  };

  Vertex2.prototype.decrease = function(which, amount) {
    return this[which] -= amount;
  };

  Vertex2.prototype.change = function(which, value) {
    if (this[which] != null) {
      this[which] = value;
      return this.changed[which] += value;
    }
  };

  Vertex2.prototype.reset = function(which, force) {
    if (force == null) {
      force = false;
    }
    if (this[which] != null) {
      if (!force) {
        return this[which] = this.original[which];
      } else {
        return this[which] = 0;
      }
    }
  };

  return Vertex2;

})();
