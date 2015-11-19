var TransformationStates;

TransformationStates = (function() {
  TransformationStates.fromObject = function(rotation, translation, scale) {
    var rObject, sObject, statesObject, tObject;
    rObject = new RotationTransformationState(rotation.angle, rotation.vertex.x, rotation.vertex.y, rotation.vertex.z);
    tObject = new TranslationTransformationState(translation.x, translation.y, translation.z);
    sObject = new ScaleTransformationState(scale.x, scale.y, scale.z);
    statesObject = new TransformationStates(rObject, tObject, sObject);
    return statesObject;
  };

  function TransformationStates(rotation1, translation1, scale1) {
    this.rotation = rotation1 != null ? rotation1 : new RotationTransformationState();
    this.translation = translation1 != null ? translation1 : new TranslationTransformationState();
    this.scale = scale1 != null ? scale1 : new ScaleTransformationState();
  }

  return TransformationStates;

})();
