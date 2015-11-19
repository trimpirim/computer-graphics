var CanvasFractal, RotationTransformation, Transformation, Transformations;

RotationTransformation = (function() {
  function RotationTransformation(current, max, increaseBy, invert) {
    this.current = current;
    this.max = max;
    this.increaseBy = increaseBy != null ? increaseBy : 1;
    this.invert = invert != null ? invert : false;
  }

  RotationTransformation.prototype.increase = function(howMuch) {
    if (howMuch == null) {
      howMuch = this.increaseBy || 1;
    }
    return this.current += howMuch;
  };

  RotationTransformation.prototype.fullyEnded = function() {
    return this.ended();
  };

  RotationTransformation.prototype.ended = function() {
    if (!this.invert) {
      return this.current >= this.max;
    } else {
      return this.current <= this.max;
    }
  };

  RotationTransformation.prototype.increaseIfNotEnded = function() {
    if (!this.ended()) {
      return this.increase();
    }
  };

  RotationTransformation.prototype.rotate = function() {
    return MathUtils.toRadians(this.current);
  };

  return RotationTransformation;

})();

Transformation = (function() {
  Transformation.TYPES = {
    Y: 'y',
    X: 'x'
  };

  Transformation.INCREASE_TYPES = {
    X: Transformation.X,
    Y: Transformation.Y,
    BOTH: 'both'
  };

  function Transformation(current, max, increaseBy, invert) {
    this.current = current != null ? current : {
      x: 0,
      y: 0
    };
    this.max = max != null ? max : {
      x: 0,
      y: 0
    };
    this.increaseBy = increaseBy != null ? increaseBy : {
      x: 1,
      y: 1
    };
    this.invert = invert != null ? invert : {
      x: false,
      y: false
    };
  }

  Transformation.prototype.increase = function(which, howMuch) {
    howMuch = this.increaseBy[which] || 1;
    return this.current[which] += howMuch;
  };

  Transformation.prototype.fullyEnded = function() {
    return this.ended(Transformation.TYPES.Y) && this.ended(Transformation.TYPES.X);
  };

  Transformation.prototype.partlyEnded = function() {
    return this.ended(Transformation.TYPES.Y) || this.ended(Transformation.TYPES.X);
  };

  Transformation.prototype.ended = function(which) {
    if (!this.invert[which]) {
      return this.current[which] >= this.max[which];
    } else {
      return this.current[which] <= this.max[which];
    }
  };

  Transformation.prototype.increaseIfNotEnded = function(which) {
    if (which == null) {
      which = Transformation.INCREASE_TYPES.BOTH;
    }
    switch (which) {
      case Transformation.INCREASE_TYPES.Y:
        if (!this.ended(Transformation.TYPES.Y)) {
          return this.increase(Transformation.TYPES.Y);
        }
        break;
      case Transformation.INCREASE_TYPES.X:
        if (!this.ended(Transformation.TYPES.X)) {
          return this.increase(Transformation.TYPES.X);
        }
        break;
      case Transformation.INCREASE_TYPES.BOTH:
        if (!this.ended(Transformation.TYPES.Y)) {
          this.increase(Transformation.TYPES.Y);
        }
        if (!this.ended(Transformation.TYPES.X)) {
          return this.increase(Transformation.TYPES.X);
        }
    }
  };

  Transformation.prototype.x = function() {
    return this.current.x;
  };

  Transformation.prototype.y = function() {
    return this.current.y;
  };

  return Transformation;

})();

Transformations = (function() {
  function Transformations(t, callbacks) {
    this.t = t != null ? t : {
      translate: null,
      rotate: null,
      scale: null
    };
    if (callbacks == null) {
      callbacks = {
        increase: null,
        ended: null
      };
    }
    this.translate = this.t.translate;
    this.rotate = this.t.rotate;
    this.scale = this.t.scale;
    this.callbacks = {
      ended: callbacks.ended || function() {
        return false;
      },
      increase: callbacks.increase || function() {
        return false;
      }
    };
  }

  Transformations.prototype.increase = function() {
    return this.callbacks.increase();
  };

  Transformations.prototype.ended = function() {
    return this.callbacks.ended();
  };

  return Transformations;

})();

