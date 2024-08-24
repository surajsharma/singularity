```rust

/* The std::path module provides structures and operations for
manipulating filesystem paths in a platform-independent manner*/

use std::env;
use std::path::{Path, PathBuf};

fn _main() {
    let path = Path::new("/tmp/example.txt");
    println!("File exists: {}", path.exists());
    println!("File name: {:?}", path.file_name().unwrap());
    /* If there's no file name (e.g., the path is to a directory),
    file_name would return None, which is why unwrap is used to get
    the value safely for demonstration. */
}

fn main() {
    // Get the path of the current executable
    if let Ok(mut exe_path) = env::current_exe() {
        exe_path = replace_extension(exe_path, "rs");

        // Convert the PathBuf to a Path
        let path = Path::new(&exe_path);

        // Check if the file exists (it should, since it's the current executable)
        println!("File exists: {}", path.exists());

        // Get the file name and print it
        if let Some(file_name) = path.file_name() {
            if let Some(file_name_str) = file_name.to_str() {
                println!("File name: {}", file_name_str);
            } else {
                println!("File name contains invalid Unicode");
            }
        } else {
            println!("Unable to get file name");
        }
    } else {
        println!("Unable to get current executable path");
    }
}

fn replace_extension(mut path: PathBuf, new_extension: &str) -> PathBuf {
    let stem = path.file_stem().and_then(|s| s.to_str()).unwrap_or("");
    path.set_file_name(format!("{}.{}", stem, new_extension));
    path
}
```
