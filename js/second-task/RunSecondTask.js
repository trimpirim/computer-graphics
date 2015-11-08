var RunSecondTask,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RunSecondTask = (function(superClass) {
  extend(RunSecondTask, superClass);

  function RunSecondTask() {
    this.gl = new GL();
    this.sliders = {};
  }

  RunSecondTask.prototype.run = function() {
    var fifthObject, firstObject, forthObject, secondObject, seventhObject, sixthObject, thirdObject;
    this.initiateSliders();
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

  RunSecondTask.prototype.initiateSliders = function() {
    this.initiateSlider('translate-y', '.translate-y #slider', '.translate-y span.number', {
      slide: function(event, ui) {
        return GL.camera.translation.change('y', ui.value);
      },
      min: -50,
      max: 50,
      value: 0
    });
    this.initiateSlider('translate-x', '.translate-x #slider', '.translate-x span.number', {
      slide: function(event, ui) {
        return GL.camera.translation.change('x', ui.value);
      },
      min: -50,
      max: 50,
      value: 0
    });
    this.initiateSlider('translate-z', '.translate-z #slider', '.translate-z span.number', {
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
    this.initiateSlider('rotate-x', '.rotate-x #slider', '.rotate-x span.number', {
      slide: function(event, ui) {
        return GL.camera.rotation.change('x', ui.value);
      },
      max: 180
    });
    this.initiateSlider('rotate-y', '.rotate-y #slider', '.rotate-y span.number', {
      slide: function(event, ui) {
        return GL.camera.rotation.change('y', ui.value);
      },
      max: 180
    });
    this.initiateSlider('rotate-z', '.rotate-z #slider', '.rotate-z span.number', {
      slide: function(event, ui) {
        return GL.camera.rotation.change('z', ui.value);
      },
      max: 180
    });
    this.initiateSlider('scale-x', '.scale-x #slider', '.scale-x span.number', {
      slide: function(event, ui) {
        return GL.camera.scale.change('x', ui.value);
      },
      min: -5,
      max: 5,
      step: 0.05,
      value: 1
    });
    this.initiateSlider('scale-y', '.scale-y #slider', '.scale-y span.number', {
      slide: function(event, ui) {
        return GL.camera.scale.change('y', ui.value);
      },
      min: -5,
      max: 5,
      step: 0.05,
      value: 1
    });
    return this.initiateSlider('scale-z', '.scale-z #slider', '.scale-z span.number', {
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
  };

  RunSecondTask.prototype.initiateSlider = function(name, element, valueElement, options) {
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

  return RunSecondTask;

})(Run);
