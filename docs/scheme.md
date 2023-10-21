# Payto Scheme

## Specification: PAYTO Uniform Resource Identifier (URI) Scheme

This memo introduces an interim URI scheme for resources that identify a payment recipient. Typically, these resources are resolved by making a payment to the designated recipient. However, resolution can also encompass non-financial operations, such as sending a message to the recipient. This interpretation expands on [RFC 8905][RFC8905].

## PAYTO URI Scheme

### Introduction

The PAYTO URI scheme designates the recipient of a payment. The resource designated by this URI is the recipient itself. Typically, when a PAYTO URI is "dereferenced" (used within a context that expects a URI to provide a representation of the resource it identifies), a payment is made to the designated recipient.

### Scheme Syntax

This document defines the 'payto' [Uniform Resource Identifier (URI)][RFC3986] scheme to designate transfer form data for payments.

The general syntax is:

```txt
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

### Operations

The primary operation on a PAYTO URI is its resolution. This is typically accomplished by making a payment to the designated recipient.

## Scheme

### ICAN

In the ICAN (International Crypto Asset Network), the 'payto' scheme is employed. Typically, the address is a cryptocurrency wallet address, and the amount indicates the number of crypto coins to be sent, separated by ':'. The network field specifies the blockchain for the transaction.

Example:

```txt
payto://xcb/cb00…?amount=CTN:3.14
```

This example signals a request to pay 3.14 CTN tokens to the address `cb00…` on the XCB (Core Blockchain) network.

Additional parameters for ICAN:

- Instead of `amount`, you can use `fiat` to indicate the use of Fiat (government-issued money) as the value.

Example:

```txt
payto://xcb/cb00…?fiat=USD:50
```

- Implement the `dl` parameter to set an expiration time for the transaction, expressed in the local timezone and converted to a UNIX timestamp in seconds.

Example:

```txt
payto://xcb/cb00…?amount=CTN:3.14&dl=1677312123
```

- Include the `rc` parameter to set up recurring payments. The accepted values are `y` for yearly, `m` for monthly, `d` for daily. If `d` is prefixed with a number between `2-365`, it indicates the recurrence every "number" of days. Due to varying month lengths, if a chosen day doesn't exist in a subsequent month, the payment will execute on the last day of that month.

Example:

```txt
payto://xcb/cb00…?amount=CTN:3.14&rc=d15
```

### IBAN

The IBAN (International Bank Account Number) scheme identifies individual bank accounts for cross-border transactions. Although primarily used in Europe, it's also recognized in several countries globally.

Example:

```txt
payto://iban/DE12500105170648489890?amount=EUR:12.34
```

This example signifies a request to pay 12.34 Euros to the bank account with IBAN `DE12500105170648489890`.

For IBAN, the functionality for recurring payments is the same as in ICAN. For instance:

```txt
payto://iban/DE12500105170648489890?amount=EUR:12.34&rc=m
```

This suggests a monthly recurring payment of 12.34 Euros to the specified IBAN.

### UPI

UPI (Unified Payments Interface) facilitates instant, real-time bank-to-bank transactions in India, covering peer-to-peer, remittances, and merchant transactions.

Example:

```txt
payto://upi/user@email.tld?amount=CHF:100.00
```

This sample indicates a request to pay 100 Swiss Francs to the UPI address `user@email.tld`.

### ACH

The ACH (Automated Clearing House) scheme manages direct deposits, payrolls, vendor payments, and tax refunds in the United States.

Example:

```txt
payto://ach/325070760?amount=USD:100.00
```

This demonstrates a request to transfer 100 U.S. Dollars to ACH account `325070760`.

### BIC

BIC (Bank Identifier Code) uniquely identifies banks and is essential for international wire transfers.

Example:

```txt
payto://bic/DEUTDEFF?amount=EUR:100.00
```

This sample illustrates a request to pay 100 Euros to the bank identified by the BIC `DEUTDEFF`.

### CASH

Commonly referred to as the CASH scheme, the VOID scheme, as defined in the RFC, indicates an intention to substitute the usual CASH payment with a crypto transaction. Parameters like 'loc' (geolocation) and 'message' (notes) further specify use-cases.

Example:

```txt
payto://void/geo?loc=38.874185841103774:-77.02689966680398&message=Note1&amount=USD:3.14
```

This denotes an expectation of a CASH payment, provides a location, a note, and suggests an amount in U.S. Dollars.

### Security Considerations

Always validate the authenticity and correctness of PAYTO URIs. Due to the irreversible nature of crypto asset transactions, users should confirm both the recipient's address and the amount before initiating a transfer.

### Normative References

[RFC3986]: https://www.rfc-editor.org/rfc/rfc3986 (Berners-Lee, T., Fielding, R., and L. Masinter, "Uniform Resource Identifier URI: Generic Syntax", STD 66, RFC 3986, DOI 10.17487/RFC3986, January 2005.)

RFC3986: (Berners-Lee, T., Fielding, R., and L. Masinter, "Uniform Resource Identifier URI: Generic Syntax", STD 66, RFC 3986, DOI 10.17487/RFC3986, January 2005.)

[RFC8905]: https://www.rfc-editor.org/rfc/rfc8905 (Thaler, D., "The 'payto' URI Scheme for Payments", RFC 8905, DOI 10.17487/RFC8905, October 2020.)

RFC8905: (Thaler, D.), "The 'payto' URI Scheme for Payments", RFC
