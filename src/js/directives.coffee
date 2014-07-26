angularTable = angular.module '$angularTable'
angularTable.directive 'angularTable', ->
	template: '''<div class="angular-table">
			<div class="angular-table-header" ng-style="{
						height: (config.headerHeight || 30) + 'px',
						'line-height': (config.headerHeight || 30) + 'px'
					}">
				<div class="angular-table-cell angular-table-header-cell" ng-repeat="col in config.columns" ng-style="{
							width: (col.width || 100) + 'px',
							height: (config.headerHeight || 30) + 'px',
							'line-height': (config.headerHeight || 30) + 'px',
							'text-align': (col.align || 'center')
						}">
					{{ col.label }}
				</div>
			</div>
			<div class="angular-table-body">
				<div class="a">
					<div class="angular-table-body-row" ng-repeat="item in config.data">
						<div class="angular-table-cell angular-table-body-row-cell" ng-repeat="col in config.columns" ng-style="{
									width: (col.width || 100) + 'px',
									height: (config.rowHeight || 30) + 'px',
									'line-height': (config.rowHeight || 30) + 'px',
									'text-align': (col.align || 'center')
								}">
							<div class="angular-table-body-row-cell-content">
								{{ item[col.field] }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>'''
	replace: true
	scope:
		config: '=angularTable'
	link: (scope, element, attrs) ->
		scope.$watch 'config', (config) ->
			console.log config

		headerElement = element.find '.angular-table-header'
		bodyElement = element.find '.angular-table-body'
		bodyElement.perfectScrollbar()
			.scroll (evt) ->
				headerElement.scrollLeft $(this).scrollLeft()
