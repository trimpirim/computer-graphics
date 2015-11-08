class Slider
	constructor: (@selector = '.slider', @valueElement, options = {min: 1, max: 90, range: 'min', value: 1}) ->
		@name = @selector

		@parseOptions options

		@element = @handleElement @selector
		@valueElement = @handleElement @valueElement
		@slider = null

	sliderOption: (key) ->
		@element.slider key

	parseOptions: (options) ->
		options = options || {}
		options.min = options.min || 0
		options.max = options.max || 90
		options.range = options.range || 'min'
		options.step = options.step || 1
		options.value = options.value
		if !options.value?
			options.value = if options.min? then options.min else 0
		options.change = options.change || =>
			null
		options.slide = options.slide || =>
			null
		options.stop = options.stop || @changeSlided
		options.create = options.create || @changeSlided
		@options = options

	changeSlided: (event, ui) =>
		if @valueElement?
			value = ui.value 
			if !value? 
				value = if @options.value? then @options.value else 0
			@valueElement.text value

	makeSlider: ->
		@slider = @initiateSlider @element, @options

	handleElement: (selector = @selector) ->
		el = $(selector);
		if (el.length > 0) 
			return el

		return null

	initiateSlider: (element, options = {}) ->
		return null if !element?
		element.slider options
		element.slider

Function.prototype.clone = ->
	cloned = @
	if @__isClone
		cloned = @__clonedFrom
	temp = -> cloned.apply @, arguments

	for key, value of @
    temp[key] = @[key]

  temp.__isClone = true
  temp.__clonedFrom = cloned

  temp