import { Toaster } from "react-hot-toast";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useReadContract } from "wagmi";
import { formatEther } from "viem";
import { REMITX_ADDRESS, REMITX_ABI } from "./config";
import Dashboard from "./components/Dashboard";
import Debug from "./Debug";
import "./App.css";

function App() {
  const { isConnected } = useAccount();

  // Fetch Live Total Supply to calculate burn
  const { data: totalSupply } = useReadContract({
    address: REMITX_ADDRESS,
    abi: REMITX_ABI,
    functionName: "totalSupply",
  });

  const INITIAL_CAP = 50000000;
  const currentSupply = totalSupply ? Number(formatEther(totalSupply)) : 0;
  const burnedTokens = INITIAL_CAP - currentSupply;

  return (
    <div className="app" style={{ height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', backgroundColor: '#050505', color: '#F0F0EF', fontFamily: '"Inter", -apple-system, sans-serif' }}>
      
      <header className="header" style={{ flexShrink: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 3rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="header-left" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img src="/images/rmx-icon.png" alt="X" style={{ width: '56px', height: '56px', objectFit: 'contain' }} />
          <span className="logo" style={{ fontSize: '26px', fontWeight: '800', letterSpacing: '-0.5px' }}>RemitX</span>
        </div>
        <nav style={{ display: 'flex', gap: '2.5rem', fontSize: '15px', fontWeight: '600', letterSpacing: '0.5px' }}>
          <a href="#" style={{ color: '#F0F0EF', textDecoration: 'none', opacity: 0.8 }}>Home</a>
          <a href="#" style={{ color: '#F0F0EF', textDecoration: 'none', opacity: 0.5 }}>Security</a>
          <a href="#" style={{ color: '#F0F0EF', textDecoration: 'none', opacity: 0.5 }}>Whitepaper</a>
        </nav>
        <ConnectButton label="Connect Wallet" accountStatus="address" chainStatus="none" />
      </header>

      <main className="main" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '1rem 2rem', overflowY: 'auto' }}>
        
        <div className="hero text-center" style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '56px', fontWeight: '900', marginBottom: '1rem', lineHeight: '1.1', letterSpacing: '-1.5px' }}>
            Remittance <span style={{ color: '#8CF40E' }}>Reimagined.</span>
          </h1>
        </div>

        {/* --- TOKENOMICS HUB --- */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 180px)', gap: '2rem', marginBottom: '3rem', textAlign: 'center' }}>
          <div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>Market Cap</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#8CF40E' }}>$50.0M</div>
          </div>
          <div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>Current Supply</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{currentSupply.toLocaleString()} RMX</div>
          </div>
          <div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Burned</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#ff4444' }}>{burnedTokens.toLocaleString()} RMX</div>
          </div>
        </div>

        {!isConnected ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
             <div style={{ filter: 'drop-shadow(0 0 60px rgba(140,244,14,0.4))', marginBottom: '3rem' }}>
               <img src="/images/rmx-icon.png" alt="RMX Vault" style={{ width: '180px', height: '180px', objectFit: 'contain' }} />
             </div>
             <ConnectButton label="Connect to View Vault" />
          </div>
        ) : (
          <div style={{ width: '100%', maxWidth: '600px' }}>
            <Dashboard />
          </div>
        )}
      </main>

      <footer style={{ flexShrink: 0, display: 'flex', justifyContent: 'center', gap: '5rem', padding: '2rem 2rem', borderTop: '1px solid rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          <div><div style={{ color: 'white', fontWeight: '600' }}>Verified on Sepolia</div></div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0110 0v4"></path></svg>
          <div><div style={{ color: 'white', fontWeight: '600' }}>Decentralized Burns</div></div>
        </div>
      </footer>
          <Toaster position="bottom-right" toastOptions={{ style: { background: "#0F172A", color: "#fff", border: "1px solid rgba(140,244,14,0.3)" } }} />
      <Debug />
</div>
  );
}

export default App;
