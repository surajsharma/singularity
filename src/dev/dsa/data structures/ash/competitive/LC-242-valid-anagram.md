## 242. [Valid Anagram](https://leetcode.com/problems/valid-anagram/)


```javascript
var isAnagram = function (s, t) {
	if (t.length !== s.length) return false;
	const counts = {};

	for (let c of s) {
		counts[c] = (counts[c] || 0) + 1;
	}

	for (let c of t) {
		if (!counts[c]) return false;
		counts[c]--;

	}
	return true;
};
```


```javascript
const isAnagram218ms = (s, t) => {
	s = s.split('').sort().join('')
	t = t.split('').sort().join('')
	return s == t
}
```
