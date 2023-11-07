module.exports = function(grunt) {
    grunt.initConfig ({
        pkg: grunt.file.readJSON('package.json'),
        
        less: {
            development: {
                files: [{
                    expand: true,
                    cwd: 'src/styles', // Diretório de origem
                    src: ['**/*.less'], // Todos os arquivos .less no diretório e subdiretórios
                    dest: 'dev/styles', // Diretório de destino
                    ext: '.css' // Extensão do arquivo de saída
                }]
            },
            production: {
                options: {
                    compress: true,
                },
                files: [{
                    expand: true,
                    cwd: 'src/styles',
                    src: ['**/*.less'],
                    dest: 'dist/styles',
                    ext: '.min.css'
                }]
            }
        },

        copy: {

            images: {
                expand: true,
                cwd: 'src/images',
                src: ['**/*.*'],
                dest: 'dist/images'
            }
        },

        image: {
            
            dynamic: {
                files: [{
                expand: true,
                cwd: 'src/images',
                src: ['**/*.{png,jpg,gif,svg,jpeg}', '**/*.*'],
                dest: 'dist/images'
                }]
            }
        },

        watch: {
            less: {
                files: ['src/styles/**/*.less'],
                tasks: ['less']
            },
            html: {
                files: ['src/index.html'],
                tasks: ['htmlmin:dist', 'replace']
            }
        },

        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: '../src/scripts/main.js'
                        },
                        {
                            match: '/ENDERECO_DAS_IMAGENS/', 
                            replacement: './images/' 
                        }
                    ]
                },
                files : [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'],
                        dest: 'dev/'
                }
                ]
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.min.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: './scripts/main.min.js'
                        },
                        {
                            match: '/ENDERECO_DAS_IMAGENS/', 
                            replacement: './images/' 
                        }
                    ]
                },
                files : [
                    {
                        expand: true,
                        flatten: true,
                        src: ['prebuild/index.html'],
                        dest: 'dist/'
                }
                ]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'prebuild/index.html': 'src/index.html'
                }
            }
        },

        clean: ['prebuild', 'jpgtmp.jpg'],

        uglify: {
            target: {
                files: {
                    'dist/scripts/main.min.js' : 'src/scripts/main.js'
                }
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-image');
    grunt.loadNpmTasks('grunt-contrib-copy');


    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['less:production', 'copy:images', 'image', 'htmlmin:dist', 'replace:dist', 'clean' , 'uglify']);
}




