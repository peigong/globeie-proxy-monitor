
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    clean: {
      dist: ['dist']
    },
    copy: {
      dist: {
        files: [
          /*- 服务端 -*/
          { expand: true, cwd: 'vendor', src: ['phpmailer/phpmailer/PHPMailerAutoload.php', 'phpmailer/phpmailer/class.**.php'], dest: 'dist/server/att/proxy/vendor' },
          { expand: true, cwd: 'src/att/ads', src: ['fetch.php'], dest: 'dist/server/att/ads' },
          { expand: true, cwd: 'src/att/proxy', src: ['errors.conf.php', 'warning.php', 'settings.php'], dest: 'dist/server/att/proxy' },
          { expand: true, cwd: 'res', src: ['**'], dest: 'dist/server/att/haixuan' },
          { expand: true, cwd: 'res', src: ['**'], dest: 'dist/server/att/haixuan/default' },
          { expand: true, cwd: 'src/att/config', src: ['**'], dest: 'dist/server/att/config' },
          /*- 客户端 -*/
          { expand: true, cwd: 'bower_components/jquery/dist', src: ['jquery.min.js'], dest: 'dist/client/f13/js/libs' },
          { expand: true, cwd: 'bower_components/bootstrap/dist', src: ['**'], dest: 'dist/client/f13/js/libs/bootstrap' },
          { expand: true, cwd: 'src/app', src: ['main/**', 'att.js', 'ads.js', 'counter.js', 'monitor.js', 'utils.js', 'settings/ads.js'], dest: 'dist/temp/js/app' },
          { expand: true, cwd: 'src/moniter', src: ['css/**'], dest: 'dist/client/f13' },
          { expand: true, cwd: 'src/moniter', src: ['all.html', 'css/**'], dest: 'dist/client/all' },
        ]
      },
      clone: {
        files: [ 
          { expand: true, cwd: 'dist/client/f13', src: ['**'], dest: 'dist/client/all' },
          { expand: true, cwd: 'dist/client/f13', src: ['**'], dest: 'dist/client/f14' },
          { expand: true, cwd: 'dist/client/f13', src: ['**'], dest: 'dist/client/f15' }
        ]
      }
    },
    replace: {
      globeie: {
        options: grunt.file.readJSON('src/patterns/globeie.json'),
        files: [
          { expand: true, flatten: true, src: ['src/att/proxy/fetch.php'], dest: 'dist/server/att/proxy'}
        ]
      },
      client13: {
        options: grunt.file.readJSON('src/patterns/client_13.json'),
        files: [
          { expand: true, flatten: true, src: ['src/moniter/index.html'], dest: 'dist/client/f13'},
          { expand: true, flatten: true, src: ['src/app/settings/client.js'], dest: 'dist/temp/js/app/settings/f13'}
        ]
      },
      client14: {
        options: grunt.file.readJSON('src/patterns/client_14.json'),
        files: [
          { expand: true, flatten: true, src: ['src/moniter/index.html'], dest: 'dist/client/f14'},
          { expand: true, flatten: true, src: ['src/app/settings/client.js'], dest: 'dist/temp/js/app/settings/f14'}
        ]
      },
      client15: {
        options: grunt.file.readJSON('src/patterns/client_15.json'),
        files: [
          { expand: true, flatten: true, src: ['src/moniter/index.html'], dest: 'dist/client/f15'},
          { expand: true, flatten: true, src: ['src/app/settings/client.js'], dest: 'dist/temp/js/app/settings/f15'}
        ]
      },
      errors: {
        options: grunt.file.readJSON('src/patterns/errors.json'),
        files: [
          { expand: true, flatten: true, src: ['src/app/settings/errors.js'], dest: 'dist/temp/js/app/settings'}
        ]
      },
      proxy: {
        options: grunt.file.readJSON('src/patterns/proxy.json'),
        files: [
          { expand: true, flatten: true, src: ['src/app/settings/proxy.js'], dest: 'dist/temp/js/app/settings'}
        ]
      }
    },
    requirejs: {
      options: {
        optimize: 'none',
        keepBuildDir: true,
        // TODO: Figure out how to make sourcemaps work with grunt-usemin
        // https://github.com/yeoman/grunt-usemin/issues/30
        //generateSourceMaps: true,
        // required to support SourceMaps
        // http://requirejs.org/docs/errors.html#sourcemapcomments
        preserveLicenseComments: false,
        useStrict: true,
        //wrap: true,
        wrap: {
          startFile: [
            'bower_components/almond/almond.js'
          ]
        }
      },
      all: {
        options: {
          name: 'app/main/all',
          baseUrl: "dist/temp/js",
          out: "dist/client/all/js/app.js",
        }
      },
      f13: {
        options: {
          name: 'app/main/f13',
          baseUrl: "dist/temp/js",
          out: "dist/client/f13/js/app.js",
        }
      },
      f14: {
        options: {
          name: 'app/main/f14',
          baseUrl: "dist/temp/js",
          out: "dist/client/f14/js/app.js",
        }
      },
      f15: {
        options: {
          name: 'app/main/f15',
          baseUrl: "dist/temp/js",
          out: "dist/client/f15/js/app.js",
        }
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  // Default task.
  grunt.registerTask('default', ['clean', 'copy', 'replace', 'requirejs']);

};
