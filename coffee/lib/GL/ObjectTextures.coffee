class ObjectTextures extends ListObject
	constructor: ->
		super()

	addBuffers: ->
		if @length > 0
			@loopAll (texture) ->
				texture.buffers.addVertex 'vertices', texture.vertices.toArray()

	compileBuffers: ->
		if @length > 0
			@loopAll (texture) ->
				texture.compileBuffers()

	load: ->
		if @length > 0
			@loopAll (texture) ->
				texture.load()

