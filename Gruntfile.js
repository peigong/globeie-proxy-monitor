
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
          { expand: true, cwd: 'bower_components/jquery/dist', src: ['jquery.min.js'], dest: 'dist/f13/js/libs' },
          { expand: true, cwd: 'bower_components/bootstrap/dist', src: ['**'], dest: 'dist/f13/js/libs/bootstrap' },
          { expand: true, cwd: 'bower_components/pluggable-amd/dist', src: ['pluggable-amd.min.js'], dest: 'dist/temp/f13/js/libs' },
          { expand: true, cwd: 'bower_components/client-common/dist', src: ['request.js', 'util.js'], dest: 'dist/temp/f13/js' },
          { expand: true, cwd: 'vendor', src: ['phpmailer/phpmailer/PHPMailerAutoload.php', 'phpmailer/phpmailer/class.**.php'], dest: 'dist/att/proxy/vendor' },
          { expand: true, cwd: 'src/ads', src: ['fetch.php'], dest: 'dist/att/ads' },
          { expand: true, cwd: 'src/proxy', src: ['errors.conf.php', 'warning.php', 'settings.php'], dest: 'dist/att/proxy' },
          { expand: true, cwd: 'res/haixuan', src: ['**'], dest: 'dist/att/haixuan' },
          { expand: true, cwd: 'res/haixuan', src: ['**'], dest: 'dist/att/haixuan/default' },
          { expand: true, cwd: 'src/config', src: ['**'], dest: 'dist/att/config' },
          { expand: true, cwd: 'src/moniter/haixuan', src: ['index.html', 'css/**'], dest: 'dist/f13' },
          { expand: true, cwd: 'src/script/app', src: ['main.js', 'att.js', 'ads.js', 'counter.js', 'focus.js', 'utils.js', 'settings/ads.js'], dest: 'dist/temp/f13/js/app' }
        ]
      },
      clone: {
        files: [ 
          { expand: true, cwd: 'dist/f13', src: ['**'], dest: 'dist/dev' },
          { expand: true, cwd: 'dist/f13', src: ['**'], dest: 'dist/f14' },
          { expand: true, cwd: 'dist/f13', src: ['**'], dest: 'dist/f15' },
          { expand: true, cwd: 'dist/temp/f13', src: ['**'], dest: 'dist/temp/dev' },
          { expand: true, cwd: 'dist/temp/f13', src: ['**'], dest: 'dist/temp/f14' },
          { expand: true, cwd: 'dist/temp/f13', src: ['**'], dest: 'dist/temp/f15' }
        ]
      }
    },
    replace: {
      client13: {
        options: grunt.file.readJSON('src/patterns/client_13.json'),
        files: [
          { expand: true, flatten: true, src: ['src/script/app/settings/client.js'], dest: 'dist/temp/f13/js/app/settings'}
        ]
      },
      client14: {
        options: grunt.file.readJSON('src/patterns/client_14.json'),
        files: [
          { expand: true, flatten: true, src: ['src/script/app/settings/client.js'], dest: 'dist/temp/f14/js/app/settings'},
          { expand: true, flatten: true, src: ['src/script/app/settings/client.js'], dest: 'dist/temp/dev/js/app/settings'}
        ]
      },
      client15: {
        options: grunt.file.readJSON('src/patterns/client_15.json'),
        files: [
          { expand: true, flatten: true, src: ['src/script/app/settings/client.js'], dest: 'dist/temp/f15/js/app/settings'}
        ]
      },
      errors: {
        options: grunt.file.readJSON('src/patterns/errors.json'),
        files: [
          { expand: true, flatten: true, src: ['src/script/app/settings/errors.js'], dest: 'dist/temp/dev/js/app/settings'},
          { expand: true, flatten: true, src: ['src/script/app/settings/errors.js'], dest: 'dist/temp/f13/js/app/settings'},
          { expand: true, flatten: true, src: ['src/script/app/settings/errors.js'], dest: 'dist/temp/f14/js/app/settings'},
          { expand: true, flatten: true, src: ['src/script/app/settings/errors.js'], dest: 'dist/temp/f15/js/app/settings'}
        ]
      },
      globeie: {
        options: grunt.file.readJSON('src/patterns/globeie.json'),
        files: [
          { expand: true, flatten: true, src: ['src/proxy/fetch.php'], dest: 'dist/att/proxy'}
        ]
      },
      proxy_dev: {
        options: grunt.file.readJSON('src/patterns/proxy_dev.json'),
        files: [
          { expand: true, flatten: true, src: ['src/script/app/settings/proxy.js'], dest: 'dist/temp/dev/js/app/settings'}
        ]
      },
      proxy_pro: {
        options: grunt.file.readJSON('src/patterns/proxy_pro.json'),
        files: [
          { expand: true, flatten: true, src: ['src/script/app/settings/proxy.js'], dest: 'dist/temp/f13/js/app/settings'},
          { expand: true, flatten: true, src: ['src/script/app/settings/proxy.js'], dest: 'dist/temp/f14/js/app/settings'},
          { expand: true, flatten: true, src: ['src/script/app/settings/proxy.js'], dest: 'dist/temp/f15/js/app/settings'}
        ]
      }
    },
    requirejs: {
      options: {
        //optimize: 'none',
        name: 'app/main',
        keepBuildDir: true,
        wrap: true,
        wrap: {
          startFile: [
            'src/script/intro.js', 
            'bower_components/pluggable-amd/lib/module-base.js',
            'bower_components/pluggable-amd/lib/module-dependence.js',
            'bower_components/pluggable-amd/lib/load-config.js'
          ],
          endFile: 'src/script/outro.js'
        },
        paths: {
          'pluggable-amd': 'empty:',
          'pluggable-amd/base': 'empty:'
        }
      },
      dev: {
        options: {
          baseUrl: "dist/temp/dev/js",
          out: "dist/dev/js/app.js",
        }
      },
      f13: {
        options: {
          baseUrl: "dist/temp/f13/js",
          out: "dist/f13/js/app.js",
        }
      },
      f14: {
        options: {
          baseUrl: "dist/temp/f14/js",
          out: "dist/f14/js/app.js",
        }
      },
      f15: {
        options: {
          baseUrl: "dist/temp/f15/js",
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
