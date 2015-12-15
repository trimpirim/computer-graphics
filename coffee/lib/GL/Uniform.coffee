class Uniform
	@TYPES:
		DEFAULT: 'default'
		NORMALS: 'normals'

	constructor: (@name, @location, @type = Uniform.TYPES.DEFAULT) ->

	uniformMatrixByType: (matrix) ->
		switch @type
			when Uniform.TYPES.DEFAULT
				@uniformMatrix matrix
			when Uniform.TYPES.NORMALS
				@uniformNormalMatrix matrix
			else
				@uniformMatrix matrix

	uniformMatrix: (matrix) ->
	  GL.gl.uniformMatrix4fv @location, false, matrix

  uniformNormalMatrix: (matrix) ->
  	normal = mat4.create()
  	normal = mat4.invert normal, matrix
  	normal = mat4.transpose normal, normal
  	GL.gl.uniformMatrix4fv @location, false, normal