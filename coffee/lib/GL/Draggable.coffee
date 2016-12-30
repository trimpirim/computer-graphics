class Draggable

  constructor: (@obj, @ondrag) ->
    @jqueryObj = $(@obj)
    @draggable = true
    @isDragging = false

    @positions = 
      old: new Vertex2()
      current: new Vertex2()
      deltas: new Vertex2() 

    @obj.onmousedown = @down
    @obj.onmouseup = @up

  draggable: (make = true) ->
    @draggable = make

  move: (ev) =>
    ev = @loadEvent ev
    if @isDragging
      @setPositions ev

      @ondrag(@positions) if @ondrag?

      return false

  setPositions: (ev) =>
    @positions.current.fromArray [ev.clientY, ev.clientX]
    @positions.deltas.fromArray [
      @positions.current.y - @positions.old.y
      @positions.current.x - @positions.old.x
    ]
    @positions.old.fromArray [ev.clientY, ev.clientX]

  down: (ev) =>
    ev = @loadEvent ev
    @isDragging = true
    @obj.onmousemove = @move

    @positions.old.fromArray [ev.clientY, ev.clientX]

  up: (ev) =>
    ev = @loadEvent ev
    @isDragging = false
    @obj.onmousemove = null

  loadEvent: (ev) ->
    ev || window.event
