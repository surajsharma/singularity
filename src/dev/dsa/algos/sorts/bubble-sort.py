import time

def bubble_sort(array):
	start = time.time()
	for x in range(len(array)-1):
		for y in range(len(array)-1):
			if array[y] > array[y+1]:
				array[y], array[y+1] = array[y+1], array[y]
	took = time.time() - start
	return array, took

	
def bubble_sort2(array):
	start = time.time()
	for x in range(len(array)-1):
		for y in range(len(array)-1-x):
			if array[y] > array[y+1]:
				array[y], array[y+1] = array[y+1], array[y]
	took = time.time() - start
	return array, took


def bubble_sort_noswaps(array):
	noswaps = False
	start = time.time()
	for x in range(len(array)-1):
		if noswaps:
			return array
		for y in range(len(array)-1):
			if array[y] > array[y+1]:
				array[y], array[y+1] = array[y+1], array[y]
				noswaps = True
	took = time.time() - start
	return array, took
	
				
	
arr1 = [9,5,3,2,4,0,1,6,8,7,5,7,0.1]
sorted = [1,2,3,4,5,6,7,8,9,0]
print(bubble_sort(arr1), '\n', bubble_sort(sorted))
print(bubble_sort2(arr1), '\n', bubble_sort2(sorted))
print(bubble_sort_noswaps(arr1), '\n', bubble_sort_noswaps(sorted))