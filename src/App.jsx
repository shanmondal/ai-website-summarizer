import { useState } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSummarize = async () => {
    if (!url) {
      setError('Please enter a website URL');
      return;
    }

    setError('');
    setSummary('');
    setLoading(true);

    try {
      const API_BASE = 'https://ai-website-summarizer-backend.onrender.com';

      const response = await fetch(`${API_BASE}/api/summarize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      setSummary(data.summary);
    } catch (err) {
      setError('Failed to summarize website');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">AI Website Summarizer</h1>
      <p className="subtitle">
        Paste any public website URL to get a quick AI-generated summary
      </p>

      <div className="input-box">
        <input
          type="text"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={handleSummarize} disabled={loading} className="btn">
          {loading ? <span className="loader"></span> : 'Summarize'}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {summary && (
        <div className="result">
          <h3>Summary</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default App;
