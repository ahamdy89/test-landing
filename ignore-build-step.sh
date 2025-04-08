#!/bin/bash

# ignore build if the current branch is not master, staging or test
branch_name=$VERCEL_GIT_COMMIT_REF
echo "current branch $branch_name"

case $branch_name in
main | staging)
  echo "should build"
  exit 1
  ;;
*)
  echo "should not build"
  exit 0
  ;;
esac
