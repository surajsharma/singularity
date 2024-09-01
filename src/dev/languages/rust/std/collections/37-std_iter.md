```rs 

fn main() {
    let numbers = vec![1, 2, 3, 4, 5];

    //let squares = numbers.iter().map(|&x| x * x).collect(); // this will throw type error
    
    //let squares: Vec<i32> = numbers.iter().map(|&x| x * x).collect(); //declare vec type explicitly or

    let squares = numbers.iter().map(|&x| x * x).collect::<Vec<_>>(); //turbofish syntax to infer type

    println!("{:?}", squares);
}

```