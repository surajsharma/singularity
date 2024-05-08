import LinkedListNode from './LinkedListNode';

export default class LinkedList {

	constructor(){
		// head and tail are nodes
		
		this.head = null;
		this.tail = null;
	
	}

	prepend(value){

		// make a new node as head
		const newNode = new LinkedListNode(value, this.head);

		this.head = newNode;

		if(!this.tail){
			this.tail = newNode;
		}

		return this;
	}

	append(value){
		const newNode = new LinkedListNode(value);

		if(!this.head){
			this.head = newNode;
			this.tail = newNode;
			return this;
		}

		const currentTail = this.tail;
		currentTail.next = newNode;
		this.tail = newNode;

		return this;

	}

	delete(value){
		
		if(!this.head){
			// nothing to delete
			return null;
		}

		const deletedNode = null;

		while(this.head && this.head.value === value){
			deletedNode = this.head;
			this.head = this.head.next;
		}

		let currentNode = this.head;

	}

	deleteHead(){
		if(!this.head){
			// no head
			return null;
		}

		const deleteHead = this.head;

		if(this.head.next){
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

	deleteTail(){

		const deletedTail = this.tail;

		if(this.head === this.tail){
			this.head = null;
			this.tail = null;

			return deletedTail;
		}

		// rewind and delete the next of second last node

		let currentNode = this.head;

		while(currentNode.next){
			if(!currentNode.next.next){
				currentNode.next = null;
			}else{
				currentNode = currentNode.next;
			}
		}

		this.tail = currentNode;

		return deletedTail;
	}

	toString(){
		
	}

	toArray(){

	}
}
