#!/bin/sh
npm install || exit 1
npm install --workspace core || exit 2
npm install --workspace database || exit 3
npm install --workspace back || exit 4
cd database
node createDb.js