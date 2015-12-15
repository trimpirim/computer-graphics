var Uniform;

Uniform = (function() {
  Uniform.TYPES = {
    DEFAULT: 'default',
    NORMALS: 'normals'
  };

  function Uniform(name, location, type) {
    this.name = name;
    this.location = location;
    this.type = type != null ? type : Uniform.TYPES.DEFAULT;
  }

  Uniform.prototype.uniformMatrixByType = function(matrix) {
    switch (this.type) {
      case Uniform.TYPES.DEFAULT:
        return this.uniformMatrix(matrix);
      case Uniform.TYPES.NORMALS:
        return this.uniformNormalMatrix(matrix);
      default:
        return this.uniformMatrix(matrix);
    }
  };

  Uniform.prototype.uniformMatrix = function(matrix) {
    return GL.gl.uniformMatrix4fv(this.location, false, matrix);
  };

  Uniform.prototype.uniformNormalMatrix = function(matrix) {
    var normal;
    normal = mat4.create();
    normal = mat4.invert(normal, matrix);
    normal = mat4.transpose(normal, normal);
    return GL.gl.uniformMatrix4fv(this.location, false, normal);
  };

  return Uniform;

})();
