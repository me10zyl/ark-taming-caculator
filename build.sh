#!/bin/bash
rm -rf dist
npm run build
mv dist docs
git add .
git commit -am "deploy site::update docs"
git push -u origin master