class Vertex2
  constructor: (@x, @y) ->
    @originals = 
      x: @x
      y: @y

    @changed = 
      x: 0
      y: 0

  original: (which, amount) ->
    if amount?
      @originals[which] = amount
      @changed[which] = amount
    @originals[which]

  fromArray: (array) ->
    @x = array[0] if array[0]?
    @y = array[1] if array[1]?

  loopAll: (callback) ->
    callback @x if callback?
    callback @y if callback?

  isFull: () ->
    return if @x? and @y? then true else false

  length: ->
    return 2

  loadCoordinate: (coordinate) ->
    if !@x?
      @x = coordinate
    else if !@y?
      @y = coordinate

  toArray: ->
    [@x, @y]

  increase: (which, amount) ->
    @[which] += amount

  decrease: (which, amount) ->
    @[which] -= amount

  change: (which, value) ->
    if @[which]?
      @[which] = value
      @changed[which] += value

  reset: (which, force = false) ->
    if @[which]? 
      if !force
        @[which] = @original[which]
      else 
        @[which] = 0
