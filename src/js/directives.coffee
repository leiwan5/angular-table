angularTable = angular.module '$angularTable'
angularTable.directive 'angularTable', ->
	template: '''<div class="angular-table">
			<div class="angular-table-header" bindonce="config" bo-style="{
						height: (config.headerHeight || 30) + 'px',
						'line-height': (config.headerHeight || 30) + 'px'
					}">
				<div class="angular-table-cell angular-table-header-cell" bindonce ng-repeat="col in config.columns" bo-style="{
							width: col.width ? (col.width + 'px') : 'auto',
							'min-width': (col.minWidth || 100) + 'px',
							height: (config.headerHeight || 30) + 'px',
							'line-height': (config.headerHeight || 30) + 'px',
							'text-align': (col.align || 'center')
						}" bo-text="col.label" bo-class="col.width ? '' : 'flex'">
				</div>
			</div>

			<div class="angular-table-body">
				<div class="angular-table-body-row" bindonce ng-repeat="item in config.data">
					<div class="angular-table-cell angular-table-body-row-cell" bindonce ng-repeat="col in config.columns" bo-style="{
								width: col.width ? (col.width + 'px') : 'auto',
								'min-width': (col.minWidth || 100) + 'px',
								height: (config.rowHeight || 30) + 'px',
								'line-height': (config.rowHeight || 30) + 'px',
								'text-align': (col.align || 'center')
							}" bo-class="col.width ? '' : 'flex'">
						<div class="angular-table-body-row-cell-content" bo-text="col.formatter ? col.formatter(item[col.field]) : item[col.field]">
						</div>
					</div>
				</div>
			</div>
		</div>'''
	replace: true
	scope:
		config: '=angularTable'
	link: (scope, element, attrs) ->
		headerElement = element.find '.angular-table-header'
		bodyElement = element.find '.angular-table-body'
		bodyElement.perfectScrollbar()
			.scroll (evt) ->
				headerElement.scrollLeft $(this).scrollLeft()
