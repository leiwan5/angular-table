app = angular.module 'app', ['$angularTable']

app.controller 'AppController', [
	'$scope',
	($scope) ->
		$scope.table =
			data: [
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
			columns: [
				{field: 'name', label: 'Name', align: 'left'},
				{field: 'age', label: 'Age', width: 100, align: 'right'},
				{field: 'gender', label: 'Gender', width: 100},
				{field: 'name', label: 'Name', align: 'left'},
				{field: 'age', label: 'Age', width: 100, align: 'right'},
				{field: 'gender', label: 'Gender', width: 100},
				{field: 'name', label: 'Name', align: 'left'},
				{field: 'age', label: 'Age', width: 100, align: 'right'},
				{field: 'gender', label: 'Gender', width: 100},
				{field: 'name', label: 'Name', align: 'left'},
				{field: 'age', label: 'Age', width: 100, align: 'right'},
				{field: 'gender', label: 'Gender', width: 100},
				{field: 'name', label: 'Name', align: 'left'},
				{field: 'age', label: 'Age', width: 100, align: 'right'},
				{field: 'gender', label: 'Gender', width: 100},
			]
]



$ ->
	if window.location.port == '7980'
		$.getScript '//localhost:35729/livereload.js'