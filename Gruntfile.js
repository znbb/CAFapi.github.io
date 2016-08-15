module.exports = function(grunt) {

    grunt.initConfig({
        clean: {
            bundle: ['assets/sections.js'],
            html: ['_sections/**/*.html']
        },
        ngtemplates: {
            docs: {
                src: 'showcase/**/*.md',
                dest: 'assets/sections.js',
                options: {
                    standalone: true,
                    module: 'cafapi.templates'
                }
            }
        },
        watch: {
            controllers: {
                files: ['showcase/**/*.md'],
                tasks: ['clean:bundle', 'ngtemplates', 'clean:html'],
                options: {
                    spawn: true,
                    interrupt: true
                },
            },
        },
        jekyll: {
            serve: {
                options: {
                    serve: true,
                    incremental: true,
                    watch: false,
                    baseurl: '/cafapi',
                    config: '_config.yml',
                    open_url: true,
                    bundleExec: true
                }
            }
        },
        concurrent: {
            watch: {
                tasks: ['jekyll', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-jekyll');

    // Default task.
    grunt.registerTask('default', ['clean:bundle', 'ngtemplates', 'clean:html', 'concurrent:watch']);

};