CanvasFractal = (function() {
  CanvasFractal.RECURISE = 'recursive';

  CanvasFractal.ONCE = 'once';

  CanvasFractal.MAXIMUM_STEPS = 7;

  CanvasFractal.DEFAULT_STEP = 0;

  function CanvasFractal() {
    this.canvas = document.getElementById('canvas');
    this.ctx = null;
    if (canvas.getContext) {
      this.ctx = this.canvas.getContext('2d');
    }
    this.initClickListener();
    this.currentStep = CanvasFractal.DEFAULT_STEP;
  }

  CanvasFractal.prototype.setupContext = function() {
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(500, 0);
    this.ctx.lineTo(500, 500);
    this.ctx.lineTo(0, 500);
    this.ctx.closePath();
    this.ctx.stroke();
    return this._savedStep = this.currentStep;
  };

  CanvasFractal.prototype.draw = function() {
    this.setupContext();
    return this.startDrawing(0, CanvasFractal.RECURSIVE);
  };

  CanvasFractal.prototype.initClickListener = function() {
    return $(window).on('keydown', (function(_this) {
      return function(ev) {
        var transformations;
        switch (ev.which) {
          case 32:
            _this.increaseCurrentStep();
            _this.clear();
            return _this.startDrawing(_this.currentStep);
          case 49:
            _this.clear();
            transformations = new Transformations({
              rotate: null,
              translate: new Transformation({
                x: 0,
                y: 0
              }, {
                x: 250,
                y: 250
              }),
              scale: new Transformation({
                x: 1,
                y: 1
              }, {
                x: 0.5,
                y: 0.5
              }, {
                x: -0.005,
                y: -0.005
              }, {
                x: true,
                y: true
              })
            }, {
              increase: function() {
                transformations.scale.increaseIfNotEnded(Transformation.INCREASE_TYPES.BOTH);
                return transformations.translate.increaseIfNotEnded(Transformation.INCREASE_TYPES.BOTH);
              },
              ended: function() {
                return transformations.scale.fullyEnded() && transformations.translate.fullyEnded();
              }
            });
            return _this.doAnimation(transformations);
          case 50:
            _this.clear();
            transformations = new Transformations({
              rotate: new RotationTransformation(0, -90, -1, true),
              translate: new Transformation({
                x: 0,
                y: 0
              }, {
                x: 250,
                y: 0
              }),
              scale: new Transformation({
                x: 1,
                y: 1
              }, {
                x: -0.5,
                y: 0.5
              }, {
                x: -0.005,
                y: -0.005
              }, {
                x: true,
                y: true
              })
            }, {
              increase: function() {
                transformations.scale.increaseIfNotEnded(Transformation.INCREASE_TYPES.BOTH);
                transformations.translate.increaseIfNotEnded(Transformation.INCREASE_TYPES.BOTH);
                return transformations.rotate.increaseIfNotEnded();
              },
              ended: function() {
                return transformations.scale.fullyEnded() && transformations.translate.fullyEnded() && transformations.rotate.fullyEnded();
              }
            });
            return _this.doAnimation(transformations);
          case 51:
            _this.clear();
            transformations = new Transformations({
              translate: new Transformation({
                x: 0,
                y: 0
              }, {
                x: 250,
                y: 0
              }),
              scale: new Transformation({
                x: 1,
                y: 1
              }, {
                x: -0.5,
                y: 0.5
              }, {
                x: -0.005,
                y: -0.005
              }, {
                x: true,
                y: true
              })
            }, {
              increase: function() {
                transformations.scale.increaseIfNotEnded(Transformation.INCREASE_TYPES.BOTH);
                return transformations.translate.increaseIfNotEnded(Transformation.INCREASE_TYPES.BOTH);
              },
              ended: function() {
                return transformations.scale.fullyEnded() && transformations.translate.fullyEnded();
              }
            });
            return _this.doAnimation(transformations);
          case 52:
            _this.clear();
            transformations = new Transformations({
              rotate: new RotationTransformation(0, 90, 1),
              translate: new Transformation({
                x: 0,
                y: 0
              }, {
                x: 125,
                y: 250
              }),
              scale: new Transformation({
                x: 1,
                y: 1
              }, {
                x: 0.25,
                y: 0.25
              }, {
                x: -0.005,
                y: -0.005
              }, {
                x: true,
                y: true
              })
            }, {
              increase: function() {
                transformations.scale.increaseIfNotEnded(Transformation.INCREASE_TYPES.BOTH);
                transformations.translate.increaseIfNotEnded(Transformation.INCREASE_TYPES.BOTH);
                return transformations.rotate.increaseIfNotEnded();
              },
              ended: function() {
                return transformations.scale.fullyEnded() && transformations.translate.fullyEnded() && transformations.rotate.fullyEnded();
              }
            });
            return _this.doAnimation(transformations);
        }
      };
    })(this));
  };

  CanvasFractal.prototype.clear = function(preserveTransform) {
    if (preserveTransform == null) {
      preserveTransform = false;
    }
    if (preserveTransform) {
      this.ctx.save();
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (preserveTransform) {
      return this.ctx.restore();
    }
  };

  CanvasFractal.prototype.increaseCurrentStep = function() {
    if (this.currentStep >= CanvasFractal.MAXIMUM_STEPS) {
      return this.currentStep = CanvasFractal.DEFAULT_STEP;
    } else {
      return this.currentStep++;
    }
  };

  CanvasFractal.prototype.doAnimation = function(transformations) {
    var interval;
    return interval = setInterval((function(_this) {
      return function() {
        transformations.increase();
        if (transformations.ended()) {
          clearInterval(interval);
        }
        _this.clear(false);
        _this.ctx.save();
        if (transformations.translate != null) {
          _this.ctx.translate(transformations.translate.x(), transformations.translate.y());
        }
        if (transformations.rotate != null) {
          _this.ctx.rotate(transformations.rotate.rotate());
        }
        if (transformations.scale != null) {
          _this.ctx.scale(transformations.scale.x(), transformations.scale.y());
        }
        _this.ctx.fillStyle = 'red';
        _this.startDrawing(0, CanvasFractal.ONCE);
        return _this.ctx.restore();
      };
    })(this), 5);
  };

  CanvasFractal.prototype.startDrawing = function(currentStep, how) {
    if (how == null) {
      how = CanvasFractal.RECURSIVE;
    }
    switch (how) {
      case CanvasFractal.RECURSIVE:
        if (currentStep > 0) {
          currentStep--;
          this.ctx.save();
          this.ctx.save();
          this.ctx.save();
          this.ctx.save();
          this.ctx.translate(250, 250);
          this.ctx.scale(0.5, 0.5);
          this.ctx.fillStyle = 'green';
          this.startDrawing(currentStep);
          this.ctx.restore();
          this.ctx.translate(250, 0);
          this.ctx.rotate(MathUtils.toRadians(-90));
          this.ctx.scale(-0.5, 0.5);
          this.ctx.fillStyle = 'yellow';
          this.startDrawing(currentStep);
          this.ctx.restore();
          this.ctx.translate(250, 0);
          this.ctx.scale(-0.5, 0.5);
          this.ctx.fillStyle = 'red';
          this.startDrawing(currentStep);
          this.ctx.restore();
          this.ctx.translate(125, 250);
          this.ctx.rotate(MathUtils.toRadians(90));
          this.ctx.scale(0.25, 0.25);
          this.ctx.fillStyle = 'blue';
          this.startDrawing(currentStep);
          return this.ctx.restore();
        } else {
          return this.startDrawing(0, CanvasFractal.ONCE);
        }
        break;
      case CanvasFractal.ONCE:
        this.ctx.beginPath();
        this.ctx.moveTo(75, 0);
        this.ctx.lineTo(425, 0);
        this.ctx.lineTo(500, 250);
        this.ctx.lineTo(500, 500);
        this.ctx.lineTo(0, 375);
        this.ctx.lineTo(0, 75);
        return this.ctx.fill();
    }
  };

  return CanvasFractal;

})();

$(document).ready(function() {
  this.canvasFractal = new CanvasFractal();
  return this.canvasFractal.draw();
});
