# Payto Scheme

## Specification: PAYTO Uniform Resource Identifier (URI) Scheme

This memo introduces an interim URI scheme for resources that identify a payment recipient. Typically, these resources are resolved by making a payment to the designated recipient, though resolution could also encompass non-financial operations like sending a message to the recipient. This is a broader interpretation of [RFC 8905][RFC8905].

## PAYTO URI Scheme

### 1. Introduction

The PAYTO URI scheme is designed to designate the recipient of a payment. The resource designated by such a URI is the recipient itself. When a PAYTO URI is "dereferenced" (used within a context that expects a URI to provide a representation of the resource it identifies), typically, a payment to the designated recipient is made.

### 2. Scheme Syntax

This document defines the 'payto' [Uniform Resource Identifier (URI)][RFC3986] scheme for designating transfer form data for payments.

The general syntax is as follows:
```
payto-URI = "payto://" authority path-abempty [ "?" opts ]
    opts = opt *( "&" opt )
    opt-name = generic-opt / authority-specific-opt
    opt-value = *pchar
    opt = opt-name "=" opt-value
    generic-opt = "amount" / "receiver-name" / "sender-name" /
                  "message" / "instruction"
    authority-specific-opt = ALPHA *( ALPHA / DIGIT / "-" / "." )
    authority = ALPHA *( ALPHA / DIGIT / "-" / "." )
```

### 3. Operations

The primary operation that can be performed on a PAYTO URI is the resolution. This is typically achieved by making a payment to the designated recipient.

## PAYTO URI Scheme

### 4. ICAN

In ICAN (International Crypto Asset Network), the 'payto' scheme is used. The address is typically a cryptocurrency wallet address and the amount is the number of crypto coins to be sent, divided by ':'. The network field specifies the blockchain where the transaction should occur.

Example:
```
payto://xcb/cb00…?amount=CTN:3.14
```
This example indicates a request to pay 3.14 CTN tokens to the address `cb00…` on the XCB (Core Blockchain) network.

### 5. IBAN

The IBAN (International Bank Account Number) scheme is used in the banking industry to identify individual bank accounts for transactions across national borders. It's primarily used in Europe, but also in other countries around the world.

Example:
```
payto://iban/DE12500105170648489890?amount=EUR:12.34
```
This example indicates a request to pay 12.34 Euros to the bank account with the IBAN `DE12500105170648489890`.

### 6. UPI

UPI (Unified Payments Interface) is a system for instant, real-time bank-to-bank payments. It is used in India and allows for a wide range of transactions, including peer-to-peer, remittances, and merchant transactions.

Example:
```
payto://upi/user@email.tld?amount=CHF:100.00
```
This example indicates a request to pay 100 Swiss Francs to the UPI address `user@email.tld`.

### 7. ACH

The ACH (Automated Clearing House) scheme is used for direct deposit, payroll, vendor payments, and tax refunds in the United States.

Example:
```
payto://ach/325070760?amount=USD:100.00
```
This example indicates a request to pay 100 U.S. Dollars to the ACH account `325070760`.

### 8. BIC

BIC (Bank Identifier Code) is a unique identification code for a particular bank. It is used for international wire transfers.

Example:
```
payto://bic/DEUTDEFF?amount=EUR:100.00
```
This example indicates a request to pay 100 Euros to the bank with BIC `DEUTDEFF`.

### 9. CASH

The VOID scheme, as defined in the RFC, is often referred to as the CASH scheme. When this scheme is utilized, it usually signifies that the intention is to replace the typical CASH payment with a crypto payment. Additional parameters such as 'loc' (geolocation) and 'message' (notes) can be employed to cater to specific use-cases.

Example:
```
payto://void/geo?loc=38.874185841103774:-77.02689966680398&message=Note1&amount=USD:3.14
```
This example indicates that CASH payment is expected, and provides a location and a note, as well as a suggested amount in U.S. Dollars.

### 10. Security Considerations

It's essential to validate the correctness and authenticity of PAYTO URIs. This is particularly important for crypto asset transactions due to their irreversible nature. Users must confirm the amount and recipient's address before executing a transaction.

### 11. Normative References

[RFC3986]: https://www.rfc-editor.org/rfc/rfc3986 (Berners-Lee, T., Fielding, R., and L. Masinter, "Uniform Resource Identifier URI: Generic Syntax", STD 66, RFC 3986, DOI 10.17487/RFC3986, January 2005.)

RFC3986: https://www.rfc-editor.org/rfc/rfc3986 (Berners-Lee, T., Fielding, R., and L. Masinter, "Uniform Resource Identifier URI: Generic Syntax", STD 66, RFC 3986, DOI 10.17487/RFC3986, January 2005.)

[RFC8905]: https://www.rfc-editor.org/rfc/rfc8905 (Thaler, D., "The 'payto' URI Scheme for Payments", RFC 8905, DOI 10.17487/RFC8905, October 2020.)

RFC8905: https://www.rfc-editor.org/rfc/rfc8905 (Thaler, D., "The 'payto' URI Scheme for Payments", RFC 8905, DOI 10.17487/RFC8905, October 2020.)

### 12. License

[CC0](https://creativecommons.org/share-your-work/public-domain/cc0/)
