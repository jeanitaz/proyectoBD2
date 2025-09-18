import { EstadoPrestamo } from "../components/Admin/EstadoPrestamo"
import { Footer } from "../components/Footer"
import { Navbar } from "../components/Navbar"


export const Admin = () => {
  return (
    <>
      <Navbar />
      <EstadoPrestamo />
      <Footer />
    </>
  )
}