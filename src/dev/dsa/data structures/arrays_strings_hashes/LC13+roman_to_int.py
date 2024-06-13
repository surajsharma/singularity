#!/usr/bin/env python3

def romanToInt(s: str) -> int:
	romans = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M' : 1000}
	sub = ['IV','IX', 'XL', 'XC', 'CD', 'CM']
	news= str(s)
	ans = 0;
	for substr in sub:
		if substr in s:
			news = news.replace(substr, '')
			ans += romans[substr[1]]-romans[substr[0]]
	for x in news:
		ans+=romans[x]
	return ans