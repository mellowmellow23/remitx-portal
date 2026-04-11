# RemitX Portal

A Web3 dApp frontend for the RemitX Token (RMX) — a cross-border remittance reward token deployed on Sepolia testnet.

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![Network](https://img.shields.io/badge/network-Sepolia-blue)
![Stack](https://img.shields.io/badge/stack-React%20%2B%20wagmi%20%2B%20viem-purple)

---

## What it does

- Connects to MetaMask and any EVM wallet via RainbowKit
- Displays your live RMX token balance from the Sepolia blockchain
- Shows total supply and tokenomics in real time
- Send RMX tokens to any wallet address
- Burn RMX tokens to redeem transfer fee discounts
- Transaction confirmations with live Etherscan links

---

## Tech stack

| Tool | Role |
|---|---|
| React 18 + Vite | Frontend framework and build tool |
| wagmi v2 | Ethereum hooks for React |
| viem v2 | Ethereum utility library |
| RainbowKit v2 | Wallet connection UI |
| TanStack Query v5 | Async state management |
| react-hot-toast | Transaction notifications |

---

## Smart contract

This dApp connects to the RemitX Token smart contract:

| | |
|---|---|
| Network | Sepolia Testnet |
| Contract address | `0x04704a2d38378Cc084AF2604d7211C531b71163b` |
| Verified source | [View on Etherscan](https://sepolia.etherscan.io/address/0x04704a2d38378Cc084AF2604d7211C531b71163b) |
| Contract repo | [remitx-token](https://github.com/mellowmellow23/remitx-token) |

---

## How to run locally

**Prerequisites:** Node.js 18+, MetaMask browser extension, Sepolia testnet wallet.

```bash
# 1. Clone the repo
git clone https://github.com/mellowmellow23/remitx-portal.git
cd remitx-portal

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Start the dev server
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Live demo

Deployed on Vercel — [remitx-portal.vercel.app](https://remitx-portal.vercel.app)

---

## Repo structure
---

## License

MIT
# RemitX Portal
