var ListObject;

ListObject = (function() {
  function ListObject() {
    this.list = {};
    this.deleted = {};
    this["new"] = {};
    this.length = 0;
  }

  ListObject.prototype.get = function(name) {
    return this.list[name];
  };

  ListObject.prototype.add = function(name, object) {
    return this.addObject(name, object);
  };

  ListObject.prototype.toggleAddRemove = function(name, object) {
    if (this.exist(name)) {
      return this.remove(name);
    } else {
      return this.add(name, object);
    }
  };

  ListObject.prototype.addObject = function(name, object) {
    this.list[name] = object;
    this.length++;
    this["new"][name] = object;
    if (this.deleted[name] != null) {
      return delete this.deleted[name];
    }
  };

  ListObject.prototype.remove = function(name) {
    this.deleted[name] = this.list[name];
    if (this["new"][name] != null) {
      delete this["new"][name];
    }
    delete this.list[name];
    return this.length--;
  };

  ListObject.prototype.exist = function(name) {
    return this.list[name] != null;
  };

  ListObject.prototype.has = function(name) {
    return this.exist(name);
  };

  ListObject.prototype.count = function() {
    var count, item, key, ref;
    count = 0;
    ref = this.list;
    for (key in ref) {
      item = ref[key];
      count++;
    }
    return count;
  };

  ListObject.prototype.clear = function(which) {
    if (which == null) {
      which = 'list';
    }
    return this.removeAll(which);
  };

  ListObject.prototype.clearAll = function() {
    this.removeAll('list');
    this.removeAll('new');
    return this.removeAll('deleted');
  };

  ListObject.prototype.removeAll = function(which) {
    var item, key, ref, results;
    if (which == null) {
      which = 'list';
    }
    ref = this[which];
    results = [];
    for (key in ref) {
      item = ref[key];
      results.push(this.remove(key));
    }
    return results;
  };

  ListObject.prototype.empty = function() {
    return this.count() === 0;
  };

  ListObject.prototype.filter = function(everyCallback) {
    var count, filteredList, item, key, ref;
    filteredList = new ListObject();
    count = 0;
    ref = this.list;
    for (key in ref) {
      item = ref[key];
      if (everyCallback(item, key, count)) {
        filteredList.add(key, item);
      }
      count++;
    }
    return filteredList;
  };

  ListObject.prototype.toArray = function() {
    var item, key, r, ref;
    r = [];
    ref = this.list;
    for (key in ref) {
      item = ref[key];
      r.push(item);
    }
    return r;
  };

  ListObject.prototype.sort = function(callback) {
    var r;
    callback = callback || function(a, b) {
      if (a.id === b.id) {
        return 0;
      }
      if (a.id > b.id) {
        return 1;
      } else {
        return -1;
      }
    };
    r = this.toArray();
    return r.sort(callback);
  };

  ListObject.prototype.fromArray = function(items, callback) {
    var item, j, len, results;
    callback = callback || (function(_this) {
      return function(item) {
        return _this.add(_this.length, item);
      };
    })(this);
    results = [];
    for (j = 0, len = items.length; j < len; j++) {
      item = items[j];
      if (callback != null) {
        results.push(callback(item));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  ListObject.prototype.toKeysArray = function() {
    var item, key, r, ref;
    r = [];
    ref = this.list;
    for (key in ref) {
      item = ref[key];
      r.push(key);
    }
    return r;
  };

  ListObject.prototype.loopAll = function(callback) {
    var item, key, ref, results;
    ref = this.list;
    results = [];
    for (key in ref) {
      item = ref[key];
      if (callback != null) {
        results.push(callback(item));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  ListObject.prototype.pop = function() {
    var i, item, key, last, length, ref;
    length = this.count();
    i = 0;
    last = null;
    ref = this.list;
    for (key in ref) {
      item = ref[key];
      if (i === length) {
        last = key;
      }
      i++;
    }
    if (last != null) {
      return this.remove(last);
    }
  };

  ListObject.prototype.update = function(name, object) {
    this.list[name] = object;
    return this["new"][name] = object;
  };

  return ListObject;

})();
