var Shaders,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Shaders = (function(superClass) {
  extend(Shaders, superClass);

  function Shaders() {
    Shaders.__super__.constructor.call(this);
    this.uniforms = new Uniforms();
    this.program = null;
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

  Shaders.prototype.addUniform = function(name, location, type) {
    return this.uniforms.add(name, location, type);
  };

  Shaders.prototype.createProgram = function(fs, vs) {
    var fShader, program, vShader;
    if (fs == null) {
      fs = 'shader-fs';
    }
    if (vs == null) {
      vs = 'shader-vs';
    }
    fShader = this.getShader(GL.gl, fs);
    vShader = this.getShader(GL.gl, vs);
    program = GL.gl.createProgram();
    GL.gl.attachShader(program, vShader);
    GL.gl.attachShader(program, fShader);
    GL.gl.linkProgram(program);
    if (!GL.gl.getProgramParameter(program, GL.gl.LINK_STATUS)) {
      console.log('CAN NOT INITIALISE SHADERS');
    }
    return program;
  };

  Shaders.prototype.useProgram = function(program) {
    this.program = program;
    return GL.gl.useProgram(this.program);
  };

  return Shaders;

})(ListObject);
