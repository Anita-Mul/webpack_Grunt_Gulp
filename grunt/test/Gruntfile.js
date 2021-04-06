module.exports = function(grunt) {

  // 初始化grunt任务
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // 合并js
    concat: {
      options: { //可选项配置
        separator: ';'   //使用;连接合并
      },
      build: { //此名称任意
        src:  ["src/js/*.js"],  //合并哪些js文件
        dest: "build/js/built.js" //输出的js文件
      }
    },
    // 压缩js
    uglify : {
      options: {  //不是必须的
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      build: {
        files: {
          'build/js/built-<%=pkg.name%>-<%=pkg.version%>.min.js': ['build/js/built.js']
        }
      }
    },
    // js语法检查（测试文件js/test3.js）
    jshint : {
      options: {
        jshintrc : '.jshintrc' //指定配置文件
      },
      build : ['Gruntfile.js', 'src/js/*.js'] //指定检查的文件
    },
    // 使用cssmin插件
    cssmin:{
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      build: {
        files: {
            'build/css/output.min.css': ['src/css/*.css']
        }
      }
    },
    // 使用watch插件（真正实现自动化）
    // 监视files里面的文件，如果发生了变化，自动调用了tasks中的任务
    watch : {
      scripts : {
        files : ['src/js/*.js', 'src/css/*.css'],
        tasks : ['concat', 'jshint', 'uglify', 'cssmin'],
        // false的意思是如果哪个文件发生变化，调用相应的任务
        // true的意思是，如果哪个文件发生了变化，全部的任务都得调用
        options : {spawn : false}  
      }
    },
  });

  // grunt任务执行的时候去加载对应的任务插件
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // 默认被执行的任务列表。后面的是依赖任务
  // 上线的时候时 grunt
  grunt.registerTask('default', ['concat', 'uglify', 'jshint', 'cssmin']);
  // grunt myWatch 开发时使用这个
  grunt.registerTask('myWatch', ['default','watch']);
};