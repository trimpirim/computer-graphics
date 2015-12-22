class Texture
	@from1DArray: (coordinates) ->
		vertices = new Vertices()
		vertices.columnsCount = 2
		vertex = new Vertex2
		for coordinate in coordinates
			if (vertex.isFull())
				vertices.coords.push vertex
				vertex = new Vertex()

			vertex.loadCoordinate coordinate

		vertices.coords.push vertex

		vertices

	@fromArray: (coordinates) ->
		vertices = new Vertices()
		vertices.columnsCount = 2
		for coordinate in coordinates
			vertex = new Vertex2()
			vertex.fromArray coordinate

			vertices.coords.push vertex

		vertices

	constructor: (@url, @vertices = new Vertices(), @sampler = null) ->
		@id = 0
		@texture = GL.gl.createTexture()
		@buffers = new Buffers()

	fromURL: (url) ->
		GL.textures.bindWhite @texture
		@texture.image = new Image()
		@texture.image.onload = =>
			GL.textures.handle @texture

		@texture.image.src = url

	get: ->
		@texture

	load: ->
		@fromURL @url

	compileBuffers: ->
		@buffers.compile()