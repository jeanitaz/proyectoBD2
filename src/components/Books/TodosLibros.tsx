import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import type { Libro } from "../../model/libro";
import { LibroService } from "../../services/libroService";

export const TodosLibros = () => {
    const [loading, setLoading] = useState(true);
    const [libros, setLibros] = useState<Libro[]>([]);

    useEffect(() => {
        const fetchVideojuegos = async () => {
            try {
                const data = await LibroService.getLibro();
                setLibros(data);
            } catch (error) {
                console.error("Error al cargar libros:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVideojuegos();
    }, []);

    if (loading) return <p className="m-10">Cargando libros...</p>;

    return (
        <>
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl text-center ">
                Conoce todos nuestros libros
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 m-10">
                {libros.map((lb) => (
                    <div
                        key={lb.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
                    >
                        <img
                            alt={lb.titulo}
                            className="h-48 w-full object-contain"
                        />
                        <div className="p-4 flex flex-col flex-1">
                            <h3 className="text-lg font-bold mb-2">{lb.titulo}</h3>
                            <p className="text-gray-600 mb-1">Género: {lb.genero}</p>
                            <p className="text-gray-600 mb-1">Autor: {lb.autor}</p>
                            <p className="text-gray-600 mb-2">Stock: {lb.stock}</p>
                            <p className="text-gray-800 font-semibold mb-4">${lb.precio}</p>
                            <Link
                                to={`/prestamos/registrar/${lb.id}`}
                                className="mt-auto bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg"
                            >
                                Generar pedido
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
