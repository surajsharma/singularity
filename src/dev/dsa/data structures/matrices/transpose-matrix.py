#!/usr/bin/env python3

m = [[1,2],[3,4],[5,6]]

for row in m:
	print(row)
	
# with list comprehension
rez = [[m[j][i]
for j in range(len(m))]
for i in range(len(m[0]))]

#with loops
rez = [[0,0,0],[0,0,0]]
for j in range(len(m)):
	for i in range(len(m[0])):
		rez[i][j] =  m[j][i] 
		
print("\n\n--")

for row in rez:
	print(row)