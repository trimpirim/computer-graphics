var Vertex2;

Vertex2 = (function() {
  function Vertex2(x, y) {
    this.x = x;
    this.y = y;
  }

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

  return Vertex2;

})();
