var RunThirdTask,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RunThirdTask = (function(superClass) {
  extend(RunThirdTask, superClass);

  function RunThirdTask() {
    this.gl = new GL();
    this.sliders = {};
    this.dropdowns = {};
  }

  RunThirdTask.prototype.run = function() {
    var fifthObject, firstObject, forthObject, secondObject, seventhObject, sixthObject, thirdObject;
    this.initiateSliders();
    this.initiateDropdowns();
    this.initiateTextureChoices();
    firstObject = FirstObject.generate();
    this.gl.addObject(firstObject);
    secondObject = SecondObject.generate();
    this.gl.addObject(secondObject);
    thirdObject = ThirdObject.generate();
    this.gl.addObject(thirdObject);
    forthObject = ForthObject.generate();
    this.gl.addObject(forthObject);
    fifthObject = FifthObject.generate();
    this.gl.addObject(fifthObject);
    sixthObject = SixthObject.generate();
    this.gl.addObject(sixthObject);
    seventhObject = SeventhObject.generate();
    this.gl.addObject(seventhObject);
    this.gl.ondrag();
    this.gl.onkeydown();
    return this.gl.startGL();
  };

  RunThirdTask.prototype.initiateDropdowns = function() {
    return this.dropdowns = {
      camera: new Dropdown('.drop-down-toggle-camera'),
      model: new Dropdown('.drop-down-toggle-model')
    };
  };

  RunThirdTask.prototype.initiateSliders = function() {
    this.initiateSlider('camera-translate-y', '.camera .translate-y #slider', '.camera .translate-y span.number', {
      slide: function(event, ui) {
        return GL.camera.translation.change('y', ui.value);
      },
      min: -50,
      max: 50,
      value: 0
    });
    this.initiateSlider('camera-translate-x', '.camera .translate-x #slider', '.camera .translate-x span.number', {
      slide: function(event, ui) {
        return GL.camera.translation.change('x', ui.value);
      },
      min: -50,
      max: 50,
      value: 0
    });
    this.initiateSlider('camera-translate-z', '.camera .translate-z #slider', '.camera .translate-z span.number', {
      slide: (function(_this) {
        return function(event, ui) {
          var original;
          original = GL.camera.translation.original('z');
          return GL.camera.translation.change('z', original + ui.value);
        };
      })(this),
      stop: (function(_this) {
        return function(event, ui) {
          return null;
        };
      })(this),
      step: 0.05,
      min: -5,
      value: 0,
      max: 5
    });
    this.initiateSlider('camera-rotate-x', '.rotate-x #slider', '.rotate-x span.number', {
      slide: function(event, ui) {
        return GL.camera.rotation.change('x', ui.value);
      },
      max: 180
    });
    this.initiateSlider('camera-rotate-y', '.rotate-y #slider', '.rotate-y span.number', {
      slide: function(event, ui) {
        return GL.camera.rotation.change('y', ui.value);
      },
      max: 180
    });
    this.initiateSlider('camera-rotate-z', '.rotate-z #slider', '.rotate-z span.number', {
      slide: function(event, ui) {
        return GL.camera.rotation.change('z', ui.value);
      },
      max: 180
    });
    this.initiateSlider('camerea-scale-x', '.scale-x #slider', '.scale-x span.number', {
      slide: function(event, ui) {
        return GL.camera.scale.change('x', ui.value);
      },
      min: -5,
      max: 5,
      step: 0.05,
      value: 1
    });
    this.initiateSlider('camerea-scale-y', '.scale-y #slider', '.scale-y span.number', {
      slide: function(event, ui) {
        return GL.camera.scale.change('y', ui.value);
      },
      min: -5,
      max: 5,
      step: 0.05,
      value: 1
    });
    this.initiateSlider('camerea-scale-z', '.scale-z #slider', '.scale-z span.number', {
      slide: (function(_this) {
        return function(event, ui) {
          return GL.camera.scale.change('z', ui.value);
        };
      })(this),
      min: -5,
      max: 5,
      step: 0.05,
      value: 1
    });

    /* model */
    this.initiateSlider('model-translate-y', '.model .translate-y #slider', '.model .translate-y span.number', {
      slide: (function(_this) {
        return function(event, ui) {
          return _this.gl.loopOnlyShapes(function(object) {
            var original;
            original = object.translation.original(Axis.TYPES.Y);
            return object.translate(Axis.TYPES.Y, original + ui.value, true);
          });
        };
      })(this),
      min: -50,
      max: 50,
      value: 0
    });
    this.initiateSlider('model-translate-x', '.model .translate-x #slider', '.model .translate-x span.number', {
      slide: (function(_this) {
        return function(event, ui) {
          return _this.gl.loopOnlyShapes(function(object) {
            var original;
            original = object.translation.original(Axis.TYPES.X);
            return object.translate(Axis.TYPES.X, original + ui.value, true);
          });
        };
      })(this),
      min: -50,
      max: 50,
      value: 0
    });
    this.initiateSlider('model-translate-z', '.model .translate-z #slider', '.model .translate-z span.number', {
      slide: (function(_this) {
        return function(event, ui) {
          return _this.gl.loopOnlyShapes(function(object) {
            var original;
            original = object.translation.original(Axis.TYPES.Z);
            return object.translate(Axis.TYPES.Z, original + ui.value, true);
          });
        };
      })(this),
      stop: (function(_this) {
        return function(event, ui) {
          return null;
        };
      })(this),
      step: 0.05,
      min: -5,
      value: 0,
      max: 5
    });
    this.initiateSlider('model-rotate-x', '.model .rotate-x #slider', '.model .rotate-x span.number', {
      slide: (function(_this) {
        return function(event, ui) {
          return _this.gl.loopOnlyShapes(function(object) {
            var original;
            original = object.rotation.original(Axis.TYPES.X);
            return object.rotateX(original + ui.value, true);
          });
        };
      })(this),
      max: 180
    });
    this.initiateSlider('model-rotate-y', '.model .rotate-y #slider', '.model .rotate-y span.number', {
      slide: (function(_this) {
        return function(event, ui) {
          return _this.gl.loopOnlyShapes(function(object) {
            var original;
            original = object.rotation.original(Axis.TYPES.Y);
            return object.rotateY(original + ui.value, true);
          });
        };
      })(this),
      max: 180
    });
    return this.initiateSlider('model-rotate-z', '.model .rotate-z #slider', '.model .rotate-z span.number', {
      slide: (function(_this) {
        return function(event, ui) {
          return _this.gl.loopOnlyShapes(function(object) {
            var original;
            original = object.rotation.original(Axis.TYPES.Z);
            return object.rotateZ(original + ui.value, true);
          });
        };
      })(this),
      max: 180
    });
  };

  RunThirdTask.prototype.initiateTextureChoices = function() {
    return $('.texture-choice input[type="radio"]').on('click', (function(_this) {
      return function(ev) {
        var url;
        url = ev.currentTarget.value;
        return _this.gl.loopOnlyShapes(function(object) {
          return object.texture.fromURL(url);
        });
      };
    })(this));
  };

  RunThirdTask.prototype.initiateSlider = function(name, element, valueElement, options) {
    var slide;
    if (options == null) {
      options = {};
    }
    if (options.slide != null) {
      slide = options.slide.clone();
    }
    options.slide = (function(_this) {
      return function(event, ui) {
        _this.sliders[name].changeSlided(event, ui);
        if (slide != null) {
          return slide(event, ui);
        }
      };
    })(this);
    this.sliders[name] = new Slider(element, valueElement, options);
    return this.sliders[name].makeSlider();
  };

  return RunThirdTask;

})(Run);
