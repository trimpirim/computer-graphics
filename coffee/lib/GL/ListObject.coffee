class ListObject
  constructor: () ->
    @list = {}
    @deleted = {}
    @new = {}
    @length = 0

  get: (name) ->
    return @list[name]

  add: (name, object) ->
    @addObject name, object

  toggleAddRemove: (name, object) ->
    if @exist name
      @remove name
    else
      @add name, object

  addObject: (name, object) ->
    @list[name] = object
    @length++
    @new[name] = object
    delete @deleted[name] if @deleted[name]?

  remove: (name) ->
    @deleted[name] = @list[name]
    delete @new[name] if @new[name]?
    delete @list[name]
    @length--

  exist: (name) ->
    @list[name]?

  has: (name) ->
    @exist name

  count: () ->
    count = 0
    for key, item of @list
      count++

    count

  clear: (which = 'list') ->
    @removeAll which

  clearAll: ->
    @removeAll 'list'
    @removeAll 'new'
    @removeAll 'deleted'

  removeAll: (which = 'list') ->
    for key, item of @[which]
      @remove key

  empty: () ->
    return @count() == 0

  filter: (everyCallback) ->
    filteredList = new ListObject()
    count = 0
    for key, item of @list
      filteredList.add(key, item) if everyCallback(item, key, count)
      count++

    return filteredList

  toArray: () ->
    r = []
    for key, item of @list
      r.push item

    r

  sort: (callback) ->
    callback = callback || (a, b) ->
      return 0 if a.id == b.id
      return if a.id > b.id then 1 else -1

    r = @toArray()
    r.sort(callback)

  fromArray: (items, callback) ->
    callback = callback || (item) =>
      @add @length, item

    for item in items
      callback(item) if callback?

  toKeysArray: ->
    r = []
    for key, item of @list
      r.push key

    r

  loopAll: (callback) ->
    for key, item of @list
      callback item if callback?

  pop: ->
    length = @count()
    i = 0
    last = null
    for key, item of @list
      if i == length
        last = key
      i++

    @remove last if last?

  update: (name, object) ->
    @list[name] = object
    @new[name] = object