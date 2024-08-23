```rust

/*The struct is a data structure in Rust's standard library that
represents a doubly-linked list. It allows elements to be efficiently
added or removed from both ends of the list. useful when you need a 
queue or a deque where insertions and deletions at both ends are 
frequent and need to be fast. However, unlike vectors, linked lists 
do not allow fast random access to elements.*/

fn main() {
    use std::collections::LinkedList;
    
    let mut list: LinkedList<u32> = LinkedList::new();
    
    list.push_back(0);
    list.push_back(1);
    list.push_back(2);
	list.push_back(1);
	list.push_front(0);
	
	println!("{:?}", list);

	assert_eq!(list.contains(&0), true);
	assert_eq!(list.contains(&10), false);
	
    let mut iter = list.iter();
	
    assert_eq!(iter.next(), Some(&0));
    assert_eq!(iter.next(), Some(&0));
    assert_eq!(iter.next(), Some(&1));
    assert_eq!(iter.next(), Some(&2));
    assert_eq!(iter.next(), Some(&1));
    assert_eq!(iter.next(), None);	
	
	for item in list.iter() {
		println!("{}",item);
	}
}
```
