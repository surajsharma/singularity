#!/usr/bin/env python3

# Linked List
# append, len(), pop, insertAt, isCircular, reverse, isLoopy

class Node:
	def __init__(self, data):
		self.data = data
		self.next = None
		self.flag = 0

class LinkedList:

	def __init__(self):
		self.head = None
	
	def append(self, data):
		if not self.head:
			self.head = Node(data)
			return
		new_node = Node(data)
		new_node.next = self.head
		self.head = new_node

	def __len__(self):
		return self.length(self.head)

	def length(self, node):
		if not node:
			return 0
		else:
			return 1 + self.length(node.next)

	def pop(self):
		if(self.head != None):
			if(self.head.next == None):
				self.head == None
			else:
				temp = self.head
				while temp.next.next != None :
					temp = temp.next
				lastNode = temp.next
				temp.next = None
				lastNode = None
		return

	def insertAt(self, data, index):
		if index < 1:
			return

		newNode = Node(data)

		if(self.head.next == None or index == 1):
#			insert at head
			self.head = newNode

		else:
			temp = self.head
			for i in range(1, index -1):
#				changing next for the previous node
				if(temp != none):
					temp = temp.next
			if temp != None:
				newNode.next = temp.next
				temp.next = newNode
			else:
				return

	def __str__(self):
		r = "HEAD "
		pointer = self.head

		while pointer:
			r += str(pointer.data) + " -> "
			pointer = pointer.next
		return r + "END"


	def isCircular(self):
		head = self.head

		if head == None:
			return True

		node = head.next

		while node is not None and node is not head:
			node = node.next

		return node == head


	def isLoopy(self):
		head = self.head
		if head == None:
			return True
		while head is not None:
			if head.flag == 1:
				return True
			head.flag = 1
			head = head.next

		return False

	def reverse(self):
		prev = None
		current = self.head

		while current is not None:
#		head<= [prev] <= [curr(next => prev)] <=> [next(curr.next)] 
			next = current.next
			current.next = prev
			prev = current
			current = next

		self.head = prev
		return

if __name__=='__main__':

	llist = LinkedList()
	llist.append(1)
	llist.append(2)
#	llist.append(3)
#	llist.append(4)
	print(llist)
	

#	print(len(llist))
#	llist.pop()
#	print(len(llist))
#	llist.insertAt(1, 2)
#	print(len(llist))
#	llist.reverse()
#	print(llist)
#	print(llist.isCircular())
#
#	print(llist.isLoopy())
#	llist2 = LinkedList()
#
#	llist2.head.next.next = llist.head
#	print(llist2.isLoopy())
	