## 206. [Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/description/)

### O(n)

```javascript


/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let next = null;
    let prev = null;
    let curr = head;
    
    while(curr){
        next = curr.next; //get next
        curr.next = prev; //append prev to cur next
        prev = curr; // prev is cur
        curr = next; // cur is next
    }

    return prev;
};

```

- recursively 

```javascript 

var reverseList = function(curr, prev=null) {
    if(curr===null) return prev;
    const next = curr.next;
    curr.next = prev;
    return reverseList(next,curr);
};

```
