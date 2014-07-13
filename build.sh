#!/bin/bash
grunt
rm test/res/js/pagenav.js
cp pagenav.js test/res/js/pagenav.js
cp pagenav.min.js test/res/js/pagenav.min.js