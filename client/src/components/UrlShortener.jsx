import { useState } from 'react'
import axios from 'axios'
import { Copy, ExternalLink, BarChart3, LinkIcon, Zap } from 'lucide-react'
import Analytics from './Analytics'

const UrlShortener = () => {
  const [originalUrl, setOriginalUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [shortId, setShortId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)

  // API base URL - use environment variable or fallback to localhost
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!originalUrl) return

    setLoading(true)
    setError('')

    try {
      const response = await axios.post(`${API_BASE_URL}/api/url`, {
        url: originalUrl
      })

      const newShortId = response.data.id
      setShortId(newShortId)
      setShortUrl(`${API_BASE_URL}/${newShortId}`)
    } catch (err) {
      setError('Failed to shorten URL. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const openUrl = () => {
    window.open(shortUrl, '_blank')
  }

  const reset = () => {
    setOriginalUrl('')
    setShortUrl('')
    setShortId('')
    setError('')
    setShowAnalytics(false)
  }

  if (showAnalytics) {
    return <Analytics shortId={shortId} onBack={() => setShowAnalytics(false)} />
  }

  return (
    <div className="url-shortener">
      <form onSubmit={handleSubmit} className="url-form">
        <div className="input-group">
          <div className="input-wrapper">
            <LinkIcon className="input-icon" size={20} />
            <input
              type="url"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="Enter your long URL here..."
              className="url-input"
              required
            />
          </div>
          <button 
            type="submit" 
            className="shorten-btn"
            disabled={loading || !originalUrl}
          >
            {loading ? (
              <div className="spinner"></div>
            ) : (
              <>
                <Zap size={18} />
                Shorten
              </>
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {shortUrl && (
        <div className="result-container">
          <div className="result-header">
            <h3>Your shortened URL is ready!</h3>
          </div>
          
          <div className="url-result">
            <div className="url-display">
              <span className="short-url">{shortUrl}</span>
            </div>
            
            <div className="action-buttons">
              <button
                onClick={copyToClipboard}
                className={`action-btn copy-btn ${copied ? 'copied' : ''}`}
                title="Copy to clipboard"
              >
                <Copy size={16} />
                {copied ? 'Copied!' : 'Copy'}
              </button>
              
              <button
                onClick={openUrl}
                className="action-btn open-btn"
                title="Open URL"
              >
                <ExternalLink size={16} />
                Open
              </button>
              
              <button
                onClick={() => setShowAnalytics(true)}
                className="action-btn analytics-btn"
                title="View analytics"
              >
                <BarChart3 size={16} />
                Analytics
              </button>
            </div>
          </div>

          <div className="original-url">
            <span className="label">Original URL:</span>
            <span className="url">{originalUrl}</span>
          </div>

          <button onClick={reset} className="reset-btn">
            Create Another Link
          </button>
        </div>
      )}
    </div>
  )
}

export default UrlShortener
