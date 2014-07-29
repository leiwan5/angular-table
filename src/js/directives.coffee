angularTable = angular.module '$angularTable'

angularTable.directive 'angularTableHeaderCell', ->
	template: '''
		<div class="angular-table-cell angular-table-header-cell" bindonce ng-style="{
					width: col.width ? (col.width + 'px') : 'auto',
					'min-width': (col.minWidth || 100) + 'px',
					height: (config.headerHeight || 30) + 'px',
					'line-height': (config.headerHeight || 30) + 'px',
					'text-align': (col.align || 'center')
				}" bo-class="{flex: !col.width, resizable: col.resizable}"
				ng-mousedown="header.mousedown($event, part, $index)"
				>
			<div class="angular-table-header-cell-content" bo-text="col.label"></div>
		</div>
	'''
	replace: true

angularTable.directive 'angularTableBodyColumn', ->
	template: '''
		<div class="angular-table-body-column" bindonce ng-style="{
					width: col.width ? (col.width + 'px') : 'auto',
					'min-width': (col.minWidth || 100) + 'px'
				}" bo-class="col.width ? '' : 'flex'">
			<div class="angular-table-cell angular-table-body-cell" bindonce ng-repeat="item in config.data"
						bo-attr bo-attr-data-index="$index"
						bo-class="$index == selected ? 'selected' : ''"
					>
				<div class="angular-table-body-cell-content" ng-style="{
						height: (config.rowHeight || 30) + 'px',
						'line-height': (config.rowHeight || 30) + 'px',
						'text-align': (col.align || 'center')
					}"
					bo-text="col.formatter ? col.formatter(item[col.field]) : item[col.field]">
				</div>
			</div>
		</div>
	'''
	replace: true

angularTable.directive 'angularTable', [
	'$timeout',
	($timeout) ->
		template: '''<div class="angular-table">
				<div class="angular-table-header" bindonce="config" ng-style="{
							height: (config.headerHeight || 30) + 'px',
							'line-height': (config.headerHeight || 30) + 'px'
						}">
					<div bo-class="'angular-table-header-' + part" bindonce ng-repeat="part in ['left', 'center', 'right']">
						<div angular-table-header-cell ng-repeat="col in config.columns[part]"></div>
					</div>
				</div>

				<div class="angular-table-body">
					<div bo-class="'angular-table-body-' + part" bindonce ng-repeat="part in ['left', 'center', 'right']">
						<div angular-table-body-column ng-repeat="col in config.columns[part]"></div>
					</div>
				</div>
			</div>'''
		replace: true
		scope:
			config: '=angularTable'
		link: (scope, element, attrs) ->
			$timeout ->
					element.on 'mouseenter', '.angular-table-body-cell', ->
						index = $(this).data 'index'
						element.find(".angular-table-body-cell[data-index=#{index}]").addClass 'hover'
					element.on 'mouseleave', '.angular-table-body-cell', ->
						index = $(this).data 'index'
						element.find(".angular-table-body-cell[data-index=#{index}]").removeClass 'hover'
					# element.on 'click', '.angular-table-body-cell', ->
					# 	index = $(this).data 'index'
					# 	element.find(".angular-table-body-cell[data-index=#{scope.selected}]").removeClass 'selected'
					# 	if scope.selected != index
					# 		scope.selected = index
					# 		element.find(".angular-table-body-cell[data-index=#{index}]").addClass 'selected'
					# 	else
					# 		scope.selected = -1

					headerCenter = element.find '.angular-table-header-center'
					bodyCenter = element.find '.angular-table-body-center'
					bodyCenter.perfectScrollbar()
						.scroll (event) ->
							siblings = $(this).siblings()
							siblings.scrollTop $(this).scrollTop()
							headerCenter.scrollLeft $(this).scrollLeft()
				, 0

			resizing = null

			scope.selected = -1

			scope.$on 'resizing', (_event, resizing) ->

				onmousemove = (event) ->
					newWidth = resizing.width - resizing.start + event.screenX
					newWidth = 30 if newWidth < 30
					resizing.element.outerWidth newWidth

				$(window).on 'mousemove', onmousemove

				$(window).one 'mouseup', (event) ->
					resizing.element.removeClass 'resizing'

					$(window).off 'mousemove', onmousemove
					newWidth = resizing.width - resizing.start + event.screenX
					newWidth = 30 if newWidth < 30
					col = angular.copy scope.config.columns[resizing.part][resizing.index]
					col.width = newWidth
					scope.config.columns[resizing.part][resizing.index] = col
					$timeout ->
						scope.$digest()

			scope.header =
				mousedown: (event, part, index) ->
					element = $(event.target)
					if !scope.config.columns[part][index].resizable or element.is('.angular-table-header-cell-content') or part == 'right' and index == scope.config.columns[part].length - 1
						return
					resizing =
						part: part
						index: index
						start: event.screenX
						element: element
						width: element.outerWidth()
					element.addClass 'resizing'
					scope.$broadcast 'resizing', resizing
]