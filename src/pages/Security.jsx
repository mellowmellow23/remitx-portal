import { useNavigate } from "react-router-dom";

const tests = [
  { name: "test_InitialSupplyIsZero", category: "Unit", gas: "7,922", status: "pass" },
  { name: "test_OwnerCanMint", category: "Unit", gas: "66,233", status: "pass" },
  { name: "test_MintCannotExceedMaxSupply", category: "Unit", gas: "69,410", status: "pass" },
  { name: "test_MintRevertsOnZeroAddress", category: "Unit", gas: "14,327", status: "pass" },
  { name: "test_MintRevertsOnZeroAmount", category: "Unit", gas: "16,462", status: "pass" },
  { name: "test_NonOwnerCannotMint", category: "Unit", gas: "15,342", status: "pass" },
  { name: "test_UserCanBurn", category: "Unit", gas: "75,618", status: "pass" },
  { name: "test_RedeemRevertsOnZeroAmount", category: "Unit", gas: "65,514", status: "pass" },
  { name: "test_RedeemRevertsOnInsufficientBalance", category: "Unit", gas: "67,499", status: "pass" },
  { name: "test_RenounceOwnershipReverts", category: "Unit", gas: "11,092", status: "pass" },
  { name: "test_OwnershipTransfer", category: "Unit", gas: "78,180", status: "pass" },
  { name: "test_PermitWorks", category: "Unit", gas: "77,099", status: "pass" },
  { name: "test_PermitExpiredDeadlineReverts", category: "Unit", gas: "26,382", status: "pass" },
  { name: "test_PermitReplayAttackFails", category: "Unit", gas: "87,514", status: "pass" },
  { name: "testFuzz_MintRespectsSupplyCap", category: "Fuzz", gas: "256 runs", status: "pass" },
  { name: "testFuzz_UserCanAlwaysBurnFullBalance", category: "Fuzz", gas: "256 runs", status: "pass" },
  { name: "testFuzz_PartialBurnLeavesCorrectBalance", category: "Fuzz", gas: "256 runs", status: "pass" },
  { name: "testFuzz_MintToAnyValidAddress", category: "Fuzz", gas: "256 runs", status: "pass" },
];

const properties = [
  { title: "Supply cap enforced", desc: "totalSupply can never exceed 50,000,000 RMX under any input. Proven via fuzz testing across 256 random mint amounts." },
  { title: "Replay attack prevention", desc: "EIP-2612 nonces are consumed on first use. A stale signature always reverts with ERC2612InvalidSigner." },
  { title: "Permit expiry enforced", desc: "Permits with expired deadlines always revert with ERC2612ExpiredSignature. Tested with vm.warp()." },
  { title: "Ownership cannot be renounced", desc: "renounceOwnership() is permanently disabled to prevent accidental mint function lockout." },
  { title: "Zero-address protection", desc: "Minting to address(0) is explicitly blocked before _mint is ever called." },
  { title: "Zero-amount protection", desc: "Both mint() and redeemForDiscount() reject zero amounts to prevent gas waste and misleading events." },
];

