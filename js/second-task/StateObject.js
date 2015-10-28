var StateObject,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

StateObject = (function(superClass) {
  extend(StateObject, superClass);

  function StateObject(name, vertices, mode, faces, coordinates, index) {
    this.name = name;
    this.vertices = vertices;
    this.mode = mode;
    this.faces = faces;
    this.coordinates = coordinates;
    this.index = index;
    StateObject.__super__.constructor.call(this, this.name, this.vertices, this.mode, this.faces, this.coordinates, this.index);
    this.DEFAULT_TRANSFORMATIONS = {
      rotation: {
        angle: 0,
        vertex: {
          x: 0,
          y: 0,
          z: 0
        }
      },
      translation: {
        vertex: {
          x: 0,
          y: 0,
          z: 0
        }
      },
      scale: {
        vertex: {
          x: 0,
          y: 0,
          z: 0
        }
      }
    };
    this.state = TransformationStates.fromObject(this.DEFAULT_TRANSFORMATIONS.rotation, this.DEFAULT_TRANSFORMATIONS.translation, this.DEFAULT_TRANSFORMATIONS.scale);
  }

  return StateObject;

})(Object);
