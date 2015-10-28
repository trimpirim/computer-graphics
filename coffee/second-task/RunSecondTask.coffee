class RunSecondTask extends Run
  constructor: () ->
    @gl = new GL()

  run: () ->
    ###firstObject = FirstObject.generate()
    @gl.addObject firstObject

    secondObject = SecondObject.generate()
    @gl.addObject secondObject
    
    thirdObject = ThirdObject.generate()
    @gl.addObject thirdObject
    
    forthObject = ForthObject.generate()
    @gl.addObject forthObject###
    
    fifthObject = FifthObject.generate()
    @gl.addObject fifthObject

    ###sixthObject = SixthObject.generate()
    @gl.addObject sixthObject

    seventhObject = SeventhObject.generate()
    @gl.addObject seventhObject###

    #wireframe = secondObject.clone()
    #wireframe.mode = GL.gl['LINE_STRIP']

    #@gl.addObject wireframe

    @gl.ondrag()
    @gl.onkeydown()

    @gl.startGL()

