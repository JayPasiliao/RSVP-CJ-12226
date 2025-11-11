'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import VideoSection from './components/VideoSection'

export default function WeddingPage() {
  const router = useRouter()
  
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
            <li><a href="/gallery/all" className="nav-link">Gallery</a></li>
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

      {/* Video Sections */}
      <VideoSection
        heading="Proposal Video"
        subheading="Our special moment captured forever"
        items={[
          {
            title: "The Proposal",
            caption: "The moment we said yes to forever",
            poster: "/proposal-1.jpg",
            src: "/Proposal Video/FDownloader.Net_AQNF3FJ8wmScX3VY7HRIwjxU231BeG13Jm8A2lU4RYjvyJKbd8pFwT2YVCzTVhazp97bmrP3wjUq5Yfyti3Vp6RFryYKAPvqJJfaAYb9EGfghQ_720p_(HD).mp4"
          }
        ]}
      />

      <VideoSection
        heading="Pre-Nup Video"
        subheading="Beautiful moments before the big day"
        items={[
          {
            title: "Pre-Nup Session",
            caption: "Capturing our love story",
            poster: "/Prenup Photos/LYD_3210.jpg",
            src: "/Prenup Video/JAY & CHING PRENUP VIDEO.mp4"
          }
        ]}
      />

      {/* Gallery Section with Tabs */}
      <section id="gallery" className="section gallery-section">
        <div className="container">
          <header className="gallery-header">
            <h2 className="gallery-title" data-animate="">Our Love Story</h2>
            <p className="gallery-subtitle" data-animate="">Cherished moments from our journey together</p>
          </header>
          <div className="gallery-filters" data-animate="">
            <a 
              href="/gallery/all/" 
              className="filter-pill"
              onClick={(e) => { e.preventDefault(); router.push('/gallery/all/'); }}
            >
              All
            </a>
            <a 
              href="/gallery/proposal/" 
              className="filter-pill"
              onClick={(e) => { e.preventDefault(); router.push('/gallery/proposal/'); }}
            >
              Proposal
            </a>
            <a 
              href="/gallery/prenup/" 
              className="filter-pill"
              onClick={(e) => { e.preventDefault(); router.push('/gallery/prenup/'); }}
            >
              Pre-Nup
            </a>
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-600">Click on any tab above to view the full gallery</p>
          </div>
        </div>
      </section>

      {/* Note: Full content conversion requires all sections from index.html */}
      {/* This is a starter template - add remaining sections as needed */}
    </>
  )
}
