- Smartphones use SQLite (a file-based DB) heavily. Why store data in SQLite instead of some other format, say JSON? 
- Because you risk data loss if it crashes during an update. The file can end up half-written, truncated, or even missing.
- There are techniques to fix this, and they lead to databases.

## Durability and atomicity with `fsync`

- Atomicity means that data is either updated or not, not in between. 
- Durability means that data is guaranteed to exist after a certain point. 
- They are not separate concerns, because we must achieved both.
- The first thing to learn is the `fsync` syscall. 
- A file write doesn’t reach disk synchronously, there are multiple levels of buffering (*OS page cache and on-device RAM*). 
- `fsync` flushes pending data and waits until it’s done. 
- This makes writes durable, but what about atomicity?

## Control latency and cost with indexes

- Query result is not the only concern, latency and cost (memory, IO, computation) are also relevant, hence the distinction between analytical (*OLAP*) and transactional (*OLTP*).
  - OLAP can involve large amounts of data, with aggregation or join operations. Indexing can be limited or non-existent.
  - OLTP touches small amounts of data using indexes. Low latency & cost.
- The word “transactional” is not about DB transactions, it’s just a funny jargon.

## In-memory vs. on-disk data structures

- extra challenges when putting an indexing data structure on disk
- updating disk data in-place, because you have to deal with corrupted states after a crash. Disks are not just slower RAM.
- for disk-based data because random access is much slower than sequential access
- So data structures like binary trees are not viable while B-trees and LSM-trees are OK. see: [[trees]]

## Relational DB on KV

- SQL is just a user interface, it’s not fundamental to a DB. What’s important is the functionalities underneath.
-  KV is simpler than SQL because it’s one layer lower.
-  Relational DBs are built on top of KV-like interfaces called storage engines.