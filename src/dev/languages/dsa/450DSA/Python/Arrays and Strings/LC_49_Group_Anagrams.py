#!/usr/bin/env python3
from collections import defaultdict

def groupAnagrams(strs):
	hashmap = defaultdict(list)	
	for s in strs:
		# keys can be strings, bcz they are immutable.
		hashmap[str(sorted(s))].append(s) 
	return hashmap.values()

print(groupAnagrams(["eat","tea","tan","ate","nat","bat"]))