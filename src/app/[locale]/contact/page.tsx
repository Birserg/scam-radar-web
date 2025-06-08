export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4 text-white">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <ul className="mb-8 text-lg">
        <li className="mb-4">
          <b>Telegram Bot:</b> <a href="https://t.me/scam_radar_bot" target="_blank" rel="noopener noreferrer" className="text-green-400 underline">@scam_radar_bot</a>
        </li>
        <li className="mb-4">
          <b>Support Email:</b> <a href="mailto:support@scam-radar.net" className="text-green-400 underline">support@scam-radar.net</a>
        </li>
        <li className="mb-4">
          <b>Twitter:</b> <a href="https://twitter.com/scam_radar_bot" target="_blank" rel="noopener noreferrer" className="text-green-400 underline">@scam_radar_bot</a>
        </li>
      </ul>
      <p className="text-gray-400 text-sm">We&apos;re here to help! Reach out with any questions or feedback.</p>
    </div>
  );
}
