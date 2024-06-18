#!/bin/bash
 bundle exec jekyll build &&  \
 ./build-nav-indices.sh &&    \
 ./build-search-indices.sh && \ 
 ./update-checksums.sh