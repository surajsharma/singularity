## atomic renaming


```ocaml
open Unix

(*atomic rename*)
let save_data2 path data =
  try
    let flags = [O_WRONLY; O_CREAT; O_EXCL] in
	(*unix flags are here: https://ocaml.org/manual/5.3/api/Unix.html*)
	(*|O_WRONLY - Open for writing
	  |O_CREAT - Create if nonexistent
	  |O_EXCL - Fail if existing*)

    let chmod = 0o644 in
	(* chmod permissions read/write admin, others can only read *)

    let fd = openfile path flags chmod in
	let _ = write fd (Bytes.of_string data) 0 (String.length data) in

    close fd;
	Ok()
  with
    | Sys_error msg -> Error (msg)
    | exn -> Error (Printexc.to_string exn)

(*execution context*)
let () =
  (* Seed the random number generator *)
  Random.self_init (); 

  let tmp_path = Printf.sprintf "%s.tmp.%d" "db3.bin" (Random.int 1000000) in

  match save_data2 tmp_path "will create new file?" with
  | Ok () -> print_endline "File saved successfully."
  | Error msg -> print_endline ("Error saving file: " ^ msg)
```

- Renaming a file to an existing one replaces it atomically; deleting the old file is not needed (and not correct).

- Pay attention to the meaning of the jargon, whenever you see “X is atomic”, you should ask “X is atomic with respect to what?” In this case:

  - Rename is atomic w.r.t. concurrent readers; a reader opens either the old or the new file.
  -  Rename is NOT atomic w.r.t. power loss; it’s not even durable. You need an extra fsync on the parent directory, which is discussed later.
