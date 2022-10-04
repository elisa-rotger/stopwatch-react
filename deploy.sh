#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist 

# place .nojekyll to bypass Jekyll processing
echo > .nojekyll

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME
git config user.name Elisa Rotger
git config user.email elisa.rotger@weareadaptive.com

git init
git checkout -b main
git add -A
git commit -m 'deploy'


# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:elisa-rotger/stopwatch-react.git main:gh-pages

cd -
