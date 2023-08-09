rm -rf ./clients/ncku-piano-club.com
mv ./clients/build ./clients/ncku-piano-club.com
git add .
git commit -m "Update"
git push origin

git pull
rm -rf /var/www/html/ncku-piano-club.com
mv ./clients/ncku-piano-club.com /var/www/html/

sudo nano /etc/nginx/sites-available/ncku-piano-club.com.conf
sudo nginx -t
sudo systemctl restart nginx


rm -rf clients/ncku-piano-club.com && mv clients/build clients/ncku-piano-club.com && git add . && git commit -m "Update" && git push origin

git pull && rm -rf /var/www/html/ncku-piano-club.com && mv clients/ncku-piano-club.com /var/www/html/
cd /var/www/html/ncku-piano-club.com