var CanvasFractal;

CanvasFractal = (function() {
  CanvasFractal.RECURISE = 'recursive';

  CanvasFractal.ONCE = 'once';

  function CanvasFractal() {
    this.canvas = document.getElementById('canvas');
    this.ctx = null;
    if (canvas.getContext) {
      this.ctx = this.canvas.getContext('2d');
    }
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
    return this.startDrawing(7, CanvasFractal.RECURSIVE);
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
          this.startDrawing(currentStep);
          this.ctx.restore();
          this.ctx.translate(250, 0);
          this.ctx.rotate(MathUtils.toRadians(-90));
          this.ctx.scale(-0.5, 0.5);
          this.startDrawing(currentStep);
          this.ctx.restore();
          this.ctx.translate(250, 0);
          this.ctx.scale(-0.5, 0.5);
          this.startDrawing(currentStep);
          this.ctx.restore();
          this.ctx.translate(125, 250);
          this.ctx.rotate(MathUtils.toRadians(90));
          this.ctx.scale(0.25, 0.25);
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
