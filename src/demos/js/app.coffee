app = angular.module 'app', []

app.controller 'AppController', [
	'$scope',
	($scope) ->
		$scope.hello = 'world'
]



$ ->
	if window.location.port == '7980'
		$.getScript '//localhost:35729/livereload.js'