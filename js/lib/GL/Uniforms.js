var Uniforms,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Uniforms = (function(superClass) {
  extend(Uniforms, superClass);

  function Uniforms() {
    Uniforms.__super__.constructor.call(this);
  }

  Uniforms.prototype.add = function(name, location, type) {
    return this.addObject(name, new Uniform(name, location, type));
  };

  Uniforms.prototype.uniformMatrices = function(names, matrices) {
    var i, key, len, name, results, uniform;
    results = [];
    for (key = i = 0, len = names.length; i < len; key = ++i) {
      name = names[key];
      uniform = this.get(name);
      results.push(uniform.uniformMatrixByType(matrices[key]));
    }
    return results;
  };

  return Uniforms;

})(ListObject);
