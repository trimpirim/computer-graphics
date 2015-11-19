class RotationTransformation
	constructor: (@current, @max, @increaseBy = 1, @invert = false) ->

	increase: (howMuch = @increaseBy || 1) ->
		@current += howMuch

	fullyEnded: ->
		@ended()

	ended: ->
		if !@invert then @current >= @max else @current <= @max

	increaseIfNotEnded: ->
		if !@ended()
			@increase()

	rotate: ->
		MathUtils.toRadians @current

class Transformation 
	@TYPES:
		Y: 'y'
		X: 'x'
	@INCREASE_TYPES:
		X: Transformation.X
		Y: Transformation.Y
		BOTH: 'both'
	constructor: (@current = {x: 0, y: 0}, @max = {x: 0, y: 0}, @increaseBy = {x: 1, y: 1}, @invert = {x: false, y: false}) ->

	increase: (which, howMuch) ->
		howMuch = @increaseBy[which] || 1
		@current[which] += howMuch

	fullyEnded: ->
		@ended(Transformation.TYPES.Y) and @ended(Transformation.TYPES.X)

	partlyEnded: ->
		@ended(Transformation.TYPES.Y) or @ended(Transformation.TYPES.X)

	ended: (which) ->
		if !@invert[which] then @current[which] >= @max[which] else @current[which] <= @max[which]

	increaseIfNotEnded: (which = Transformation.INCREASE_TYPES.BOTH) ->
		switch which
			when Transformation.INCREASE_TYPES.Y
				if !@ended Transformation.TYPES.Y
					@increase Transformation.TYPES.Y
			when Transformation.INCREASE_TYPES.X
				if !@ended Transformation.TYPES.X
					@increase Transformation.TYPES.X
			when Transformation.INCREASE_TYPES.BOTH
				if !@ended Transformation.TYPES.Y
					@increase Transformation.TYPES.Y
				if !@ended Transformation.TYPES.X
					@increase Transformation.TYPES.X

	x: ->
		@current.x
	y: ->
		@current.y

class Transformations
	constructor: (@t = {translate: null, rotate: null, scale: null}, callbacks = {increase: null, ended: null}) ->
		@translate = @t.translate
		@rotate = @t.rotate
		@scale = @t.scale
		@callbacks =
			ended: callbacks.ended || ->
				return false
			increase: callbacks.increase || ->
				return false

	increase: ->
		@callbacks.increase()

	ended: ->
		@callbacks.ended()

