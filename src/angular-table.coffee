angular.module('$angularTable.config', []).value('$angularTable.config', {});
angular.module('$angularTable.filters', ['$angularTable.config']);
angular.module('$angularTable.directives', ['$angularTable.config']);
angular.module('$angularTable', ['$angularTable.filters', '$angularTable.directives', '$angularTable.config']);

angular.module('$angularTable.directives').directive 'angularTable', () ->
	template: '''<div class="angular-table" ng-style="{height:options.height+'px', width:options.width+'px'}">
			<div angular-table-header data-columns="columns" data-options="options.header"></div>
			<div angular-table-body data-rows="rows" data-columns="columns" data-options="options"></div>
		</div>'''
	replace: true
	scope:
		rows: '=ngModel'
		columns: '=columns'
		options: '=options'
	link: (scope, element, attrs) ->
		# console.log scope

angular.module('$angularTable.directives').directive 'angularTableBody', () ->
	template: '''<div class="angular-table-body" ng-style="{height:(options.height-options.header.height)+'px'}">
			<div angular-table-row ng-repeat="row in rows" data-row="row" data-columns="columns"></div>
		</div>'''
	replace: true
	scope:
		rows: '=rows'
		columns: '=columns'
		options: '=options'
	link: (scope, element, attrs) ->
		# console.log scope


angular.module('$angularTable.directives').directive 'angularTableHeader', () ->
	template: '''<div class="angular-table-header" ng-style="{height:options.height+'px'}">
			<div angular-table-header-cell ng-repeat="col in columns" data-column="col"></div>
		</div>'''
	replace: true
	scope:
		options: '=options'
		columns: '=columns'
	link: (scope, element, attrs) ->
		# console.log scope

angular.module('$angularTable.directives').directive 'angularTableHeaderCell', () ->
	template: '''<div class="angular-table-header-cell" ng-style="{width: (column.width || 100)+'px'}">
			<label>{{column.label}}</label>
		</div>'''
	replace: true
	scope:
		column: '=column'
	link: (scope, element, attrs) ->

angular.module('$angularTable.directives').directive 'angularTableRow', () ->
	template: '''<div class="angular-table-row">
			<div angular-table-row-cell data-column="col" data-row="row" ng-repeat="col in columns"></div>
		</div>'''
	replace: true
	scope:
		columns: '=columns'
		row: '=row'
	link: (scope, element, attrs) ->
		# console.log scope

angular.module('$angularTable.directives').directive 'angularTableRowCell', () ->
	template: '''<div class="angular-table-row-cell" ng-style="{width: (column.width || 100)+'px'}">
			{{row[column.name]}}
		</div>'''
	replace: true
	scope:
		row: '=row'
		column: '=column'
	link: (scope, element, attrs) ->
		