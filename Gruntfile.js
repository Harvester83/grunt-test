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
                    cwd: 'src/sass',
                    src: ['*.scss'],
                    dest: 'src/css',
                    ext: '.css'
                }]
            }
        },

        concat: {
            dist: {
                src: ['src/css/style.css', 'src/css/main.css'],
                dest: 'src/css/dist/global.css'
            },
            dist2: {
                src: ['src/js/main.js',
                    'src/js/build.js',
                    'src/js/moduleOne.js',
                    'src/js/moduleFour.js',
                    'src/js/moduleThree.js',
                    'src/js/moduleTwo.js'
                ],
                dest: 'src/css/dist/global.js'
            }
        },

        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'src/css/dist',
                    src: ['*.css', '!*.min.css'],
                    dest: 'src/css/dist',
                    ext: '.min.css'
                }]
            }
        },

        uglify: {
            my_target: {
                files: {
                    'src/css/dist/global.min.js': ['src/css/dist/global.js']
                }
            }
        },

        watch: {
            options: {
                livereload: true
            },
            css: {
                files: ['src/sass/*.scss'],
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