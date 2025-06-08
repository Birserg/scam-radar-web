import Link from "next/link";

export default function HowItWorks() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4 text-white">
      <h1 className="text-3xl font-bold mb-6">How It Works</h1>
      <ol className="list-decimal list-inside mb-8 space-y-4 text-lg">
        <li>
          <b>Start the Bot:</b> Open <a href="https://t.me/scam_radar_bot" target="_blank" rel="noopener noreferrer" className="text-green-400 underline">Scam Radar on Telegram</a>.
        </li>
        <li>
          <b>Enter a Contract Address:</b> Paste the smart contract address you want to check.
        </li>
        <li>
          <b>Get Instant Results:</b> The bot analyzes the contract and shows you if it&apos;s a scam, honeypot, or safe.
        </li>
        <li>
          <b>Review the Risks:</b> See detailed risk factors and recommendations for your safety.
        </li>
        <li>
          <b>Upgrade for More:</b> Unlock unlimited checks and premium features by upgrading your subscription.
        </li>
      </ol>
      <Link href="https://t.me/scam_radar_bot" target="_blank" className="inline-block bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-8 rounded-full text-xl transition">
        Try Scam Radar Now
      </Link>
    </div>
  );
}
