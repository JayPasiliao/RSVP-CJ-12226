'use client'

import { useEffect } from 'react'
import Script from 'next/script'

export default function WeddingPage() {
  useEffect(() => {
    // Initialize animations and interactions after component mounts
    if (typeof window !== 'undefined') {
      // Smooth scrolling
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault()
          const target = document.querySelector(this.getAttribute('href'))
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        })
      })

      // Intersection Observer for animations
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      }, observerOptions)

      document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el)
      })
    }
  }, [])

  return (
    <>
      <Script src="/script.js" strategy="afterInteractive" />
      
      {/* Navigation */}
      <nav className="nav-glass">
        <div className="nav-container">
          <div className="logo-container">
            <img src="/INTLOGO1.png" alt="Christine & Jay Logo" className="logo" />
            <img src="/INTLOGO2.png" alt="Christine & Jay Logo" className="logo" />
          </div>
          <ul className="nav-menu">
            <li><a href="#home" className="nav-link">Home</a></li>
            <li><a href="#details" className="nav-link">Details</a></li>
            <li><a href="#gallery" className="nav-link">Gallery</a></li>
            <li><a href="#bridal-party" className="nav-link">Bridal Party</a></li>
            <li><a href="#location" className="nav-link">Location</a></li>
            <li><a href="#rsvp" className="nav-link">RSVP</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-background">
          <div className="glitter"></div>
          <div className="glitter"></div>
          <div className="glitter"></div>
        </div>
        <div className="hero-content">
          <div className="hero-logo-container fade-in">
            <img src="/logo-2.png" alt="Christine & Jay Wedding Logo" className="hero-logo-image" />
          </div>
          <div className="hero-cta">
            <a href="#details" className="btn-primary">View Details</a>
            <a href="#rsvp" className="btn-secondary">RSVP</a>
          </div>
        </div>
      </section>

      {/* Wedding Details Section */}
      <section id="details" className="section details-section">
        <div className="container">
          <h2 className="section-title" data-animate="">Wedding Details</h2>
          <div className="details-grid">
            <div className="detail-card glass-card" data-animate="">
              <div className="card-icon">
                <i className="fas fa-church"></i>
              </div>
              <h3>Ceremony</h3>
              <p className="detail-time">2:00 PM - 3:30 PM</p>
              <p className="detail-venue">Our Lady of Atonement Cathedral</p>
              <p className="detail-location">Baguio City</p>
            </div>
            <div className="detail-card glass-card" data-animate="">
              <div className="card-icon">
                <i className="fas fa-calendar-alt"></i>
              </div>
              <h3>Date</h3>
              <p className="detail-date">Wednesday</p>
              <p className="detail-date-full">January 22, 2026</p>
              <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Christine+Joyce+%26+Jay+Wedding&dates=20260122T060000Z/20260122T100000Z&details=Wedding+ceremony+and+reception+for+Christine+Joyce+C.+Bentinganan+and+Juanito+S.+Pasiliao+Jr.&location=Our+Lady+of+Atonement+Cathedral,+Baguio+City" target="_blank" rel="noopener noreferrer" className="btn-link">Add to Calendar</a>
            </div>
            <div className="detail-card glass-card" data-animate="">
              <div className="card-icon">
                <i className="fas fa-glass-cheers"></i>
              </div>
              <h3>Reception</h3>
              <p className="detail-time">4:00 PM onwards</p>
              <p className="detail-venue">Citylight Hotel</p>
              <p className="detail-location">245 Gen. Luna Rd, Baguio, 2600 Benguet</p>
            </div>
          </div>
        </div>
      </section>

      {/* Note: Full content conversion requires all sections from index.html */}
      {/* This is a starter template - add remaining sections as needed */}
      
      <div style={{padding: '4rem 2rem', textAlign: 'center', background: 'rgba(232, 180, 184, 0.1)'}}>
        <h2>Next.js Conversion In Progress</h2>
        <p>Your original static site remains fully functional at <code>http://localhost:3000</code></p>
        <p>This Next.js version is running on <code>http://localhost:3001</code></p>
        <p style={{marginTop: '2rem'}}>
          <strong>To use your original site:</strong> <code>npm run dev</code><br/>
          <strong>To use Next.js version:</strong> <code>npm run next:dev</code>
        </p>
      </div>
    </>
  )
}
