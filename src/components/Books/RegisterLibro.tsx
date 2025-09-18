import { useState } from "react";

import Swal from "sweetalert2";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { useNavigate } from "react-router-dom";
import { LibroService } from "../../services/libroService";

export const RegistroLibro = () => {
    const [titulo, setTitulo] = useState("");
    const [genero, setGenero] = useState("");
    const [stock, setStock] = useState(0);
    const [autor, setAutor] = useState("");
    const [precio, setPrecio] = useState(0);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await LibroService.createLibros({
                titulo,
                genero,
                stock,
                autor,
                precio,
            });

            Swal.fire({
                icon: "success",
                title: "¡Éxito!",
                text: "Libro registrado correctamente",
                timer: 1500,
                showConfirmButton: false,
            });
            navigate("/libros/admin");
            setTitulo("");
            setGenero("");
            setStock(0);
            setAutor("");
            setPrecio(0);
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo registrar el libro",
            });
        }
    };

    return (
        <>
            <Navbar />
            <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Registrar Libros
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1">Título</label>
                        <input
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Género</label>
                        <input
                            type="text"
                            value={genero}
                            onChange={(e) => setGenero(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Stock</label>
                        <input
                            type="number"
                            value={stock}
                            onChange={(e) => setStock(parseInt(e.target.value))}
                            className="w-full px-4 py-2 border rounded-lg"
                            required
                            min={0}
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Plataforma</label>
                        <input
                            type="text"
                            value={autor}
                            onChange={(e) => setAutor(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Precio</label>
                        <input
                            type="number"
                            value={precio}
                            onChange={(e) => setPrecio(parseFloat(e.target.value))}
                            className="w-full px-4 py-2 border rounded-lg"
                            required
                            min={0}
                            step={0.01}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg"
                    >
                        Registrar
                    </button>
                </form>
            </div>

            <Footer />
        </>
    );
};
