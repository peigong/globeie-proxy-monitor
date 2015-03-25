# GLOBEIE 考勤机的WEB代理和监视器 #

## 安装开发环境 ##

### 安装构建和测试自动化工具 ###

1. 如果还没有安装Node.js，需要先从Node.js网站([http://nodejs.org/](http://nodejs.org/))下载安装。Node.js安装中，以及后继的其他安装中，可能需要系统管理员权限。
2. 在命令行中执行以下命令：
	- `npm install -g grunt-cli` 
	- `npm install -g grunt` 
	- `npm install -g bower` 

### 安装PHP和Composer ###

1. 参照`http://www.wampserver.com/en/`，安装PHP集成环境。
2. 检查php.ini配置文件，使用`;`注释掉`open_basedir`、`disable_functions`、`disable_classes`三个配置。
4. 参照`https://getcomposer.org/doc/00-intro.md#using-the-installer`，安装composer。

## 开发构建 ##

### 安装依赖 ###

右键菜单打开Git命令行（GIT Bash），执行如下命令安装项目依赖项：

1. `bower install`
2. `npm install`
3. `composer install`

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