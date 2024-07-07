```python
#!/usr/bin/env python3
S = "HELLO"
def reverse_string(s):
    if s == '':
        return ''
    else:
        return reverse_string(s[1:])+s[0]

U = reverse_string(S)
print(U)
```