import { useEffect, useState } from "react";
import { PrestamoService } from "../../services/prestamoService";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import type { Libro } from "../../model/libro";
import type { Prestamo } from "../../model/prestamo";
import { LibroService } from "../../services/libroService";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

export const PrestamosClient = () => {
    const { id } = useParams<{ id: string }>();
    const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
    const [librosMap, setLibroMap] = useState<Record<string, Libro>>({});
    const { user } = useAuth();

    useEffect(() => {
        if (!id) return;

        const fetchPrestamos = async () => {
            try {
                const data = await PrestamoService.getPrestamosPorUsuario(id);
                setPrestamos(data);

                const libroIds = Array.from(new Set(data.map((p) => p.libroId)));
                const libroData = await Promise.all(
                    libroIds.map((id) => LibroService.getLibroById(id))
                );
                const map: Record<string, Libro> = {};
                libroData.forEach((j) => {
                    if (j.id) map[j.id] = j;
                });
                setLibroMap(map);
            } catch (error) {
                console.error("Error al cargar préstamos:", error);
            }
        };

        fetchPrestamos();
    }, [id]);

    const handleEliminar = async (id: string) => {
        if (!confirm("¿Estás seguro de eliminar este préstamo?")) return;
        try {
            await PrestamoService.deletePrestamo(id);
            setPrestamos((prev) => prev.filter((p) => p.id !== id));
        } catch (error) {
            console.error("Error al eliminar préstamo:", error);
            alert("No se pudo eliminar el préstamo");
        }
    };

    if (!id) return <p className="m-10">El usuario no existe</p>;
    if (prestamos.length === 0)
        return <p className="m-10">No tienes préstamos registrados</p>;

    return (
        <>
            <Navbar />
            <div className="max-w-5xl mx-auto mt-10 p-8 bg-gradient-to-br from-green-50 via-cyan-100 to-green-200 rounded-2xl shadow-2xl border border-cyan-300">
                <h2 className="text-3xl font-extrabold mb-8 text-center text-cyan-800 tracking-wide">
                    Préstamos del Usuario
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-700 rounded-xl overflow-hidden">
                        <thead>
                            <tr className="bg-cyan-700 text-cyan-50">
                                <th className="px-6 py-4 rounded-tl-xl">Libro</th>
                                <th className="px-6 py-4">Fecha préstamo</th>
                                <th className="px-6 py-4">Fecha devolución</th>
                                <th className="px-6 py-4">Cantidad</th>
                                <th className="px-6 py-4">Subtotal</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4">Estado</th>
                                <th className="px-6 py-4 rounded-tr-xl">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prestamos.map((p, idx) => (
                                <tr
                                    key={p.id}
                                    className={`border-b last:border-none ${
                                        idx % 2 === 0
                                            ? "bg-white/80"
                                            : "bg-cyan-50"
                                    } hover:bg-cyan-100 transition`}
                                >
                                    <td className="px-6 py-4 font-semibold text-cyan-900">
                                        {librosMap[p.libroId]?.titulo || "N/D"}
                                    </td>
                                    <td className="px-6 py-4">{p.fechaPrestamo}</td>
                                    <td className="px-6 py-4">{p.fechaDevolucion}</td>
                                    <td className="px-6 py-4">{p.cantidad}</td>
                                    <td className="px-6 py-4">${p.subtotal.toFixed(2)}</td>
                                    <td className="px-6 py-4">${p.total.toFixed(2)}</td>
                                    <td className="px-6 py-4">{p.estado}</td>
                                    <td className="px-6 py-4 space-x-2 text-center">
                                        {user?.rolId === 3 && (
                                            <button
                                                onClick={() => handleEliminar(p.id!)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-full shadow transition"
                                            >
                                                Eliminar
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </>
    );
};