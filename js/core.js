var Slider,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Slider = (function() {
  function Slider(selector1, valueElement, options) {
    this.selector = selector1 != null ? selector1 : '.slider';
    this.valueElement = valueElement;
    if (options == null) {
      options = {
        min: 1,
        max: 90,
        range: 'min',
        value: 1
      };
    }
    this.changeSlided = bind(this.changeSlided, this);
    this.name = this.selector;
    this.parseOptions(options);
    this.element = this.handleElement(this.selector);
    this.valueElement = this.handleElement(this.valueElement);
    this.slider = null;
  }

  Slider.prototype.sliderOption = function(key) {
    return this.element.slider(key);
  };

  Slider.prototype.parseOptions = function(options) {
    options = options || {};
    options.min = options.min || 0;
    options.max = options.max || 90;
    options.range = options.range || 'min';
    options.step = options.step || 1;
    options.value = options.value;
    if (options.value == null) {
      options.value = options.min != null ? options.min : 0;
    }
    options.change = options.change || (function(_this) {
      return function() {
        return null;
      };
    })(this);
    options.slide = options.slide || (function(_this) {
      return function() {
        return null;
      };
    })(this);
    options.stop = options.stop || this.changeSlided;
    options.create = options.create || this.changeSlided;
    return this.options = options;
  };

  Slider.prototype.changeSlided = function(event, ui) {
    var value;
    if (this.valueElement != null) {
      value = ui.value;
      if (value == null) {
        value = this.options.value != null ? this.options.value : 0;
      }
      return this.valueElement.text(value);
    }
  };

  Slider.prototype.makeSlider = function() {
    return this.slider = this.initiateSlider(this.element, this.options);
  };

  Slider.prototype.handleElement = function(selector) {
    var el;
    if (selector == null) {
      selector = this.selector;
    }
    el = $(selector);
    if (el.length > 0) {
      return el;
    }
    return null;
  };

  Slider.prototype.initiateSlider = function(element, options) {
    if (options == null) {
      options = {};
    }
    if (element == null) {
      return null;
    }
    element.slider(options);
    return element.slider;
  };

  return Slider;

})();

Function.prototype.clone = function() {
  var cloned, key, temp, value;
  cloned = this;
  if (this.__isClone) {
    cloned = this.__clonedFrom;
  }
  temp = function() {
    return cloned.apply(this, arguments);
  };
  for (key in this) {
    value = this[key];
    temp[key] = this[key];
  }
  temp.__isClone = true;
  temp.__clonedFrom = cloned;
  return temp;
};
