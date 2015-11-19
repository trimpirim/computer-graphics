class TransformationState 
	constructor: (x = 0, y = 0, z = 0) ->
		@current = 
			x: x
			y: y
			z: z

		@originals = 
			x: x
			y: y
			z: z

	increase: (amount, which) ->
		return false if exists which

		@current[which] += amount

	decrease: (amount, which) ->
		return false if exists which

		@current[which] -= amount

	exists: (which) ->
		@current[which]