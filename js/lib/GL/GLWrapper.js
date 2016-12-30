var GL,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

GL = (function() {
  GL.gl = null;

  GL.canvas = null;

  GL.camera = null;

  GL.textures = null;

  GL.getGL = function() {
    return this.gl;
  };

  GL.setGL = function(gl) {
    return this.gl = gl;
  };

  GL.setCamera = function(camera) {
    if (this.camera == null) {
      return this.camera = camera;
    }
  };

  GL.setTextures = function(textures) {
    return this.textures = textures;
  };

  function GL() {
    this.runRenderLoop = bind(this.runRenderLoop, this);
    this.gl = null;
    this.camera = null;
    GL.canvas = document.getElementById('canvas');
    this.shaders = new Shaders();
    this.objects = new Objects();
    this.textures = null;
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
      this.setTextures(new Textures());
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

  GL.prototype.setCamera = function(camera) {
    GL.setCamera(camera);
    if (this.camera == null) {
      return this.camera = camera;
    }
  };

  GL.prototype.setTextures = function(textures) {
    GL.setTextures(textures);
    return this.textures = textures;
  };

  GL.prototype.addObject = function(obj) {
    return this.objects.add(obj);
  };

  GL.prototype.initObjects = function() {
    return this.objects.loopAll((function(_this) {
      return function(item) {
        item.addBuffers();
        item.compileBuffers();
        return item.textures.load();
      };
    })(this));
  };

  GL.prototype.drawScene = function() {
    this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    GL.setCamera(new Camera());
    GL.camera.draw();
    return this.loadObjects();
  };

  GL.prototype.loopOnlyShapes = function(callback) {
    return this.objects.loopOnlyShapes(function(item, index) {
      if (callback != null) {
        return callback(item);
      }
    });
  };

  GL.prototype.loadObjects = function() {
    return this.objects.loopOnlyShapes((function(_this) {
      return function(item, index) {
        Matrices.pushMatrix('modelViewMatrix');
        mat4.multiply(Matrices.getMatrix('modelViewMatrix'), Matrices.getMatrix('modelViewMatrix'), item.modelMatrix);
        if (item.color != null) {
          _this.loadColor(item.color);
        }
        _this.loadTextures(item.textures);
        if (item.normals != null) {
          _this.loadNormals(item.normals);
        }
        _this.loadBuffers(item);
        _this.shaders.uniforms.uniformMatrices(['GLProjectionMatrix', 'GLModelViewMatrix', 'GLNormalMatrix'], [Matrices.getMatrix('projectionMatrix'), Matrices.getMatrix('modelViewMatrix'), Matrices.getMatrix('modelViewMatrix')]);
        item.draw();
        return Matrices.popMatrix('modelViewMatrix');
      };
    })(this));
  };

  GL.prototype.loadNormals = function(normals) {
    return normals.buffers.loopAll((function(_this) {
      return function(buffer, key) {
        _this.gl.bindBuffer(buffer.target, buffer.buffer);
        _this.gl.enableVertexAttribArray(_this.shaders.get('GLNormal'));
        return _this.gl.vertexAttribPointer(_this.shaders.get('GLNormal'), normals.vertices.getColumnsCount(), _this.gl.FLOAT, false, 0, 0);
      };
    })(this));
  };

  GL.prototype.loadTextures = function(textures) {
    return textures.loopAll((function(_this) {
      return function(texture) {
        return texture.buffers.loopAll(function(buffer, key) {
          _this.textures.disableColor(_this.shaders.get('GLColor'));
          _this.gl.bindBuffer(buffer.target, buffer.buffer);
          _this.gl.enableVertexAttribArray(_this.shaders.get('GLTextureCoord'));
          _this.gl.vertexAttribPointer(_this.shaders.get('GLTextureCoord'), texture.vertices.getColumnsCount(), _this.gl.FLOAT, false, 0, 0);
          _this.textures.bind(texture);
          return _this.gl.uniform1i(_this.shaders.uniforms.get(texture.sampler).location, texture.id);
        });
      };
    })(this));
  };

  GL.prototype.loadColor = function(item) {
    return item.buffers.loopAll((function(_this) {
      return function(buffer, key) {
        _this.textures.bindWhiteAndDisable(_this.shaders.get('GLTextureCoord'));
        _this.gl.bindBuffer(buffer.target, buffer.buffer);
        _this.gl.enableVertexAttribArray(_this.shaders.get('GLColor'));
        return _this.gl.vertexAttribPointer(_this.shaders.get('GLColor'), item.vertices.getColumnsCount(), _this.gl.FLOAT, false, 0, 0);
      };
    })(this));
  };

  GL.prototype.loadBuffers = function(item) {
    return item.buffers.loopAll((function(_this) {
      return function(buffer, key) {
        _this.gl.bindBuffer(buffer.target, buffer.buffer);
        if (buffer.target === _this.gl.ARRAY_BUFFER) {
          _this.gl.enableVertexAttribArray(_this.shaders.get('GLPosition'));
          return _this.gl.vertexAttribPointer(_this.shaders.get('GLPosition'), item.vertices.getColumnsCount(), _this.gl.FLOAT, false, 0, 0);
        }
      };
    })(this));
  };

  GL.prototype.attributeLocation = function(attr) {
    return this.gl.getAttribLocation(this.shaders.program, attr);
  };

  GL.prototype.uniformLocation = function(uniform) {
    return this.gl.getUniformLocation(this.shaders.program, uniform);
  };

  GL.prototype.create = function() {
    if (this.gl == null) {
      return this.initGL();
    }
  };

  GL.prototype.createObjects = function() {
    return this.initObjects();
  };

  GL.prototype.doRest = function() {
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.depthFunc(this.gl.LEQUAL);
    return this.runRenderLoop();
  };

  GL.prototype.runRenderLoop = function() {
    requestAnimFrame(this.runRenderLoop);
    this.ondraw();
    return this.drawScene();
  };

  GL.prototype.ondrag = function() {
    this.draggable = new Draggable(GL.canvas);
    return this.draggable.ondrag = (function(_this) {
      return function(positions) {
        _this.objects.loopOnlyShapes(function(item) {
          if (item.ondrag != null) {
            return item.ondrag(positions);
          }
        });
        return GL.camera.ondrag(positions);
      };
    })(this);
  };

  GL.prototype.onkeydown = function() {
    return GL.canvas.addEventListener('keydown', (function(_this) {
      return function(ev) {
        _this.objects.loopOnlyShapes(function(item) {
          if (item.onkeydown != null) {
            return item.onkeydown(ev);
          }
        });
        return GL.camera.update(ev);
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

  GL.prototype.onredraw = function() {
    return this.objects.loopOnlyShapes(function(item) {
      if (item.onredraw != null) {
        return item.onredraw();
      }
    });
  };

  return GL;

})();
