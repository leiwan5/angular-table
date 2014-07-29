app = angular.module 'app', ['$angularTable']

app.controller 'AppController', [
	'$scope',
	($scope) ->
		formatters = 
			gender: (value) ->
				if value == 2 then 'F' else 'M'

		$scope.table =
			data: []
			columns:
				left: [
					{field: 'name', label: 'Name', align: 'left', width: 100, resizable: true},
					{field: 'age', label: 'Age', width: 100, align: 'right', resizable: true},
				]
				center: [
					{field: 'name', label: 'Name', align: 'left'},
					{field: 'age', label: 'Age', width: 100, align: 'right'},
				]
				right: [
					{label: 'Actions', width: 100, type: 'actions', actions: [
						{action: 'edit', title: 'Edit', iconClass: 'glyphicon glyphicon-pencil'},
						{action: 'delete', title: 'Delete', iconClass: 'glyphicon glyphicon-trash'},
						{action: 'open', title: 'Open', iconClass: 'glyphicon glyphicon-share-alt'},
					]},
				]

		$scope.test = ->
			$scope.table.data[0] = name: 'hello'


		data = [
				{name: 'John', age: 30, gender: 1},
				{name: 'Daniel', age: 30, gender: 1},
				{name: 'Marry', age: 26, gender: 2},
				{name: 'Jack', age: 31, gender: 1},
				{name: 'Angela', age: 27, gender: 2},
				{name: 'Carlos', age: 33, gender: 1},
				{name: 'John', age: 30, gender: 1},
				{name: 'Daniel', age: 30, gender: 1},
				{name: 'Marry', age: 26, gender: 2},
				{name: 'Jack', age: 31, gender: 1},
				{name: 'Angela', age: 27, gender: 2},
				{name: 'Carlos', age: 33, gender: 1},
				{name: 'John', age: 30, gender: 1},
				{name: 'Daniel', age: 30, gender: 1},
				{name: 'Marry', age: 26, gender: 2},
				{name: 'Jack', age: 31, gender: 1},
				{name: 'Angela', age: 27, gender: 2},
				{name: 'Carlos', age: 33, gender: 1},
		]

		$scope.table.data = data
]



$ ->
	if window.location.port == '7980'
		$.getScript '//localhost:35729/livereload.js'