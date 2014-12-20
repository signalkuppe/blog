var jpegRecompress = require('imagemin-jpeg-recompress');

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    uglify: {
      my_target:
      {
        options: {
          compress: true,
        },
        files:
        {
          'js/app.min.js':
          [
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/jquery.smooth-scroll/jquery.smooth-scroll.min.js',
            'bower_components/jQuery-Unorphanize/unorphanize.jquery.min.js',
            'bower_components/scrollup/src/jquery.scrollUp.js',
            'bower_components/fastclick/lib/fastclick.js',
            'bower_components/enquire/dist/enquire.min.js',
            'bower_components/iOS-Orientationchange-Fix/ios-orientationchange-fix.js',
            'js/cover.js',
            'js/orphans.js',
            'js/image-lightbox.js',
            'js/gallery.js',
            'js/smoothscroll.js',
            'js/print.js',
            'js/scrollup.js',
            'js/fastclick.js',
            'js/web-app-links-safari.js',
            'js/meteo.js'
          ]
        }
      }
    },
    svgstore: {
      options: {
        prefix : 'icon-', // This will prefix each ID
        cleanup: ['fill','stroke'],
        svg: { // will be added as attributes to the resulting SVG
          style:"display:none;"
        }
      },
      default_task: {
        files: {
          '_includes/svg-defs.svg': ['svg/*.svg'],
        }
      }
    },
    shell: {
      build:
      {                      
        options: {                    
          stdout: true
        },
        command: 'jekyll build'
      },                          
      upload:
      {                      
        options: {                    
          stdout: true
        },
        command: 's3_website push'
      }
    },
    cssmin: {
      main: {
        options: {
          banner: '/* Compressed to save ~25kb */'
        },
        files: {
          '_site/css/app.min.css': ['_site/css/app.css'],
        }
      },
      fold: {
        options: {
          banner: '/* compressed above the fold css */'
        },
        files: {
          'css/above_the_fold.min.css': ['css/above_the_fold.css']
        }
      }
    },
    prettify: {
      options: {
        indent: 3,
        indent_char: ' ',
        wrap_line_length: 0,
        brace_style: 'end-expand'
      },
      all: {
        expand: true,
        cwd: '_site/',
        ext: '.html',
        src: ['*.html','**/*.html'],
        dest: '_site/'
      }
    },
    htmlmin: {                                   
      multiple: {
        options: {                          
          removeComments: true,
          collapseWhitespace: true
        },                                  
        files: [{                                  
          expand: true,     
          cwd: '_site/',   
          src: ['**/*.html'],
          dest: '_site/'                      
        }]
      }
    },
    imagemin: {                          
      dynamic: {
        options: {                       // Target options
          optimizationLevel: 7,
          progressive: true,
          use: [jpegRecompress({min:35,max:85})]
        },                         
        files: [{
          expand: true,                 
          cwd: 'img/',                 
          src: ['**/*.jpg'],   
          dest: 'img/'                  
        }]
      }
    },
    processhtml: {
      dist: {
        files: [
          {
          expand: true,     
          cwd: '_site/',   
          src: ['**/*.html'],
          dest: '_site/',  
          ext: '.html'
        },
        ],
      }
    },
    sass: {
      dist: {
        files: {
          'css/app.css': '_sass/app.scss'
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 8080,
          base: '_site'
        }
      }
    },
    watch: {
      svg: {
        files: ['svg/*.svg'],
        tasks: ['svgstore']
      },
      site: {
        files: ['*.html','js/*.js','_layouts/*.html','_includes/*.html','_posts/*.md'],
        tasks: ['shell:build']
      },
      scss: {
        files: ['_sass/*.scss'],
        tasks: ['sass','autoprefixer','shell:build']
      }
    },
    clean: ['_site'],
    penthouse: {
      extract : {
          outfile : 'css/above_the_fold.css',
          css : '_site/css/app.css',
          url : 'http://0.0.0.0:8080/',
          width : 1300,
          height : 900
      },
    },
    autoprefixer: {
      basic: {
          src: 'css/app.css',
      }
    },
    'string-replace': {
    inline: {
            files: [
              {
              expand: true,     
              cwd: '_site/',   
              src: ['**/*.html'],
              dest: '_site/',  
              ext: '.html'
            }
          ],
        options: {
          replacements: [
            // place files inline example
            {
              pattern: '<link rel="stylesheet" href="/css/above_the_fold.min.css">',
              replacement: "<!--non-blocking above the fold inline css--><style><%= grunt.file.read('css/above_the_fold.min.css') %></style>"
            }
          ]
        }
      }
    }

  });

 
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-prettify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-penthouse');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  // Default task(s).

  grunt.registerTask('listen', ['connect','watch']);
  grunt.registerTask('svg', ['watch:svg']);
  grunt.registerTask('imageoptim', ['imagemin']);
  grunt.registerTask('pre-deploy', [
                                'sass',
                                'autoprefixer',
                                'shell:build',
                                'uglify',
                                'cssmin',
                                'processhtml',
                                'string-replace',
                                'htmlmin']);
  grunt.registerTask('deploy', ['imageoptim',
                                'sass',
                                'autoprefixer',
                                'shell:build',
                                'uglify',
                                'cssmin',
                                'processhtml',
                                'string-replace',
                                'htmlmin',
                                'shell:upload']);
  grunt.registerTask('deploy-prod',['sass',
                                'autoprefixer',
                                'uglify',
                                'cssmin',
                                'shell:build',
                                'processhtml',
                                'string-replace',
                                'htmlmin',
                                'shell:upload']);

};