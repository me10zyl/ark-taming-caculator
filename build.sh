#!/bin/bash
rm -rf dist
rm -rf docs
npm run build
mv dist docs
echo "ark.yilnz.com" > docs/CNAME
git add .
git commit -am "deploy site::update docs"
git push -u origin master