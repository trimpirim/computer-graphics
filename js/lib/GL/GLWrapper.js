var GL,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

GL = (function() {
  GL.gl = null;

  GL.canvas = null;

  GL.getGL = function() {
    return this.gl;
  };

  GL.setGL = function(gl) {
    return this.gl = gl;
  };

  function GL() {
    this.drawSceneAndAnimate = bind(this.drawSceneAndAnimate, this);
    this.gl = null;
    GL.canvas = document.getElementById('canvas');
    this.shaders = new Shaders();
    this.objects = new Objects();
    this.shaderProgram = null;
    this.initGL();
  }

  GL.prototype.initGL = function(canvas) {
    var e, error, gl, xyOfScreen;
    if (canvas == null) {
      canvas = GL.canvas;
    }
    try {
      gl = canvas.getContext('experimental-webgl');
      this.setGL(gl);
      xyOfScreen = Utils.getXYOfScreen();
      GL.canvas.width = xyOfScreen.x;
      GL.canvas.height = xyOfScreen.y;
      this.gl.viewportWidth = xyOfScreen.x;
      this.gl.viewportHeight = xyOfScreen.y;
    } catch (error) {
      e = error;
      console.log("Error initializing GL: " + e);
    }
    if (this.gl == null) {
      return console.log("Error initializing GL.");
    }
  };

  GL.prototype.setGL = function(gl) {
    GL.setGL(gl);
    return this.gl = gl;
  };

  GL.prototype.initShaders = function() {
    var fShader, vShader;
    fShader = this.shaders.getShader(this.gl, 'shader-fs');
    vShader = this.shaders.getShader(this.gl, 'shader-vs');
    this.shaderProgram = this.gl.createProgram();
    this.gl.attachShader(this.shaderProgram, vShader);
    this.gl.attachShader(this.shaderProgram, fShader);
    this.gl.linkProgram(this.shaderProgram);
    if (!this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)) {
      console.log('CAN NOT INITIALISE SHADERS');
    }
    this.gl.useProgram(this.shaderProgram);
    this.shaderProgram.vertexPositionAttribute = this.gl.getAttribLocation(this.shaderProgram, 'aVertexPosition');
    this.gl.enableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);
    this.shaderProgram.vertexColorAttribute = this.gl.getAttribLocation(this.shaderProgram, "aVertexColor");
    this.gl.enableVertexAttribArray(this.shaderProgram.vertexColorAttribute);
    this.shaderProgram.pMatrixUniform = this.gl.getUniformLocation(this.shaderProgram, 'uPMatrix');
    this.shaderProgram.mvMatrixUniform = this.gl.getUniformLocation(this.shaderProgram, 'uMVMatrix');
    return this.shaderProgram.pointSize = this.gl.getUniformLocation(this.shaderProgram, 'pointSize');
  };

  GL.prototype.setMatricesUniforms = function() {};

  GL.prototype.setMatrixUniform = function(shaderMatrixUniform, matrix) {
    return this.gl.uniformMatrix4fv(shaderMatrixUniform, false, matrix);
  };

  GL.prototype.addObject = function(obj) {
    return this.objects.add(obj);
  };

  GL.prototype.initObjects = function() {
    return this.objects.loopAll((function(_this) {
      return function(item) {
        item.buffers.addVertex('vertices', item.vertices.toArray());
        if (item.color != null) {
          item.color.buffers.addVertex('vertices', item.color.vertices.toArray());
        }
        if (item.faces != null) {
          item.buffers.addIndex('indices', item.faces.toArray());
        }
        item.compileBuffers();
        if (item.color != null) {
          return item.color.compileBuffers();
        }
      };
    })(this));
  };

  GL.prototype.drawScene = function() {
    this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    mat4.perspective(Matrices.getMatrix('projectionMatrix'), 45, this.gl.viewportWidth / this.gl.viewportHeight, 0.1, 1000.0);
    mat4.identity(Matrices.getMatrix('modelViewMatrix'));
    mat4.translate(Matrices.getMatrix('modelViewMatrix'), Matrices.getMatrix('modelViewMatrix'), [0, 0, -1]);
    this.setMatrixUniform(this.shaderProgram.pMatrixUniform, Matrices.getMatrix('projectionMatrix'));
    return this.loadObjects();
  };

  GL.prototype.loadObjects = function() {
    this.gl.uniform1f(this.shaderProgram.pointSize, 5.0);
    return this.objects.loopOnlyShapes((function(_this) {
      return function(item, index) {
        Matrices.pushMatrix('modelViewMatrix');
        if (item.coordinates != null) {
          mat4.translate(Matrices.getMatrix('modelViewMatrix'), item.coordinates);
        }
        mat4.multiply(Matrices.getMatrix('modelViewMatrix'), Matrices.getMatrix('modelViewMatrix'), item.modelMatrix);
        _this.loadBuffers(item);
        if (item.color != null) {
          _this.loadColor(item.color);
        }
        _this.setMatrixUniform(_this.shaderProgram.pMatrixUniform, Matrices.getMatrix('projectionMatrix'));
        _this.setMatrixUniform(_this.shaderProgram.mvMatrixUniform, Matrices.getMatrix('modelViewMatrix'));
        item.draw();
        return Matrices.popMatrix('modelViewMatrix');
      };
    })(this));
  };

  GL.prototype.loadColor = function(item) {
    return item.buffers.loopAll((function(_this) {
      return function(buffer, key) {
        _this.gl.bindBuffer(buffer.target, buffer.buffer);
        return _this.gl.vertexAttribPointer(_this.shaderProgram.vertexColorAttribute, item.vertices.getColumnsCount(), _this.gl.FLOAT, false, 0, 0);
      };
    })(this));
  };

  GL.prototype.loadBuffers = function(item) {
    return item.buffers.loopAll((function(_this) {
      return function(buffer, key) {
        _this.gl.bindBuffer(buffer.target, buffer.buffer);
        if (buffer.target === _this.gl.ARRAY_BUFFER) {
          return _this.gl.vertexAttribPointer(_this.shaderProgram.vertexPositionAttribute, item.vertices.getColumnsCount(), _this.gl.FLOAT, false, 0, 0);
        }
      };
    })(this));
  };

  GL.prototype.loadObject = function(item) {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, item.buffer);
    return this.gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, item.columnsCount, this.gl.FLOAT, false, 0, 0);
  };

  GL.prototype.startGL = function() {
    if (this.gl == null) {
      this.initGL();
    }
    this.initShaders();
    this.initObjects();
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.drawSceneAndAnimate();
    return this.ondraw();
  };

  GL.prototype.drawSceneAndAnimate = function() {
    requestAnimFrame(this.drawSceneAndAnimate);
    return this.drawScene();
  };

  GL.prototype.ondrag = function() {
    this.draggable = new Draggable(GL.canvas);
    return this.draggable.ondrag = (function(_this) {
      return function(positions) {
        return _this.objects.loopOnlyShapes(function(item) {
          if (item.ondrag != null) {
            return item.ondrag(positions);
          }
        });
      };
    })(this);
  };

  GL.prototype.onkeydown = function() {
    return GL.canvas.addEventListener('keydown', (function(_this) {
      return function(ev) {
        return _this.objects.loopOnlyShapes(function(item) {
          if (item.onkeydown != null) {
            return item.onkeydown(ev);
          }
        });
      };
    })(this), false);
  };

  GL.prototype.ondraw = function() {
    return this.objects.loopOnlyShapes(function(item) {
      if (item.ondraw != null) {
        return item.ondraw();
      }
    });
  };

  return GL;

})();
