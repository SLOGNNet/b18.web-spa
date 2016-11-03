"use strict";

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
	       dist: {
		        src: [
		           'assets/sass/*.scss',
		         	],
		        dest: 'assets/sass/dist/build.scss',
	       	}
	    },
		sass: {                                
		   dist: {     
			    files: {
			       'assets/css/dist/build.css':'assets/sass/main.scss'
			    }
		   }
		},
        watch: {
            css: {
                files: ['assets/sass/*.scss'],
                tasks: ['sass']
            }
        },
        copy: {
		  main: {
		    files: [
		      {
		      	expand: true, 
		      	flatten: true, 
		      	src: ['node_modules/bootstrap/'], 
		      	dest: 'assets/css/libs/', 
		      	filter: 'isFile'
		      },
		    ],
		  },
}
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch'); 
    grunt.loadNpmTasks('grunt-contrib-sass'); 
    grunt.loadNpmTasks('grunt-contrib-copy'); 
    grunt.registerTask('default', ['sass']);
    grunt.registerTask('copy', ['copy']);
};