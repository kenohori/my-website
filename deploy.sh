#!/bin/sh
USERNAME=kenohori

bundle exec jekyll build
rsync --delete -pthrvz ./_site/ ${USERNAME}@3d.bk.tudelft.nl:/var/www/people/ken/
