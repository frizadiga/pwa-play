set -e

echo CIRCLE_BRANCH: $CIRCLE_BRANCH SOURCE_BRANCH: $SOURCE_BRANCH TARGET_BRANCH: $TARGET_BRANCH CIRCLE_REPOSITORY_URL: $CIRCLE_REPOSITORY_URL GH_NAME: $GH_NAME GH_EMAIL: $GH_EMAIL BUILD_FOLDER: $BUILD_FOLDER

if [[ $CIRCLE_BRANCH == $SOURCE_BRANCH ]]; then
  git config --global user.name $GH_NAME
  git config --global user.email $GH_EMAIL

  git clone $CIRCLE_REPOSITORY_URL deploy
  cd deploy

  git checkout $TARGET_BRANCH || git checkout --orphan $TARGET_BRANCH
  git rm -rf .
  cd ..

  npm run build

  cp -a $BUILD_FOLDER/. deploy/.

  mkdir -p deploy/.circleci
  cp -a .circleci/. deploy/.circleci/.
  cd deploy

  git add .
  git commit -m "Automated deployment to GitHub Pages: ${CIRCLE_SHA1}" --allow-empty
  git push origin $TARGET_BRANCH

  echo "Success!"
fi
