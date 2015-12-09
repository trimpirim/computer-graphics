class Textures
	@COUNTER = 0
	@increase: ->
		#Textures.COUNTER++
		Textures.COUNTER

	@generateID: ->
		result = Textures.COUNTER
		Textures.increase()
		result

	constructor: ->

	bindWhite: (texture) ->
		GL.gl.bindTexture GL.gl.TEXTURE_2D, texture
		GL.gl.texImage2D GL.gl.TEXTURE_2D, 0, GL.gl.RGBA, 1, 1, 0, GL.gl.RGBA, GL.gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 255])

	bindWhiteAndDisable: (location) ->
		@white = GL.gl.createTexture()
		@bindWhite @white

		GL.gl.bindTexture GL.gl.TEXTURE_2D, @white
		GL.gl.disableVertexAttribArray location

	disableColor: (location) ->
		GL.gl.disableVertexAttribArray location
		GL.gl.vertexAttrib4f location, 1, 1, 1, 1

	bind: (texture) ->
		GL.gl.activeTexture GL.gl["TEXTURE#{texture.id}"]
		GL.gl.bindTexture GL.gl.TEXTURE_2D, texture.get()

	handle: (texture) ->
		GL.gl.bindTexture(GL.gl.TEXTURE_2D, texture);
		GL.gl.pixelStorei(GL.gl.UNPACK_FLIP_Y_WEBGL, true);
		GL.gl.texImage2D(GL.gl.TEXTURE_2D, 0, GL.gl.RGBA, GL.gl.RGBA, GL.gl.UNSIGNED_BYTE, texture.image);
		GL.gl.texParameteri(GL.gl.TEXTURE_2D, GL.gl.TEXTURE_MAG_FILTER, GL.gl.NEAREST);
		GL.gl.texParameteri(GL.gl.TEXTURE_2D, GL.gl.TEXTURE_MIN_FILTER, GL.gl.NEAREST);
		@filterAndMips texture.image.width, texture.image.height
		GL.gl.bindTexture(GL.gl.TEXTURE_2D, null);

	isPowerOf2: (value) ->
		(value & (value - 1)) == 0

	filterAndMips: (width, height) ->
		if @isPowerOf2(width) and @isPowerOf2(height)
			GL.gl.generateMipmap GL.gl.TEXTURE_2D
		else
			GL.gl.texParameteri GL.gl.TEXTURE_2D, GL.gl.TEXTURE_WRAP_S, GL.gl.CLAMP_TO_EDGE
			GL.gl.texParameteri GL.gl.TEXTURE_2D, GL.gl.TEXTURE_WRAP_T, GL.gl.CLAMP_TO_EDGE
			GL.gl.texParameteri GL.gl.TEXTURE_2D, GL.gl.TEXTURE_MIN_FILTER, GL.gl.LINEAR
