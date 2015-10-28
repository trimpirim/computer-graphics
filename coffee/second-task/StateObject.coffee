class StateObject extends Object 
	constructor: (@name, @vertices, @mode, @faces, @coordinates, @index) ->
		super @name, @vertices, @mode, @faces, @coordinates, @index

		@DEFAULT_TRANSFORMATIONS =
			rotation:
				angle: 0
				vertex: 
					x: 0,
					y: 0, 
					z: 0
			translation:
				vertex: 
					x: 0, 
					y: 0,
					z: 0
			scale:
				vertex: 
					x: 0, 
					y: 0, 
					z: 0

		@state = TransformationStates.fromObject @DEFAULT_TRANSFORMATIONS.rotation, @DEFAULT_TRANSFORMATIONS.translation, @DEFAULT_TRANSFORMATIONS.scale
			