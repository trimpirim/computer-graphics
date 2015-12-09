class Uniforms extends ListObject
	constructor: ->
		super()

	add: (name, location) ->
    @addObject name, new Uniform(name, location)

  uniformMatrices: (names, matrices) ->
  	for name, key in names
  		uniform = @get name
  		uniform.uniformMatrix matrices[key]