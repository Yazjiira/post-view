module.exports = function(grunt) {
  grunt.initConfig({
     cancompile: {
      options: {
        version: '2.2.9',
        wrapper: 'define(["can/view/mustache"], function(can) { {{{content}}} });'
      },
      public: {
        src: ['./app/templates/**/*.mustache'],
        dest: './app/js/tmp/views.js'
      }
    },

    watch: {
      scripts: {
        files: ['**/*.js', '**/*.mustache'],
        tasks: ['cancompile', 'requirejs', 'sass', 'concat'],
        options: {
          spawn: false
        }
      }
    },

    requirejs: {
      public: {
        options: {
          baseUrl: 'app/js',
          mainConfigFile: 'rconfig.js',
          out: 'tmp/app.js',
          name: 'vendor/libs/almond',
          include: 'main',
          optimize: 'none',
          findNestedDependencies: true
        }
      }
    },

    sass: {
      public: {
        files: [{
          expand: true,
          flatten: true,
          src: ['app/scss/**/*.scss'],
          dest: 'public/resources/styles',
          ext: '.css'
        }]
      }
    },

    concat: {
      public: {
        src: ['tmp/app.js'],
        dest: 'public/resources/js/show-posts.js',
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('can-compile');

  grunt.registerTask('default', ['cancompile', 'requirejs', 'concat', 'sass', 'watch']); 
};