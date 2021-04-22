#!/bin/zsh

echo "Version:"
read VERSION

git flow release start ${VERSION}

npm version ${VERSION} --no-git-tag-version

git add .
git commit -m "Update version ${VERSION}"

git flow release finish ${VERSION}
