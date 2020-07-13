#!/bin/sh
USERNAME=kenohori

jekyll build
rsync --delete -pthrvz ./_site/ ${USERNAME}@3d.bk.tudelft.nl:/var/www/people/ken/
