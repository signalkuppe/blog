module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    uglify: {
      my_target:
      {
        options: {
          //compress: true,
          //beautify: false
        },
        files:
        {
          'js/app.min.js':
          [
            'bower_components/jquery/jquery.min.js',
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
      serve:{                      
        options: {                    
          stdout: true
        },
        command: 'jekyll serve --watch'
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
      combine: {
      options: {
        banner: '/* L\'ho compresso per risparmiare circa 25kb */'
      },
        files: {
          '_site/css/app.min.css': ['_site/css/app.css']
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
    imagemin: {                          
      dynamic: {
        options: {                       // Target options
          progressive: true
        },                         
        files: [{
          expand: true,                 
          cwd: '_site/',                 
          src: ['**/*.jpg'],   
          dest: '_site/'                  
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
    watch: {
      svg: {
        files: ['svg/*.svg'],
        tasks: ['svgstore']
      },
      site: {
        files: ['*.html','_layout/*.html','_includes/*.html','_posts/*.md','_sass/*,scss','js/*.js'],
        tasks: ['shell:build']
      }
    },

  });

 
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-prettify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).

  grunt.registerTask('listen', ['shell:serve']);
  grunt.registerTask('svg', ['watch:svg']);
  grunt.registerTask('deploy', ['shell:build','imagemin','uglify','cssmin','processhtml','prettify']);

};