export default function Security() {
  const navigate = useNavigate();
  const unitTests = tests.filter(t => t.category === "Unit");
  const fuzzTests = tests.filter(t => t.category === "Fuzz");

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#050505", color: "#F0F0EF", fontFamily: '"Inter", -apple-system, sans-serif', padding: "0 0 4rem" }}>

      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.5rem 3rem", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", cursor: "pointer" }} onClick={() => navigate("/")}>
          <img src="/images/rmx-icon.png" alt="RMX" style={{ width: "48px", height: "48px", objectFit: "contain" }} />
          <span style={{ fontSize: "22px", fontWeight: "800" }}>RemitX</span>
        </div>
        <nav style={{ display: "flex", gap: "2.5rem", fontSize: "15px", fontWeight: "600" }}>
          <span onClick={() => navigate("/")} style={{ cursor: "pointer", opacity: 0.5 }}>Home</span>
          <span style={{ color: "#8CF40E" }}>Security</span>
          <span onClick={() => navigate("/whitepaper")} style={{ cursor: "pointer", opacity: 0.5 }}>Whitepaper</span>
        </nav>
      </header>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "3rem 2rem" }}>

        <div style={{ marginBottom: "3rem" }}>
          <div style={{ fontSize: "12px", color: "#8CF40E", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Security audit</div>
          <h1 style={{ fontSize: "42px", fontWeight: "900", letterSpacing: "-1px", marginBottom: "1rem" }}>18 / 18 tests passing</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "16px", lineHeight: "1.7", maxWidth: "600px" }}>
            RemitToken was built test-first using Foundry. Every function, revert case, and security property is covered by unit tests and property-based fuzz tests.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "3rem" }}>
          {[
            { label: "Total tests", value: "18", color: "#8CF40E" },
            { label: "Unit tests", value: "14", color: "#fff" },
            { label: "Fuzz tests", value: "4", color: "#fff" },
            { label: "Fuzz runs each", value: "256", color: "#fff" },
            { label: "Tests failed", value: "0", color: "#ff4444" },
            { label: "Coverage", value: "100%", color: "#8CF40E" },
          ].map((s, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "1.25rem" }}>
              <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "6px" }}>{s.label}</div>
              <div style={{ fontSize: "24px", fontWeight: "700", color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "1.25rem" }}>Security properties proven</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {properties.map((p, i) => (
              <div key={i} style={{ background: "rgba(140,244,14,0.04)", border: "1px solid rgba(140,244,14,0.15)", borderRadius: "12px", padding: "1.25rem 1.5rem", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#8CF40E", flexShrink: 0, marginTop: "6px" }} />
                <div>
                  <div style={{ fontWeight: "600", marginBottom: "4px" }}>{p.title}</div>
                  <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: "1.6" }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "1.25rem" }}>Unit tests — 14 passing</h2>
          <div style={{ border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", overflow: "hidden" }}>
            {unitTests.map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.9rem 1.25rem", borderBottom: i < unitTests.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent" }}>
                <span style={{ fontFamily: "monospace", fontSize: "13px", color: "rgba(255,255,255,0.8)" }}>{t.name}</span>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>gas: {t.gas}</span>
                  <span style={{ fontSize: "11px", background: "rgba(140,244,14,0.1)", color: "#8CF40E", padding: "2px 10px", borderRadius: "20px", border: "1px solid rgba(140,244,14,0.2)" }}>PASS</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "1.25rem" }}>Fuzz tests — 4 passing</h2>
          <div style={{ border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", overflow: "hidden" }}>
            {fuzzTests.map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.9rem 1.25rem", borderBottom: i < fuzzTests.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent" }}>
                <span style={{ fontFamily: "monospace", fontSize: "13px", color: "rgba(255,255,255,0.8)" }}>{t.name}</span>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>{t.gas}</span>
                  <span style={{ fontSize: "11px", background: "rgba(140,244,14,0.1)", color: "#8CF40E", padding: "2px 10px", borderRadius: "20px", border: "1px solid rgba(140,244,14,0.2)" }}>PASS</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a href="https://github.com/mellowmellow23/remitx-token" target="_blank" rel="noreferrer" style={{ padding: "12px 24px", background: "rgba(140,244,14,0.1)", border: "1px solid rgba(140,244,14,0.3)", borderRadius: "8px", color: "#8CF40E", fontWeight: "600", fontSize: "14px", textDecoration: "none" }}>
            View on GitHub
          </a>
          <a href="https://sepolia.etherscan.io/address/0x04704a2d38378Cc084AF2604d7211C531b71163b" target="_blank" rel="noreferrer" style={{ padding: "12px 24px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "rgba(255,255,255,0.7)", fontWeight: "600", fontSize: "14px", textDecoration: "none" }}>
            View on Etherscan
          </a>
        </div>

      </div>
    </div>
  );
}
