class Camera
	constructor: (rotation = {x: 0, y: 0, z: 0}, translation = {x: 0, y: 0, z: -15}, scale = {x: 1, y: 1, z: 1}) ->
		@translation = new TranslationState translation.x, translation.y, translation.z
		@rotation = new RotationState rotation.x, rotation.y, rotation.z  
		@scale = new ScaleState scale.x, scale.y, scale.z

	draw: ->
		mat4.perspective Matrices.getMatrix('projectionMatrix'), 45, GL.gl.viewportWidth / GL.gl.viewportHeight, 0.1, 100.0
		mat4.identity Matrices.getMatrix('modelViewMatrix')
		mat4.translate Matrices.getMatrix('modelViewMatrix'), Matrices.getMatrix('modelViewMatrix'), @translation.toArray()
		mat4.rotateY Matrices.getMatrix('modelViewMatrix'), Matrices.getMatrix('modelViewMatrix'), MathUtils.toRadians(@rotation.y)
		mat4.rotateX Matrices.getMatrix('modelViewMatrix'), Matrices.getMatrix('modelViewMatrix'), MathUtils.toRadians(@rotation.x)
		mat4.rotateZ Matrices.getMatrix('modelViewMatrix'), Matrices.getMatrix('modelViewMatrix'), MathUtils.toRadians(@rotation.z)
		mat4.scale Matrices.getMatrix('modelViewMatrix'), Matrices.getMatrix('modelViewMatrix'), [@scale.x, @scale.y, @scale.z]

	ondrag: (positions) ->
		#@rotation.increase Axis.TYPES.Y, positions.deltas.x / 5
		#@rotation.increase Axis.TYPES.X, positions.deltas.y / 5

	update: (ev) ->
		switch ev.which
			when 33 #page up
				@translation.decrease 'y', 1
			when 34 #page down
				@translation.increase 'y', 1
			when 37 #left
				@translation.increase 'x', 1
			when 39 #right
				@translation.decrease 'x', 1
			when 38 #forward 
				@translation.increase 'z', 1
			when 40 #backward
				@translation.decrease 'z', 1
			when 100 #rotate left
				@rotation.increase 'y', 1
			when 102 #rotate right
				@rotation.decrease 'y', 1
			when 98 #rotate down
				@rotation.decrease 'x', 1
			when 104 #rotate up
				@rotation.increase 'x', 1
			when 49 #scale X up
				@scale.increase 'x', 0.05
			when 50 #scale Y up
				@scale.increase 'y', 0.05
			when 51 #scale Z up
				@scale.increase 'z', 0.05
			when 52 #scale X down
				@scale.decrease 'x', 0.05
			when 53 #scale Y down
				@scale.decrease 'y', 0.05
			when 54 #scale Z down
				@scale.decrease 'z', 0.05