```rs

/*The std::ops module in Rust's standard library provides
functionalities to overload operators for custom types. This
includes the ability to define behavior for arithmetic, bitwise,
logical operations, and more through traits like Add, Sub, Mul,
Div, and Not.*/


use std::ops::Add;

struct Point {
	x: i32,
	y: i32,
}

// Implementing the Add trait for Point
impl Add for Point {
	type Output = Point;

	fn add(self, other: Point) -> Point {
		Point {
			x: self.x + other.x,
			y: self.y + other.y,
		}
	}
}

fn main() {
	let point1 = Point { x: 1, y: 2 };
	let point2 = Point { x: 3, y: 4 };
	let point3 = point1 + point2;
	println!("New Point: ({}, {})", point3.x, point3.y);
}


```