"Part 1 – Getting Started" 18
"Chapter 1: Cryptography for Developers" 20
    "What is cryptography and why should
a developer care?" 21
        "Protecting secrets…" 21
        "…and the other uses of modern cryptography" 22
        "Why this matters to developers" 22
        "What this book is about – and what it's not" 25
        "Rules of engagement" 26
    "Defining ""safe""" 26
    "Types and ""layers"" of encryption" 29
    "Summary" 31
"Chapter 2: Dealing with Binary and Random Data" 32
    "Encoding and representing binary data" 33
        "A brief word on character encodings and why we encode binary data" 34
        "Buffers in Node.js" 35
        "Hex encoding" 37
    "Base64" 39
    "Generating cryptographically secure random byte sequences" 42
        "The importance of randomness" 42
        "Using crypto.randomBytes" 43
    "Summary" 45
"Part 2 – Using Common Cryptographic Operations with Node.js" 46
"Chapter 3: File and Password Hashing with
Node.js" 48
    "Technical requirements" 49
    "An overview of hashing functions" 49
        "Properties of hashing functions, and how they differ from encryption" 49
        "Uses for hashing functions" 50
    "Calculating digests and generating identifiers" 53
        "Hashing a short message or string" 53
        "Hashing large files and streams" 54
    "How to ""break"" a hash" 57
        "Fast hashing functions and low-entropy inputs" 58
        "Rainbow tables" 59
    "Hashing passwords and deriving keys" 60
        "Argon2" 61
        "Scrypt" 63
    "Older hashing functions" 67
        "Collisions" 68
    "Summary" 69
"Chapter 4: Symmetric Encryption in
Node.js" 70
    "Technical requirements" 71
    "Symmetric and asymmetric encryption" 71
    "Symmetric encryption with AES" 73
        "Key length" 73
        "Mode of operation" 75
        "Initialization vector" 77
        "Using AES with Node.js" 77
    "Symmetric encryption with ChaCha20-Poly1305" 87
        "Example usage with Node.js" 88
        "When to use ChaCha20-Poly1305 or AES-GCM" 90
    "Key derivation" 90
        "Reusing keys" 93
    "Wrapping keys and best practices for encrypting large documents" 94
        "AES Key Wrap" 95
        "Wrapping user keys" 95
    "Summary" 97
"Chapter 5: Using Asymmetric and Hybrid Encryption in
Node.js" 98
    "Technical requirements" 99
    "Understanding public-key and hybrid cryptosystems" 99
        "The need for public-key cryptography" 99
        "Hybrid cryptosystems" 101
    "Loading, exporting, and encoding public and private keys" 102
        "Encoding keys as PEM" 102
        "Reading and exporting keys" 103
    "Using RSA with Node.js" 105
        "Generating an RSA key pair" 105
        "Using RSA for encryption and decryption" 107
        "Hybrid encryption with RSA and AES" 110
    "Key agreements with Elliptic-Curve Diffie-Hellman" 113
        "Picking a curve" 113
        "Generating EC key pairs" 115
        "Diffie-Hellman key agreements and Perfect Forward Secrecy" 116
        "Performing an ECDH key agreement" 118
        "Data encryption with ECIES" 120
    "Summary" 125
"Chapter 6: Digital Signatures with Node.js and Trust" 126
    "Technical requirements" 127
    "The what, how, and why of digital signatures" 127
        "Hashes and digital signatures" 127
        "Properties of digital signatures" 128
        "How digital signatures work" 129
        "Digital signatures and encryption" 129
        "How developers use digital signatures" 130
    "Calculating and verifying digital signatures with Node.js" 132
        "Using RSA" 132
        "Using elliptic curves" 136
    "Trust and certificates" 140
        "The problem of trusting keys" 140
        "Public keys and certificates" 141
        "Public Key Infrastructure" 143
        "Alternative approaches" 147
    "Summary" 151
"Part 3 – Cryptography in the Browser" 152
"Chapter 7: Introduction to Cryptography in the Browser" 154
    "Technical requirements" 155
        "Playground" 155
        "In Node.js" 155
    "About cryptography in the browser – uses and challenges" 156
        "Challenges of cryptography in the browser" 157
        "Building browser-based apps that use cryptography" 162
    "Binary data in the browser" 164
        "Buffers and typed arrays in the browser" 165
        "Generating random data" 168
    "Keys in Web Crypto" 169
        "The CryptoKey object" 169
        "Generating keys" 170
        "Importing keys" 174
        "Exporting keys" 177
    "Summary" 179
"Chapter 8: Performing Common Cryptographic Operations in the Browser" 180
    "Technical requirements" 181
    "Hashing and key derivation" 182
        "Calculating checksums" 182
        "Hashing passwords" 184
        "Deriving encryption keys" 186
    "Symmetric encryption" 187
        "Encrypting and decrypting messages with AES" 187
    "Asymmetric and hybrid cryptography" 193
        "Encrypting and decrypting short messages with RSA" 193
        "Hybrid encryption with RSA and AES" 195
        "Using elliptic curves for ECDH key agreements and ECIES hybrid encryption" 197
    "Digital signatures" 202
        "Digital signatures with the WebCrypto APIs" 202
        "Calculating and verifying RSA signatures" 203
        "Calculating and verifying ECDSA signatures" 205
    "Summary" 207
"Index" 208
"About Packt" 216
"Other Books You May Enjoy" 217