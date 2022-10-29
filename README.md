# 网页转 pdf

## 步骤

### 1. 配置环境

- [安装 git](https://git-scm.com/)

- [安装 node](https://nodejs.org/en/)

- 安装 pnpm

```
npm i pnpm -g
```

### 2. 拉取代码

进入存放的文件目录

```bash
git clone https://github.com/Tangjj1996/script-grasp.git
```

### 3. 安装项目依赖

```bash
cd script-grasp && pnpm i
```

### 4. 编译

```bash
pnpm build
```

### 5. 执行脚本

```bash
node dist/index.js -p [url] -d [directory]
```

- url 默认 https://www.yuque.com/weijin_is_wiki/ykf0s9/fxbfgc
- directory 默认 build

eg

```
node dist/index.js -p https://www.yuque.com/weijin_is_wiki/ykf0s9/aag394 -d doc
```

🎉
