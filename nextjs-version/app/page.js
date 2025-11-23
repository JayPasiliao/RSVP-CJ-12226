'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import Image from 'next/image'

export default function WeddingPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [countdown, setCountdown] = useState({ days: '000', hours: '00', minutes: '00', seconds: '00' })

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

      // Scroll effect for navbar
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50)
      }

      window.addEventListener('scroll', handleScroll)

      // Countdown timer
      const updateCountdown = () => {
        const weddingDate = new Date('2026-01-22T14:00:00').getTime()
        const now = new Date().getTime()
        const distance = weddingDate - now

        if (distance < 0) {
          setCountdown({ days: '000', hours: '00', minutes: '00', seconds: '00' })
          return
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        setCountdown({
          days: String(days).padStart(3, '0'),
          hours: String(hours).padStart(2, '0'),
          minutes: String(minutes).padStart(2, '0'),
          seconds: String(seconds).padStart(2, '0')
        })
      }

      updateCountdown()
      const countdownInterval = setInterval(updateCountdown, 1000)

      return () => {
        window.removeEventListener('scroll', handleScroll)
        clearInterval(countdownInterval)
      }
    }
  }, [])

  return (
    <>
      <Script src="/script.js" strategy="afterInteractive" />
      
      {/* RSVP Announcement Banner */}
      <div 
        className="rsvp-announcement-banner" 
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          zIndex: 1001,
          width: '100%',
          background: 'linear-gradient(to right, rgb(255, 228, 230), rgb(255, 247, 237), rgb(255, 228, 230))',
          padding: '12px 24px',
          textAlign: 'center',
          borderBottom: '1px solid rgba(251, 113, 133, 0.4)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div style={{ maxWidth: '1152px', margin: '0 auto' }}>
          <h3 style={{ fontWeight: 600, color: '#e11d48', letterSpacing: '0.05em', fontSize: '0.875rem', margin: 0 }}>
            Kind Reminder: RSVP by December 16, 2025
          </h3>
          <p style={{ fontSize: '0.75rem', color: '#4b5563', margin: '4px 0 0 0' }}>
            Your timely response means we can make sure there's a special place ready just for you.
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`nav-glass ${isScrolled ? 'scrolled' : ''}`}>
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
        {/* Image Background */}
        <div className="hero-image-bg" style={{ backgroundImage: "url('/Prenup Photos/579975803_26034085669515202_4918153834199093834_n.jpg')" }}></div>
        
        {/* Gradient Overlay for Text Readability */}
        <div className="hero-gradient-overlay"></div>
        
        {/* Video Overlay */}
        <div className="hero-video-overlay"></div>

        {/* Hero Content */}
        <div className="hero-content">
          <div className="hero-text-overlay">
            <div className="hero-logo-top">
              <img src="/public/Logo 2A.png" alt="Christine and Jay Wedding Logo" className="hero-logo-img" />
            </div>

            <h1 className="hero-names">
              <span className="hero-name-large">Christine</span>
              <span className="hero-name-line-2">
                <span className="hero-name-connector">and</span>
                <span className="hero-name-large">Jay</span>
              </span>
            </h1>
            <p className="hero-announcement">WE'RE GETTING MARRIED</p>
            <p className="hero-date-time">JANUARY 22, 2026 • 2:00 PM</p>
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
          <div className="details-grid" data-animate>
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
          
          {/* Countdown Timer */}
          <div className="countdown-container" data-animate>
            <h2 className="countdown-title">Counting Down to Our Special Day</h2>
            <div className="countdown-timer">
              <div className="countdown-unit">
                <span className="countdown-number">{countdown.days}</span>
                <span className="countdown-label">Days</span>
              </div>
              <div className="countdown-separator">:</div>
              <div className="countdown-unit">
                <span className="countdown-number">{countdown.hours}</span>
                <span className="countdown-label">Hours</span>
              </div>
              <div className="countdown-separator">:</div>
              <div className="countdown-unit">
                <span className="countdown-number">{countdown.minutes}</span>
                <span className="countdown-label">Minutes</span>
              </div>
              <div className="countdown-separator">:</div>
              <div className="countdown-unit">
                <span className="countdown-number">{countdown.seconds}</span>
                <span className="countdown-label">Seconds</span>
              </div>
            </div>

            <p className="countdown-quote">Each passing moment brings us closer to saying "I do." The wait may feel long, but every second is a beautiful reminder that love is worth the time it takes to reach forever.</p>
          </div>
        </div>
      </section>

      {/* Full Names Section */}
      <section className="names-section-modern" aria-labelledby="couple-heading">
        <div className="names-section-bg" style={{ backgroundImage: "url('/Prenup Photos/575896935_25993085763615193_3037169480788289199_n.jpg')" }}></div>
        <div className="names-section-overlay-modern"></div>
        <div className="names-content-wrapper">
          <div className="names-content-modern" data-animate>
            <div className="names-card-gradient-top"></div>
            <div className="names-grid-layout">
              <div className="name-block-modern name-block-groom">
                <p className="name-label">THE GROOM</p>
                <p className="name-full">Arch. Juanito S. Pasiliao Jr.</p>
                <p className="name-nickname">(Jay)</p>
              </div>
              <div className="heart-divider-modern">
                <div className="heart-badge">
                  <div className="heart-badge-halo"></div>
                  <i className="fas fa-heart heart-icon"></i>
                </div>
              </div>
              <div className="name-block-modern name-block-bride">
                <p className="name-label">THE BRIDE</p>
                <p className="name-full">Christine Joyce C. Bentinganan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="gallery-section-modern">
        <div className="gallery-section-bg"></div>
        <div className="container">
          <header className="gallery-header-modern" data-animate>
            <h2 className="gallery-title-modern">Our Love Story</h2>
            <p className="gallery-subtitle-modern">Cherished moments from our journey together</p>
          </header>
          
          <div className="gallery-filters-modern" data-animate>
            <button className="filter-pill-modern active" data-category="all">All</button>
            <button className="filter-pill-modern" data-category="proposal">Proposal</button>
            <button className="filter-pill-modern" data-category="prenup">Pre-Nup</button>
          </div>

          {/* The Proposal Gallery */}
          <section className="story-panel-modern" data-category="proposal" data-animate>
            <div className="story-panel-gradient-top"></div>
            <div className="story-panel-content">
              <div className="story-panel-header">
                <div className="story-panel-title-row">
                  <span className="story-panel-icon">💕</span>
                  <h3 className="story-panel-title">The Proposal</h3>
                </div>
                <p className="story-panel-subtitle">Our special moment captured forever</p>
              </div>
              <div className="proposal-infinite-scroll-wrapper">
                <div className="proposal-infinite-scroll-track">
                  {/* First copy of images */}
                  <div className="photo-card">
                    <img src="/proposal-1.jpg" alt="The Moment" loading="lazy" />
                    <div className="photo-overlay">
                      <span className="photo-title">The Moment</span>
                    </div>
                  </div>
                  <div className="photo-card">
                    <img src="/proposal-2.jpg" alt="Preparation" loading="lazy" />
                    <div className="photo-overlay">
                      <span className="photo-title">Preparation</span>
                    </div>
                  </div>
                  <div className="photo-card">
                    <img src="/proposal-3.jpg" alt="Nervous Energy" loading="lazy" />
                    <div className="photo-overlay">
                      <span className="photo-title">Nervous Energy</span>
                    </div>
                  </div>
                  <div className="photo-card">
                    <img src="/proposal-4.jpg" alt="The Question" loading="lazy" />
                    <div className="photo-overlay">
                      <span className="photo-title">The Question</span>
                    </div>
                  </div>
                  <div className="photo-card">
                    <img src="/proposal-5.jpg" alt="Her Answer" loading="lazy" />
                    <div className="photo-overlay">
                      <span className="photo-title">Her Answer</span>
                    </div>
                  </div>
                  <div className="photo-card">
                    <img src="/proposal-6.jpg" alt="Celebration" loading="lazy" />
                    <div className="photo-overlay">
                      <span className="photo-title">Celebration</span>
                    </div>
                  </div>
                  <div className="photo-card">
                    <img src="/proposal-7.jpg" alt="Together" loading="lazy" />
                    <div className="photo-overlay">
                      <span className="photo-title">Together</span>
                    </div>
                  </div>
                  {/* Second copy of images for seamless looping */}
                  <div className="photo-card">
                    <img src="/proposal-1.jpg" alt="The Moment" loading="lazy" />
                    <div className="photo-overlay">
                      <span className="photo-title">The Moment</span>
                    </div>
                  </div>
                  <div className="photo-card">
                    <img src="/proposal-2.jpg" alt="Preparation" loading="lazy" />
                    <div className="photo-overlay">
                      <span className="photo-title">Preparation</span>
                    </div>
                  </div>
                  <div className="photo-card">
                    <img src="/proposal-3.jpg" alt="Nervous Energy" loading="lazy" />
                    <div className="photo-overlay">
                      <span className="photo-title">Nervous Energy</span>
                    </div>
                  </div>
                  <div className="photo-card">
                    <img src="/proposal-4.jpg" alt="The Question" loading="lazy" />
                    <div className="photo-overlay">
                      <span className="photo-title">The Question</span>
                    </div>
                  </div>
                  <div className="photo-card">
                    <img src="/proposal-5.jpg" alt="Her Answer" loading="lazy" />
                    <div className="photo-overlay">
                      <span className="photo-title">Her Answer</span>
                    </div>
                  </div>
                  <div className="photo-card">
                    <img src="/proposal-6.jpg" alt="Celebration" loading="lazy" />
                    <div className="photo-overlay">
                      <span className="photo-title">Celebration</span>
                    </div>
                  </div>
                  <div className="photo-card">
                    <img src="/proposal-7.jpg" alt="Together" loading="lazy" />
                    <div className="photo-overlay">
                      <span className="photo-title">Together</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Pre-Nup Session Gallery */}
          <section className="story-panel-modern" data-category="prenup" data-animate>
            <div className="story-panel-gradient-top"></div>
            <div className="story-panel-content">
              <div className="story-panel-header">
                <div className="story-panel-title-row">
                  <span className="story-panel-icon">📸</span>
                  <h3 className="story-panel-title">Pre-Nup Session</h3>
                </div>
                <p className="story-panel-subtitle">Beautiful moments before the big day</p>
              </div>
              <div className="story-panel-rail">
                <div className="moving-gallery-container-modern">
                  <div className="moving-gallery-track moving-gallery-slow" data-direction="right">
                    <div className="photo-card">
                      <img src="/Prenup Photos/575896935_25993085763615193_3037169480788289199_n.jpg" alt="Pre-Nup Photo" loading="lazy" />
                      <div className="photo-overlay">
                        <span className="photo-title">Pre-Nup Session</span>
                      </div>
                    </div>
                    <div className="photo-card">
                      <img src="/Prenup Photos/576888239_25993041823619587_7081389363847178468_n.jpg" alt="Pre-Nup Photo" loading="lazy" />
                      <div className="photo-overlay">
                        <span className="photo-title">Pre-Nup Session</span>
                      </div>
                    </div>
                    <div className="photo-card">
                      <img src="/Prenup Photos/577002366_25993081636948939_4678500296905864639_n.jpg" alt="Pre-Nup Photo" loading="lazy" />
                      <div className="photo-overlay">
                        <span className="photo-title">Pre-Nup Session</span>
                      </div>
                    </div>
                    <div className="photo-card">
                      <img src="/Prenup Photos/577116764_25993097906947312_1287352419855032324_n.jpg" alt="Pre-Nup Photo" loading="lazy" />
                      <div className="photo-overlay">
                        <span className="photo-title">Pre-Nup Session</span>
                      </div>
                    </div>
                    <div className="photo-card">
                      <img src="/Prenup Photos/577272127_25993101543613615_188383720182504827_n.jpg" alt="Pre-Nup Photo" loading="lazy" />
                      <div className="photo-overlay">
                        <span className="photo-title">Pre-Nup Session</span>
                      </div>
                    </div>
                    <div className="photo-card">
                      <img src="/Prenup Photos/577465983_25993100346947068_6022403069435423605_n.jpg" alt="Pre-Nup Photo" loading="lazy" />
                      <div className="photo-overlay">
                        <span className="photo-title">Pre-Nup Session</span>
                      </div>
                    </div>
                    <div className="photo-card">
                      <img src="/Prenup Photos/577553854_25992979823625787_2949245829177433156_n.jpg" alt="Pre-Nup Photo" loading="lazy" />
                      <div className="photo-overlay">
                        <span className="photo-title">Pre-Nup Session</span>
                      </div>
                    </div>
                    <div className="photo-card">
                      <img src="/Prenup Photos/577566722_25993092166947886_5502892695525140807_n.jpg" alt="Pre-Nup Photo" loading="lazy" />
                      <div className="photo-overlay">
                        <span className="photo-title">Pre-Nup Session</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Principal Sponsors Section */}
      <section className="sponsors-section-modern">
        <div className="sponsors-section-container">
          <div className="sponsors-content-wrapper">
            <header className="sponsors-header-modern" data-animate>
              <h2 className="sponsors-title-modern">Principal Sponsors</h2>
              <p className="sponsors-subtitle-modern">Guiding us with love and wisdom</p>
              <div className="sponsors-divider"></div>
            </header>
            <div className="sponsors-grid-modern" data-animate>
              <div className="sponsor-card-modern">
                <p className="sponsor-name-primary">Kerklyne Velarde</p>
                <p className="sponsor-name-spouse">Miguelito Velarde Jr.</p>
              </div>
              <div className="sponsor-card-modern">
                <p className="sponsor-name-primary">Marichu Pimentel</p>
                <p className="sponsor-name-spouse">Elias Aoanan</p>
              </div>
              <div className="sponsor-card-modern">
                <p className="sponsor-name-primary">Luisa Lawagan Bautista</p>
                <p className="sponsor-name-spouse">Rolly Bautista</p>
              </div>
              <div className="sponsor-card-modern">
                <p className="sponsor-name-primary">Silyaka Bentinganan</p>
                <p className="sponsor-name-spouse">Gurmond Sepulchre</p>
              </div>
              <div className="sponsor-card-modern">
                <p className="sponsor-name-primary">Jackie Bentinganan</p>
                <p className="sponsor-name-spouse">Noel Bentinganan</p>
              </div>
              <div className="sponsor-card-modern">
                <p className="sponsor-name-primary">Soledad Abanilla</p>
                <p className="sponsor-name-spouse">Leo Bentinganan</p>
              </div>
              <div className="sponsor-card-modern">
                <p className="sponsor-name-primary">Zenia Monteclaro</p>
                <p className="sponsor-name-spouse">Manuel Bentinganan Jr.</p>
              </div>
              <div className="sponsor-card-modern">
                <p className="sponsor-name-primary">Cristina Manalo</p>
                <p className="sponsor-name-spouse">Job Bentinganan</p>
              </div>
              <div className="sponsor-card-modern">
                <p className="sponsor-name-primary">Grace Cadwising</p>
                <p className="sponsor-name-spouse">Jason Laranang</p>
              </div>
              <div className="sponsor-card-modern">
                <p className="sponsor-name-primary">Roselyn Serrano</p>
                <p className="sponsor-name-spouse">Roger Imasa</p>
              </div>
              <div className="sponsor-card-modern">
                <p className="sponsor-name-primary">Rose Marcelino</p>
                <p className="sponsor-name-spouse">Jamie Bulayo</p>
              </div>
              <div className="sponsor-card-modern">
                <p className="sponsor-name-primary">Rebecca Naguit</p>
                <p className="sponsor-name-spouse">Alfonso Naguit</p>
              </div>
              <div className="sponsor-card-modern">
                <p className="sponsor-name-primary">Leah Lyn Paulengo</p>
                <p className="sponsor-name-spouse">Edgar Enriquez</p>
              </div>
              <div className="sponsor-card-modern">
                <p className="sponsor-name-primary">Mary Jean Chua</p>
                <p className="sponsor-name-spouse">Cleofas Oliver</p>
              </div>
              <div className="sponsor-card-modern">
                <p className="sponsor-name-primary">Ma. Cristina Chua</p>
                <p className="sponsor-name-spouse">Roger Ternida</p>
              </div>
              <div className="sponsor-card-modern">
                <p className="sponsor-name-primary">Ma. Mylen Yaranon</p>
                <p className="sponsor-name-spouse">Charles Carame</p>
              </div>
              <div className="sponsor-card-modern">
                <p className="sponsor-name-primary">Mary Angeline Vinluan</p>
                <p className="sponsor-name-spouse">Alex Naguit</p>
              </div>
              <div className="sponsor-card-modern">
                <p className="sponsor-name-primary">Flordeliza Beltran</p>
                <p className="sponsor-name-spouse">Ronnie Beltran</p>
              </div>
              <div className="sponsor-card-modern">
                <p className="sponsor-name-primary">Rlynne Banez</p>
                <p className="sponsor-name-spouse">Mark Errol Bentinganan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offertory Section */}
      <section className="offertory-section-modern">
        <div className="offertory-section-container">
          <header className="offertory-header-modern" data-animate>
            <h2 className="offertory-title-modern">Offertory</h2>
            <div className="offertory-divider"></div>
          </header>
          <div className="offertory-grid-modern" data-animate>
            <div className="offertory-card-modern">
              <div className="offertory-icon-wrapper">
                <i className="fas fa-wine-glass"></i>
              </div>
              <p className="offertory-name">Jesalie Ringor -Pasiliao</p>
            </div>
            <div className="offertory-card-modern">
              <div className="offertory-icon-wrapper">
                <i className="fas fa-wine-glass"></i>
              </div>
              <p className="offertory-name">Chelsea Joy Lawagan</p>
            </div>
            <div className="offertory-card-modern">
              <div className="offertory-icon-wrapper">
                <i className="fas fa-wine-glass"></i>
              </div>
              <p className="offertory-name">Alpha Marcelino</p>
            </div>
            <div className="offertory-card-modern">
              <div className="offertory-icon-wrapper">
                <i className="fas fa-wine-glass"></i>
              </div>
              <p className="offertory-name">Ma Rosella Marcelino</p>
            </div>
            <div className="offertory-card-modern">
              <div className="offertory-icon-wrapper">
                <i className="fas fa-wine-glass"></i>
              </div>
              <p className="offertory-name">Elvy Estacio</p>
            </div>
            <div className="offertory-card-modern">
              <div className="offertory-icon-wrapper">
                <i className="fas fa-wine-glass"></i>
              </div>
              <p className="offertory-name">Marvin Pasiliao</p>
            </div>
            <div className="offertory-card-modern">
              <div className="offertory-icon-wrapper">
                <i className="fas fa-wine-glass"></i>
              </div>
              <p className="offertory-name">Mc Khallie Comia</p>
            </div>
            <div className="offertory-card-modern">
              <div className="offertory-icon-wrapper">
                <i className="fas fa-wine-glass"></i>
              </div>
              <p className="offertory-name">John Russel Marcelino</p>
            </div>
            <div className="offertory-card-modern">
              <div className="offertory-icon-wrapper">
                <i className="fas fa-wine-glass"></i>
              </div>
              <p className="offertory-name">David Beltran</p>
            </div>
            <div className="offertory-card-modern">
              <div className="offertory-icon-wrapper">
                <i className="fas fa-wine-glass"></i>
              </div>
              <p className="offertory-name">Arnel Zamoranos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Attire Section */}
      <section className="attire-section-modern">
        <div className="attire-section-container">
          <header className="attire-header-modern" data-animate>
            <h2 className="attire-title-modern">Attire</h2>
            <p className="attire-subtitle-modern">Formal</p>
          </header>
          
          <div className="fade-up opacity-0 space-y-6 md:space-y-8" data-animate>
            {/* GENTLEMEN */}
            <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-lg overflow-hidden flex flex-col md:flex-row items-stretch">
              {/* Text */}
              <div className="flex-1 px-6 py-6 md:px-8 md:py-8 flex items-center">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-400">
                    <i className="fas fa-user-tie text-xl"></i>
                  </div>
                  <div>
                    <p className="tracking-[0.2em] text-[11px] md:text-xs font-semibold text-rose-400 uppercase mb-1">
                      Gentlemen
                    </p>
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                      Formal trousers in <strong>brown</strong>, <strong>cream</strong>, <strong>beige</strong>, or <strong>champagne</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="relative w-full md:w-1/3 h-40 md:h-auto min-h-[180px]">
                <Image
                  src="/attire-guide.png"
                  alt="Attire inspiration for gentlemen and ladies"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
              </div>
            </div>

            {/* LADIES */}
            <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-lg overflow-hidden flex flex-col md:flex-row items-stretch">
              {/* Text */}
              <div className="flex-1 px-6 py-6 md:px-8 md:py-8 flex items-center">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-400">
                    <i className="fas fa-female text-xl"></i>
                  </div>
                  <div>
                    <p className="tracking-[0.2em] text-[0.7rem] md:text-xs font-semibold text-rose-400 uppercase mb-1">
                      Ladies
                    </p>
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                      Long gowns or dresses in <strong>rose gold</strong> or <strong>champagne</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Same image for cohesion */}
              <div className="relative w-full md:w-1/3 h-40 md:h-auto min-h-[180px] hidden md:block">
                <Image
                  src="/attire-guide.png"
                  alt="Attire inspiration for ladies"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
              </div>
            </div>

            {/* Palette Card */}
            <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-lg px-6 py-6 md:px-8 md:py-8">
              <p className="tracking-[0.2em] text-[11px] md:text-xs font-semibold text-rose-400 uppercase mb-1 text-center">PALETTE</p>
              <p className="attire-palette-subtitle text-center">Our wedding hues for your inspiration</p>
              <div className="attire-palette-colors">
                <div className="attire-color-chip" style={{ backgroundColor: '#F7E7CE' }} title="Champagne" aria-label="Champagne"></div>
                <div className="attire-color-chip" style={{ backgroundColor: '#ECD9B0' }} title="Beige" aria-label="Beige"></div>
                <div className="attire-color-chip" style={{ backgroundColor: '#E9C9A8' }} title="Nude" aria-label="Nude"></div>
                <div className="attire-color-chip" style={{ backgroundColor: '#D7A59A' }} title="Rose Gold" aria-label="Rose Gold"></div>
                <div className="attire-color-chip" style={{ backgroundColor: '#D8A0A6' }} title="Dusty Pink" aria-label="Dusty Pink"></div>
                <div className="attire-color-chip" style={{ backgroundColor: '#F6C1C8' }} title="Blush Pink" aria-label="Blush Pink"></div>
                <div className="attire-color-chip" style={{ backgroundColor: '#E46A90' }} title="Fuschia Pink" aria-label="Fuschia Pink"></div>
              </div>
            </div>
          </div>

          {/* Attire Image */}
          <div className="attire-image-container mt-8">
            <div className="attire-image-wrapper">
              <Image
                src="/7988c020-cd1b-4a37-8fde-df28b955fb76.png"
                alt="Wedding attire inspiration"
                width={1200}
                height={600}
                className="attire-bottom-image"
                priority={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* With Love Closing Section */}
      <section className="closing-section-modern" aria-label="Thank you message from the couple">
        <div className="closing-section-bg-band"></div>
        <div className="closing-divider"></div>
        <div className="closing-gradient-wrapper">
          <div className="closing-card-modern">
            <div className="closing-icon-modern">
              <div className="closing-icon-halo"></div>
              <span>♡</span>
            </div>
            <p className="closing-label-modern">WITH LOVE,</p>
            <p className="closing-signature-modern">Jay & Christine</p>
            <p className="closing-message-modern">Thank you for being part of our special day.</p>
          </div>
        </div>
      </section>

      {/* Note: Full content conversion requires all sections from index.html */}
      {/* This is a starter template - add remaining sections as needed */}
    </>
  )
}
