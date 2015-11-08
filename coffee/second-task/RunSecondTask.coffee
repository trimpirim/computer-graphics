class RunSecondTask extends Run
  constructor: () ->
    @gl = new GL()

    @sliders = {};

  run: () ->

    @initiateSliders();

    firstObject = FirstObject.generate()
    @gl.addObject firstObject

    secondObject = SecondObject.generate()
    @gl.addObject secondObject
    
    thirdObject = ThirdObject.generate()
    @gl.addObject thirdObject
    
    forthObject = ForthObject.generate()
    @gl.addObject forthObject
    
    fifthObject = FifthObject.generate()
    @gl.addObject fifthObject

    sixthObject = SixthObject.generate()
    @gl.addObject sixthObject

    seventhObject = SeventhObject.generate()
    @gl.addObject seventhObject

    #wireframe = secondObject.clone()
    #wireframe.mode = GL.gl['LINE_STRIP']

    #@gl.addObject wireframe

    @gl.ondrag()
    @gl.onkeydown()

    @gl.startGL()

  initiateSliders: ->
    @initiateSlider 'translate-y', '.translate-y #slider', '.translate-y span.number', {
      slide: (event, ui) ->
        GL.camera.translation.change 'y', ui.value
      min: -50
      max: 50
      value: 0
    }
    @initiateSlider 'translate-x', '.translate-x #slider', '.translate-x span.number', {
      slide: (event, ui) ->
        GL.camera.translation.change 'x', ui.value
      min: -50
      max: 50
      value: 0
    }
    @initiateSlider 'translate-z', '.translate-z #slider', '.translate-z span.number', {
      slide: (event, ui) =>
        original = GL.camera.translation.original 'z'
        GL.camera.translation.change 'z', original + ui.value
      stop: (event, ui) =>
        null
      step: 0.05
      min: -5
      value: 0
      max: 5
    }

    @initiateSlider 'rotate-x', '.rotate-x #slider', '.rotate-x span.number', {
      slide: (event, ui) ->
        GL.camera.rotation.change 'x', ui.value
      max: 180
    }
    @initiateSlider 'rotate-y', '.rotate-y #slider', '.rotate-y span.number', {
      slide: (event, ui) ->
        GL.camera.rotation.change 'y', ui.value
      max: 180
    }
    @initiateSlider 'rotate-z', '.rotate-z #slider', '.rotate-z span.number', {
      slide: (event, ui) ->
        GL.camera.rotation.change 'z', ui.value
      max: 180
    }

    @initiateSlider 'scale-x', '.scale-x #slider', '.scale-x span.number', {
      slide: (event, ui) ->
        GL.camera.scale.change 'x', ui.value
      min: -5
      max: 5
      step: 0.05
      value: 1
    }
    @initiateSlider 'scale-y', '.scale-y #slider', '.scale-y span.number', {
      slide: (event, ui) ->
        GL.camera.scale.change 'y', ui.value
      min: -5
      max: 5
      step: 0.05
      value: 1
    }
    @initiateSlider 'scale-z', '.scale-z #slider', '.scale-z span.number', {
      slide: (event, ui) =>
        GL.camera.scale.change 'z', ui.value
      min: -5
      max: 5
      step: 0.05
      value: 1
    }

  initiateSlider: (name, element, valueElement, options = {}) ->
    slide = options.slide.clone() if options.slide?
    options.slide = (event, ui) =>
      @sliders[name].changeSlided event, ui
      slide(event, ui) if slide?

    @sliders[name] = new Slider element, valueElement, options
    @sliders[name].makeSlider()