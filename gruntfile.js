module.exports = function(grunt) {
  grunt.initConfig({
    clean: [
      'public/index.html',
      'public/resources/js/show-posts.js',
      'public/resources/styles/show-posts.css'],

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
          dest: 'tmp',
          ext: '.css'
        }]
      }
    },

    copy: {
      main: {
        src: 'app/index.html',
        dest: 'public/index.html',
      },
      
      js: {
        src: 'tmp/app.js',
        dest: 'public/resources/js/show-posts.js',
      },

      css: {
        src: 'tmp/styles.css',
        dest: 'public/resources/styles/show-posts.css',
      }
    },
  
    watch: {
      scripts: {
        files: ['**/*.js', '**/*.mustache', '**/*.scss', '**/*.html'],
        tasks: ['cancompile', 'requirejs', 'sass', 'copy'],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('can-compile');

  grunt.registerTask('default', ['clean', 'cancompile', 'requirejs', 'sass', 'copy', 'watch']); 
};