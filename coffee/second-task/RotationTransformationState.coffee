class RotationTransformationState extends TransformationState
	constructor: (angle = 0, x = 0, y = 0, z = 0) ->
		@current =
			angle: angle
			x: x
			y: y
			z: z