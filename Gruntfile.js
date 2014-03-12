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
        banner: '/* Ho compresso il css per salvare circa 25kb :-) */'
      },
        files: {
          'css/app.min.css': ['css/app.css']
        }
      }
    },
    prettify: {
      options: {
        indent: 3,
        indent_char: ' ',
        wrap_line_length: 75,
        brace_style: 'expand',
        unformatted: ['sub']
      },
      all: {
        expand: true,
        cwd: '_site/',
        ext: '.html',
        src: ['*.html','**/*.html'],
        dest: '_site/'
      }
    }
  });

 
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-prettify');

  // Default task(s).
  grunt.registerTask('default', ['uglify','shell']);
  grunt.registerTask('compress', ['uglify','cssmin','prettify']);

};