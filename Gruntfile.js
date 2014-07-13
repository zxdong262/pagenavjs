var d = new Date()
,t = d.getTime()
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
    ,uglify: {
      options: {
        banner: '/*! <%= pkg.name %> by ZHAO Xudong, html5beta.com/apps/pagenavjs.html, ' + t + ' */\n'
        ,report: ['min', 'gzip']
        ,mangle: {
          except: ['exports', 'module', 'require']
        }
      }
      ,dist: {
        files: {'./pagenav.min.js': ['pagenav.js']}
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-newer')
  grunt.registerTask('nu', ['newer:uglify'])
  grunt.registerTask('default', ['newer:uglify'])

}