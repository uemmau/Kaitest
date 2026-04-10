import './App.css'
import { Navbar, Hero, HowItWorks, ReportForm, Footer } from './components'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <ReportForm />
      </main>
      <Footer />
    </>
  )
}
