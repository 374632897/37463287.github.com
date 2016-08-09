#!/bin/bash
dm=':smirk';
if [ ! -z $1 ]; then
  dm=$1;
fi;
git add --all;
git commit -m "$1";
git push;
