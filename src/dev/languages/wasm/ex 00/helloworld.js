const fs = require("fs");
const bytes = fs.readFileSync(__dirname + "/helloworld.wasm");

let hello_world = null; // function to be called later
let start_string_index = 100; // // linear memory location of string

let memory = new WebAssembly.Memory({ initial: 1 });
// linear memory; holds the WebAssembly. Memory object. reps number of pages you want to allocate
// You can allocate up to two gigabytes this way, but setting this value too high can result
// in an error if the browser is unable to find enough contiguous memory to fulfill the request.

let importObject = {
  env: {
    buffer: memory,
    start_string: start_string_index,

    print_string: function (str_len) {
      const bytes = new Uint8Array(memory.buffer, start_string_index, str_len);
      // WA gave me dsome data, importing it

      const log_string = new TextDecoder("utf8").decode(bytes);
      // decoding it

      console.log(log_string);
      // logging it
    }
  }
};

(async () => {
  let obj = await WebAssembly.instantiate(new Uint8Array(bytes), importObject);
  ({ helloworld: hello_world } = obj.instance.exports);
  hello_world();
})();
