var TranslationTransformationState,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

TranslationTransformationState = (function(superClass) {
  extend(TranslationTransformationState, superClass);

  function TranslationTransformationState(x, y, z) {
    TranslationTransformationState.__super__.constructor.call(this, x, y, z);
  }

  return TranslationTransformationState;

})(TransformationState);
