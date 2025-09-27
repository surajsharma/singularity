(module
  (import "env" "print_string" (func $print_string( param i32 )))
    
  (;
    This code tells WebAssembly to expect the import object env from our embedding environment, 
    and that within that object we’re expecting the function print_string.
  ;)

  (import "env" "buffer" (memory 1))

  (; 
    import the memory 
    =================

    tells our WebAssembly module that we’ll be importing a memory buffer from the object env and the buffer will be called buffer. 
    The (memory 1) statement indicates that the buffer will be a single page of linear memory: 
    a page is the smallest chunk of memory you can allocate at one time to linear memory.

    In WebAssembly, a page is 64KB, which is more than we need for this module, so we need just one page. 
  ;)

  (global $start_string (import "env" "start_string") i32) 
  ;; in the imported env there's a string starting at start_string address

  (global $string_len i32 (i32.const 12))
  ;; length of string is 12
  
  (data (global.get $start_string) "hello world!")
  ;; data of string is ...

  (func (export "helloworld")
    (call $print_string (global.get $string_len))
    ;; call the print_string fn from env
  )
)
