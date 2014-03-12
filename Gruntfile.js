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
    }
  });

 
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task(s).
  grunt.registerTask('default', ['uglify','shell']);
  grunt.registerTask('compress', ['uglify','cssmin']);

};