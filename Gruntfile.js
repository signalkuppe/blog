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
            'bower_components/scrollup/js/jquery.scrollUp.min.js',
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
            'js/web-app-links-safari.js'
          ]
        }
      }
    },
    shell: {
      listen:
      {                      
        options: {                    
          stdout: true
        },
        command: 'jekyll serve --watch'
      },
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
      combine: {
      options: {
        banner: '/* I\'ve compressed this stylesheet to save 25kb */'
      },
        files: {
          'css/app.min.css': ['css/app.css']
        }
      }
    },
    prettify: {
      options: {
        indent: 2,
        indent_char: ' ',
        wrap_line_length: 75,
        brace_style: 'expand'
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
        files: [{
          expand: true,                 
          cwd: '_site/',                 
          src: ['**/*.{png,jpg,gif}'],   
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
    }
  });

 
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-prettify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-processhtml');

  // Default task(s).
  grunt.registerTask('default', ['uglify','shell']);
  grunt.registerTask('listen', ['shell:listen']);
  grunt.registerTask('compress', ['uglify','cssmin','prettify']);
  grunt.registerTask('deploy', ['shell:build','uglify','cssmin','processhtml','prettify']);

};