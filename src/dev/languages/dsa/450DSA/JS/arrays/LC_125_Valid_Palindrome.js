//https://leetcode.com/problems/valid-palindrome/description/

//O(n)

var isPalindrome = function (s) {
    const clean = s.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
    const reverse = clean.split("").reverse().join("");
    return clean == reverse;
};