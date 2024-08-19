``` rust 

use std::collections::HashMap;

fn main() {
	let mut scores = HashMap::new();

	scores.insert("Blue", 10);
	scores.insert("Yellow", 50);

	let team_name = String::from("Blue");
	
	let score = scores.get(&team_name as &str);
	//https://stackoverflow.com/questions/65549983/trait-borrowstring-is-not-implemented-for-str
	
	/* .get returns an Option which is Some(value) if the key exists or None if it does not. 
	In this code, we're looking up the score for the team "Blue" 

	The output shows that the score for "Blue" is Some(10), indicating that a value was
	found for the key "Blue"
	*/
	
	println!("Score for team {}: {:?}", team_name, score);
}

```
