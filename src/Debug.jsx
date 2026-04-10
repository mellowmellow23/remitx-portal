import { useReadContract } from "wagmi";
import { formatEther } from "viem";
import { REMITX_ADDRESS, REMITX_ABI } from "./config";

export default function Debug() {
  const { data, isLoading, isError, error } = useReadContract({
    address: REMITX_ADDRESS,
    abi: REMITX_ABI,
    functionName: "totalSupply",
  });

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, background: "#0f172a", border: "1px solid #8CF40E", borderRadius: 8, padding: "12px 16px", color: "white", fontSize: 13, zIndex: 9999 }}>
      <div>Supply read test</div>
      <div>Loading: {isLoading ? "yes" : "no"}</div>
      <div>Error: {isError ? String(error) : "none"}</div>
      <div>Data: {data ? formatEther(data) : "undefined"}</div>
    </div>
  );
}
