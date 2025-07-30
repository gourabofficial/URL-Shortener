import { useState } from 'react'
import UrlShortener from './components/UrlShortener'
import './App.css'

function App() {
  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1 className="title">
            <span className="title-main">URL</span>
            <span className="title-accent">Shortener</span>
          </h1>
          <p className="subtitle">Transform your long URLs into short, shareable links</p>
        </header>
        <UrlShortener />
      </div>
    </div>
  )
}

export default App
