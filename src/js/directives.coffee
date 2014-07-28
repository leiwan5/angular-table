angularTable = angular.module '$angularTable'

angularTable.directive 'angularTable', ->
	template: '''<div class="angular-table">
			<div class="angular-table-header" bindonce="config" bo-style="{
						height: (config.headerHeight || 30) + 'px',
						'line-height': (config.headerHeight || 30) + 'px'
					}">
				<div class="angular-table-cell angular-table-header-cell" bindonce ng-repeat="col in config.columns | filter:{sticky: 'left'}" bo-style="{
							width: col.width ? (col.width + 'px') : 'auto',
							'min-width': (col.minWidth || 100) + 'px',
							height: (config.headerHeight || 30) + 'px',
							'line-height': (config.headerHeight || 30) + 'px',
							'text-align': (col.align || 'center')
						}" bo-text="col.label">
				</div>
				<div class="flex angular-table-header-center">
					<div class="angular-table-cell angular-table-header-cell" bindonce ng-repeat="col in config.columns | filter:{sticky: undefined}" bo-style="{
								width: col.width ? (col.width + 'px') : 'auto',
								'min-width': (col.minWidth || 100) + 'px',
								height: (config.headerHeight || 30) + 'px',
								'line-height': (config.headerHeight || 30) + 'px',
								'text-align': (col.align || 'center')
							}" bo-text="col.label">
					</div>
				</div>
				<div class="angular-table-cell angular-table-header-cell" bindonce ng-repeat="col in config.columns | filter:{sticky: 'right'}" bo-style="{
							width: col.width ? (col.width + 'px') : 'auto',
							'min-width': (col.minWidth || 100) + 'px',
							height: (config.headerHeight || 30) + 'px',
							'line-height': (config.headerHeight || 30) + 'px',
							'text-align': (col.align || 'center')
						}" bo-text="col.label">
				</div>
			</div>

			<div class="angular-table-body">
				<div class="angular-table-body-left" bindonce ng-repeat="col in config.columns | filter:{sticky: 'left'}" bo-style="{
							width: col.width ? (col.width + 'px') : 'auto',
							'min-width': (col.minWidth || 100) + 'px'
						}">
					<div class="angular-table-cell angular-table-body-row-cell" bindonce ng-repeat="item in config.data">
						<div class="angular-table-body-row-cell-content" bo-style="{
								height: (config.rowHeight || 30) + 'px',
								'line-height': (config.rowHeight || 30) + 'px',
								'text-align': (col.align || 'center')
							}"
							bo-text="col.formatter ? col.formatter(item[col.field]) : item[col.field]">
						</div>
					</div>
				</div>
				<div class="angular-table-body-center">
					<div bindonce ng-repeat="col in config.columns | filter:{sticky: undefined}" bo-style="{
								width: col.width ? (col.width + 'px') : 'auto',
								'min-width': (col.minWidth || 100) + 'px'
							}" bo-class="col.width ? '' : 'flex'">
						<div class="angular-table-cell angular-table-body-row-cell" bindonce ng-repeat="item in config.data">
							<div class="angular-table-body-row-cell-content" bo-style="{
									height: (config.rowHeight || 30) + 'px',
									'line-height': (config.rowHeight || 30) + 'px',
									'text-align': (col.align || 'center')
									}"
								bo-text="col.formatter ? col.formatter(item[col.field]) : item[col.field]">
							</div>
						</div>
					</div>
				</div>
				<div class="angular-table-body-right" bindonce ng-repeat="col in config.columns | filter:{sticky: 'right'}" bo-style="{
							width: col.width ? (col.width + 'px') : 'auto',
							'min-width': (col.minWidth || 100) + 'px'
						}">
					<div class="angular-table-cell angular-table-body-row-cell" bindonce ng-repeat="item in config.data">
						<div bo-if="col.type!='actions'" class="angular-table-body-row-cell-content" bo-style="{
								height: (config.rowHeight || 30) + 'px',
								'line-height': (config.rowHeight || 30) + 'px',
								'text-align': (col.align || 'center')
								}"
							bo-text="col.formatter ? col.formatter(item[col.field]) : item[col.field]">
						</div>
						<div bo-if="col.type=='actions'" class="angular-table-body-row-cell-content" bo-style="{
								height: (config.rowHeight || 30) + 'px',
								'line-height': (config.rowHeight || 30) + 'px',
								'text-align': (col.align || 'center')
								}">
							<span class="icon" bindonce ng-repeat="action in col.actions" bo-class="action.iconClass")
						</div>
					</div>
				</div>
			</div>
		</div>'''
	replace: true
	scope:
		config: '=angularTable'
	link: (scope, element, attrs) ->
		headerCenter = element.find '.angular-table-header-center'
		bodyCenter = element.find '.angular-table-body-center'
		bodyCenter.perfectScrollbar()
			.scroll (evt) ->
				bodyLeftRight = element.find '.angular-table-body-left, .angular-table-body-right'
				bodyLeftRight.scrollTop $(this).scrollTop()
				headerCenter.scrollLeft $(this).scrollLeft()

