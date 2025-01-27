yarn build; # 打包

rm -rf /usr/local/var/www/reactantdpwakit/distv01; # 删除旧的打包文件

cp -r dist /usr/local/var/www/reactantdpwakit/distv01; # 复制新的打包文件

# cp -r nginx/custom_nginx.conf /usr/local/etc/nginx/configs; # 复制新的nginx配置文件

sudo nginx -s reload # 重启nginx    

open http://localhost:4155; # 打开浏览器    
