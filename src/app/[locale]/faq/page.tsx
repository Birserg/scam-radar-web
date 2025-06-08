export default function FAQ() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4 text-white">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">What is a scam contract?</h2>
        <p className="mb-4">A scam contract is a smart contract designed to steal funds or deceive users. Scam Radar helps you detect these before you invest.</p>
        <h2 className="text-xl font-semibold mb-2">What is a honeypot?</h2>
        <p className="mb-4">A honeypot is a contract that lets you buy tokens but prevents you from selling them, trapping your funds. Our bot checks for this risk.</p>
        <h2 className="text-xl font-semibold mb-2">How do I use Scam Radar?</h2>
        <p className="mb-4">Just send a contract address to our Telegram bot and get instant results about its safety.</p>
        <h2 className="text-xl font-semibold mb-2">Is Scam Radar free?</h2>
        <p className="mb-4">Yes, basic checks are free. For unlimited checks and advanced features, upgrade to premium.</p>
        <h2 className="text-xl font-semibold mb-2">Which blockchains are supported?</h2>
        <p className="mb-4">We support major EVM-compatible blockchains. More chains are added regularly.</p>
      </div>
    </div>
  );
}
