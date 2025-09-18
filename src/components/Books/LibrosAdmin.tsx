import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserRoundPen, UserRoundX } from "lucide-react"; // Reutilizamos iconos para editar/eliminar
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import type { Libro } from "../../model/libro";
import { LibroService } from "../../services/libroService";

export const LibrosAdmin = () => {
    const [loading, setLoading] = useState(true);
    const [libros, setLibros] = useState<Libro[]>([]);

    useEffect(() => {
        const fetchLibros = async () => {
            try {
                const data = await LibroService.getLibro();
                setLibros(data);
            } catch (error) {
                console.error("Error al cargar libros:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLibros();
    }, []);

    const eliminarVideojuego = async (id?: string) => {
        if (!id) return;
        if (!window.confirm("¿Deseas eliminar este videojuego?")) return;

        try {
            await LibroService.deleteLibrosjuego(id);
            alert("Libro eliminado correctamente");
            setLibros((prev) => prev.filter((v) => v.id !== id));
        } catch (error) {
            alert("Error al eliminar el videojuego");
            console.error("Error:", error);
        }
    };

    if (loading) return <p className="m-10">Cargando libros...</p>;

    return (
        <>
            <Navbar />
            <div className="m-14">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-6 py-3">Título</th>
                                <th className="px-6 py-3">Género</th>
                                <th className="px-6 py-3">Stock</th>
                                <th className="px-6 py-3">Autor</th>
                                <th className="px-6 py-3">Precio</th>
                                <th className="px-6 py-3">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {libros.map((v) => (
                                <tr
                                    key={v.id}
                                    className="odd:bg-white even:bg-gray-50 border-b border-gray-200"
                                >
                                    <td className="px-6 py-4">{v.titulo}</td>
                                    <td className="px-6 py-4">{v.genero}</td>
                                    <td className="px-6 py-4">{v.stock}</td>
                                    <td className="px-6 py-4">{v.autor}</td>
                                    <td className="px-6 py-4">{v.precio}</td>
                                    <td className="px-6 py-4 flex flex-row">
                                        <Link
                                            to={`/libros/editar/${v.id}`}
                                            className="text-blue-600 hover:underline m-3"
                                        >
                                            <UserRoundPen />
                                        </Link>
                                        <button
                                            onClick={() => eliminarVideojuego(v.id)}
                                            className="text-red-600 hover:underline m-3 cursor-pointer"
                                        >
                                            <UserRoundX />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-5">
                    <Link
                        to="/libros/registrar"
                        className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Registrar Nuevo Libro
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    );
};
