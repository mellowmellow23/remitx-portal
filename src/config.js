import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "wagmi/chains";
import { http, custom } from "wagmi";
import { injected } from "@wagmi/connectors";

export const config = getDefaultConfig({
  appName: "RemitX Portal",
  projectId: "40743824a33e49955000d3d7823fa671",
  chains: [sepolia],
  connectors: [injected()],
  transports: {
    [sepolia.id]: custom(window.ethereum),
  },
  ssr: false,
});

export const REMITX_ADDRESS = "0x04704a2d38378Cc084AF2604d7211C531b71163b";

export const REMITX_ABI = [
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "totalSupply",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "transfer",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
  {
    name: "redeemForDiscount",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "amount", type: "uint256" }],
    outputs: [],
  },
  {
    name: "DiscountRedeemed",
    type: "event",
    inputs: [
      { name: "user", type: "address", indexed: true },
      { name: "amount", type: "uint256", indexed: false },
    ],
  },
];
