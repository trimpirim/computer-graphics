class Uniforms extends ListObject
	constructor: ->
		super()

	add: (name, location, type) ->
    @addObject name, new Uniform(name, location, type)

  uniformMatrices: (names, matrices) ->
  	for name, key in names
  		uniform = @get name
  		uniform.uniformMatrixByType matrices[key]