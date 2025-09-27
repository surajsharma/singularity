## updating files in-place


```ocaml
let save_data1 path data =
  try
    let fp = open_out_bin path in
    let () = output_string fp data in
    let () = close_out fp in
    flush_all (); (*no data persistence without this call*)
    Ok ()
  with
    | Sys_error msg -> Error (msg)
    | exn -> Error (Printexc.to_string exn)


(*execution context, main not needed in ocaml*)
let () =
  match save_data1 "mydata.bin" "Hello, world!" with
  | Ok () -> print_endline "File saved successfully."
  | Error msg -> print_endline ("Error saving file: " ^ msg)
```

- creates the file if it does not exist

- overwrites existing data

### limitations

- updates the file as a whole, like excel

- no support for concurrent reads

- no support for partial writes "tear writes"




