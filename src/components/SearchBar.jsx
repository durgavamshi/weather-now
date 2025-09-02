import { useState, useRef, useEffect } from 'react'
import { Search, Clock, X } from 'lucide-react'
import './SearchBar.css'

const SearchBar = ({ onSearch, recentSearches, onRecentSearch }) => {
  const [query, setQuery] = useState('')
  const [showRecent, setShowRecent] = useState(false)
  const searchContainerRef = useRef(null)
  const inputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
      setQuery('')
      setShowRecent(false)
      inputRef.current.blur() // Remove focus from input
    }
  }

  const handleRecentItemClick = (city) => {
    onRecentSearch(city)
    setShowRecent(false)
    inputRef.current.blur() // Remove focus from input
  }

  const clearRecentSearches = () => {
    localStorage.removeItem('recentWeatherSearches')
    window.location.reload() // Refresh to update state
  }

  // Close recent searches when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowRecent(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Close recent searches when pressing Escape key
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setShowRecent(false)
        inputRef.current.blur()
      }
    }

    document.addEventListener('keydown', handleEscapeKey)
    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [])

  const formatTime = (timestamp) => {
    const now = new Date()
    const searchTime = new Date(timestamp)
    const diffInHours = Math.floor((now - searchTime) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  return (
    <div className="search-bar" ref={searchContainerRef}>
      <form onSubmit={handleSubmit}>
        <div className="search-input-container">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowRecent(recentSearches.length > 0)}
            placeholder="Enter city name..."
            className="search-input"
            aria-label="Search for a city"
          />
          <button type="submit" className="search-button" aria-label="Search">
            <Search size={20} />
          </button>
        </div>
      </form>

      {showRecent && recentSearches.length > 0 && (
        <div className="recent-searches">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: '0.5rem 1rem',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            marginBottom: '0.5rem'
          }}>
            <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#2d3436' }}>Recent Searches</span>
            <button 
              onClick={clearRecentSearches}
              style={{ 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                color: '#636e72',
                fontSize: '0.7rem'
              }}
              type="button"
            >
              <X size={14} style={{ marginRight: '0.25rem' }} />
              Clear
            </button>
          </div>
          {recentSearches.map((search, index) => (
            <button
              key={index}
              className="recent-search-item"
              onClick={() => handleRecentItemClick(search.city)}
              type="button"
              style={{
                background: 'none',
                border: 'none',
                width: '100%',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <div>
                  <div className="recent-search-city">{search.city}</div>
                  <div className="recent-search-country">{search.country}</div>
                </div>
                <div className="recent-search-time">
                  <Clock size={12} style={{ marginRight: '0.25rem' }} />
                  {formatTime(search.timestamp)}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar