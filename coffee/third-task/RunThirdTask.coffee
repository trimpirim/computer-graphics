class RunThirdTask extends Run
  constructor: () ->
    @gl = new GL()

    @sliders = {}
    @dropdowns = {}

  run: () ->

    @initiateSliders()
    @initiateDropdowns()

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

  initiateDropdowns: ->
    @dropdowns =
      camera: new Dropdown '.drop-down-toggle-camera'
      model: new Dropdown '.drop-down-toggle-model'

  initiateSliders: ->
    @initiateSlider 'camera-translate-y', '.camera .translate-y #slider', '.camera .translate-y span.number', {
      slide: (event, ui) ->
        GL.camera.translation.change 'y', ui.value
      min: -50
      max: 50
      value: 0
    }
    @initiateSlider 'camera-translate-x', '.camera .translate-x #slider', '.camera .translate-x span.number', {
      slide: (event, ui) ->
        GL.camera.translation.change 'x', ui.value
      min: -50
      max: 50
      value: 0
    }
    @initiateSlider 'camera-translate-z', '.camera .translate-z #slider', '.camera .translate-z span.number', {
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

    @initiateSlider 'camera-rotate-x', '.rotate-x #slider', '.rotate-x span.number', {
      slide: (event, ui) ->
        GL.camera.rotation.change 'x', ui.value
      max: 180
    }
    @initiateSlider 'camera-rotate-y', '.rotate-y #slider', '.rotate-y span.number', {
      slide: (event, ui) ->
        GL.camera.rotation.change 'y', ui.value
      max: 180
    }
    @initiateSlider 'camera-rotate-z', '.rotate-z #slider', '.rotate-z span.number', {
      slide: (event, ui) ->
        GL.camera.rotation.change 'z', ui.value
      max: 180
    }

    @initiateSlider 'camerea-scale-x', '.scale-x #slider', '.scale-x span.number', {
      slide: (event, ui) ->
        GL.camera.scale.change 'x', ui.value
      min: -5
      max: 5
      step: 0.05
      value: 1
    }
    @initiateSlider 'camerea-scale-y', '.scale-y #slider', '.scale-y span.number', {
      slide: (event, ui) ->
        GL.camera.scale.change 'y', ui.value
      min: -5
      max: 5
      step: 0.05
      value: 1
    }
    @initiateSlider 'camerea-scale-z', '.scale-z #slider', '.scale-z span.number', {
      slide: (event, ui) =>
        GL.camera.scale.change 'z', ui.value
      min: -5
      max: 5
      step: 0.05
      value: 1
    }

    ### model ###
    @initiateSlider 'model-translate-y', '.model .translate-y #slider', '.model .translate-y span.number', {
      slide: (event, ui) =>
        @gl.loopOnlyShapes (object) ->
          original = object.translation.original Axis.TYPES.Y
          object.translate Axis.TYPES.Y, original + ui.value, true
      min: -50
      max: 50
      value: 0
    }
    @initiateSlider 'model-translate-x', '.model .translate-x #slider', '.model .translate-x span.number', {
      slide: (event, ui) =>
        @gl.loopOnlyShapes (object) ->
          original = object.translation.original Axis.TYPES.X
          object.translate Axis.TYPES.X, original + ui.value, true
      min: -50
      max: 50
      value: 0
    }
    @initiateSlider 'model-translate-z', '.model .translate-z #slider', '.model .translate-z span.number', {
      slide: (event, ui) =>
        @gl.loopOnlyShapes (object) ->
          original = object.translation.original Axis.TYPES.Z
          object.translate Axis.TYPES.Z, original + ui.value, true
      stop: (event, ui) =>
        null
      step: 0.05
      min: -5
      value: 0
      max: 5
    }

    @initiateSlider 'model-rotate-x', '.model .rotate-x #slider', '.model .rotate-x span.number', {
      slide: (event, ui) =>
        @gl.loopOnlyShapes (object) ->
          original = object.rotation.original Axis.TYPES.X
          object.rotateX original + ui.value, true
      max: 180
    }
    @initiateSlider 'model-rotate-y', '.model .rotate-y #slider', '.model .rotate-y span.number', {
      slide: (event, ui) =>
        @gl.loopOnlyShapes (object) ->
          original = object.rotation.original Axis.TYPES.Y
          object.rotateY original + ui.value, true      
      max: 180
    }
    @initiateSlider 'model-rotate-z', '.model .rotate-z #slider', '.model .rotate-z span.number', {
      slide: (event, ui) =>
        @gl.loopOnlyShapes (object) ->
          original = object.rotation.original Axis.TYPES.Z
          object.rotateZ original + ui.value, true
      max: 180
    }

  initiateSlider: (name, element, valueElement, options = {}) ->
    slide = options.slide.clone() if options.slide?
    options.slide = (event, ui) =>
      @sliders[name].changeSlided event, ui
      slide(event, ui) if slide?

    @sliders[name] = new Slider element, valueElement, options
    @sliders[name].makeSlider()