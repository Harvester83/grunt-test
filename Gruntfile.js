module.exports = function(grunt) {
    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {
                options: {
                    sourcemap: 'none'
                },
                files: [{
                    expand: true,
                    cwd: 'src/scss',
                    src: ['*.scss'],
                    dest: 'src/css',
                    ext: '.css'
                }]
            }
        },

        concat: {
            dist: {
                src: ['src/css/style.css', 'src/css/main.css'],
                dest: 'dist/global.css'
            },
            dist2: {
                src: ['src/js/main.js',
                    'src/js/script.js'
                ],
                dest: 'dist/global.js'
            }
        },

        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist',
                    ext: '.min.css'
                }]
            }
        },

        uglify: {
            my_target: {
                files: {
                    'dist/global.min.js': ['dist/global.js']
                }
            }
        },

          watch: {
            options: {
                livereload: true
            },
            css: {
                files: ['src/scss/*.scss'],
                tasks: ['sass', 'concat', 'cssmin']
            },
            js: {
                files: ['src/js/*.js'],
                tasks: ['concat', 'uglify']
            }
        }
    });

    grunt.loadNpmTasks('time-grunt');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['sass', 'concat', 'cssmin', 'uglify', 'watch']);
};