class CanvasFractal
  @RECURISE: 'recursive'
  @ONCE: 'once'
  constructor: ->
    @canvas = document.getElementById 'canvas'
    @ctx = null
    if canvas.getContext
      @ctx = @canvas.getContext '2d'

  setupContext: ->
    @ctx.beginPath()
    @ctx.moveTo 0, 0
    @ctx.lineTo 500, 0
    @ctx.lineTo 500, 500
    @ctx.lineTo 0, 500
    @ctx.closePath()
    @ctx.stroke(); 

  draw: ->
    @setupContext()
    @startDrawing 7, CanvasFractal.RECURSIVE

  startDrawing: (currentStep, how = CanvasFractal.RECURSIVE) ->
    switch how
      when CanvasFractal.RECURSIVE
        if currentStep > 0 
          currentStep--
          @ctx.save()
          @ctx.save()
          @ctx.save()
          @ctx.translate 250, 250
          @ctx.scale 0.5, 0.5
          @startDrawing currentStep
          @ctx.restore()
          @ctx.translate 250, 0
          @ctx.rotate MathUtils.toRadians -90
          @ctx.scale -0.5, 0.5
          @startDrawing currentStep
          @ctx.restore()
          @ctx.translate 250, 0
          @ctx.scale -0.5, 0.5
          @startDrawing currentStep
          @ctx.restore()
          @ctx.translate 125, 250
          @ctx.rotate MathUtils.toRadians 90
          @ctx.scale 0.25, 0.25
          @startDrawing currentStep
        else @startDrawing 0, CanvasFractal.ONCE
      when CanvasFractal.ONCE
        @ctx.beginPath()
        @ctx.moveTo 75, 0
        @ctx.lineTo 425, 0
        @ctx.lineTo 500, 250
        @ctx.lineTo 500, 500
        @ctx.lineTo 0, 375
        @ctx.lineTo 0, 75
        @ctx.fill()


$(document).ready ->
  @canvasFractal = new CanvasFractal()
  @canvasFractal.draw()