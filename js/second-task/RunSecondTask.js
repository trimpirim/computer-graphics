var RunSecondTask,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RunSecondTask = (function(superClass) {
  extend(RunSecondTask, superClass);

  function RunSecondTask() {
    this.gl = new GL();
  }

  RunSecondTask.prototype.run = function() {

    /*firstObject = FirstObject.generate()
    @gl.addObject firstObject
    
    secondObject = SecondObject.generate()
    @gl.addObject secondObject
    
    thirdObject = ThirdObject.generate()
    @gl.addObject thirdObject
    
    forthObject = ForthObject.generate()
    @gl.addObject forthObject
     */
    var fifthObject;
    fifthObject = FifthObject.generate();
    this.gl.addObject(fifthObject);

    /*sixthObject = SixthObject.generate()
    @gl.addObject sixthObject
    
    seventhObject = SeventhObject.generate()
    @gl.addObject seventhObject
     */
    this.gl.ondrag();
    this.gl.onkeydown();
    return this.gl.startGL();
  };

  return RunSecondTask;

})(Run);
