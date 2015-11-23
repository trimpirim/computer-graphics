class StateObject extends SimpleObject 
	constructor: (@name, @vertices, @mode, @faces, @coordinates, @index) ->
		super @name, @vertices, @mode, @faces, @coordinates, @index

		@translation = new TranslationState()
		@rotation = new RotationState()
		@scale = new ScaleState()

		@endMatrix = mat4.create()
		@transformationDone = false

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
			@modelMatrix = @generateModel()
		else
			mat4.rotate @modelMatrix, @modelMatrix, MathUtils.toRadians(@rotation.x), [1, 0, 0]

	rotateY: (amount, force = false) ->
		@rotation.change Axis.TYPES.Y, amount
		if force
			@modelMatrix = @generateModel()
		else
			mat4.rotate @modelMatrix, @modelMatrix, MathUtils.toRadians(@rotation.y), [0, 1, 0]

	rotateZ: (amount, force = false) ->
		@rotation.change Axis.TYPES.Z, amount
		if force
			@modelMatrix = @generateModel()
		else
			mat4.rotate @modelMatrix, @modelMatrix, MathUtils.toRadians(@rotation.z), [0, 0, 1]

	translateOnce: (which, amount, force = true) ->
		@translate which, amount, force
		@translation.reset which

	translate: (which, amount, force = false) ->
		@translation.change which, amount
		if force
			@modelMatrix = @generateModel()

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

	generateModel: ->
		mat = mat4.create()
		mat4.translate mat, mat, @translation.toArray()
		mat4.rotate mat, mat, MathUtils.toRadians(@rotation.x), [1, 0, 0]
		mat4.rotate mat, mat, MathUtils.toRadians(@rotation.y), [0, 1, 0]
		mat4.rotate mat, mat, MathUtils.toRadians(@rotation.z), [0, 0, 1]
		return mat