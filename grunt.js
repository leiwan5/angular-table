/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    lint: {
      files: ['grunt.js']
    },
    qunit: {
      files: ['test/**/*.html']
    },
    coffee: {
      src: {
        dir: 'src/',
        dest: 'build/'
      },
      examples: {
        dir: 'examples'
      }
    },
    min: {
      dist: {
        src: ['build/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    watch: {
      src: {
        files: ['src/**/*.coffee'],
        tasks: 'coffee:src min'
      },
      examples: {
        files: ['examples/**/*.coffee'],
        tasks: 'coffee:examples'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {}
    },
    uglify: {}
  });

  // Default task.
  grunt.loadTasks('tasks');
  grunt.registerTask('default', 'coffee lint qunit min');
  grunt.registerTask("run", "server watch");
};
