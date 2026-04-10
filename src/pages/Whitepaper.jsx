import { useNavigate } from "react-router-dom";

const sections = [
  {
    number: "01",
    title: "The problem",
    content: "Global remittance fees cost migrants and their families over $40 billion annually. Traditional financial rails charge between 2% and 8% per transfer, with fees hitting hardest on the smallest transfers sent to developing nations in Africa, Latin America, and Southeast Asia. There is no transparent, automated mechanism to reward loyal users or offset these costs."
  },
  {
    number: "02",
    title: "The solution",
    content: "RemitX Token (RMX) is an ERC-20 reward token deployed on Ethereum. When a remittance transfer is confirmed, the platform mints RMX tokens to the sender as cashback. Those tokens can be burned at any time to claim a fee discount on the next transfer. The entire reward and redemption lifecycle is enforced on-chain — transparent, auditable, and permissionless."
  },
  {
    number: "03",
    title: "Token mechanics",
    content: "RMX has a hard-coded maximum supply of 50,000,000 tokens (18 decimals, per EIP-20). Only the platform owner (a trusted transfer agent) can mint tokens, and only up to the cap. Token holders can burn their RMX at any time by calling redeemForDiscount(), which permanently removes tokens from circulation and emits a DiscountRedeemed event the platform backend indexes to trigger the fee reduction."
  },
  {
    number: "04",
    title: "Gasless approvals (EIP-2612)",
    content: "RMX implements EIP-2612 permit() signatures, allowing users to approve token transfers without paying ETH gas for an on-chain approval transaction. A user signs a message off-chain with their wallet, and the platform submits the permit on their behalf. This significantly improves UX for users in developing regions who may not hold ETH for gas."
  },
  {
    number: "05",
    title: "Tokenomics",
    content: "Max supply is capped at 50 million RMX. Tokens are minted only when real remittances are confirmed — there is no pre-mine or team allocation in this proof-of-concept. Every token burned via redeemForDiscount() is permanently removed, creating deflationary pressure over time as usage grows. The supply cap ensures the platform owner cannot inflate rewards arbitrarily."
  },
  {
    number: "06",
    title: "Security model",
    content: "The contract uses OpenZeppelin v5 as its base implementation. Access control is enforced via Ownable — only the owner can mint. The contract was built test-first using Foundry with 18 passing tests including property-based fuzz tests that prove the supply cap and burn accounting hold under any random input. Ownership renouncement is permanently disabled to prevent accidental lockout of the mint function."
  },
  {
    number: "07",
    title: "Technical stack",
    content: "Smart contract: Solidity 0.8.20, OpenZeppelin Contracts v5, Foundry. Frontend: React 18, wagmi v2, viem v2, RainbowKit v2. Deployed on Sepolia testnet with verified source code on Etherscan. The dApp is hosted on Vercel and connects to the contract via Alchemy RPC."
  },
  {
    number: "08",
    title: "Roadmap",
    content: "Phase 1 (complete): ERC-20 token with mint, burn, and EIP-2612 permit. Phase 2: Staking contract allowing RMX holders to lock tokens and earn yield from platform fees. Phase 3: DAO governance — token holders vote on fee discount rates and reward amounts. Phase 4: Mainnet deployment with integration into a live remittance API."
  },
];

export default function Whitepaper() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#050505", color: "#F0F0EF", fontFamily: '"Inter", -apple-system, sans-serif', padding: "0 0 6rem" }}>

      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.5rem 3rem", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", cursor: "pointer" }} onClick={() => navigate("/")}>
          <img src="/images/rmx-icon.png" alt="RMX" style={{ width: "48px", height: "48px", objectFit: "contain" }} />
          <span style={{ fontSize: "22px", fontWeight: "800" }}>RemitX</span>
        </div>
        <nav style={{ display: "flex", gap: "2.5rem", fontSize: "15px", fontWeight: "600" }}>
          <span onClick={() => navigate("/")} style={{ cursor: "pointer", opacity: 0.5 }}>Home</span>
          <span onClick={() => navigate("/security")} style={{ cursor: "pointer", opacity: 0.5 }}>Security</span>
          <span style={{ color: "#8CF40E" }}>Whitepaper</span>
        </nav>
      </header>

      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "3rem 2rem" }}>

        <div style={{ marginBottom: "4rem" }}>
          <div style={{ fontSize: "12px", color: "#8CF40E", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Technical whitepaper</div>
          <h1 style={{ fontSize: "42px", fontWeight: "900", letterSpacing: "-1px", marginBottom: "1rem" }}>RemitX Token (RMX)</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "15px" }}>Version 1.0 — Sepolia Proof of Concept</p>
          <div style={{ marginTop: "1.5rem", padding: "1rem 1.5rem", background: "rgba(140,244,14,0.05)", border: "1px solid rgba(140,244,14,0.15)", borderRadius: "10px", fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: "1.7" }}>
            Contract: <a href="https://sepolia.etherscan.io/address/0x04704a2d38378Cc084AF2604d7211C531b71163b" target="_blank" rel="noreferrer" style={{ color: "#8CF40E", textDecoration: "none" }}>0x04704a2d38378Cc084AF2604d7211C531b71163b</a> — Sepolia Testnet
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          {sections.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: "2rem" }}>
              <div style={{ fontSize: "13px", fontWeight: "700", color: "rgba(140,244,14,0.4)", fontFamily: "monospace", minWidth: "28px", paddingTop: "4px" }}>{s.number}</div>
              <div>
                <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "0.75rem", letterSpacing: "-0.3px" }}>{s.title}</h2>
                <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)", lineHeight: "1.8" }}>{s.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a href="https://github.com/mellowmellow23/remitx-token" target="_blank" rel="noreferrer" style={{ padding: "12px 24px", background: "rgba(140,244,14,0.1)", border: "1px solid rgba(140,244,14,0.3)", borderRadius: "8px", color: "#8CF40E", fontWeight: "600", fontSize: "14px", textDecoration: "none" }}>
            View contract on GitHub
          </a>
          <a href="https://remitx-portal.vercel.app" target="_blank" rel="noreferrer" style={{ padding: "12px 24px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "rgba(255,255,255,0.7)", fontWeight: "600", fontSize: "14px", textDecoration: "none" }}>
            Open live dApp
          </a>
        </div>

      </div>
    </div>
  );
}
