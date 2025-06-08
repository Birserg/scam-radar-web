export default function Pricing() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4 text-white">
      <h1 className="text-3xl font-bold mb-6">Upgrade to Premium</h1>
      <p className="mb-6 text-lg">Unlock unlimited contract checks, priority support, advanced risk analysis, and more!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-900 rounded-lg p-6 border-t-4 border-green-500">
          <h2 className="text-xl font-bold mb-2">1 Month</h2>
          <p className="mb-4">$9.99</p>
          <a href="#" className="inline-block bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-6 rounded-full transition">Pay</a>
        </div>
        <div className="bg-gray-900 rounded-lg p-6 border-t-4 border-green-500">
          <h2 className="text-xl font-bold mb-2">3 Months</h2>
          <p className="mb-4">$24.99</p>
          <a href="#" className="inline-block bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-6 rounded-full transition">Pay</a>
        </div>
        <div className="bg-gray-900 rounded-lg p-6 border-t-4 border-green-500">
          <h2 className="text-xl font-bold mb-2">1 Year</h2>
          <p className="mb-4">$79.99</p>
          <a href="#" className="inline-block bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-6 rounded-full transition">Pay</a>
        </div>
        <div className="bg-gray-900 rounded-lg p-6 border-t-4 border-yellow-500">
          <h2 className="text-xl font-bold mb-2">Lifetime</h2>
          <p className="mb-4">$199.99</p>
          <a href="#" className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded-full transition">Pay</a>
        </div>
      </div>
      <ul className="list-disc list-inside mb-8 text-lg">
        <li>Unlimited contract checks</li>
        <li>Priority support</li>
        <li>Early access to new features</li>
        <li>Detailed risk analysis</li>
        <li>No ads</li>
      </ul>
      <p className="text-gray-400 text-sm">Payment links will be available soon. For now, please use the bot to request an upgrade.</p>
    </div>
  );
}
