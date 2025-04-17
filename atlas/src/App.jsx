import './App.css'
import ContactUs from './components/custom/ContactUs'
import Features from './components/custom/Features'
import Hero from './components/custom/Hero'
import HowItWorks from './components/custom/HowItWorks'
import UserGallery from './components/custom/UserGallery'
import WhatsIncluded from './components/custom/WhatsIncluded'
import Footer from './view-trip/components/Footer'

function App() {

  return (
    <>
      <Hero />
      <Features />
      <UserGallery />
      <HowItWorks />
      <WhatsIncluded />
      <ContactUs />
      <Footer />
    </>
  )
}

export default App