class CanvasFractal
	@RECURISE: 'recursive'
	@ONCE: 'once'
	@MAXIMUM_STEPS: 7
	@DEFAULT_STEP: 0
	constructor: ->
		@canvas = document.getElementById 'canvas'
		@ctx = null
		if canvas.getContext
			@ctx = @canvas.getContext '2d'

		@initClickListener()
		@currentStep = CanvasFractal.DEFAULT_STEP

	setupContext: ->
		@ctx.beginPath()
		@ctx.moveTo 0, 0
		@ctx.lineTo 500, 0
		@ctx.lineTo 500, 500
		@ctx.lineTo 0, 500
		@ctx.closePath()
		@ctx.stroke(); 

		@_savedStep = @currentStep

	draw: ->
		@setupContext()
		@startDrawing 0, CanvasFractal.RECURSIVE

	initClickListener: ->
		$(window).on 'keydown', (ev) =>
			switch ev.which 
				when 32
					@increaseCurrentStep()
					@clear()
					@startDrawing @currentStep
				when 49
					@clear()
					transformations = new Transformations(
						{
							rotate: null, 
							translate: new Transformation({x: 0, y: 0}, {x: 250, y: 250}), 
							scale: new Transformation({x: 1, y: 1}, {x: 0.5, y: 0.5}, {x: -0.005, y: -0.005}, {x: true, y: true})
						},
						{
							increase: ->
								transformations.scale.increaseIfNotEnded Transformation.INCREASE_TYPES.BOTH
								transformations.translate.increaseIfNotEnded Transformation.INCREASE_TYPES.BOTH
							ended: ->
								return transformations.scale.fullyEnded() and transformations.translate.fullyEnded()
						}	
					)
					@doAnimation transformations
				when 50
					@clear()
					transformations = new Transformations(
						{
							rotate: new RotationTransformation(0, -90, -1, true),
							translate: new Transformation({x: 0, y: 0}, {x: 250, y: 0}),
							scale: new Transformation({x: 1, y: 1}, {x: -0.5, y: 0.5}, {x: -0.005, y: -0.005}, {x: true, y: true})
						},
						{
							increase: ->
								transformations.scale.increaseIfNotEnded Transformation.INCREASE_TYPES.BOTH
								transformations.translate.increaseIfNotEnded Transformation.INCREASE_TYPES.BOTH
								transformations.rotate.increaseIfNotEnded()
							ended: ->
								return transformations.scale.fullyEnded() and transformations.translate.fullyEnded() and transformations.rotate.fullyEnded()
						}	
					)
					@doAnimation transformations
				when 51
					@clear()
					transformations = new Transformations(
						{
							translate: new Transformation({x: 0, y: 0}, {x: 250, y: 0}),
							scale: new Transformation({x: 1, y: 1}, {x: -0.5, y: 0.5}, {x: -0.005, y: -0.005}, {x: true, y: true})
						},
						{
							increase: ->
								transformations.scale.increaseIfNotEnded Transformation.INCREASE_TYPES.BOTH
								transformations.translate.increaseIfNotEnded Transformation.INCREASE_TYPES.BOTH
							ended: ->
								return transformations.scale.fullyEnded() and transformations.translate.fullyEnded()
						}	
					)
					@doAnimation transformations
					
				when 52
					@clear()
					transformations = new Transformations(
						{
							rotate: new RotationTransformation(0, 90, 1),
							translate: new Transformation({x: 0, y: 0}, {x: 125, y: 250}),
							scale: new Transformation({x: 1, y: 1}, {x: 0.25, y: 0.25}, {x: -0.005, y: -0.005}, {x: true, y: true})
						},
						{
							increase: ->
								transformations.scale.increaseIfNotEnded Transformation.INCREASE_TYPES.BOTH
								transformations.translate.increaseIfNotEnded Transformation.INCREASE_TYPES.BOTH
								transformations.rotate.increaseIfNotEnded()
							ended: ->
								return transformations.scale.fullyEnded() and transformations.translate.fullyEnded() and transformations.rotate.fullyEnded()
						}	
					)
					@doAnimation transformations

	clear: (preserveTransform = false) ->
		if preserveTransform
			@ctx.save()
			@ctx.setTransform 1, 0, 0, 1, 0, 0

		@ctx.clearRect 0, 0, @canvas.width, @canvas.height

		if preserveTransform
			@ctx.restore()

	increaseCurrentStep: ->
		if @currentStep >= CanvasFractal.MAXIMUM_STEPS
			@currentStep = CanvasFractal.DEFAULT_STEP
		else
			@currentStep++

	doAnimation: (transformations) ->
		interval = setInterval =>
			transformations.increase()

			if transformations.ended()
				clearInterval interval

			@clear false

			@ctx.save()
			@ctx.translate transformations.translate.x(), transformations.translate.y() if transformations.translate?
			@ctx.rotate transformations.rotate.rotate() if transformations.rotate?
			@ctx.scale transformations.scale.x(), transformations.scale.y() if transformations.scale?
			@ctx.fillStyle = 'red'
			@startDrawing 0, CanvasFractal.ONCE
			@ctx.restore()

		, 5

	startDrawing: (currentStep, how = CanvasFractal.RECURSIVE) ->
		switch how
			when CanvasFractal.RECURSIVE
				if currentStep > 0 
					currentStep--
					@ctx.save()
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
					@ctx.restore()
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