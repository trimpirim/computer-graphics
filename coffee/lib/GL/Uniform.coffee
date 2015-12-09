class Uniform
	constructor: (@name, @location) ->

	uniformMatrix: (matrix) ->
    GL.gl.uniformMatrix4fv @location, false, matrix

