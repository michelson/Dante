module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        qunit: {
            files: ['test/index.html']
        }
    });

    // Task to run tests
    grunt.registerTask('test', 'qunit');
};