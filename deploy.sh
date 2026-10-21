#!/bin/sh
USERNAME=kenohori

# University deployment (url/baseurl from _config.yml)
bundle exec jekyll build
rsync --delete -pthrvz ./_site/ ${USERNAME}@3d.bk.tudelft.nl:/var/www/people/ken/

# ken.mx deployment (_config.kenmx.yml overrides url/baseurl)
bundle exec jekyll build --config _config.yml,_config.kenmx.yml
rsync --delete -pthrvz ./_site/ root@ken.mx:/var/www/ken.mx/
