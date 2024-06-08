- [Part 1 – Getting Started](#part-1--getting-started)
  - [Chapter 1: Cryptography for Developers](#chapter-1-cryptography-for-developers)
  - [Chapter 2: Dealing with Binary and Random Data](#chapter-2-dealing-with-binary-and-random-data)
- [Part 2 – Using Common Cryptographic Operations with Node.js](#part-2--using-common-cryptographic-operations-with-nodejs)
  - [Chapter 3: File and Password Hashing with Node.js](#chapter-3-file-and-password-hashing-with-nodejs)
  - [Chapter 4: Symmetric Encryption in Node.js](#chapter-4-symmetric-encryption-in-nodejs)
  - [Chapter 5: Using Asymmetric and Hybrid Encryption in Node.js](#chapter-5-using-asymmetric-and-hybrid-encryption-in-nodejs)
  - [Chapter 6: Digital Signatures with Node.js and Trust](#chapter-6-digital-signatures-with-nodejs-and-trust)
- [Part 3 – Cryptography in the Browser](#part-3--cryptography-in-the-browser)
  - [Chapter 7: Introduction to Cryptography in the Browser](#chapter-7-introduction-to-cryptography-in-the-browser)
  - [Chapter 8: Performing Common Cryptographic Operations in the Browser](#chapter-8-performing-common-cryptographic-operations-in-the-browser)


# Part 1 – Getting Started
## Chapter 1: Cryptography for Developers

- [x] What is cryptography and why should a developer care?
- [x] Protecting secrets…
- [x] …and the other uses of modern cryptography 
- [x] Why this matters to developers
- [x] What this book is about – and what it's not 
- [x] Rules of engagement
- [x] Defining safe 
- [x] Types and layers of encryption 

## Chapter 2: Dealing with Binary and Random Data

- [x] Encoding and representing binary data
- [x] A brief word on character encodings and why we encode binary data
- [x] Buffers in Node.js

There are multiple ways to create a Buffer object in Node.js. The two most important
ones for now are the following:

- Buffer.alloc(size), which allows the creation of an empty buffer of size
bytes, by default all 0s:

```
const buf = Buffer.alloc(3)
console.log(buf)
// -> <Buffer 00 00 00>
```

- Buffer.from(*) creates a Buffer object from a variety of sources, including
arrays and ArrayBuffer objects, other Buffer objects, and, most importantly
for us, strings.

- When creating a buffer from a string, you can specify two arguments: `Buffer.
from(string, encoding)` where encoding is optional and defaults to `'utf8'`

- Once created, Buffer objects contain a variety of properties and methods, some of
which we'll encounter throughout this book. For now, it's worth highlighting two of them:

    - `buf.toString(encoding)` is a method that returns the string representation of
the buffer in the specified encoding (which defaults to 'utf8' if not set); see this, for example:
    ```
    const buf = Buffer.from('Hello world!', 'utf8')
    console.log(buf.toString('utf8'))
    // -> 'Hello world!'
    ```
    - In the preceding code, `buf.toString('utf8')` would have been identical to
`buf.toString()`.
    - `buf.length` is a property that contains the length of the buffer, in bytes; see this, for example:
    ```
    const buf = Buffer.from('Hello world!', 'utf8')
    console.log(buf.length)
    // -> 12
    ```

- [x] Hex encoding (HEX ↔️ STRING)

    ```
    const buf = Buffer.from('48656C6C6F20776F726C6421', 'hex')
    console.log(buf.toString('utf8'))
    // -> 'Hello world!'
    ```

    ```
    const buf = Buffer.from('Hi, Buffer!', 'utf8')
    console.log(buf.toString('hex'))
    // -> '48692c2042756666657221
    ```
  - Many programming languages, JavaScript included, allow you to write numbers in your code directly using their hexadecimal notation by adding the 0x prefix. For example, the following

    `console.log(0xB4 === 180) // -> true`


  - ___hex encoding is highly inefficient in terms of storage requirements, as it doubles the size of our data___, it is often used during  development as it has three interesting properties 
    -  length of the original data is always exactly half the length of the hex-encoded string
    -  Each byte is represented by exactly two characters, and it's possible to convert them to decimal with a quick multiplication and addition
    -  If the data you've encoded is plain text, each sequence of two hex-encoded characters can map directly to a symbol in the ASCII table. 

- [x] Base64
  -  ___"Base64 standard encoding,"___ as defined by RFC 4648 Section 4, uses the following 64 symbols `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234
56789+/`

    -  ___"Base64 URL encoding,"___ as defined by RFC 4648 Section 5, uses the following 64 symbols: `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234
56789-_`

    - unlike hex, these are case-sensitive

    - In fact, many web applications prefer to use the second format because the characters + and / are not URL-safe, so they have to be encoded when used in a URL with the usual percentage encoding, becoming %2B and %2F, respectively. Instead, - and _ are URL-safe and do not require encoding when used in URLs. 

    -  sometimes up to 2 padding characters, =, are added to make the length of base64-encoded strings an exact multiple of 4
  
    -  The good news is that Node.js supports base64 encoding natively in the Buffer APIs, with 'base64' and 'base64url' available as values for the encoding arguments in the methods we saw previously
  
    -  ```
        const buf1 = Buffer.from('SGk=', 'base64')

        console.log(buf1.toString())
        // -> 'Hi'

        const buf2 = Buffer.from('8424bff8', 'hex')

        console.log(buf2.toString('base64'))
        // -> 'hCS/+A=='

        console.log(buf2.toString('base64url'))
        // -> 'hCS_-A'
        ```

    -  base64 is very useful because it's a more storage-efficient encoding than hex, yet it still relies entirely on printable characters in the ASCII table: encoding data using base64 generates strings that are just around 33% larger than the original binary data. Base64 is also widely supported, and it's used by data exchange formats such as JSON and XML when embedding binary data.

- [x] Generating cryptographically secure random byte sequences

    - When building applications that leverage cryptography, it's very common to have to generate random byte sequences (encryption keys, salt etc)
  
    - Node.js already includes a function to generate random data in the crypto
module: `randomBytes(size, callback)`

- [x] The importance of randomness

    - ___True Random Number Generator (TRNG)___ devices exist and are generally based on the observation of quantum effects; however, these are uncommon.

    - Instead, for most practical applications, we rely on ___Cryptographically Secure PseudoRandom Number Generators (CSPRNGs)___, which use various sources of entropy (or "noise") to generate unpredictable numbers.

    - Math.random() (which is available in Node.js too) are not cryptographically safe, and should not be used for generating random numbers or byte sequences for use in cryptographic operations.

- [x] Using crypto.randomBytes

    ```
    const crypto = require('crypto')
    const {promisify} = require('util')
    const randomBytes = promisify(crypto.randomBytes)
    ;(async function() {
    const buf = await randomBytes(32)
    console.log(buf.toString('hex'))
    })()
    ```

# Part 2 – Using Common Cryptographic Operations with Node.js

## Chapter 3: File and Password Hashing with Node.js

- [ ] Technical requirements 
- [ ] An overview of hashing functions 
- [ ] Properties of hashing functions, and how they differ from encryption 
- [ ] Uses for hashing functions 
- [ ] Calculating digests and generating identifiers 
- [ ] Hashing a short message or string 
- [ ]  Hashing large files and streams 
- [ ] How to break a hash 
- [ ] Fast hashing functions and low-entropy inputs 
- [ ] Rainbow tables 
- [ ] Hashing passwords and deriving keys 
- [ ] Argon2 
- [ ] Scrypt 
- [ ] Older hashing functions 
- [ ] Collisions

## Chapter 4: Symmetric Encryption in Node.js

- [ ] Technical requirements
- [ ] Symmetric and asymmetric encryption 
- [ ] Symmetric encryption with AES 
- [ ] Key length 
- [ ] Mode of operation 
- [ ] Initialization vector 
- [ ] Using AES with Node.js 
- [ ] Symmetric encryption with ChaCha20-Poly1305 
- [ ] Example usage with Node.js 
- [ ] When to use ChaCha20-Poly1305 or AES-GCM 
- [ ] Key derivation 
- [ ] Reusing keys 
- [ ] Wrapping keys and best practices for encrypting large documents 
- [ ] AES Key Wrap 
- [ ] Wrapping user keys

## Chapter 5: Using Asymmetric and Hybrid Encryption in Node.js

- [ ] Technical requirements
- [ ] Understanding public-key and hybrid cryptosystems 
- [ ] The need for public-key cryptography 
- [ ]  Hybrid cryptosystems 
- [ ] Loading, exporting, and encoding public and private keys 
- [ ] Encoding keys as PEM 
- [ ] Reading and exporting keys
- [ ] Using RSA with Node.js 
- [ ] Generating an RSA key pair 
- [ ] Using RSA for encryption and decryption 
- [ ] Hybrid encryption with RSA and AES 
- [ ] Key agreements with Elliptic-Curve Diffie-Hellman 
- [ ] Picking a curve 
- [ ] Generating EC key pairs 
- [ ] Diffie-Hellman key agreements and Perfect Forward Secrecy 
- [ ] Performing an ECDH key agreement 
- [ ] Data encryption with ECIES 


## Chapter 6: Digital Signatures with Node.js and Trust

- [ ] Technical requirements 
- [ ] The what, how, and why of digital signatures 
- [ ] Hashes and digital signatures 
- [ ] Properties of digital signatures 
- [ ] How digital signatures work 
- [ ] Digital signatures and encryption 
- [ ] How developers use digital signatures 
- [ ] Calculating and verifying digital signatures with Node.js 
- [ ] Using RSA 
- [ ] Using elliptic curves 
- [ ] Trust and certificates 
- [ ] The problem of trusting keys 
- [ ] Public keys and certificates 
- [ ] Public Key Infrastructure 
- [ ] Alternative approaches 

# Part 3 – Cryptography in the Browser

## Chapter 7: Introduction to Cryptography in the Browser

- [ ] Technical requirements 
- [ ] Playground 
- [ ] In Node.js 
- [ ] About cryptography in the browser – uses and challenges 
- [ ] Challenges of cryptography in the browser 
- [ ] Building browser-based apps that use cryptography 
- [ ] Binary data in the browser 
- [ ] Buffers and typed arrays in the browser
- [ ] Generating random data 
- [ ] Keys in Web Crypto 
- [ ] The CryptoKey object 
- [ ] Generating keys 
- [ ] Importing keys 
- [ ] Exporting keys 

## Chapter 8: Performing Common Cryptographic Operations in the Browser 

- [ ] Technical requirements 
- [ ] Hashing and key derivation 
- [ ] Calculating checksums 
- [ ] Hashing passwords 
- [ ] Deriving encryption keys 
- [ ] Symmetric encryption 
- [ ]  Encrypting and decrypting messages with AES 
- [ ] Asymmetric and hybrid cryptography 
- [ ]  Encrypting and decrypting short messages with RSA 
- [ ] Hybrid encryption with RSA and AES 
- [ ] Using elliptic curves for ECDH key agreements and ECIES hybrid encryption 
- [ ] Digital signatures 
- [ ]  Digital signatures with the WebCrypto APIs 
- [ ] Calculating and verifying RSA signatures
- [ ] Calculating and verifying ECDSA signatures 
