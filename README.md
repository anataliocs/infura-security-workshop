# Infura Smart Contract Security Workshop

We are going to demonstrate common security vulnerabilities by live hacking a deployed smart contract.  
We will use Re-entrancy vulnerabilities to steal money from a contract and then go over how to prevent these attacks in your smart contracts. 

Clone this repository by running:

```
$ git clone git@github.com:anataliocs/infura-security-workshop.git
```

### Explanation of the Attacker Contract
<iframe src="https://quizlet.com/830167477/match/embed?i=5cize0&x=1jj1" height="500" width="100%" style="border:0"></iframe>

### Config

Basic Setup:

- [NodeJS](https://nodejs.org/en/) version 16 or above
- [Visual Studio Code](https://code.visualstudio.com/)
- [Git Bash](https://git-scm.com/downloads)
- [Bash on VS Code](https://www.shanebart.com/set-default-vscode-terminal/)

Install Ganache CLI:

Check out the repo for more info: https://github.com/trufflesuite/ganache

```
npm install ganache --global
```

Set up env vars:

```bash
npm i dotenv
```

Add the local env config:

```
touch .env
```


```text
MNEMONIC=[YOUR GANACHE MNEMONIC]

CONTRACT_ADDRESS_ATTACKER=[DEPLOYED ATTACKER CONTRACT]
CONTRACT_ADDRESS_ETHER_BANK=[DEPLOYED ETHERBANK CONTRACT]
```

## Module 1: Re-entrancy

This module allows you to reproduce a re-entrancy attack.

```
cd reentrancy-example
```

### To deploy to your local Ganache instance:

In a new console tab run:

```
ganache
```

```
truffle compile
```

Then execute:

```
truffle migrate
```

### Execute the attacking contract:

Run the following script

```bash
npx truffle exec scripts/attack.js 
```

## Module 2 Oracle Manipulation


We will demonstrate Oracle Manipulation of a spot price feed.

### Run a local Chainlink Node

Create the directories for the Chainlink Database and the Chainlink Node:

```
mkdir -p chainlink/db
mkdir -p chainlink/chainlink_rinkeby
```

Create the container for the PostgreSQL database

`docker run --name postgres-chainlink -v $HOME/chainlink/db:/var/lib/postgresql/data -e POSTGRES_PASSWORD=myPostgresPW -d -p 5432:5432 postgres:11.12`

Create the chainlink Postgres user in postgres database container:

`docker exec -it postgres-chainlink psql -U postgres -c "CREATE USER chainlink WITH PASSWORD 'ChainlinkCONSENSYS123@@@';"`

Create the Chainlink Database (for the Rinkeby test-network in this sample)

`docker exec -it postgres-chainlink psql -U postgres -c "CREATE DATABASE "chainlink_rinkeby";"`

Grant the provilieges to the chainlink user

`docker exec -it postgres-chainlink psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE "chainlink_rinkeby" TO chainlink;"`

Create the .env file for the chainlink node and refer to the required Ethereum network and to our new Postgres Database

`vi chainlink/chainlink_rinkeby/.env`

and enter

```
ROOT=/chainlink
LOG_LEVEL=debug
ETH_CHAIN_ID=4
MIN_OUTGOING_CONFIRMATIONS=2
LINK_CONTRACT_ADDRESS=0x01BE23585060835E02B77ef475b0Cc51aA1e0709
CHAINLINK_TLS_PORT=0
SECURE_COOKIES=false
GAS_UPDATER_ENABLED=true
ALLOW_ORIGINS=*
ETH_URL=wss://rinkeby.infura.io/ws/v3/<YOUR_INFURA_PROJECT_ID>
DATABASE_URL=postgresql://chainlink:ChainlinkCONSENSYS123@@@@localhost:5432/chainlink_rinkeby?sslmode=disable
```

Create the .password file which holds the password for your node wallet
vi chainlink/chainlink_rinkeby/.password

```
ChainlinkCONSENSYS123@@@
```

Create the .api file which holds the credentials for the GUI interface of the node
```
vi chainlink/chainlink_rinkeby/.api
```
and enter your email address and password. This password must be 8 to 50 characters.

```
<YOUR_EMAIL_ADDRESS>
<YOUR_NODE_GUI_PASSWORD>
```

Now we can create the container for the chainlink node itself
```
docker run -p 127.0.0.1:6688:6688 --name chainlink_rinkeby --network=host -v $HOME/chainlink/chainlink_rinkeby:/chainlink -it --env-file=$HOME/chainlink/chainlink_rinkeby/.env smartcontract/chainlink:0.10.8 local n -p /chainlink/.password -a /chainlink/.api
```

Login to Chainlink node

`docker exec -it chainlink_rinkeby chainlink admin login`

Create new Job on node

`chainlink jobs create a.toml`





