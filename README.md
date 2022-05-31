# Jr. Multisig Wallet

[**Netlify Link**](https://emark-multisig-wallet.netlify.app/)

- Metamask must be installed.
- You cannot create and approve transfers.

## Local Run

- Install [Metamask](https://metamask.io/download/)

- Install [NodeJs & Npm](https://nodejs.org/en/download/)

- Install dependencies

```
npm install
cd ./client
npm install
```

- Install [Truffle](https://trufflesuite.com/tutorial/) 

```
npm install -g truffle
```

- Install [Ganache](https://trufflesuite.com/ganache/)

- Configure network settings to be compatible with the ganache network in truffle-config.js file

- Deploy the  contract 

```
truffle migrate --reset --network <YOUR_NETWORK_NAME>
```

- Run the frontend project (client)

```
cd ./client
npm start
```

- Login Metamask

***NOTE:*** *To be able to create and approve transfers, you have to login to Metamask with the account you deployed the contract*

![image](https://user-images.githubusercontent.com/6010645/171263808-95ddbc11-2ce4-44bc-ae90-4af187a11755.png)

