#!/bin/sh
npm install || exit 1
cd database
node createDb.js