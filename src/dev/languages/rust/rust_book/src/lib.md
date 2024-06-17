```rust

#![allow(dead_code, unused_variables, unused_imports)]

// ch 10

pub struct NewsArticle {
	pub headline: String,
	pub location: String,
	pub author: String,
	pub content: String,
}

pub struct Tweet {
	pub username: String,
	pub content: String,
	pub reply: bool,
	pub retweet: bool,
}

//define default impl
pub trait Summary {
	
	//fn summarize_author(&self) -> String;
	
	fn summarize(&self) -> String {
		//format!("(More from {}...)", self.summarize_author())
		String::from("(Read more...)")
	}
}

//empty block to use default impl 
impl Summary for NewsArticle {}

impl Summary for Tweet {
	
	/*fn summarize_author(&self) -> String {
		format!("@{}", self.username)
		
	}*/
	
	fn summarize(&self) -> String {
		format!("{}: {}", self.username, self.content)
	}
}



pub fn notify(item: &impl Summary) {
	println!("Breaking news! {}", item.summarize());
}


// ch 7

pub mod front_of_house {
	pub mod hosting {
		pub fn add_to_waitlist() {
			println!("add to waitlist");
		}
		
		pub fn seat_at_table() {
			println!("seat at table");
		}
	}
	
	mod serving {
		fn take_order() {
			println!("take order");
		}
		
		fn serve_order() {
			println!("serve order");
		}
	}
}

mod back_of_house {
	
	pub struct Breakfast {
		pub toast: String, // can be changed with meal.toast etc
		seasonal_fruit: String, //immutable after impl/constructor
	}
	
	
	pub enum Appetizer {
		Soup,
		Salad
	}//pub enum makes all variants public
	
	
	impl Breakfast {
		pub fn summer(toast: &str) -> Breakfast {
			Breakfast {
				toast: String::from(toast),
				seasonal_fruit: String::from("peaches"),
			}
		}
	}
		
		
	pub fn fix_incorrect_order() {
		cook_order();
		super::deliver_order();
	}
	
	fn cook_order(){
		println!("cooking order");
	}
}

fn deliver_order(){
	println!("order delivered");
}


pub use crate::front_of_house::hosting;

//mod customer { 
	//this will break the fn below because of scope
	//unless we 1) use super::hosting as in @ln74-75 
	//2 move @ln64 inside mod customer

	pub fn eat_at_restaurant() {
		
		use crate::front_of_house::hosting;
		//use super::front_of_house::hosting;
		//use super::back_of_house;
		
		// 1- Absolute path
		crate::front_of_house::hosting::add_to_waitlist();
		
		// 2- Relative path
		//front_of_house::hosting::add_to_waitlist();
		
		// 3- From 'use crate' @ln64
		hosting::seat_at_table();
		
		let mut meal = back_of_house::Breakfast::summer("Rye");
		
		meal.toast = String::from("Wheat");
		
		println!("I'd like {} toast please", meal.toast);

		//meal.seasonal_fruit = String::from("blueberries");
		
		let order1 = back_of_house::Appetizer::Soup;
		let order2 = back_of_house::Appetizer::Salad;
		
	}
//}



```