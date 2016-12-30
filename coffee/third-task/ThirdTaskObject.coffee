class ThirdTaskObject extends StateObject 
	constructor: (@name, @vertices, @mode, @faces, @coordinates, @index) ->
		super @name, @vertices, @mode, @faces, @coordinates, @index
		@previousTime = 0

	onkeydown: (ev) ->
		switch ev.which
			when 16
				@ondraw = ->
					now = (new Date().getTime()/1000)%60
					if now != @previousTime and !@transformationDone
						@previousTime = now
						@modelMatrix = @increaseMatrixBy @modelMatrix, 0.03
				#@modelMatrix = @endMatrix
			when 83
				@texture.fromURL 'images/third-task/bricks.png'

	ondrag: (positions) ->
    # @rotateY positions.deltas.x / 5, false
    # @rotateX positions.deltas.y / 5, false

	initialTranslation: (which, amount, force = false) ->
		@translate which, amount, force
		@translation.original which, amount