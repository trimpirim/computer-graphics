var Uniform;

Uniform = (function() {
  function Uniform(name, location) {
    this.name = name;
    this.location = location;
  }

  Uniform.prototype.uniformMatrix = function(matrix) {
    return GL.gl.uniformMatrix4fv(this.location, false, matrix);
  };

  return Uniform;

})();
