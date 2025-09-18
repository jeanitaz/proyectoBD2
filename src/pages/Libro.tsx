import { TodosLibros } from "../components/Books/TodosLibros";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";

export const Libros = () => {
  return (
    <>
      <Navbar />
      <TodosLibros/>
      <Footer />
    </>
  );
};