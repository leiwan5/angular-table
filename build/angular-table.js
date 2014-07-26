(function() {
  var getScrollBarWidth;

  getScrollBarWidth = function() {
    var bigger, helper, smaller;
    helper = document.createElement('div');
    helper.style = 'width: 100px; height: 100px; overflow:hidden;';
    document.body.appendChild(helper);
    bigger = helper.clientWidth;
    helper.style.overflow = 'scroll';
    smaller = helper.clientWidth;
    document.body.removeChild(helper);
    return bigger - smaller;
  };

  angular.module('$angularTable.config', []).value('$angularTable.config', {});

  angular.module('$angularTable.filters', ['$angularTable.config']);

  angular.module('$angularTable.directives', ['$angularTable.config']);

  angular.module('$angularTable', ['$angularTable.filters', '$angularTable.directives', '$angularTable.config']);

  angular.module('$angularTable.directives').directive('angularTable', function() {
    return {
      template: '<div class="angular-table" ng-style="{height:options.height+\'px\', width:options.width+\'px\'}">\n	<div class="angular-table-header" ng-style="{height: options.header.height + \'px\', width: options.width + \'px\'}">\n		<div angular-table-header-left></div><div angular-table-header-right></div>\n	</div>\n	<div angular-table-column-scroller></div>\n	<div class="angular-table-body" ng-style="{height: (options.height - options.header.height - scrollbarWidth) + \'px\'}">\n		<div angular-table-body-left></div><div angular-table-body-right></div>\n	</div>\n</div>',
      replace: true,
      scope: {
        rows: '=ngModel',
        columns: '=columns',
        options: '=options'
      },
      link: function(scope, element, attrs) {
        setTimeout(function() {
          return scope.$apply(function() {
            scope.scrollbarWidth = getScrollBarWidth();
            return console.log(scope.options.height - scope.options.header.height - scope.scrollbarWidth);
          }, 0);
        });
        scope.$watch('columns', function(cols) {
          var widthLeft, widthRight;
          widthLeft = 0;
          widthRight = 0;
          scope.columns.forEach(function(col) {
            col.fixed = !!col.fixed;
            col.width = col.width || 100;
            if (col.fixed) {
              widthLeft += col.width;
            }
            if (!col.fixed) {
              return widthRight += col.width;
            }
          });
          scope.widthRight = widthRight;
          return scope.widthLeft = widthLeft;
        });
        scope.$on('hscroll', function(evt, left) {
          return scope.$broadcast('adjusthscroll', left);
        });
        return scope.$on('vscroll', function(evt, top) {
          return scope.$broadcast('adjustvscroll', top);
        });
      }
    };
  });

  angular.module('$angularTable.directives').directive('angularTableHeaderLeft', function() {
    return {
      template: '<div class="angular-table-header-left" ng-style="{height: (options.header.height-1) + \'px\'}">\n	<div angular-table-header-cell ng-repeat="column in columns | filter: {fixed: true}"> \n</div>',
      replace: true,
      link: function(scope, element, attrs) {}
    };
  });

  angular.module('$angularTable.directives').directive('angularTableHeaderRight', function() {
    return {
      template: '<div class="angular-table-header-right" ng-style="{height: (options.header.height-1) + \'px\', width: (options.width - widthLeft)+\'px\'}">\n	<div angular-table-header-cell ng-repeat="column in columns | filter: {fixed: false}"> \n</div>',
      replace: true,
      link: function(scope, element, attrs) {
        return scope.$on('adjusthscroll', function(evt, left) {
          return element[0].scrollLeft = left;
        });
      }
    };
  });

  angular.module('$angularTable.directives').directive('angularTableHeaderCell', function() {
    return {
      template: '<div class="angular-table-header-cell" ng-style="{width: (column.width || 100)+\'px\'}">\n	<label ng-style="{height: (options.header.height-1)+\'px\', lineHeight: (options.header.height-1)+\'px\'}">\n		{{column.label}}\n	</label>\n</div>',
      replace: true,
      link: function(scope, element, attrs) {}
    };
  });

  angular.module('$angularTable.directives').directive('angularTableColumnScroller', function() {
    return {
      template: '<div class="angular-table-column-scroller" ng-style="{marginLeft: (widthLeft) + \'px\', width: (options.width - widthLeft)+\'px\', height:(options.height - options.header.height) + \'px\'}">\n	<div ng-style="{width: widthRight+\'px\'}" style="height: 40px;"></div>\n</div>',
      replace: true,
      link: function(scope, element, attrs) {
        return element.bind('scroll', function(evt) {
          return scope.$emit('hscroll', evt.srcElement.scrollLeft);
        });
      }
    };
  });

  angular.module('$angularTable.directives').directive('angularTableBodyLeft', function() {
    return {
      template: '<div class="angular-table-body-left" ng-style="{height: (options.height - options.header.height - scrollbarWidth) + \'px\'}">\n	<div class="angular-table-row" ng-repeat="row in rows">\n		<div angular-table-row-cell ng-repeat="column in columns | filter: {fixed: true}"></div>\n	</div>\n</div>',
      replace: true,
      link: function(scope, element, attrs) {
        return scope.$on('adjustvscroll', function(evt, top) {
          return element[0].scrollTop = top;
        });
      }
    };
  });

  angular.module('$angularTable.directives').directive('angularTableBodyRight', function() {
    return {
      template: '<div class="angular-table-body-right" ng-style="{height: (options.height - options.header.height - scrollbarWidth) + \'px\', width: (options.width - widthLeft)+\'px\'}">\n	<div class="angular-table-row" ng-repeat="row in rows" ng-style="{width: (widthRight)+\'px\'}">\n		<div angular-table-row-cell ng-repeat="column in columns | filter: {fixed: false}"></div>\n	</div>\n</div>',
      replace: true,
      link: function(scope, element, attrs) {
        scope.$on('adjusthscroll', function(evt, left) {
          return element[0].scrollLeft = left;
        });
        return element.bind('scroll', function(evt) {
          return scope.$emit('vscroll', evt.srcElement.scrollTop);
        });
      }
    };
  });

  angular.module('$angularTable.directives').directive('angularTableRowCell', function() {
    return {
      template: '<div class="angular-table-row-cell" ng-style="{height: (options.rowHeight + 1) + \'px\', width: (column.width)+\'px\'}">\n	<span class="angular-table-row-cell-content" ng-style="{height: (options.rowHeight-1)+\'px\', lineHeight: (options.rowHeight-1)+\'px\'}">\n		{{row[column.name]}}\n	</span>\n</div>',
      replace: true,
      link: function(scope, element, attrs) {}
    };
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXItdGFibGUuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQSxpQkFBQTs7QUFBQSxFQUFBLGlCQUFBLEdBQW9CLFNBQUEsR0FBQTtBQUNuQixRQUFBLHVCQUFBO0FBQUEsSUFBQSxNQUFBLEdBQVMsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBVCxDQUFBO0FBQUEsSUFDQSxNQUFNLENBQUMsS0FBUCxHQUFlLCtDQURmLENBQUE7QUFBQSxJQUVBLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBZCxDQUEwQixNQUExQixDQUZBLENBQUE7QUFBQSxJQUdBLE1BQUEsR0FBUyxNQUFNLENBQUMsV0FIaEIsQ0FBQTtBQUFBLElBSUEsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFiLEdBQXdCLFFBSnhCLENBQUE7QUFBQSxJQUtBLE9BQUEsR0FBVSxNQUFNLENBQUMsV0FMakIsQ0FBQTtBQUFBLElBTUEsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFkLENBQTBCLE1BQTFCLENBTkEsQ0FBQTtXQU9BLE1BQUEsR0FBUyxRQVJVO0VBQUEsQ0FBcEIsQ0FBQTs7QUFBQSxFQVVBLE9BQU8sQ0FBQyxNQUFSLENBQWUsc0JBQWYsRUFBdUMsRUFBdkMsQ0FBMEMsQ0FBQyxLQUEzQyxDQUFpRCxzQkFBakQsRUFBeUUsRUFBekUsQ0FWQSxDQUFBOztBQUFBLEVBV0EsT0FBTyxDQUFDLE1BQVIsQ0FBZSx1QkFBZixFQUF3QyxDQUFDLHNCQUFELENBQXhDLENBWEEsQ0FBQTs7QUFBQSxFQVlBLE9BQU8sQ0FBQyxNQUFSLENBQWUsMEJBQWYsRUFBMkMsQ0FBQyxzQkFBRCxDQUEzQyxDQVpBLENBQUE7O0FBQUEsRUFhQSxPQUFPLENBQUMsTUFBUixDQUFlLGVBQWYsRUFBZ0MsQ0FBQyx1QkFBRCxFQUEwQiwwQkFBMUIsRUFBc0Qsc0JBQXRELENBQWhDLENBYkEsQ0FBQTs7QUFBQSxFQWVBLE9BQU8sQ0FBQyxNQUFSLENBQWUsMEJBQWYsQ0FB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LEVBQVUsZ1RBQVY7QUFBQSxNQUtBLE9BQUEsRUFBUyxJQUxUO0FBQUEsTUFNQSxJQUFBLEVBQU0sU0FBQyxLQUFELEVBQVEsT0FBUixFQUFpQixLQUFqQixHQUFBLENBTk47TUFEMkU7RUFBQSxDQUE1RSxDQS9HQSxDQUFBO0FBQUEiLCJmaWxlIjoiYW5ndWxhci10YWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImdldFNjcm9sbEJhcldpZHRoID0gKCkgLT5cclxuXHRoZWxwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdkaXYnXHJcblx0aGVscGVyLnN0eWxlID0gJ3dpZHRoOiAxMDBweDsgaGVpZ2h0OiAxMDBweDsgb3ZlcmZsb3c6aGlkZGVuOydcclxuXHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkIGhlbHBlclxyXG5cdGJpZ2dlciA9IGhlbHBlci5jbGllbnRXaWR0aFxyXG5cdGhlbHBlci5zdHlsZS5vdmVyZmxvdyA9ICdzY3JvbGwnXHJcblx0c21hbGxlciA9IGhlbHBlci5jbGllbnRXaWR0aFxyXG5cdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQgaGVscGVyXHJcblx0YmlnZ2VyIC0gc21hbGxlclxyXG5cclxuYW5ndWxhci5tb2R1bGUoJyRhbmd1bGFyVGFibGUuY29uZmlnJywgW10pLnZhbHVlKCckYW5ndWxhclRhYmxlLmNvbmZpZycsIHt9KTtcclxuYW5ndWxhci5tb2R1bGUoJyRhbmd1bGFyVGFibGUuZmlsdGVycycsIFsnJGFuZ3VsYXJUYWJsZS5jb25maWcnXSk7XHJcbmFuZ3VsYXIubW9kdWxlKCckYW5ndWxhclRhYmxlLmRpcmVjdGl2ZXMnLCBbJyRhbmd1bGFyVGFibGUuY29uZmlnJ10pO1xyXG5hbmd1bGFyLm1vZHVsZSgnJGFuZ3VsYXJUYWJsZScsIFsnJGFuZ3VsYXJUYWJsZS5maWx0ZXJzJywgJyRhbmd1bGFyVGFibGUuZGlyZWN0aXZlcycsICckYW5ndWxhclRhYmxlLmNvbmZpZyddKTtcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCckYW5ndWxhclRhYmxlLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUgJ2FuZ3VsYXJUYWJsZScsICgpIC0+XHJcblx0dGVtcGxhdGU6ICcnJzxkaXYgY2xhc3M9XCJhbmd1bGFyLXRhYmxlXCIgbmctc3R5bGU9XCJ7aGVpZ2h0Om9wdGlvbnMuaGVpZ2h0KydweCcsIHdpZHRoOm9wdGlvbnMud2lkdGgrJ3B4J31cIj5cclxuXHRcdFx0PGRpdiBjbGFzcz1cImFuZ3VsYXItdGFibGUtaGVhZGVyXCIgbmctc3R5bGU9XCJ7aGVpZ2h0OiBvcHRpb25zLmhlYWRlci5oZWlnaHQgKyAncHgnLCB3aWR0aDogb3B0aW9ucy53aWR0aCArICdweCd9XCI+XHJcblx0XHRcdFx0PGRpdiBhbmd1bGFyLXRhYmxlLWhlYWRlci1sZWZ0PjwvZGl2PjxkaXYgYW5ndWxhci10YWJsZS1oZWFkZXItcmlnaHQ+PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8ZGl2IGFuZ3VsYXItdGFibGUtY29sdW1uLXNjcm9sbGVyPjwvZGl2PlxyXG5cdFx0XHQ8ZGl2IGNsYXNzPVwiYW5ndWxhci10YWJsZS1ib2R5XCIgbmctc3R5bGU9XCJ7aGVpZ2h0OiAob3B0aW9ucy5oZWlnaHQgLSBvcHRpb25zLmhlYWRlci5oZWlnaHQgLSBzY3JvbGxiYXJXaWR0aCkgKyAncHgnfVwiPlxyXG5cdFx0XHRcdDxkaXYgYW5ndWxhci10YWJsZS1ib2R5LWxlZnQ+PC9kaXY+PGRpdiBhbmd1bGFyLXRhYmxlLWJvZHktcmlnaHQ+PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0PC9kaXY+JycnXHJcblx0cmVwbGFjZTogdHJ1ZVxyXG5cdHNjb3BlOlxyXG5cdFx0cm93czogJz1uZ01vZGVsJ1xyXG5cdFx0Y29sdW1uczogJz1jb2x1bW5zJ1xyXG5cdFx0b3B0aW9uczogJz1vcHRpb25zJ1xyXG5cdGxpbms6IChzY29wZSwgZWxlbWVudCwgYXR0cnMpIC0+XHJcblx0XHRzZXRUaW1lb3V0IC0+XHJcblx0XHRcdHNjb3BlLiRhcHBseSAtPlxyXG5cdFx0XHRcdHNjb3BlLnNjcm9sbGJhcldpZHRoID0gZ2V0U2Nyb2xsQmFyV2lkdGgoKVxyXG5cdFx0XHRcdGNvbnNvbGUubG9nIHNjb3BlLm9wdGlvbnMuaGVpZ2h0IC0gc2NvcGUub3B0aW9ucy5oZWFkZXIuaGVpZ2h0IC0gc2NvcGUuc2Nyb2xsYmFyV2lkdGhcclxuXHRcdFx0LDBcclxuXHRcdHNjb3BlLiR3YXRjaCAnY29sdW1ucycsIChjb2xzKSAtPlxyXG5cdFx0XHR3aWR0aExlZnQgPSAwXHJcblx0XHRcdHdpZHRoUmlnaHQgPSAwXHJcblx0XHRcdHNjb3BlLmNvbHVtbnMuZm9yRWFjaCAoY29sKSAtPlxyXG5cdFx0XHRcdGNvbC5maXhlZCA9ICEhY29sLmZpeGVkXHJcblx0XHRcdFx0Y29sLndpZHRoID0gY29sLndpZHRoIHx8IDEwMFxyXG5cdFx0XHRcdHdpZHRoTGVmdCArPSBjb2wud2lkdGggaWYgY29sLmZpeGVkXHJcblx0XHRcdFx0d2lkdGhSaWdodCArPSBjb2wud2lkdGggdW5sZXNzIGNvbC5maXhlZFxyXG5cdFx0XHRzY29wZS53aWR0aFJpZ2h0ID0gd2lkdGhSaWdodFxyXG5cdFx0XHRzY29wZS53aWR0aExlZnQgPSB3aWR0aExlZnRcclxuXHJcblx0XHRzY29wZS4kb24gJ2hzY3JvbGwnLCAoZXZ0LCBsZWZ0KSAtPlxyXG5cdFx0XHRzY29wZS4kYnJvYWRjYXN0ICdhZGp1c3Roc2Nyb2xsJywgbGVmdFxyXG5cdFx0c2NvcGUuJG9uICd2c2Nyb2xsJywgKGV2dCwgdG9wKSAtPlxyXG5cdFx0XHRzY29wZS4kYnJvYWRjYXN0ICdhZGp1c3R2c2Nyb2xsJywgdG9wXHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnJGFuZ3VsYXJUYWJsZS5kaXJlY3RpdmVzJykuZGlyZWN0aXZlICdhbmd1bGFyVGFibGVIZWFkZXJMZWZ0JywgKCkgLT5cclxuXHR0ZW1wbGF0ZTogJycnPGRpdiBjbGFzcz1cImFuZ3VsYXItdGFibGUtaGVhZGVyLWxlZnRcIiBuZy1zdHlsZT1cIntoZWlnaHQ6IChvcHRpb25zLmhlYWRlci5oZWlnaHQtMSkgKyAncHgnfVwiPlxyXG5cdFx0XHQ8ZGl2IGFuZ3VsYXItdGFibGUtaGVhZGVyLWNlbGwgbmctcmVwZWF0PVwiY29sdW1uIGluIGNvbHVtbnMgfCBmaWx0ZXI6IHtmaXhlZDogdHJ1ZX1cIj4gXHJcblx0XHQ8L2Rpdj4nJydcclxuXHRyZXBsYWNlOiB0cnVlXHJcblx0bGluazogKHNjb3BlLCBlbGVtZW50LCBhdHRycykgLT5cclxuXHJcbmFuZ3VsYXIubW9kdWxlKCckYW5ndWxhclRhYmxlLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUgJ2FuZ3VsYXJUYWJsZUhlYWRlclJpZ2h0JywgKCkgLT5cclxuXHR0ZW1wbGF0ZTogJycnPGRpdiBjbGFzcz1cImFuZ3VsYXItdGFibGUtaGVhZGVyLXJpZ2h0XCIgbmctc3R5bGU9XCJ7aGVpZ2h0OiAob3B0aW9ucy5oZWFkZXIuaGVpZ2h0LTEpICsgJ3B4Jywgd2lkdGg6IChvcHRpb25zLndpZHRoIC0gd2lkdGhMZWZ0KSsncHgnfVwiPlxyXG5cdFx0XHQ8ZGl2IGFuZ3VsYXItdGFibGUtaGVhZGVyLWNlbGwgbmctcmVwZWF0PVwiY29sdW1uIGluIGNvbHVtbnMgfCBmaWx0ZXI6IHtmaXhlZDogZmFsc2V9XCI+IFxyXG5cdFx0PC9kaXY+JycnXHJcblx0cmVwbGFjZTogdHJ1ZVxyXG5cdGxpbms6IChzY29wZSwgZWxlbWVudCwgYXR0cnMpIC0+XHJcblx0XHRzY29wZS4kb24gJ2FkanVzdGhzY3JvbGwnLCAoZXZ0LCBsZWZ0KSAtPlxyXG5cdFx0XHRlbGVtZW50WzBdLnNjcm9sbExlZnQgPSBsZWZ0XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnJGFuZ3VsYXJUYWJsZS5kaXJlY3RpdmVzJykuZGlyZWN0aXZlICdhbmd1bGFyVGFibGVIZWFkZXJDZWxsJywgKCkgLT5cclxuXHR0ZW1wbGF0ZTogJycnPGRpdiBjbGFzcz1cImFuZ3VsYXItdGFibGUtaGVhZGVyLWNlbGxcIiBuZy1zdHlsZT1cInt3aWR0aDogKGNvbHVtbi53aWR0aCB8fCAxMDApKydweCd9XCI+XHJcblx0XHRcdDxsYWJlbCBuZy1zdHlsZT1cIntoZWlnaHQ6IChvcHRpb25zLmhlYWRlci5oZWlnaHQtMSkrJ3B4JywgbGluZUhlaWdodDogKG9wdGlvbnMuaGVhZGVyLmhlaWdodC0xKSsncHgnfVwiPlxyXG5cdFx0XHRcdHt7Y29sdW1uLmxhYmVsfX1cclxuXHRcdFx0PC9sYWJlbD5cclxuXHRcdDwvZGl2PicnJ1xyXG5cdHJlcGxhY2U6IHRydWVcclxuXHRsaW5rOiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSAtPlxyXG5cclxuYW5ndWxhci5tb2R1bGUoJyRhbmd1bGFyVGFibGUuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSAnYW5ndWxhclRhYmxlQ29sdW1uU2Nyb2xsZXInLCAoKSAtPlxyXG5cdHRlbXBsYXRlOiAnJyc8ZGl2IGNsYXNzPVwiYW5ndWxhci10YWJsZS1jb2x1bW4tc2Nyb2xsZXJcIiBuZy1zdHlsZT1cInttYXJnaW5MZWZ0OiAod2lkdGhMZWZ0KSArICdweCcsIHdpZHRoOiAob3B0aW9ucy53aWR0aCAtIHdpZHRoTGVmdCkrJ3B4JywgaGVpZ2h0OihvcHRpb25zLmhlaWdodCAtIG9wdGlvbnMuaGVhZGVyLmhlaWdodCkgKyAncHgnfVwiPlxyXG5cdFx0XHQ8ZGl2IG5nLXN0eWxlPVwie3dpZHRoOiB3aWR0aFJpZ2h0KydweCd9XCIgc3R5bGU9XCJoZWlnaHQ6IDQwcHg7XCI+PC9kaXY+XHJcblx0XHQ8L2Rpdj4nJydcclxuXHRyZXBsYWNlOiB0cnVlXHJcblx0bGluazogKHNjb3BlLCBlbGVtZW50LCBhdHRycykgLT5cclxuXHRcdGVsZW1lbnQuYmluZCAnc2Nyb2xsJywgKGV2dCkgLT5cclxuXHRcdFx0c2NvcGUuJGVtaXQgJ2hzY3JvbGwnLCBldnQuc3JjRWxlbWVudC5zY3JvbGxMZWZ0XHJcblxyXG5cclxuYW5ndWxhci5tb2R1bGUoJyRhbmd1bGFyVGFibGUuZGlyZWN0aXZlcycpLmRpcmVjdGl2ZSAnYW5ndWxhclRhYmxlQm9keUxlZnQnLCAoKSAtPlxyXG5cdHRlbXBsYXRlOiAnJyc8ZGl2IGNsYXNzPVwiYW5ndWxhci10YWJsZS1ib2R5LWxlZnRcIiBuZy1zdHlsZT1cIntoZWlnaHQ6IChvcHRpb25zLmhlaWdodCAtIG9wdGlvbnMuaGVhZGVyLmhlaWdodCAtIHNjcm9sbGJhcldpZHRoKSArICdweCd9XCI+XHJcblx0XHRcdDxkaXYgY2xhc3M9XCJhbmd1bGFyLXRhYmxlLXJvd1wiIG5nLXJlcGVhdD1cInJvdyBpbiByb3dzXCI+XHJcblx0XHRcdFx0PGRpdiBhbmd1bGFyLXRhYmxlLXJvdy1jZWxsIG5nLXJlcGVhdD1cImNvbHVtbiBpbiBjb2x1bW5zIHwgZmlsdGVyOiB7Zml4ZWQ6IHRydWV9XCI+PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0PC9kaXY+JycnXHJcblx0cmVwbGFjZTogdHJ1ZVxyXG5cdGxpbms6IChzY29wZSwgZWxlbWVudCwgYXR0cnMpIC0+XHJcblx0XHRzY29wZS4kb24gJ2FkanVzdHZzY3JvbGwnLCAoZXZ0LCB0b3ApIC0+XHJcblx0XHRcdGVsZW1lbnRbMF0uc2Nyb2xsVG9wID0gdG9wXHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnJGFuZ3VsYXJUYWJsZS5kaXJlY3RpdmVzJykuZGlyZWN0aXZlICdhbmd1bGFyVGFibGVCb2R5UmlnaHQnLCAoKSAtPlxyXG5cdHRlbXBsYXRlOiAnJyc8ZGl2IGNsYXNzPVwiYW5ndWxhci10YWJsZS1ib2R5LXJpZ2h0XCIgbmctc3R5bGU9XCJ7aGVpZ2h0OiAob3B0aW9ucy5oZWlnaHQgLSBvcHRpb25zLmhlYWRlci5oZWlnaHQgLSBzY3JvbGxiYXJXaWR0aCkgKyAncHgnLCB3aWR0aDogKG9wdGlvbnMud2lkdGggLSB3aWR0aExlZnQpKydweCd9XCI+XHJcblx0XHRcdDxkaXYgY2xhc3M9XCJhbmd1bGFyLXRhYmxlLXJvd1wiIG5nLXJlcGVhdD1cInJvdyBpbiByb3dzXCIgbmctc3R5bGU9XCJ7d2lkdGg6ICh3aWR0aFJpZ2h0KSsncHgnfVwiPlxyXG5cdFx0XHRcdDxkaXYgYW5ndWxhci10YWJsZS1yb3ctY2VsbCBuZy1yZXBlYXQ9XCJjb2x1bW4gaW4gY29sdW1ucyB8IGZpbHRlcjoge2ZpeGVkOiBmYWxzZX1cIj48L2Rpdj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQ8L2Rpdj4nJydcclxuXHRyZXBsYWNlOiB0cnVlXHJcblx0bGluazogKHNjb3BlLCBlbGVtZW50LCBhdHRycykgLT5cclxuXHRcdHNjb3BlLiRvbiAnYWRqdXN0aHNjcm9sbCcsIChldnQsIGxlZnQpIC0+XHJcblx0XHRcdGVsZW1lbnRbMF0uc2Nyb2xsTGVmdCA9IGxlZnRcclxuXHRcdGVsZW1lbnQuYmluZCAnc2Nyb2xsJywgKGV2dCkgLT5cclxuXHRcdFx0c2NvcGUuJGVtaXQgJ3ZzY3JvbGwnLCBldnQuc3JjRWxlbWVudC5zY3JvbGxUb3BcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCckYW5ndWxhclRhYmxlLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUgJ2FuZ3VsYXJUYWJsZVJvd0NlbGwnLCAoKSAtPlxyXG5cdHRlbXBsYXRlOiAnJyc8ZGl2IGNsYXNzPVwiYW5ndWxhci10YWJsZS1yb3ctY2VsbFwiIG5nLXN0eWxlPVwie2hlaWdodDogKG9wdGlvbnMucm93SGVpZ2h0ICsgMSkgKyAncHgnLCB3aWR0aDogKGNvbHVtbi53aWR0aCkrJ3B4J31cIj5cclxuXHRcdFx0PHNwYW4gY2xhc3M9XCJhbmd1bGFyLXRhYmxlLXJvdy1jZWxsLWNvbnRlbnRcIiBuZy1zdHlsZT1cIntoZWlnaHQ6IChvcHRpb25zLnJvd0hlaWdodC0xKSsncHgnLCBsaW5lSGVpZ2h0OiAob3B0aW9ucy5yb3dIZWlnaHQtMSkrJ3B4J31cIj5cclxuXHRcdFx0XHR7e3Jvd1tjb2x1bW4ubmFtZV19fVxyXG5cdFx0XHQ8L3NwYW4+XHJcblx0XHQ8L2Rpdj4nJydcclxuXHRyZXBsYWNlOiB0cnVlXHJcblx0bGluazogKHNjb3BlLCBlbGVtZW50LCBhdHRycykgLT5cclxuXHJcblxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=