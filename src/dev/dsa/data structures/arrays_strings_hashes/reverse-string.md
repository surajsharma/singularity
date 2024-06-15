```python
#!/usr/bin/env python3
S = "hello"


def reverseString(S):
    l = len(S)-1
    rev = []
    while l >= 0:
        rev.append(S[l])
        l -= 1
    return "".join(rev)


U = reverseString(S)
print(U)
```