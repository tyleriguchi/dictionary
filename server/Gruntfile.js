'use strict';

var request = require('request'),
    path = require('path');

function getUserHome() {
  return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
}

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var reloadPort = 35730, files;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    develop: {
      server: {
        file: 'app.js'
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    watch: {
      options: {
        nospawn: true,
        livereload: reloadPort
      },
      server: {
        files: [
          'bin/www',
          'app.js',
          'models/**/*.js',
          'routes/**/*.js',
          'lib/**/*.js'
        ],
        tasks: ['develop']
      }
    },
    env : {
      dev : {
        src : getUserHome() + "/.dictionary/dev.json"
      }
    }
    //   prod : {
    //     src : getUserHome() + "/.nano-string/prod.json",
    //     host: 'localhost:4200'
    //   }
    // }
  });

  grunt.config.requires('watch.server.files');
  files = grunt.config('watch.server.files');
  files = grunt.file.expand(files);

  // grunt.registerTask('asProd', [
  //   'env:prod',
  //   'develop',
  //   'watch'
  // ]);

  grunt.registerTask('default', [
    // 'test',
    'env:dev',
    'develop',
    'watch'
  ]);

  // grunt.registerTask('test', [
  //   'mochaTest'
  // ]);
};
