import { GestionPrestamo } from "../components/Admin2/Gestion"
import { Footer } from "../components/Footer"
import { Navbar } from "../components/Navbar"


export const SuperAdmin = () => {
  return (
    <>
      <Navbar />
      <GestionPrestamo/>
      <Footer />
    </>
  )
}