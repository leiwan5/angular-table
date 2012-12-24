window.App = angular.module 'table_simple', ['$angularTable.directives']

window.App.controller 'AppController', ($scope) ->
	$scope.tableColumns = [
		{name: 'name', label: '姓名', width: 100, fixed: true},
		{name: 'age', label: '年龄', width: 100},
		{name: 'age', label: '年龄', width: 100},
		{name: 'age', label: '年龄', width: 100},
		{name: 'age', label: '年龄', width: 100},
		{name: 'age', label: '年龄', width: 100},
		{name: 'age', label: '年龄', width: 100},
		{name: 'age', label: '年龄', width: 100},
		{name: 'age', label: '年龄', width: 100}
	]
	$scope.tableOptions = 
		height: 300
		width: 600
		rowHeight: 30
		header:
			height: 32
	$scope.tableData = [
		{name: 'John', age: '32'},
		{name: 'Irene', age: '29'},
		{name: 'John', age: '32'},
		{name: 'Irene', age: '29'},
		{name: 'John', age: '32'},
		{name: 'Irene', age: '29'},
		{name: 'John', age: '32'},
		{name: 'Irene', age: '29'},
		{name: 'John', age: '32'},
		{name: 'Irene', age: '29'},
		{name: 'John', age: '32'},
		{name: 'Irene', age: '29'},
		{name: 'John', age: '32'},
		{name: 'Irene', age: '29'},
		{name: 'John', age: '32'},
		{name: 'Irene', age: '29'},
		{name: 'John', age: '32'},
		{name: 'Irene', age: '29'},
		{name: 'John', age: '32'},
		{name: 'Irene', age: '29'},
		{name: 'John', age: '32'},
		{name: 'Irene', age: '29'},
		{name: 'John', age: '32'},
		{name: 'Irene', age: '29'},
		{name: 'John', age: '32'},
		{name: 'Irene', age: '29'},
		{name: 'John', age: '32'},
		{name: 'Irene', age: '29'},
		{name: 'John', age: '32'},
		{name: 'Irene', age: '29'},
		{name: 'John', age: '32'},
		{name: 'Irene', age: '29'},
		{name: 'John', age: '32'},
		{name: 'Irene', age: '29'},
		{name: 'John', age: '32'},
		{name: 'Irene', age: '29'},
		{name: 'John', age: '32'},
		{name: 'Irene', age: '29'},
		{name: 'John', age: '32'},
		{name: 'Irene', age: '29'},
		{name: 'John', age: '32'},
		{name: 'Irene', age: '29'},
		{name: 'John', age: '32'},
		{name: 'Irene', age: '29'},
		{name: 'John', age: '32'},
		{name: 'Irene', age: '29'}
	]
