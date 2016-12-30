var Draggable,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Draggable = (function() {
  function Draggable(obj, ondrag) {
    this.obj = obj;
    this.ondrag = ondrag;
    this.up = bind(this.up, this);
    this.down = bind(this.down, this);
    this.setPositions = bind(this.setPositions, this);
    this.move = bind(this.move, this);
    this.jqueryObj = $(this.obj);
    this.draggable = true;
    this.isDragging = false;
    this.positions = {
      old: new Vertex2(),
      current: new Vertex2(),
      deltas: new Vertex2()
    };
    this.obj.onmousedown = this.down;
    this.obj.onmouseup = this.up;
  }

  Draggable.prototype.draggable = function(make) {
    if (make == null) {
      make = true;
    }
    return this.draggable = make;
  };

  Draggable.prototype.move = function(ev) {
    ev = this.loadEvent(ev);
    if (this.isDragging) {
      this.setPositions(ev);
      if (this.ondrag != null) {
        this.ondrag(this.positions);
      }
      return false;
    }
  };

  Draggable.prototype.setPositions = function(ev) {
    this.positions.current.fromArray([ev.clientY, ev.clientX]);
    this.positions.deltas.fromArray([this.positions.current.y - this.positions.old.y, this.positions.current.x - this.positions.old.x]);
    return this.positions.old.fromArray([ev.clientY, ev.clientX]);
  };

  Draggable.prototype.down = function(ev) {
    ev = this.loadEvent(ev);
    this.isDragging = true;
    this.obj.onmousemove = this.move;
    return this.positions.old.fromArray([ev.clientY, ev.clientX]);
  };

  Draggable.prototype.up = function(ev) {
    ev = this.loadEvent(ev);
    this.isDragging = false;
    return this.obj.onmousemove = null;
  };

  Draggable.prototype.loadEvent = function(ev) {
    return ev || window.event;
  };

  return Draggable;

})();
