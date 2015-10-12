var CanvasFractal;

CanvasFractal = (function() {
  CanvasFractal.RECURISE = 'recursive';

  CanvasFractal.ONCE = 'once';

  CanvasFractal.MAXIMUM_STEPS = 7;

  CanvasFractal.DEFAULT_STEP = 1;

  function CanvasFractal() {
    this.canvas = document.getElementById('canvas');
    this.ctx = null;
    if (canvas.getContext) {
      this.ctx = this.canvas.getContext('2d');
    }
    this.initClickListener();
    this.currentStep = CanvasFractal.DEFAULT_STEP;
    this.firstTime = false;
  }

  CanvasFractal.prototype.setupContext = function() {
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(500, 0);
    this.ctx.lineTo(500, 500);
    this.ctx.lineTo(0, 500);
    this.ctx.closePath();
    return this.ctx.stroke();
  };

  CanvasFractal.prototype.draw = function() {
    this.setupContext();
    return this.startDrawing(0, CanvasFractal.RECURSIVE);
  };

  CanvasFractal.prototype.initClickListener = function() {
    return $(window).on('keydown', (function(_this) {
      return function(ev) {
        if (ev.which === 32) {
          _this.increaseCurrentStep();
          _this.ctx.setTransform(1, 0, 0, 1, 0, 0);
          _this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
          _this.startDrawing(_this.currentStep);
          return _this.firstTime = true;
        }
      };
    })(this));
  };

  CanvasFractal.prototype.clear = function() {};

  CanvasFractal.prototype.increaseCurrentStep = function() {
    if (this.currentStep >= CanvasFractal.MAXIMUM_STEPS) {
      return this.currentStep = CanvasFractal.DEFAULT_STEP;
    } else {
      return this.currentStep++;
    }
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
          return this.startDrawing(currentStep);
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
