# GLOBEIE 考勤机的WEB代理和监视器 #

## 安装开发环境 ##

### 安装构建和测试自动化工具 ###

1. 如果还没有安装Node.js，需要先从Node.js网站([http://nodejs.org/](http://nodejs.org/))下载安装。Node.js安装中，以及后继的其他安装中，可能需要系统管理员权限。
2. 在命令行中执行以下命令：
	- `npm install -g grunt-cli` 
	- `npm install -g grunt` 
	- `npm install -g bower` 

### 安装Composer ###

1. 检查环境变量，将PHP的安装路径添加到系统目录环境变量。
2. 检查php.ini配置文件，使用`;`注释掉`open_basedir`、`disable_functions`、`disable_classes`三个配置。
3. 如果当前项目下没有bin目录，创建bin目录。
4. 在命令行中执行`curl -sS https://getcomposer.org/installer | php -- --install-dir=bin`。
5. 如果没有安装curl命令，则需要安装，参考[Windows下安装使用curl命令(http://jingyan.baidu.com/article/a681b0dec4c67a3b1943467c.html)](http://jingyan.baidu.com/article/a681b0dec4c67a3b1943467c.html)和[windows下curl的安装和简单使用(http://www.tuicool.com/articles/Ar6vymf)](http://www.tuicool.com/articles/Ar6vymf)。

**备注：**`bin/composer.phar`和`composer.lock`是冗余文件，在版本控制系统中忽略掉较好。

## 开发构建 ##

### 安装依赖 ###

右键菜单打开Git命令行（GIT Bash），执行如下命令安装项目依赖项：

1. `bower install`
2. `npm install`
3. `php bin/composer.phar install`

### 自动构建 ###

使用`shift+右键`，在当前目录打开命令窗口（或右键菜单打开Git命令行（GIT Bash）），执行命令`grunt`，完成项目的构建。

## 版本历史 ##

- **0.1.0**：完成了PHP的初始版本。
- **0.1.1**：增加PHP发送报警邮件。
- **0.1.2**：将报警间隔改为1分钟。
- **0.1.3**：优化监控逻辑
- **0.1.4**：重构系统增加轮播广告。
- **0.1.5**：增加DSP logo，修改生僻字打不上卡的问题。
- **0.1.6**：优化了打卡密集时间段的监测逻辑。
- **0.1.7**：迁至GitHub,重构客户端代码，增加各楼层统一监控页面。