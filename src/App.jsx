import { useState } from 'react'

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'bdd1c438-ab26-4b33-b5ce-03f32f0db59a',
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      })

      const result = await response.json()

      if (result.success) {
        alert('Thank you for your message! We will get back to you soon.')
        setFormData({ name: '', email: '', message: '' })
      } else {
        alert('Something went wrong. Please try again or email us directly at support@dolivo.com')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Something went wrong. Please try again or email us directly at support@dolivo.com')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F7F5]">
      {/* Header */}
      <header className="bg-white border-b border-black/10">
        <div className="max-w-[1200px] mx-auto px-8 h-24 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3">
            <img src="/dolivo_logo.png" alt="Dolivo Logo" className="h-8 w-auto" />
            <span className="text-2xl font-bold tracking-tight">Dolivo</span>
          </a>
          <nav className="flex items-center gap-8">
            <a href="#solutions" className="nav-link">Solutions</a>
            <a href="#company" className="nav-link">Technology</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="max-w-[1200px] mx-auto px-8 py-14">
          <div className="flex gap-8">
            <div className="flex-1 flex flex-col gap-9 pt-8">
              <div className="flex flex-col">
                <h1 className="heading-xl">Intelligent</h1> 
                <h1 className="heading-xl">Grid Engineering</h1> 
                <h1 className="heading-xl">for Utility-Scale</h1> 
                <h1 className="heading-xl">Solar.</h1>
              </div>
              <p className="text-2xl font-normal leading-relaxed tracking-wide max-w-[458px]">
                Automation for development, engineering, and asset management teams building the future of renewable energy.
              </p>
              <div className="flex gap-6">
                <a 
                  href="https://calendar.notion.so/meet/conallwalsh/q65154opm" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary inline-block text-center"
                >
                  Request Demo
                </a>
              </div>
            </div>
            <div className="w-[368px] h-[550px] relative">
              <div className="absolute left-0 top-0 w-px h-full bg-black/10"></div>
              <img 
                src="/Hero_solar_farm_image.png"
                alt="Solar farm in fields"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Backed By */}
          <div className="mt-16 pt-8 border-t border-black/10">
            <p className="step-label mb-8">Backed By</p>
            <div className="flex items-center justify-between gap-8">
              <img 
                src="/founders_logo.png" 
                alt="Founders logo" 
                className="h-20 w-auto flex-1 object-contain"
              />
              <img 
                src="/NDRC_logo.png" 
                alt="NDRC logo" 
                className="h-32 w-auto flex-1 object-contain -translate-y-6"
              />
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="solutions" className="max-w-[1200px] mx-auto px-8 py-20">
          <h2 className="heading-xl mb-6">Benefits</h2>
          <div className="w-full h-px bg-black mb-12"></div>
          
          <div className="grid grid-cols-2 gap-x-16 gap-y-16">
            <div className="flex flex-col gap-9">
              <h3 className="heading-lg">Give Engineers Their Time Back</h3>
              <p className="body-text">
                Replace repetitive analysis, manual document searches, and ad-hoc checks with automated workflows that run consistently across site documents, SCADA data, and power-system models.
              </p>
            </div>
            
            <div className="flex flex-col gap-9">
              <h3 className="heading-lg">Recover Lost Revenue</h3>
              <p className="body-text">
                Increase revenue and reduce fines by continuously analysing site behaviour using power-system models, operational data, and contractual intelligence.
              </p>
            </div>
            
            <div className="flex flex-col gap-9">
              <h3 className="heading-lg">Understand Power Models</h3>
              <p className="body-text">
                Turn power-system models into usable, explainable tools through AI, grounded in site documentation, operating limits, and real operational behaviour.
              </p>
            </div>
            
            <div className="flex flex-col gap-9">
              <h3 className="heading-lg">Upgrade Your Team</h3>
              <p className="body-text">
                Reduce reliance on scarce, expensive consultants by enabling in-house teams to perform specialist-grade power-system analysis.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="technology" className="max-w-[1200px] mx-auto px-8 py-20">
          <h2 className="heading-xl mb-12">How It Works</h2>
          <div className="w-full h-px bg-black mb-16"></div>
          
          <div className="grid grid-cols-3 gap-8">
            <div className="flex flex-col gap-4">
              <div className="h-[200px] flex items-end justify-center mb-4">
                <img 
                  src="/How It Works Illustrations - Centralisation.png" 
                  alt="Centralisation illustration"
                  className="max-h-full w-auto object-contain"
                />
              </div>
              <p className="step-label">Step 1</p>
              <h3 className="heading-md">Centralise Your Documentation</h3>
              <p className="body-text-sm">
                Upload site documents and Dolivo automatically classifies them into a structured, searchable vault. Track missing or out-of-date documents and query obligations, limits, and requirements using the Dolivo AI assistant.
              </p>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="h-[200px] flex items-end justify-center mb-4">
                <img 
                  src="/How It Works Illustrations - Data Ingestion.png" 
                  alt="Data ingestion illustration"
                  className="max-h-full w-auto object-contain"
                />
              </div>
              <p className="step-label">Step 2</p>
              <h3 className="heading-md">Connect Your Operational Data</h3>
              <p className="body-text-sm">
                Plug your SCADA system directly into Dolivo to bring live and historical operational data into the platform. This data is utilised by your automated worflows alongside your documentation and models.
              </p>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="h-[200px] flex items-end justify-center mb-4">
                <img 
                  src="/How It Works Illustrations - Modelling.png" 
                  alt="Modelling illustration"
                  className="max-h-full w-auto object-contain"
                />
              </div>
              <p className="step-label">Step 3</p>
              <h3 className="heading-md">Build a Digital Model of Your Site</h3>
              <p className="body-text-sm">
                Dolivo builds custom power-system models of your site using technical documentation and proprietary tooling. These models reflect your actual configuration and are kept aligned with how the site operates.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="company" className="max-w-[1200px] mx-auto px-8 py-16">
          <h2 className="heading-xl mb-6">Features</h2>
          <div className="w-full h-px bg-black mb-8"></div>
          
          {/* Feature 1 */}
          <div className="mb-12">
            <p className="step-label mb-3">Feature 1</p>
            <h3 className="heading-md mb-3">Document Management & Intelligence</h3>
            
            <div className="flex justify-left">
              <img 
                src="/feature-1-document-vault_2.png" 
                alt="Document vault showing scattered documents being organized into a structured queryable system"
                className="w-auto h-[400px] object-contain"
              />
            </div>
            
            <p className="body-text-sm mt-3">
              Site documentation organised into a structured, queryable system.
  </p>
          </div>
          
          {/* Feature 2 */}
          <div className="mb-12">
            <div className="text-right">
              <p className="step-label mb-3">Feature 2</p>
              <h3 className="heading-md mb-3">Automated Site Workflows</h3>
            </div>
            
            <div className="flex justify-end">
              <img 
                src="/feature-2-workflows.png" 
                alt="Hub and spoke diagram showing automated workflows connecting financial, technical, operational, and compliance processes"
                className="w-auto h-[400px] object-contain"
              />
            </div>
            
            <p className="body-text-sm mt-3 text-right">
      Run repeatable financial, technical, operational, and compliance workflows utilising documents, data, and models.            </p>
          </div>
          
          {/* Feature 3 */}
          <div>
            <p className="step-label mb-3">Feature 3</p>
            <h3 className="heading-md mb-3">Explainable Power System Modelling</h3>
            
            <div className="flex justify-start">
              <img 
                src="/feature-3-power-model.png" 
                alt="Power system model flow showing constraint identification, reason explanation, and impact quantification with AI-guided interpretation"
                className="w-auto h-[400px] object-contain"
              />
            </div>
            
            <p className="body-text-sm mt-3">
        AI-guided tools that make advanced power-system modelling usable beyond specialists.            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="max-w-[1200px] mx-auto px-8 py-20">
          <h2 className="heading-xl mb-12">Get in touch</h2>
          <div className="w-full h-px bg-black mb-16"></div>
          
          <div className="flex gap-20">
            {/* Contact Info */}
            <div className="flex-1 flex flex-col gap-10">
              <div>
                <p className="step-label mb-2">Email</p>
                <a href="mailto:support@dolivo.com" className="body-text-sm hover:underline">
                  support@dolivo.com
                </a>
              </div>
              
              <div>
                <p className="step-label mb-2">Location</p>
                <p className="body-text-sm">1 CHQ, Dublin 1, Dublin, Ireland</p>
              </div>
            </div>
            
            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-6">
              <div>
                <label className="input-label">Name</label>
                <input 
                  type="text" 
                  className="input-field"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="input-label">Email</label>
                <input 
                  type="email" 
                  className="input-field"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="input-label">Message</label>
                <textarea 
                  className="input-field h-40 resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                />
              </div>
              
              <button type="submit" className="btn-primary w-fit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-black/10 py-8">
        <div className="max-w-[1200px] mx-auto px-8 text-center">
          <p className="text-sm text-gray-600">&copy; 2026 Dolivo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
