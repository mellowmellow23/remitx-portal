import { useState, useEffect } from "react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { formatEther, parseEther, getAddress } from "viem";
import toast from "react-hot-toast"; // 1. Import toast
import { REMITX_ADDRESS, REMITX_ABI } from "../config";

export default function Dashboard() {
  const { address } = useAccount();
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isRedeemModalOpen, setIsRedeemModalOpen] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [redeemAmount, setRedeemAmount] = useState("");

  const checksumAddress = address ? getAddress(address) : undefined;

  const { data: balance, refetch: refetchBalance } = useReadContract({
    address: REMITX_ADDRESS,
    abi: REMITX_ABI,
    functionName: "balanceOf",
    args: [checksumAddress],
    query: { enabled: !!checksumAddress, refetchInterval: 5000 },
  });

  const { data: totalSupply, refetch: refetchSupply } = useReadContract({
    address: REMITX_ADDRESS,
    abi: REMITX_ABI,
    functionName: "totalSupply",
    query: { refetchInterval: 5000 },
  });

  const { writeContract, data: hash, isPending, error } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ 
    hash,
  });

  // Handle Toast Lifecycle for Transactions
  useEffect(() => {
    if (isPending) {
      toast.loading("Check your wallet...", { id: 'tx-status' });
    }
    if (isConfirming) {
      toast.loading("Mining transaction on Sepolia...", { id: 'tx-status' });
    }
    if (isConfirmed) {
      toast.success("Transaction Confirmed!", { id: 'tx-status' });
      refetchBalance();
      refetchSupply();
      setIsSendModalOpen(false);
      setIsRedeemModalOpen(false);
    }
    if (error) {
      toast.error(error.shortMessage || "Transaction Failed", { id: 'tx-status' });
    }
  }, [isPending, isConfirming, isConfirmed, error]);

  const handleSend = () => {
    if (!recipient || !amount) return toast.error("Please fill all fields");
    writeContract({
      address: REMITX_ADDRESS,
      abi: REMITX_ABI,
      functionName: "transfer",
      args: [recipient, parseEther(amount)],
    });
  };

  const handleRedeem = () => {
    if (!redeemAmount) return toast.error("Enter an amount");
    writeContract({
      address: REMITX_ADDRESS,
      abi: REMITX_ABI,
      functionName: "redeemForDiscount",
      args: [parseEther(redeemAmount)],
    });
  };

  const fmt = (val) => val !== undefined ? Number(formatEther(val)).toLocaleString(undefined, { maximumFractionDigits: 0 }) : "0";

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
      
      {/* THE VAULT CARD */}
      <div style={{ width: '100%', background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)', border: '1px solid rgba(140,244,14,0.4)', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 0 40px rgba(140,244,14,0.15)', backdropFilter: 'blur(20px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', marginBottom: '1.5rem', letterSpacing: '-0.5px' }}>RMX Vault</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', marginBottom: '0.5rem' }}>Balance: <span style={{ color: 'white', fontFamily: 'monospace', fontSize: '18px', marginLeft: '8px' }}>{fmt(balance)} RMX</span></p>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px' }}>Max Supply: <span style={{ color: 'white', fontFamily: 'monospace', fontSize: '18px', marginLeft: '8px' }}>{fmt(totalSupply)} RMX</span></p>
          </div>
          <div style={{ filter: 'drop-shadow(0 0 30px rgba(140,244,14,0.5))' }}>
            <img src="/images/rmx-icon.png" alt="X" style={{ width: '64px', height: '64px', objectFit: 'contain' }} />
          </div>
        </div>
        <div style={{ marginTop: '3rem', height: '80px', width: '100%', position: 'relative', zIndex: 1 }}>
          <svg viewBox="0 0 100 30" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            <path d="M0 25 C 20 20, 30 22, 50 15 C 70 8, 80 18, 100 5 L 100 30 L 0 30 Z" fill="url(#chartGrad)" opacity="0.3"/>
            <path d="M0 25 C 20 20, 30 22, 50 15 C 70 8, 80 18, 100 5" fill="none" stroke="#8CF40E" strokeWidth="1"/>
            <defs><linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8CF40E" stopOpacity="1" /><stop offset="100%" stopColor="#8CF40E" stopOpacity="0" /></linearGradient></defs>
          </svg>
        </div>
      </div>

      {/* ACTION HUB */}
      <div style={{ marginTop: '3rem', textAlign: 'center', width: '100%' }}>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem' }}>Action Hub</p>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
          <button onClick={() => setIsSendModalOpen(true)} style={{ backgroundColor: '#8CF40E', color: '#050505', fontWeight: '800', fontSize: '16px', padding: '16px 32px', borderRadius: '8px', border: 'none', cursor: 'pointer', boxShadow: '0 0 20px rgba(140,244,14,0.3)', flex: 1 }}>
            Send RMX
          </button>
          <button onClick={() => setIsRedeemModalOpen(true)} style={{ backgroundColor: '#8CF40E', color: '#050505', fontWeight: '800', fontSize: '16px', padding: '16px 32px', borderRadius: '8px', border: 'none', cursor: 'pointer', boxShadow: '0 0 20px rgba(140,244,14,0.3)', flex: 1 }}>
            Redeem for Discount
          </button>
        </div>
      </div>

      {/* MODALS (Consolidated for brevity) */}
      {(isSendModalOpen || isRedeemModalOpen) && (
        <div style={{ position: 'absolute', top: '-2rem', left: '-2rem', right: '-2rem', bottom: '-8rem', backgroundColor: 'rgba(5,5,5,0.85)', backdropFilter: 'blur(8px)', zIndex: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '24px' }}>
          <div style={{ width: '90%', padding: '2rem', backgroundColor: '#0F172A', border: '1px solid rgba(140,244,14,0.3)', borderRadius: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 style={{ color: 'white' }}>{isSendModalOpen ? 'Send RMX' : 'Redeem Discount'}</h3>
              <button onClick={() => { setIsSendModalOpen(false); setIsRedeemModalOpen(false); }} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '24px' }}>&times;</button>
            </div>
            
            {isSendModalOpen ? (
              <>
                <input placeholder="Recipient Address" value={recipient} onChange={(e) => setRecipient(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '1rem', background: '#000', color: '#fff', border: '1px solid #333', borderRadius: '8px' }} />
                <input placeholder="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '1.5rem', background: '#000', color: '#fff', border: '1px solid #333', borderRadius: '8px' }} />
                <button onClick={handleSend} disabled={isPending || isConfirming} style={{ width: '100%', padding: '14px', backgroundColor: '#8CF40E', color: '#000', fontWeight: 'bold', borderRadius: '8px', border: 'none' }}>Confirm Send</button>
              </>
            ) : (
              <>
                <input placeholder="Amount to Burn" type="number" value={redeemAmount} onChange={(e) => setRedeemAmount(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '1.5rem', background: '#000', color: '#fff', border: '1px solid #333', borderRadius: '8px' }} />
                <button onClick={handleRedeem} disabled={isPending || isConfirming} style={{ width: '100%', padding: '14px', backgroundColor: '#8CF40E', color: '#000', fontWeight: 'bold', borderRadius: '8px', border: 'none' }}>Burn & Redeem</button>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
