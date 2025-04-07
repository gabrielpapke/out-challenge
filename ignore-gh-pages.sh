#!/bin/bash

if [ "$VERCEL_GIT_COMMIT_REF" = "gh-pages" ]; then
  echo "Skipping build for branch gh-pages"
  exit 0
fi

exit 1