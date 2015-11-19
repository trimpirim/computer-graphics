class StateObject extends SimpleObject 
	constructor: (@name, @vertices, @mode, @faces, @coordinates, @index) ->
		super @name, @vertices, @mode, @faces, @coordinates, @index

		@translation = new TranslationState()
		@rotation = new RotationState()
		@scale = new ScaleState()

		@endMatrix = mat4.create()
		@transformationDone = false
		@original = mat4.create()

		@onkeydown = (ev) ->
			switch ev.which
				when 16
					interval = setInterval =>
						clearInterval interval if @transformationDone
						@modelMatrix = @increaseMatrixBy @modelMatrix, 0.1
					, 20

	rotate: (which, amount) ->
		switch which
			when Axis.TYPES.X
				@rotateX amount
			when Axis.TYPES.Y
				@rotateY amount
			when Axis.TYPES.Z
				@rotateZ amount

	rotateX: (amount, force = false) ->
		@rotation.change Axis.TYPES.X, amount
		if force
			mat = mat4.create()
			mat4.copy mat, @original
			mat4.rotate mat, mat, MathUtils.toRadians(@rotation.x), [1, 0, 0]
			@modelMatrix = mat
		else
			mat4.rotate @modelMatrix, @modelMatrix, MathUtils.toRadians(@rotation.x), [1, 0, 0]
			@original = @modelMatrix

	rotateY: (amount, force = false) ->
		@rotation.change Axis.TYPES.Y, amount
		if force
			mat = mat4.create()
			mat4.copy mat, @original
			mat4.rotate mat, mat, MathUtils.toRadians(@rotation.y), [0, 1, 0]
			@modelMatrix = mat
		else
			mat4.rotate @modelMatrix, @modelMatrix, MathUtils.toRadians(@rotation.y), [0, 1, 0]
			@original = @modelMatrix

	rotateZ: (amount, force = false) ->
		@rotation.change Axis.TYPES.Z, amount
		if force
			mat = mat4.create()
			mat4.copy mat, @original
			mat4.rotate mat, mat, MathUtils.toRadians(@rotation.z), [0, 0, 1]
			@modelMatrix = mat
		else
			mat4.rotate @modelMatrix, @modelMatrix, MathUtils.toRadians(@rotation.z), [0, 0, 1]
			@original = @modelMatrix

	translateOnce: (which, amount, force = true) ->
		@translate which, amount, force
		@translation.reset which

	translate: (which, amount, force = false) ->
		@translation.change which, amount
		if force
			mat = mat4.create()
			mat4.copy mat, @original
			mat4.translate mat, mat, @translation.toArray()
			@modelMatrix = mat
			#mat4.multiply @modelMatrix, @modelMatrix, mat
      #mat4.translate @modelMatrix, @modelMatrix, @translation.toArray()

	scale: (which, amount) ->
		@scale.change which, amount

	increaseMatrixBy: (matrix, amount) ->
		m = matrix.map (item, key) =>
			start = +(item.toFixed(3))
			end = +(@endMatrix[key].toFixed(3))
			current = start
			operator = amount

			if start > end
				abs = Math.abs start - end
				operator = if abs < operator then -abs else -operator
			else if start < end
				abs = Math.abs end - start
				operator = if abs < operator then abs else operator

			if start != end
				current += operator

			current

		@transformationDone = Utils.array(m).equals Utils.array(matrix)

		m

	initialTranslation: (which, amount, force = false) ->
		@translate which, amount, force
		@translation.original which, amount
		@original = @modelMatrix



