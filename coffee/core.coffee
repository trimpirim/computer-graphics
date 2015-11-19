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

class Dropdown 
	@CLASSES:
		HIDDEN: 'drop-down-hidden'
		SHOWN: 'drop-down-shown'
		TOGGLE: '.drop-down-toggle'
	@DATA_FIELDS:
		TO_HIDE: 'to-hide'

	constructor: (@_toggle = Dropdown.CLASSES.TOGGLE, @content) ->
		@elements =
			toggle: $ @_toggle
			content: $ @content

		if !@hasContent()
			@alternativeUsage()

		@initiateOnClick()

	initiateOnClick: =>
		@elements.toggle.on 'click', =>
			@toggle()

	alternativeUsage: ->
		toHide = @elements.toggle.data Dropdown.DATA_FIELDS.TO_HIDE
		if toHide?
			@content = toHide
			@elements.content = $ toHide
			@hide()

	hasContent: ->
		@elements.content.length > 0

	toggle: ->
		if @elements.content.hasClass Dropdown.CLASSES.HIDDEN
			@show()	
		else
			@hide()

	show: ->
		@elements.content.removeClass Dropdown.CLASSES.HIDDEN
		@elements.content.addClass Dropdown.CLASSES.SHOWN

	hide: ->
		@elements.content.addClass Dropdown.CLASSES.HIDDEN
		@elements.content.removeClass Dropdown.CLASSES.SHOWN

Array.prototype.equals = (array) ->
  return false if not array # if the other array is a falsy value, return
  return false if @length isnt array.length # compare lengths - can save a lot of time

  for item, index in @
    if item instanceof Array and array[index] instanceof Array # Check if we have nested arrays
      if not item.equals(array[index]) # recurse into the nested arrays
        return false
    else if this[index] != array[index]
      return false # Warning - two different object instances will never be equal: {x:20} != {x:20}
  true

