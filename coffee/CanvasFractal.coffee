class CanvasFractal
  @RECURISE: 'recursive'
  @ONCE: 'once'
  @MAXIMUM_STEPS: 7
  @DEFAULT_STEP: 1
  constructor: ->
    @canvas = document.getElementById 'canvas'
    @ctx = null
    if canvas.getContext
      @ctx = @canvas.getContext '2d'

    @initClickListener()
    @currentStep = CanvasFractal.DEFAULT_STEP
    @firstTime = false

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
    @startDrawing 0, CanvasFractal.RECURSIVE

  initClickListener: ->
    $(window).on 'keydown', (ev) =>
      if ev.which == 32
        @increaseCurrentStep()
        @ctx.setTransform 1, 0, 0, 1, 0, 0
        @ctx.clearRect 0, 0, @canvas.width, @canvas.height
        @startDrawing @currentStep
        @firstTime = true

  clear: ->


  increaseCurrentStep: ->
    if @currentStep >= CanvasFractal.MAXIMUM_STEPS
      @currentStep = CanvasFractal.DEFAULT_STEP
    else
      @currentStep++

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
          @ctx.fillStyle = 'green'
          @startDrawing currentStep
          @ctx.restore()
          @ctx.translate 250, 0
          @ctx.rotate MathUtils.toRadians -90
          @ctx.scale -0.5, 0.5
          @ctx.fillStyle = 'yellow'
          @startDrawing currentStep
          @ctx.restore()
          @ctx.translate 250, 0
          @ctx.scale -0.5, 0.5
          @ctx.fillStyle = 'red'
          @startDrawing currentStep
          @ctx.restore()
          @ctx.translate 125, 250
          @ctx.rotate MathUtils.toRadians 90
          @ctx.scale 0.25, 0.25
          @ctx.fillStyle = 'blue'
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
        #@ctx.fillStyle = "blue"
        @ctx.fill()


$(document).ready ->
  @canvasFractal = new CanvasFractal()
  @canvasFractal.draw()