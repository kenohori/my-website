#!/bin/sh
set -e

# Single deployment to ken.mx (url/baseurl from _config.yml).
# The university copy at 3d.bk.tudelft.nl/ken is served by an nginx 301
# that redirects to the corresponding ken.mx path.
bundle exec jekyll build
rsync --delete -pthrvz ./_site/ root@ken.mx:/var/www/ken.mx/
