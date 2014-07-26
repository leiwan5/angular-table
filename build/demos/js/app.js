(function() {
  var app;

  app = angular.module('app', ['$angularTable']);

  app.controller('AppController', [
    '$scope', function($scope) {
      return $scope.table = {
        data: [
          {
            name: 'John',
            age: 30,
            gender: 1
          }, {
            name: 'Daniel',
            age: 30,
            gender: 1
          }, {
            name: 'Marry',
            age: 26,
            gender: 2
          }, {
            name: 'Jack',
            age: 31,
            gender: 1
          }, {
            name: 'Angela',
            age: 27,
            gender: 2
          }, {
            name: 'Carlos',
            age: 33,
            gender: 1
          }, {
            name: 'John',
            age: 30,
            gender: 1
          }, {
            name: 'Daniel',
            age: 30,
            gender: 1
          }, {
            name: 'Marry',
            age: 26,
            gender: 2
          }, {
            name: 'Jack',
            age: 31,
            gender: 1
          }, {
            name: 'Angela',
            age: 27,
            gender: 2
          }, {
            name: 'Carlos',
            age: 33,
            gender: 1
          }, {
            name: 'John',
            age: 30,
            gender: 1
          }, {
            name: 'Daniel',
            age: 30,
            gender: 1
          }, {
            name: 'Marry',
            age: 26,
            gender: 2
          }, {
            name: 'Jack',
            age: 31,
            gender: 1
          }, {
            name: 'Angela',
            age: 27,
            gender: 2
          }, {
            name: 'Carlos',
            age: 33,
            gender: 1
          }
        ],
        columns: [
          {
            field: 'name',
            label: 'Name',
            align: 'left'
          }, {
            field: 'age',
            label: 'Age',
            width: 100,
            align: 'right'
          }, {
            field: 'gender',
            label: 'Gender',
            width: 100
          }, {
            field: 'name',
            label: 'Name',
            align: 'left'
          }, {
            field: 'age',
            label: 'Age',
            width: 100,
            align: 'right'
          }, {
            field: 'gender',
            label: 'Gender',
            width: 100
          }, {
            field: 'name',
            label: 'Name',
            align: 'left'
          }, {
            field: 'age',
            label: 'Age',
            width: 100,
            align: 'right'
          }, {
            field: 'gender',
            label: 'Gender',
            width: 100
          }, {
            field: 'name',
            label: 'Name',
            align: 'left'
          }, {
            field: 'age',
            label: 'Age',
            width: 100,
            align: 'right'
          }, {
            field: 'gender',
            label: 'Gender',
            width: 100
          }, {
            field: 'name',
            label: 'Name',
            align: 'left'
          }, {
            field: 'age',
            label: 'Age',
            width: 100,
            align: 'right'
          }, {
            field: 'gender',
            label: 'Gender',
            width: 100
          }
        ]
      };
    }
  ]);

  $(function() {
    if (window.location.port === '7980') {
      return $.getScript('//localhost:35729/livereload.js');
    }
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,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Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiYXBwID0gYW5ndWxhci5tb2R1bGUgJ2FwcCcsIFsnJGFuZ3VsYXJUYWJsZSddXHJcblxyXG5hcHAuY29udHJvbGxlciAnQXBwQ29udHJvbGxlcicsIFtcclxuXHQnJHNjb3BlJyxcclxuXHQoJHNjb3BlKSAtPlxyXG5cdFx0JHNjb3BlLnRhYmxlID1cclxuXHRcdFx0ZGF0YTogW1xyXG5cdFx0XHRcdHtuYW1lOiAnSm9obicsIGFnZTogMzAsIGdlbmRlcjogMX0sXHJcblx0XHRcdFx0e25hbWU6ICdEYW5pZWwnLCBhZ2U6IDMwLCBnZW5kZXI6IDF9LFxyXG5cdFx0XHRcdHtuYW1lOiAnTWFycnknLCBhZ2U6IDI2LCBnZW5kZXI6IDJ9LFxyXG5cdFx0XHRcdHtuYW1lOiAnSmFjaycsIGFnZTogMzEsIGdlbmRlcjogMX0sXHJcblx0XHRcdFx0e25hbWU6ICdBbmdlbGEnLCBhZ2U6IDI3LCBnZW5kZXI6IDJ9LFxyXG5cdFx0XHRcdHtuYW1lOiAnQ2FybG9zJywgYWdlOiAzMywgZ2VuZGVyOiAxfSxcclxuXHRcdFx0XHR7bmFtZTogJ0pvaG4nLCBhZ2U6IDMwLCBnZW5kZXI6IDF9LFxyXG5cdFx0XHRcdHtuYW1lOiAnRGFuaWVsJywgYWdlOiAzMCwgZ2VuZGVyOiAxfSxcclxuXHRcdFx0XHR7bmFtZTogJ01hcnJ5JywgYWdlOiAyNiwgZ2VuZGVyOiAyfSxcclxuXHRcdFx0XHR7bmFtZTogJ0phY2snLCBhZ2U6IDMxLCBnZW5kZXI6IDF9LFxyXG5cdFx0XHRcdHtuYW1lOiAnQW5nZWxhJywgYWdlOiAyNywgZ2VuZGVyOiAyfSxcclxuXHRcdFx0XHR7bmFtZTogJ0NhcmxvcycsIGFnZTogMzMsIGdlbmRlcjogMX0sXHJcblx0XHRcdFx0e25hbWU6ICdKb2huJywgYWdlOiAzMCwgZ2VuZGVyOiAxfSxcclxuXHRcdFx0XHR7bmFtZTogJ0RhbmllbCcsIGFnZTogMzAsIGdlbmRlcjogMX0sXHJcblx0XHRcdFx0e25hbWU6ICdNYXJyeScsIGFnZTogMjYsIGdlbmRlcjogMn0sXHJcblx0XHRcdFx0e25hbWU6ICdKYWNrJywgYWdlOiAzMSwgZ2VuZGVyOiAxfSxcclxuXHRcdFx0XHR7bmFtZTogJ0FuZ2VsYScsIGFnZTogMjcsIGdlbmRlcjogMn0sXHJcblx0XHRcdFx0e25hbWU6ICdDYXJsb3MnLCBhZ2U6IDMzLCBnZW5kZXI6IDF9LFxyXG5cdFx0XHRdXHJcblx0XHRcdGNvbHVtbnM6IFtcclxuXHRcdFx0XHR7ZmllbGQ6ICduYW1lJywgbGFiZWw6ICdOYW1lJywgYWxpZ246ICdsZWZ0J30sXHJcblx0XHRcdFx0e2ZpZWxkOiAnYWdlJywgbGFiZWw6ICdBZ2UnLCB3aWR0aDogMTAwLCBhbGlnbjogJ3JpZ2h0J30sXHJcblx0XHRcdFx0e2ZpZWxkOiAnZ2VuZGVyJywgbGFiZWw6ICdHZW5kZXInLCB3aWR0aDogMTAwfSxcclxuXHRcdFx0XHR7ZmllbGQ6ICduYW1lJywgbGFiZWw6ICdOYW1lJywgYWxpZ246ICdsZWZ0J30sXHJcblx0XHRcdFx0e2ZpZWxkOiAnYWdlJywgbGFiZWw6ICdBZ2UnLCB3aWR0aDogMTAwLCBhbGlnbjogJ3JpZ2h0J30sXHJcblx0XHRcdFx0e2ZpZWxkOiAnZ2VuZGVyJywgbGFiZWw6ICdHZW5kZXInLCB3aWR0aDogMTAwfSxcclxuXHRcdFx0XHR7ZmllbGQ6ICduYW1lJywgbGFiZWw6ICdOYW1lJywgYWxpZ246ICdsZWZ0J30sXHJcblx0XHRcdFx0e2ZpZWxkOiAnYWdlJywgbGFiZWw6ICdBZ2UnLCB3aWR0aDogMTAwLCBhbGlnbjogJ3JpZ2h0J30sXHJcblx0XHRcdFx0e2ZpZWxkOiAnZ2VuZGVyJywgbGFiZWw6ICdHZW5kZXInLCB3aWR0aDogMTAwfSxcclxuXHRcdFx0XHR7ZmllbGQ6ICduYW1lJywgbGFiZWw6ICdOYW1lJywgYWxpZ246ICdsZWZ0J30sXHJcblx0XHRcdFx0e2ZpZWxkOiAnYWdlJywgbGFiZWw6ICdBZ2UnLCB3aWR0aDogMTAwLCBhbGlnbjogJ3JpZ2h0J30sXHJcblx0XHRcdFx0e2ZpZWxkOiAnZ2VuZGVyJywgbGFiZWw6ICdHZW5kZXInLCB3aWR0aDogMTAwfSxcclxuXHRcdFx0XHR7ZmllbGQ6ICduYW1lJywgbGFiZWw6ICdOYW1lJywgYWxpZ246ICdsZWZ0J30sXHJcblx0XHRcdFx0e2ZpZWxkOiAnYWdlJywgbGFiZWw6ICdBZ2UnLCB3aWR0aDogMTAwLCBhbGlnbjogJ3JpZ2h0J30sXHJcblx0XHRcdFx0e2ZpZWxkOiAnZ2VuZGVyJywgbGFiZWw6ICdHZW5kZXInLCB3aWR0aDogMTAwfSxcclxuXHRcdFx0XVxyXG5dXHJcblxyXG5cclxuXHJcbiQgLT5cclxuXHRpZiB3aW5kb3cubG9jYXRpb24ucG9ydCA9PSAnNzk4MCdcclxuXHRcdCQuZ2V0U2NyaXB0ICcvL2xvY2FsaG9zdDozNTcyOS9saXZlcmVsb2FkLmpzJyJdfQ==