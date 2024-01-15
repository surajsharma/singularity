// #[test]
// fn passes() {
//     assert!(true);
// }

// #[test]
// fn fails() {
//     assert!(false);
// }

// use std::process::Command; //import anywhere
// #[test]
// fn runs_ls() {
//     let mut cmd = Command::new("ls");
//     let res = cmd.output();
//     assert!(res.is_ok());
// }

// #[test]
// fn runs_hello() {
//     let mut cmd = Command::new("hello");
//     let res = cmd.output();
//     assert!(res.is_ok());
// }

use assert_cmd::Command;
#[test]
fn runs() {
    let mut cmd = Command::cargo_bin("hello").unwrap();
    cmd.assert().success();
    cmd.assert().success().stdout("Hello, world!\n");
}
#[test]
fn false_not_ok() {
    let mut cmd = Command::cargo_bin("false").unwrap();
    cmd.assert().failure();
}
