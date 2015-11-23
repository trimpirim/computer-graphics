class SecondTaskObject extends StateObject 
	constructor: (@name, @vertices, @mode, @faces, @coordinates, @index) ->
		super @name, @vertices, @mode, @faces, @coordinates, @index

	onkeydown: (ev) ->
		switch ev.which
			when 16
				interval = setInterval =>
					clearInterval interval if @transformationDone
					@modelMatrix = @increaseMatrixBy @modelMatrix, 0.01
				, 50

	ondrag: (positions) ->
    ###@rotateY positions.deltas.x / 5, false
    @rotateX positions.deltas.y / 5, false###

	initialTranslation: (which, amount, force = false) ->
		@translate which, amount, force
		@translation.original which, amount