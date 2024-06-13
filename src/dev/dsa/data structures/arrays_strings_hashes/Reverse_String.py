S = ["h", "e", "l", "l", "o"]


def reverseString(S):
    l = len(S)-1
    rev = []
    while l >= 0:
        rev.append(S[l])
        l -= 1
    return rev


U = reverseString(S)
print(U)
