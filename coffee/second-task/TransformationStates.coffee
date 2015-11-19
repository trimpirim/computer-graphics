class TransformationStates
	@fromObject: (rotation, translation, scale) ->
		rObject = new RotationTransformationState rotation.angle, rotation.vertex.x, rotation.vertex.y, rotation.vertex.z
		tObject = new TranslationTransformationState translation.x, translation.y, translation.z
		sObject = new ScaleTransformationState scale.x, scale.y, scale.z

		statesObject = new TransformationStates rObject, tObject, sObject
		statesObject

	constructor: (
		@rotation = new RotationTransformationState(), 
		@translation = new TranslationTransformationState(), 
		@scale = new ScaleTransformationState()
	) ->

