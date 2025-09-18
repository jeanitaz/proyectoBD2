import { Footer } from "../components/Footer";
import { BooksLinks } from "../components/Home/BookLinks";
import { Navbar } from "../components/Navbar";

export const Home = () => {
  return (
    <>
      <Navbar />
      <BooksLinks />
      <Footer />
    </>
  );
};
