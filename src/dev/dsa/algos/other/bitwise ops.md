```python

# Objectives
# 1. Be very comfortable with bitwise operators, particularly XOR
# 2. Understand how to use masks and create them in a machine independent way
# 3. Know the fast ways to clear the lowermost set bit (and by extension, set the lowermost 0, get its index etc.)
# 4. Understand signedness and its implications to shifting
# 5. Consider using a cache to accelerate operations by using it to brute-force small inputs
# 6. Be aware that commutativity and associativity can be used to perform operations in parallel and reorder operations

class Bitwise():
	def swapXor(self, x:int, y:int) -> int:
		x ^= y
		y ^= x
		x ^= y
		
		# otherwise, x,y = y,x
		return (x,y)

	def count_bits(self, c):
		num_bits = 0
		while c:
			c >>= 1
			num_bits += c & 1
		return num_bits
	
	
	def parity_naive(self, x):
		#O(n)
		result = 0
		while(x):
			result ^= x & 1
			x >>= 1
#			print(x, result)
		return result
	
	def parity_op(self, x):
		#O(k) for k bits set to 1 in word
		result = 0
		while x:
			result ^= 1
			x &= x-1 #drops the lowest set bit of x
		return result

b = Bitwise()

print('left shift is same as *2\t--->',(2<<1))

print('right shift is same as /2\t--->',2>>1)

print('Swap Bits\t\t\t\t\t--->', b.swapXor(100, 200))

print('Count Bits\t\t\t\t\t--->', b.count_bits(900000))

print('Parity Check Brute Force\t--->', b.parity_naive(121))

print('Parity Check Optimised\t\t--->', b.parity_op(1111))

```