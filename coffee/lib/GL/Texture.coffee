class Texture
	constructor: (@url) ->
		@id = Textures.generateID()
		@texture = GL.gl.createTexture()

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