#!/usr/bin/env python3

arr  = [1,2,3,4,5]
arr2 = [1,2,3]
arr3 = [0,1,2,3]
arr4 = [1,2,1,0]

def arrExIndex(arr, index):
	newArray=[]
	for x in range(len(arr)):
		if x != index:
			newArray.append(arr[x])
	return newArray
		
def product(arr):
	pro = 1
	for x in range(len(arr)):
		pro *= arr[x]
	return pro
		
def peiNoDivision(arr):
	newArr = []
	for a in range(len(arr)):
		exArray = arrExIndex(arr, a)
		newArr.append(product(exArray))
	return newArr

def productExcludingIndex(arr):
	res=arr
	mul=[]
	for x in range(len(arr)):
		pro = product(arr)
		if(arr[x]==0):
			zeroless= product([x for x in arr if x!=0])
			mul.append(zeroless)
		else:
			mul.append(int(pro/arr[x]))
	return mul


def peiSinglePass(arr):
	newArr=[]
	curr =1
	for x in range(len(arr)):
		ex = [arr[a] for a in range(len(arr)) if arr.index(arr[a]) != x]
		newArr.append(product(ex)) 
	return newArr


#result = peiNoDivision(arr4)
#control = productExcludingIndex(arr4)
#print(result, control)
	
print(peiSinglePass(arr2))