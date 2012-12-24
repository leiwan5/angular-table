angular.module('$angularTable.config', []).value('$angularTable.config', {});
angular.module('$angularTable.filters', ['$angularTable.config']);
angular.module('$angularTable.directives', ['$angularTable.config']);
angular.module('$angularTable', ['$angularTable.filters', '$angularTable.directives', '$angularTable.config']);

angular.module('$angularTable.directives').directive 'angularTable', () ->
	template: '''<div class="angular-table" ng-style="{height:options.height+'px', width:options.width+'px'}">
			<div class="angular-table-header" ng-style="{height: options.header.height + 'px', width: options.width + 'px'}">
				<div angular-table-header-left></div><div angular-table-header-right></div>
			</div>
			<div angular-table-column-scroller></div>
			<div class="angular-table-body">
				<div angular-table-body-left></div><div angular-table-body-right></div>
			</div>
		</div>'''
	replace: true
	scope:
		rows: '=ngModel'
		columns: '=columns'
		options: '=options'
	link: (scope, element, attrs) ->
		scope.$watch 'columns', (cols) ->
			widthLeft = 0
			widthRight = 0
			scope.columns.forEach (col) ->
				col.fixed = !!col.fixed
				col.width = col.width || 100
				widthLeft += col.width if col.fixed
				widthRight += col.width unless col.fixed
			scope.widthRight = widthRight
			scope.widthLeft = widthLeft

		scope.$on 'hscroll', (evt, left) ->
			scope.$broadcast 'adjusthscroll', left
		scope.$on 'vscroll', (evt, top) ->
			scope.$broadcast 'adjustvscroll', top

angular.module('$angularTable.directives').directive 'angularTableHeaderLeft', () ->
	template: '''<div class="angular-table-header-left" ng-style="{height: (options.header.height-1) + 'px'}">
			<div angular-table-header-cell ng-repeat="column in columns | filter: {fixed: true}"> 
		</div>'''
	replace: true
	link: (scope, element, attrs) ->

angular.module('$angularTable.directives').directive 'angularTableHeaderRight', () ->
	template: '''<div class="angular-table-header-right" ng-style="{height: (options.header.height-1) + 'px', width: (options.width - widthLeft)+'px'}">
			<div angular-table-header-cell ng-repeat="column in columns | filter: {fixed: false}"> 
		</div>'''
	replace: true
	link: (scope, element, attrs) ->
		scope.$on 'adjusthscroll', (evt, left) ->
			element[0].scrollLeft = left

angular.module('$angularTable.directives').directive 'angularTableHeaderCell', () ->
	template: '''<div class="angular-table-header-cell" ng-style="{width: (column.width || 100)+'px'}">
			<label ng-style="{height: (options.header.height-1)+'px', lineHeight: (options.header.height-1)+'px'}">
				{{column.label}}
			</label>
		</div>'''
	replace: true
	link: (scope, element, attrs) ->

angular.module('$angularTable.directives').directive 'angularTableColumnScroller', () ->
	template: '''<div class="angular-table-column-scroller" ng-style="{marginLeft: (widthLeft) + 'px', width: (options.width - widthLeft)+'px', height: (options.height - options.header.height) + 'px'}">
			<div ng-style="{width: widthRight+'px'}" style="height: 40px;"></div>
		</div>'''
	replace: true
	link: (scope, element, attrs) ->
		element.bind 'scroll', (evt) ->
			scope.$emit 'hscroll', evt.srcElement.scrollLeft


angular.module('$angularTable.directives').directive 'angularTableBodyLeft', () ->
	template: '''<div class="angular-table-body-left" ng-style="{height: height + 'px'}">
			<div class="angular-table-row" ng-repeat="row in rows">
				<div angular-table-row-cell ng-repeat="column in columns | filter: {fixed: true}"></div>
			</div>
		</div>'''
	replace: true
	link: (scope, element, attrs) ->
		scope.height = scope.options.height - scope.options.header.height - 20
		scope.$on 'adjustvscroll', (evt, top) ->
			element[0].scrollTop = top

angular.module('$angularTable.directives').directive 'angularTableBodyRight', () ->
	template: '''<div class="angular-table-body-right" ng-style="{height: height + 'px', width: (options.width - widthLeft)+'px'}">
			<div class="angular-table-row" ng-repeat="row in rows" ng-style="{width: (widthRight)+'px'}">
				<div angular-table-row-cell ng-repeat="column in columns | filter: {fixed: false}"></div>
			</div>
		</div>'''
	replace: true
	link: (scope, element, attrs) ->
		scope.height = scope.options.height - scope.options.header.height - 20
		scope.$on 'adjusthscroll', (evt, left) ->
			element[0].scrollLeft = left
		element.bind 'scroll', (evt) ->
			scope.$emit 'vscroll', evt.srcElement.scrollTop

angular.module('$angularTable.directives').directive 'angularTableRowCell', () ->
	template: '''<div class="angular-table-row-cell" ng-style="{height: (options.rowHeight + 1) + 'px', width: (column.width)+'px'}">
			<span class="angular-table-row-cell-content" ng-style="{height: (options.rowHeight-1)+'px', lineHeight: (options.rowHeight-1)+'px'}">
				{{row[column.name]}}
			</span>
		</div>'''
	replace: true
	link: (scope, element, attrs) ->


