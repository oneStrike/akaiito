FROM nginx:1.21.3-alpine

# 复制编译后的前端代码到 Nginx 静态资源目录
COPY dist /usr/share/nginx/html

# 复制自定义的 Nginx 配置文件
COPY Nginx.conf /etc/nginx/nginx.conf

# 暴露端口
EXPOSE 80

