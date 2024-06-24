# Linked List


- javascript

```js 


class LinkedListNode {
	constructor(value, next = null) {
		this.value = value;
		this.next = next;
	}

	toString(callback) {
		return callback ? callback : `${this.value}`
	}
}


class LinkedList {

	constructor() {
		// head and tail are nodes

		this.head = null;
		this.tail = null;

	}

	prepend(value) {

		// make a new node as head
		const newNode = new LinkedListNode(value, this.head);

		this.head = newNode;

		if (!this.tail) {
			this.tail = newNode;
		}

		return this;
	}

	append(value) {
		const newNode = new LinkedListNode(value);

		if (!this.head) {
			this.head = newNode;
			this.tail = newNode;
			return this;
		}

		const currentTail = this.tail;
		currentTail.next = newNode;
		this.tail = newNode;

		return this;

	}

	delete(value) {

		if (!this.head) {
			// nothing to delete
			return null;
		}

		const deletedNode = null;

		while (this.head && this.head.value === value) {
			deletedNode = this.head;
			this.head = this.head.next;
		}

		let currentNode = this.head;

	}

	deleteHead() {
		if (!this.head) {
			// no head
			return null;
		}

		const deleteHead = this.head;

		if (this.head.next) {
			// next node exists
			this.head = this.head.next;

		} else {
			// no next node
			this.head = null;
			this.tail = null;
		}

		// return deleted head
		return deletedHead;
	}

	deleteTail() {

		const deletedTail = this.tail;

		if (this.head === this.tail) {
			this.head = null;
			this.tail = null;

			return deletedTail;
		}

		// rewind and delete the next of second last node

		let currentNode = this.head;

		while (currentNode.next) {
			if (!currentNode.next.next) {
				currentNode.next = null;
			} else {
				currentNode = currentNode.next;
			}
		}

		this.tail = currentNode;

		return deletedTail;
	}

	toString() {

	}

	toArray() {

	}
}


```

- python

```python 

##!/usr/bin/env python3
#Implement a singly linked list that can be printed

import random

class Node():
  def __init__( self, data = None, next = None ):
    self.next = next
    self.data = data
    
class LinkedList():
  def __init__(self, head = None):
    self.head = head
      
  def __len__(self):
    length = 0
    temp = self.head
    if temp is not None:
      while temp is not None:
        length += 1
        temp = temp.next
    return length
  
  def __str__(self):
    temp = self.head
    loc = 0
    
    if(temp != None):
      while(temp != None):
        print(f"{'head' if loc == 0 else loc } -> {temp.data}")
        temp = temp.next
        loc += 1
        
    else:
      return "List Is Empty"
    return ""

  
  def append(self, data = None):
    newNode = Node(data = data, next = None)
    
    if self.head is None:
      self.head = newNode
      return
    
    else:
      temp = self.head
      while temp.next is not None:
        temp = temp.next
      temp.next = newNode
    
  def prepend(self, data):
    if self.head is None:
      newNode = Node(data = data, next = None)
      self.head = newNode
    else:
      newNode = Node(data = data, next = self.head.next)
      self.head = newNode
     
  def insert(self, index, data = None):
    if data:
      if index < 0 or index > len(self):
        raise Exception(f"Sorry, cannot insert at {index}, value cannot be < 0 and > {len(self)}")
        return
      
      if index == len(self):
        self.append(data)
        return
      
      if index == 0:
        self.prepend(data)
        return
      
      temp = self.head
      location = 0
      
      while temp.next is not None:
        if location == index -1:
          newNode = Node(data = data, next = temp.next)
          temp.next = newNode
          return
        else:
          temp = temp.next
          location += 1
    
    else:
      raise Exception(f"No Data")
      return
    return

  def deleteHead(self):
    if self.head is None:
      return
    else: 
      temp = self.head
      temp = temp.next
      self.head = temp
    return
  
  def deleteTail(self):
    if self.head is None:
      return
    else:
      if self.head.next is None:
        self.head = None
        return
      temp = self.head
      while temp.next.next is not None:
        temp = temp.next
      temp.next = None
      
    return
  
  def deleteAtIndex(self, index):
    
    if self.head is None or index < 0 or index > len(self):
      raise Exception(f"Deletion index {index} out of bounds")
      return
    
    if index == 0:
      self.deleteHead()
      return
    
    if index == len(self):
      self.deleteTail()
      
    else:
      temp = self.head
      location = 0
      
      while self.head is not None:
        if location == index - 1:
          if temp.next.next == None:
            temp.next = None
          else:
            temp.next = temp.next.next
          return
        else:
          location += 1
          temp = temp.next
          
    return
  
  def deleteAll(self):
    self.head = None
    return
  
  def deleteEven(self):
    temp = self.head
    location = 0

    while temp.next is not None:
      if location % 2 == 0:
        print(location)
        if temp.next is None:
          temp = None
#        if temp.next.next is not None:
#          temp.next = temp.next.next
#        else:
#          temp.next = None
      temp = temp.next
      location += 1
      
    return
  
  def deleteOdd(self):
    return
  
  def search(self, data):
    return
  
  def deleteFirstNodeWithData(self, data):
    return
  
  def deleteLastNodeWithData(self, data):
    return
  
  def deleteAllNodesWithData(self, data):
    return
  
  def reverse(self):
    return  
  
two  = Node(data = 2, next = None)
one = Node(data = 1, next = two)
zero  = Node(data = 0, next = one)

list = LinkedList(zero) 

#list.append(40)
list.prepend(99)
#list.append(50)

#list.append({'length':len(list)})
#list.append("tail")

#list.insert(0, "head")
#list.insert(4, random.random())

##list.deleteHead()
##list.deleteTail()
##list.deleteAtIndex(len(list))
##list.deleteAtIndex(0)
##list.deleteAtIndex(1)
##list.deleteAtIndex(2)
##list.deleteAtIndex(0)
##list.deleteAtIndex(1)
##list.deleteAtIndex(1)
#list.deleteAll()

#list.deleteEven()

#list.deleteHead()
#list.deleteHead()
print(list)

```