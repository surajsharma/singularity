'''
 LC_125_Valid_Palindrome
 edited: 12 jul 22
 anki: 13 jul 22
'''

class Solution:
    def isPalindrome(self, s: str) -> bool:
        r = s.lower()
        r = ''.join(ch for ch in r if ch.isalnum())
        return r == r[::-1]