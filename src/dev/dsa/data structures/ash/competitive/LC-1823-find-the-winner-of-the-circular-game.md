## 1823. [Find the Winner of the Circular Game]()


### O(n*k)


```js 

var findTheWinner = function(n, k) {
    let cq = Array.from({length:n}).map((i,x)=> i=x+1)
    
    while(cq.length != 1){
        let r = k-1
        while(r>0){
            cq.push(cq.shift())
            r--
        }
        cq.shift()
    }
    return cq.shift()
};

```