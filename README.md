## How to use
Create .env

Create JWT private_key

 `openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048`

Create JWT public key

`openssl rsa -pubout -in private_key.pem -out public_key.pem`