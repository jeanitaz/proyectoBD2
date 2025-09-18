import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Libro } from "../../model/libro";
import { LibroService } from "../../services/libroService";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

export const UpdateLibro = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [libro, setlibro] = useState<Libro | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const fetchlibro = async () => {
            try {
                if (!id) {
                    setNotFound(true);
                    setLoading(false);
                    return;
                }
                const data = await LibroService.getLibroById(id);
                setlibro(data);
            } catch (error) {
                console.error("Libro no encontrado:", error);
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };
        fetchlibro();
    }, [id]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        if (!libro) return;
        setlibro({ ...libro, [e.target.name]: e.target.value });
    };

    const actualizarlibro = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!libro || !id) return;

        try {
            await LibroService.updateLibros(id, libro);
            alert("Libro actualizado exitosamente");
            navigate("/libros/admin");
        } catch (error) {
            console.error("Error al actualizar Libro:", error);
            alert("No se pudo actualizar el Libro");
        }
    };

    if (loading) return <p className="m-10">Cargando Libro...</p>;
    if (notFound)
        return (
            <p className="m-10 text-red-600">Libro con ID {id} no existe.</p>
        );
    if (!libro) return null;

    return (
        <div>
            <Navbar />
            <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                    Actualizar Libro
                </h2>
                <form onSubmit={actualizarlibro} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Título</label>
                        <input
                            type="text"
                            name="titulo"
                            value={libro.titulo}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Género</label>
                        <input
                            type="text"
                            name="genero"
                            value={libro.genero}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Stock</label>
                        <input
                            type="number"
                            name="stock"
                            value={libro.stock}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Autor</label>
                        <input
                            type="text"
                            name="Autor"
                            value={libro.autor}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Precio</label>
                        <input
                            type="number"
                            name="precio"
                            value={libro.precio}
                            onChange={handleChange}
                            step="0.01"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg"
                    >
                        Actualizar
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
};
