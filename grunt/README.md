* 插件分类
 - grunt团队贡献的插件：插件名大都以contrib-开头
 - 第三方提供的插件：大都不易contrib-开头
* 常用的插件
 * grunt-contrib-clean——清除文件(打包处理生成的)
    * grunt-contrib-concat——合并多个文件的代码到一个文件中
    * grunt-contrib-uglify——压缩js文件
    * grunt-contrib-jshint——javascript语法错误检查；
    * grunt-contrib-cssmin——压缩/合并css文件
    * grunt-contrib-htmlmin——压缩html文件
    * grunt-contrib-imagemin——压缩图片文件(无损)
    * grunt-contrib-copy——复制文件、文件夹
    * **grunt-contrib-requirejs**——合并压缩requirejs管理的所有js模块文件
    * grunt-contrib-watch——实时监控文件变化、调用相应的任务重新执行
* 合并js: 使用concat插件
  * 命令:
    ```
    npm install grunt-contrib-concat --save-dev
    ```
  * 编码:
    * src/js/test1.js
      ```
      (function () {
        function add(num1, num2) {
          return num1 + num2;
        }
        console.log(add(10, 20));
      })();
      ```
    * src/js/test2.js
      ```
      (function () {
        var arr = [2,3,4].map(function (item, index) {
          return item+1;
        });
        console.log(arr);
      })();
      ```
  * 配置: Gruntfile.js
    * 配置任务:
       ```
       concat: {
         options: { //可选项配置
           separator: ';'   //使用;连接合并
         },
         build: { //此名称任意
           src:  ["src/js/*.js"],  //合并哪些js文件
           dest: "build/js/built.js" //输出的js文件
         }
       }
       ```
    * 加载插件:
      ```
      grunt.loadNpmTasks('grunt-contrib-concat');
      ```
    * 注册任务:
      ```
      grunt.registerTask('default', ['concat']);
      ```
    * 命令: 
      ```
      grunt   //会在build下生成一个built.js
      ```
* 压缩js: 使用uglify插件
  * 下载
    ```
    npm install grunt-contrib-uglify --save-dev
    ```
  * 配置: Gruntfile.js
    * 配置任务:
      ```
      pkg : grunt.file.readJSON('package.json'),
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
      }
      ```
    * 加载任务:
      ```
      grunt.loadNpmTasks('grunt-contrib-uglify');
      ```
    * 注册任务:
      ```
      grunt.registerTask('default', ['concat', 'uglify']);
      ```
    * 命令: 
      ```
      grunt   //会在build下生成一个压缩的js文件
      ```
* js语法检查: 使用jshint插件
  * 命令: 
    ```
    npm install grunt-contrib-jshint --save-dev
    ```
  * 编码: .jshintrc
     ```
     {
       "curly": true,
       "eqeqeq": true,
       "eqnull": true,
       "expr" : true,
       "immed": true,
       "newcap": true,
       "noempty": true,
       "noarg": true,
       "regexp": true,
       "browser": true,
       "devel": true,
       "node": true,
       "boss": false,
       
       //不能使用未定义的变量
       "undef": true,
       //语句后面必须有分号
       "asi": false,
       //预定义不检查的全局变量
       "predef": [ "define", "BMap", "angular", "BMAP_STATUS_SUCCESS"]
     }
     ```
  * 修改src/js/test1.js
    ```
    (function () {
      function add(num1, num2) {
        num1 = num1 + num3
        return num1 + num2;
      }
      console.log(add(10, 20));
    })();
    ```
  * 配置 : Gruntfile.js
    * 配置任务:
      ```
      jshint : {
        options: {
          jshintrc : '.jshintrc' //指定配置文件
        },
        build : ['Gruntfile.js', 'src/js/*.js'] //指定检查的文件
      }
      ```
    * 加载任务:
      ```
      grunt.loadNpmTasks('grunt-contrib-jshint');
      ```
    * 注册任务:
      ```
      grunt.registerTask('default', ['concat', 'uglify', 'jshint']);
      ```
    * 命令: 
      ```
      grunt   //提示变量未定义和语句后未加分号 -->修改后重新编译
      ```
* 使用cssmin插件
  * 安装:
    ```
    npm install grunt-contrib-cssmin --save-dev
    ```
  * 编码: 
    * test1.css
      ```
      #box1 {
        width: 100px;
        height: 100px;
        background: red;
      }
      ```
    * test2.css
      ```
      #box2 {
        width: 200px;
        height: 200px;
        background: blue;
      }
      ```
    * index.html
      ```
      <link rel="stylesheet" href="build/css/output.min.css">
      <div id="box1"></div>
      <div id="box2"></div>
      ```
      
  * 配置 : Gruntfile.js
    * 配置任务:
      ```
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
      }
      ```
    * 加载任务:
      ```
      grunt.loadNpmTasks('grunt-contrib-cssmin');
      ```
    * 注册任务:
      ```
      grunt.registerTask('default', ['concat', 'uglify', 'jshint', 'cssmin']);
      ```
    * 命令: 
      ```
      grunt    //在build/css/下生成output.min.css
      ```
* 使用watch插件（真正实现自动化） 
  * 命令: npm install grunt-contrib-watch --save-dev
  * 配置 : Gruntfile.js
  
    * 配置任务:
      ```
      watch : {
        scripts : {
          files : ['src/js/*.js', 'src/css/*.css'],
          tasks : ['concat', 'jshint', 'uglify', 'cssmin'],
          options : {spawn : false}  
        }
      }
      ```
    * 加载任务:
      ```
      grunt.loadNpmTasks('grunt-contrib-watch');
      ```
    * 注册任务:
      ```
      grunt.registerTask('default', ['concat', 'uglify', 'jshint', 'watch']);
      改进：grunt.registerTask('myWatch', ['default','watch']);
      ```
    * 命令: 
      ```
      grunt   //控制台提示watch已经开始监听, 修改保存后自动编译处理
      ```
