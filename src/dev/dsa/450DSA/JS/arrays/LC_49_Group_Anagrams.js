/**
 * @param {string[]} strs
 * @return {string[][]}
 */
let strs = ["eat","tea","tan","ate","nat","bat"]

var groupAnagrams = function(strs) {
    let hashmap = {}
    for (let s of strs){
        let i = Object.keys(hashmap).indexOf(s.split('').sort());
        let key = s.split('').sort();
        hashmap[key]?hashmap[key].push(s):hashmap[key]=[s];
    }
    return Object.values(hashmap);
};

console.log(groupAnagrams(strs));