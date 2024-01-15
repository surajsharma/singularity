use clap::{ command, Arg };

fn main() {
    let matches = command!() // requires `cargo` feature
        .version("0.1.0")
        .author("Suraj Sharma <suraj@evenzero.in>")
        .about("recho 0.1.0\nsuraj@evenzero.in")
        .arg(
            Arg::new("text")
                .required(true)
                .help("Input Text")
                .id("TEXT")
                .num_args(1..)
        )
        .arg(
            Arg::new("omit_newline")
                .help("Do not print newline")
                .id("NEWLINE")
                .short('n')
                .long("nline")
        )
        .get_matches();

    println!("{:#?}", matches);
}
