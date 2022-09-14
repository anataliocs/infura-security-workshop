# ETH Shanghai 2022 workshop

We are going to demonstrate common security vulnerabilities by live hacking a deployed smart contract.  We will use Re-entrancy vulnerabilities to steal money from a contract and then go over how to prevent these attacks in your smart contracts. 

Clone this repository by running:

```
$ git clone git@github.com:anataliocs/ethshanghai2022-security-workshop.git
```

## To deploy to your local Ganache instance:

```
truffle compile
```

Then execute:

```
truffle migrate
```

Start up the Truffle Dashboard:

```
truffle dashboard
```

## Execute the attacking contract:

Open up the truffle Console:
```
truffle console
```

Get the deployed attack contract:
```
let attacker = await Attacker.deployed()
```

Get the deployed Etherbank contract:
```
let etherbank = await Etherbank.deployed()
```

Create a deposit for the attack on the Etherbank contract:
```
etherbank.initialDeposit(attacker.address)
```

Attack the Etherbank contract:
```
attacker.attack()
```

Get the new balance of the Attack contract:
```
let balance = await web3.eth.getBalance(attacker.address)
```