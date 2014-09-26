var matchdep = require('matchdep');

module.exports = function (grunt) {
  'use strict';

  matchdep.filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    prj: {
      src: 'src',
      build: 'build',
      test: 'test',
      fixtures: 'fixtures',
      vendor: 'bower_components',

      dependencies: [
        '<%= prj.vendor %>/define/define.js',
        '<%= prj.vendor %>/mu.is/is.js',
        '<%= prj.vendor %>/mu.fn/fn.js',
        '<%= prj.vendor %>/mu.list/list.js',
        '<%= prj.vendor %>/mu.api/api.js',
        '<%= prj.vendor %>/domo/domo.js',
        '<%= prj.vendor %>/firebase/firebase.js'
      ],

      cssDependencies: [
      ],

      devDependencies: [
      ],

      css: {
        src: '<%= prj.src %>/less',
        build: '<%= prj.build %>/css'
      },

      js: {
        src: '<%= prj.src %>',
        build: '<%= prj.build %>/<%= prj.src %>'
      },

      assets: {
        src: '<%= prj.src %>/assets',
        build: '<%= prj.build %>/assets'
      }
    },

    clean: {
      build: ['<%= prj.build %>']
    },

    less: {
      build: {
        options: {
          sourceMap: true,
          sourceMapFilename: '<%= prj.css.build %>/styles.css.map',
          sourceMapURL: 'styles.css.map'
        },
        src: ['<%= prj.css.src %>/**/*.less'],
        dest: '<%= prj.css.build %>/styles.css'
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      scripts: {
        src: ['<%= prj.js.src %>/**/*.js']
      },
      tests: {
        src: ['<%= prj.test %>/**/*.js']
      }
    },

    index: {
      build: {
        dir: '<%= prj.build %>',
        src: [
          '<%= prj.cssDependencies %>',
          '<%= less.build.dest %>',
          '<%= prj.dependencies %>',
          '<%= jshint.scripts.src %>'
        ]
      }
    },

    copy: {
      scripts: {
        src: ['<%= prj.js.src %>/**/*.js'],
        dest: '<%= prj.build %>/'
      },
      dependencies: {
        src: ['<%= prj.dependencies %>'],
        dest: '<%= prj.build %>/'
      },
      cssDependencies: {
        src: ['<%= prj.cssDependencies %>'],
        dest: '<%= prj.build %>/'
      },
      assets: {
        expand: true,
        cwd: '<%= prj.assets.src %>/',
        src: ['**'],
        dest: '<%= prj.assets.build %>/'
      }
    },

    freddie: {
      build: {
        options: {
          root: '<%= prj.build %>',
          port: 3000,
          fixtures: {
            '/api': '<%= prj.fixtures %>'
          }
        }
      }
    },

    watch: {
      scripts: {
        files: ['<%= jshint.scripts.src %>'],
        tasks: ['jshint:scripts' /* , 'karma:build' */ , 'copy:scripts']
      },
      assets: {
        files: ['<%= prj.assets.src %>/**'],
        tasks: ['copy:assets']
      },
      less: {
        files: ['<%= prj.css.src %>/**/*.less'],
        tasks: ['less']
      },
      tests: {
        files: ['<%= jshint.tests.src %>'],
        tasks: ['jshint:tests' /* , 'karma:build' */ ]
      }
    }
  });

  grunt.registerTask('compile', [
    'less',
    'copy:scripts',
    'copy:dependencies',
    'copy:cssDependencies',
    'copy:assets'
  ]);

  grunt.registerTask('build', [
    'clean',
    'jshint',
    /* 'karma:build', */
    'compile',
    'index:build'
  ]);

  grunt.registerTask('dev', [
    'build',
    'freddie',
    'watch'
  ]);

  grunt.registerTask('default', ['dev']);

  (function () {
    var ext = function (ext) {
      var extRE = new RegExp('\.' + ext + '$');
      return RegExp.prototype.test.bind(extRE);
    };

    var task = function () {
      var dir = this.data.dir,
          files = this.filesSrc;

      var relativePath = function (file) {
        return file.replace(dir + '/', '');
      };

      var scripts = files.filter(ext('js')).map(relativePath),
          styles = files.filter(ext('css')).map(relativePath),
          dev = grunt.task.current.target === 'build';

      var src = 'index.tpl.html',
          dest = dir + '/index.html';

      grunt.file.copy(src, dest, {
        process: function (contents) {
          return grunt.template.process(contents, {
            data: {
              scripts: scripts,
              styles: styles,
              dev: dev
            }
          });
        }
      });
    };

    grunt.registerMultiTask('index', 'Process index template', task);
  })();
};
