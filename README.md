# GLOBEIE 考勤机的WEB代理和监视器 #

## 开发构建 ##

如果还没有安装Node.js，需要先从Node.js网站([http://nodejs.org/](http://nodejs.org/))下载安装。Node.js安装中，以及后继的其他安装中，可能需要系统管理员权限。

### 自动构建 ###

1. `npm install`：安装项目依赖项
2. `npm run build`：构建开发环境版本
3. `npm run build:prod`：构建部署环境版本
4. `npm run start`：构建实时监听的开发版本

### 安装PHP和Composer ###

1. 参照`http://www.wampserver.com/en/`，安装PHP集成环境。
2. 检查php.ini配置文件，使用`;`注释掉`open_basedir`、`disable_functions`、`disable_classes`三个配置。

## 版本历史 ##

- **0.1.0**：完成了PHP的初始版本。
- **0.1.1**：增加PHP发送报警邮件。
- **0.1.2**：将报警间隔改为1分钟。
- **0.1.3**：优化监控逻辑
- **0.1.4**：重构系统增加轮播广告。
- **0.1.5**：增加DSP logo，修改生僻字打不上卡的问题。
- **0.1.6**：优化了打卡密集时间段的监测逻辑。
- **0.1.7**：迁至GitHub,重构客户端代码，增加各楼层统一监控页面。
- **0.2.0**: 技术栈迁移为gulp/react/es6。
