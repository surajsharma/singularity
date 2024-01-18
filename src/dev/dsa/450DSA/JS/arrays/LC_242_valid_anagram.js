/*
Valid Anagram
LC 242 - https://leetcode.com/problems/valid-anagram/
@My solution: Jul 11, 2022
*/

var isAnagram = function(s, t) {
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


/*
218 ms solution
*/

const isAnagram218ms = (s, t) => {
    s = s.split('').sort().join('')
    t = t.split('').sort().join('')
    return s!==t?false:true
}

console.log(isAnagram("acacbac", "bbbbbac")) //true
// console.log(isAnagram218ms("acacbac", "bbbbbac")) //true