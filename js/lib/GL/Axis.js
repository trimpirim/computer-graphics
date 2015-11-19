var Axis;

Axis = (function() {
  Axis.TYPES = {
    X: 'x',
    Y: 'y',
    Z: 'z'
  };

  Axis.ROTATION = {
    x: [1, 0, 0],
    y: [0, 1, 0],
    z: [0, 0, 1]
  };

  function Axis() {}

  return Axis;

})();
