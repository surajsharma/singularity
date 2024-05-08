S = "live on time, emit no evil"
T = "Dogma I am God"
U = "Step on no pets"


def checkPalindrome(string):
    compare = string
    index = 0
    count = 0
    spaces = 0

    for char in compare:
        if char == ' ':
            spaces += 1

    compare = compare.replace(' ', '')
    length = len(compare)-1

    while length >= 0:
        if compare[length].upper() == compare[index].upper():
            count += 1

        length -= 1
        index += 1

    if count + spaces == len(string):
        return True
    else:
        return False


print(checkPalindrome(S))
print(checkPalindrome(T))
print(checkPalindrome(U))
