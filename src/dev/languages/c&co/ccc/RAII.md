## 🔑 RAII = Resource Acquisition Is Initialization
### The idea: own a resource inside an object, and let the object’s lifetime manage the resource’s lifetime.

- Resource = anything that must be acquired and released properly: memory, file handles, sockets, mutexes, DB connections, etc.
- Acquisition happens in the constructor, release happens in the destructor.

### ✅ What RAII actually means

- RAII does not imply reference counting or garbage collection.

- It just means: tie the resource’s lifetime to an object’s lifetime.

- Constructor acquires (alloc, open, lock).

- Destructor releases (free, close, unlock).

- Scope boundaries = lifetime boundaries.

### ⚠️ Where reference counting comes in

- Reference counting is just one possible RAII strategy.

- std::shared_ptr is the example: it uses RAII + refcount → last owner frees the resource.

- But std::unique_ptr is RAII too — no refcount at all, just one owner.

### 🚫 Garbage collection vs RAII

- Garbage collection = runtime decides when to reclaim.

- RAII = deterministic: cleanup happens immediately when object leaves scope.

## So the essence is:

> RAII turns “manual alloc/free” into “automatic acquire/release at scope exit,” without a collector.

### example w/file

```c++
#include <fstream>

void processFile(const std::string& path) {
    std::ifstream file(path); // opens in ctor
    if (!file) throw std::runtime_error("cannot open");

    std::string line;
    while (std::getline(file, line)) {
        // process...
    }
} // file goes out of scope -> destructor closes file
```

- 👉 No manual fclose. Even if an exception is thrown, file closes automatically.

### Mutex example

```c++
#include <mutex>

std::mutex m;

void criticalSection() {
    std::lock_guard<std::mutex> guard(m); // locks in ctor
    // safe work
} // guard dtor unlocks
```

