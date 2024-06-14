def longestCommonPrefix(strs):
    ans=''
    for i in list(zip(*strs)):
#       print("\n",list((zip(*strs))))
        if len(set(i))==1:
            ans=ans+i[0]
        else:
            break
    return ans
    
print(longestCommonPrefix(["flower","flow","flight"]))