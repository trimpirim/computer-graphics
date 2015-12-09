var Shaders,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Shaders = (function(superClass) {
  extend(Shaders, superClass);

  function Shaders() {
    Shaders.__super__.constructor.call(this);
    this.uniforms = new Uniforms();
  }

  Shaders.prototype.getShaderTypeAndContent = function(id) {
    var result, shaderScript;
    shaderScript = document.getElementById(id);
    if (shaderScript == null) {
      return null;
    }
    return result = {
      type: this.getShaderType(shaderScript),
      content: this.getShaderContent(shaderScript)
    };
  };

  Shaders.prototype.getShaderContent = function(script) {
    var fChild, str;
    str = '';
    fChild = script.firstChild;
    while (fChild) {
      if (fChild.nodeType === 3) {
        str += fChild.textContent;
      }
      fChild = fChild.nextSibling;
    }
    return str;
  };

  Shaders.prototype.getShaderType = function(script) {
    var type;
    if (script.type === 'x-shader/x-fragment') {
      type = 'FRAGMENT_SHADER';
    } else if (script.type === 'x-shader/x-vertex') {
      type = 'VERTEX_SHADER';
    }
    return type;
  };

  Shaders.prototype.getShader = function(gl, id) {
    var shader, shaderTypeAndContent, status;
    shader = null;
    shaderTypeAndContent = this.getShaderTypeAndContent(id);
    shader = gl.createShader(gl[shaderTypeAndContent.type]);
    gl.shaderSource(shader, shaderTypeAndContent.content);
    gl.compileShader(shader);
    status = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!status) {
      console.log(gl.getShaderInfoLog(shader));
    }
    if (!status) {
      return null;
    }
    return shader;
  };

  Shaders.prototype.addUniform = function(name, location) {
    return this.uniforms.add(name, location);
  };

  return Shaders;

})(ListObject);
