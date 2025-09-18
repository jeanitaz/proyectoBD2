import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { PrestamoService } from "../../services/prestamoService";
import { UsuarioService } from "../../services/usuarioService";
import { LibroService } from "../../services/libroService";
import type { Prestamo } from "../../model/prestamo";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

interface PrestamoConNombres extends Prestamo {
    usuarioNombre?: string;
    libroNombre?: string;
}

export const GestionPrestamo = () => {
    const [prestamos, setPrestamos] = useState<PrestamoConNombres[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrestamos = async () => {
            try {
                const data = await PrestamoService.getPrestamos();

                const prestamosConNombres = await Promise.all(
                    data.map(async (p) => {
                        let usuarioNombre = "Desconocido";
                        let libroNombre = "Desconocido";

                        try {
                            const usuario = await UsuarioService.getUsuarioById(p.usuarioId);
                            usuarioNombre = usuario.nombre + " " + usuario.apellido;
                        } catch (e) {
                            console.warn("Usuario no encontrado:", e);
                        }

                        try {
                            const libro = await LibroService.getLibroById(p.libroId);
                            libroNombre = libro.titulo;
                        } catch (e) {
                            console.warn("Libro no encontrado:", e);
                        }

                        return {
                            ...p,
                            usuarioNombre,
                            libroNombre,
                        };
                    })
                );

                setPrestamos(prestamosConNombres);
            } catch (err) {
                console.error("Error al cargar préstamos:", err);
                Swal.fire("Error", "No se pudieron cargar los préstamos", "error");
            } finally {
                setLoading(false);
            }
        };

        fetchPrestamos();
    }, []);

    const cambiarEstado = (id?: string, nuevoEstado?: string) => {
        if (!id || !nuevoEstado) return;

        PrestamoService.updatePrestamo(id, { estado: nuevoEstado } as Prestamo)
            .then(() => {
                setPrestamos((prev) =>
                    prev.map((p) => (p.id === id ? { ...p, estado: nuevoEstado } : p))
                );
                Swal.fire("Éxito", `Estado cambiado a ${nuevoEstado}`, "success");
            })
            .catch((err) => {
                console.error(err);
                Swal.fire("Error", "No se pudo cambiar el estado", "error");
            });
    };

    const eliminarPrestamo = (id?: string) => {
        if (!id) return;

        Swal.fire({
            title: "¿Deseas eliminar este préstamo?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                PrestamoService.deletePrestamo(id)
                    .then(() => {
                        setPrestamos((prev) => prev.filter((p) => p.id !== id));
                        Swal.fire("Eliminado", "El préstamo ha sido eliminado", "success");
                    })
                    .catch((err) => {
                        console.error(err);
                        Swal.fire("Error", "No se pudo eliminar el préstamo", "error");
                    });
            }
        });
    };

    if (loading) return <p className="m-10 text-center text-lg text-yellow-700">Cargando préstamos...</p>;

    return (
        <>
            <Navbar />
            <div className="m-6">
                <h2 className="text-3xl font-bold text-yellow-900 mb-6 text-center">
                    Gestión de Préstamos de la Biblioteca
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {prestamos.length === 0 ? (
                        <div className="col-span-full text-center py-8 text-gray-500 bg-yellow-50 rounded-xl shadow">
                            <span className="text-2xl">📚</span>
                            <p className="mt-2">No hay préstamos registrados.</p>
                        </div>
                    ) : (
                        prestamos.map((p) => (
                            <div
                                key={p.id}
                                className="bg-white rounded-xl shadow-lg p-6 border border-yellow-200 flex flex-col justify-between"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-4xl">📖</span>
                                    <div>
                                        <h3 className="font-bold text-lg text-yellow-800">{p.libroNombre}</h3>
                                        <p className="text-sm text-gray-600">Cliente: <span className="font-semibold">{p.usuarioNombre}</span></p>
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <p className="text-gray-700"><b>Fecha préstamo:</b> {p.fechaPrestamo}</p>
                                    <p className="text-gray-700"><b>Fecha devolución:</b> {p.fechaDevolucion}</p>
                                    <p className="text-gray-700"><b>Cantidad:</b> {p.cantidad ?? 0}</p>
                                </div>
                                <div className="mb-2">
                                    <p className="text-green-700 font-bold">Subtotal: ${p.subtotal?.toFixed(2) ?? "0.00"}</p>
                                    <p className="text-green-800 font-bold">Total: ${p.total?.toFixed(2) ?? "0.00"}</p>
                                </div>
                                <div className="mb-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold
                                        ${p.estado === "APROBADO" ? "bg-green-200 text-green-800" :
                                        p.estado === "RECHAZADO" ? "bg-red-200 text-red-800" :
                                        "bg-yellow-200 text-yellow-800"}`}>
                                        {p.estado ?? "Pendiente"}
                                    </span>
                                </div>
                                <div className="flex gap-2 justify-end">
                                    <button
                                        onClick={() => cambiarEstado(p.id, "APROBADO")}
                                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow transition font-semibold"
                                    >
                                        Aprobar
                                    </button>
                                    <button
                                        onClick={() => cambiarEstado(p.id, "RECHAZADO")}
                                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow transition font-semibold"
                                    >
                                        Rechazar
                                    </button>
                                    <button
                                        onClick={() => eliminarPrestamo(p.id)}
                                        className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg shadow transition font-semibold"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};
