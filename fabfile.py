from __future__ import with_statement
from fabric.api import *
from fabric.contrib.project import rsync_project

env.user = 'kenohori'
env.hosts = ['3d.bk.tudelft.nl']

def change_config_pre():
  f = open('_config.yml', 'w')
  f.write("title: Ken Arroyo Ohori\n")
  f.write("\n")
  f.write("# Home\n")
  f.write("# url: http://localhost\n")
  f.write("# baseurl: \"/~ken/work\"\n")
  f.write("\n")
  f.write("# Server\n")
  f.write("url: https://3d.bk.tudelft.nl\n")
  f.write("baseurl: \"/ken\"\n")

def change_config_post():
  f = open('_config.yml', 'w')
  f.write("title: Ken Arroyo Ohori\n")
  f.write("\n")
  f.write("# Home\n")
  f.write("url: http://localhost\n")
  f.write("baseurl: \"/~ken/work\"\n")
  f.write("\n")
  f.write("# Server\n")
  f.write("# url: https://3d.bk.tudelft.nl\n")
  f.write("# baseurl: \"/ken\"\n")

def deploy():
  change_config_pre()
  local("jekyll build")
  remotedir = '/var/www/people/ken/'
  rsync_project(local_dir='./_site/', 
                remote_dir=remotedir,
                delete=True)
  change_config_post()