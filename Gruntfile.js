
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
          { expand: true, cwd: 'vendor', src: ['phpmailer/phpmailer/PHPMailerAutoload.php', 'phpmailer/phpmailer/class.**.php'], dest: 'dist/att/proxy/vendor' },
          { expand: true, cwd: 'src/att/ads', src: ['fetch.php'], dest: 'dist/att/ads' },
          { expand: true, cwd: 'src/att/proxy', src: ['errors.conf.php', 'warning.php', 'settings.php'], dest: 'dist/att/proxy' },
          { expand: true, cwd: 'res', src: ['**'], dest: 'dist/att/haixuan' },
          { expand: true, cwd: 'res', src: ['**'], dest: 'dist/att/haixuan/default' },
          { expand: true, cwd: 'src/att/config', src: ['**'], dest: 'dist/att/config' },
          /*- 客户端 -*/
          { expand: true, cwd: 'src/app', src: ['main/**', 'att.js', 'ads.js', 'counter.js', 'monitor.js', 'utils.js', 'settings/ads.js'], dest: 'dist/temp/js/app' },
          { expand: true, cwd: 'src/moniter', src: ['index.html', 'css/**'], dest: 'dist/f13' },
          { expand: true, cwd: 'bower_components/jquery/dist', src: ['jquery.min.js'], dest: 'dist/f13/js/libs' },
          { expand: true, cwd: 'bower_components/bootstrap/dist', src: ['**'], dest: 'dist/f13/js/libs/bootstrap' },
          { expand: true, cwd: 'src/moniter', src: ['all.html', 'css/**'], dest: 'dist/all' },
          { expand: true, cwd: 'bower_components/jquery/dist', src: ['jquery.min.js'], dest: 'dist/all/js/libs' },
          { expand: true, cwd: 'bower_components/bootstrap/dist', src: ['**'], dest: 'dist/all/js/libs/bootstrap' }
        ]
      },
      clone: {
        files: [ 
          { expand: true, cwd: 'dist/f13', src: ['**'], dest: 'dist/dev' },
          { expand: true, cwd: 'dist/f13', src: ['**'], dest: 'dist/f14' },
          { expand: true, cwd: 'dist/f13', src: ['**'], dest: 'dist/f15' }
        ]
      }
    },
    replace: {
      globeie: {
        options: grunt.file.readJSON('src/patterns/globeie.json'),
        files: [
          { expand: true, flatten: true, src: ['src/att/proxy/fetch.php'], dest: 'dist/att/proxy'}
        ]
      },
      client13: {
        options: grunt.file.readJSON('src/patterns/client_13.json'),
        files: [
          { expand: true, flatten: true, src: ['src/app/settings/client.js'], dest: 'dist/temp/js/app/settings/f13'}
        ]
      },
      client14: {
        options: grunt.file.readJSON('src/patterns/client_14.json'),
        files: [
          { expand: true, flatten: true, src: ['src/app/settings/client.js'], dest: 'dist/temp/js/app/settings/f14'},
          { expand: true, flatten: true, src: ['src/app/settings/client.js'], dest: 'dist/temp/js/app/settings/dev'}
        ]
      },
      client15: {
        options: grunt.file.readJSON('src/patterns/client_15.json'),
        files: [
          { expand: true, flatten: true, src: ['src/app/settings/client.js'], dest: 'dist/temp/js/app/settings/f15'}
        ]
      },
      errors: {
        options: grunt.file.readJSON('src/patterns/errors.json'),
        files: [
          { expand: true, flatten: true, src: ['src/app/settings/errors.js'], dest: 'dist/temp/js/app/settings'}
        ]
      },
      proxy_dev: {
        options: grunt.file.readJSON('src/patterns/proxy_dev.json'),
        files: [
          { expand: true, flatten: true, src: ['src/app/settings/proxy.js'], dest: 'dist/temp/js/app/settings/dev'}
        ]
      },
      proxy_pro: {
        options: grunt.file.readJSON('src/patterns/proxy_pro.json'),
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
        },
        paths: {
          'request': 'empty:'
        }
      },
      all: {
        options: {
          name: 'app/main/all',
          baseUrl: "dist/temp/js",
          out: "dist/all/js/app.js",
        }
      },
      dev: {
        options: {
          name: 'app/main/dev',
          baseUrl: "dist/temp/js",
          out: "dist/dev/js/app.js",
        }
      },
      f13: {
        options: {
          name: 'app/main/f13',
          baseUrl: "dist/temp/js",
          out: "dist/f13/js/app.js",
        }
      },
      f14: {
        options: {
          name: 'app/main/f14',
          baseUrl: "dist/temp/js",
          out: "dist/f14/js/app.js",
        }
      },
      f15: {
        options: {
          name: 'app/main/f15',
          baseUrl: "dist/temp/js",
          out: "dist/f15/js/app.js",
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
