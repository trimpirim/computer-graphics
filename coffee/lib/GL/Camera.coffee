class Translation extends Vertex
	constructor: (@x = 0, @y = 0, @z  = 0) ->
		super @x, @y, @z
	
class Rotation extends Vertex
	constructor: (@x = 0, @y = 0, @z = 0) ->
		super @x, @y, @z

class Camera
	constructor: ->
		@translation = new Translation 0, 0, -15
		@rotation = new Rotation 90

	draw: ->
		mat4.perspective Matrices.getMatrix('projectionMatrix'), 45, GL.gl.viewportWidth / GL.gl.viewportHeight, 0.1, 1000.0
		mat4.identity Matrices.getMatrix('modelViewMatrix')
		mat4.translate Matrices.getMatrix('modelViewMatrix'), Matrices.getMatrix('modelViewMatrix'), @translation.toArray()
		mat4.rotateY Matrices.getMatrix('modelViewMatrix'), Matrices.getMatrix('modelViewMatrix'), MathUtils.toRadians(@rotation.y)
		mat4.rotateX Matrices.getMatrix('modelViewMatrix'), Matrices.getMatrix('modelViewMatrix'), MathUtils.toRadians(@rotation.x)
		mat4.rotateZ Matrices.getMatrix('modelViewMatrix'), Matrices.getMatrix('modelViewMatrix'), MathUtils.toRadians(@rotation.z)

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