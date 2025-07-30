import { useState, useEffect } from 'react'
import axios from 'axios'
import { ArrowLeft, BarChart3, Clock, MousePointer } from 'lucide-react'

const Analytics = ({ shortId, onBack }) => {
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // API base URL - use environment variable or fallback to localhost
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

  useEffect(() => {
    fetchAnalytics()
  }, [shortId])

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/url/analytics/${shortId}`)
      setAnalytics(response.data)
    } catch (err) {
      setError('Failed to fetch analytics data')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString()
  }

  if (loading) {
    return (
      <div className="analytics-container">
        <div className="analytics-header">
          <button onClick={onBack} className="back-btn">
            <ArrowLeft size={20} />
            Back
          </button>
          <h2>Loading Analytics...</h2>
        </div>
        <div className="loading-spinner">
          <div className="spinner large"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="analytics-container">
        <div className="analytics-header">
          <button onClick={onBack} className="back-btn">
            <ArrowLeft size={20} />
            Back
          </button>
          <h2>Analytics Error</h2>
        </div>
        <div className="error-message">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <button onClick={onBack} className="back-btn">
          <ArrowLeft size={20} />
          Back
        </button>
        <h2>
          <BarChart3 size={24} />
          URL Analytics
        </h2>
      </div>

      <div className="analytics-content">
        <div className="stats-card">
          <div className="stat-item">
            <div className="stat-icon">
              <MousePointer size={24} />
            </div>
            <div className="stat-info">
              <h3>Total Clicks</h3>
              <span className="stat-number">{analytics?.totalClicks || 0}</span>
            </div>
          </div>
        </div>

        <div className="short-url-info">
          <h3>Short URL</h3>
          <div className="url-display">
            <span className="short-url">{API_BASE_URL}/{shortId}</span>
          </div>
        </div>

        {analytics?.analytics && analytics.analytics.length > 0 ? (
          <div className="visit-history">
            <h3>
              <Clock size={20} />
              Visit History
            </h3>
            <div className="history-list">
              {analytics.analytics.map((visit, index) => (
                <div key={index} className="history-item">
                  <div className="visit-number">#{analytics.analytics.length - index}</div>
                  <div className="visit-time">{formatDate(visit.timestamp)}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="no-visits">
            <Clock size={48} />
            <h3>No visits yet</h3>
            <p>Your shortened URL hasn't been clicked yet. Share it to start tracking visits!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Analytics
