import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PrestamoService } from "../../services/prestamoService";
import type { Prestamo } from "../../model/prestamo";
import type { Libro } from "../../model/libro";
import { LibroService } from "../../services/libroService";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

export const UpdatePrestamoClient = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [prestamo, setPrestamo] = useState<Prestamo | null>(null);
    const [libro, setLibro] = useState<Libro | null>(null);
    const [cantidad, setCantidad] = useState<number>(1);
    const [subtotal, setSubtotal] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        if (!id) return;
        const fetchData = async () => {
            try {
                const data = await PrestamoService.getPrestamoById(id);
                setPrestamo(data);
                setCantidad(data.cantidad);

                const game = await LibroService.getLibroById(
                    data.libroId
                );
                setLibro(game);

                const newSubtotal = data.cantidad * game.precio;
                setSubtotal(newSubtotal);
                setTotal(newSubtotal * 1.15);
            } catch (error) {
                console.error("Error al cargar préstamo:", error);
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        if (!libro) return;
        const newSubtotal = cantidad * libro.precio;
        setSubtotal(newSubtotal);
        setTotal(newSubtotal * 1.15);
    }, [cantidad, libro]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prestamo || !libro) return;

        const updatedPrestamo: Prestamo = {
            ...prestamo,
            cantidad,
            subtotal,
            total,
            estado: "PENDIENTE", 
        };

        try {
            await PrestamoService.updatePrestamo(prestamo.id!, updatedPrestamo);
            alert("Préstamo actualizado correctamente");
            navigate("/prestamos/mis-prestamos");
        } catch (error) {
            console.error("Error al actualizar préstamo:", error);
            alert("No se pudo actualizar el préstamo");
        }
    };

    if (!prestamo || !libro)
        return <p className="m-10">Cargando préstamo...</p>;

    return (
        <>
            <Navbar />
            <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6">Editar Préstamo</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1">libro</label>
                        <input
                            type="text"
                            value={libro.titulo}
                            disabled
                            className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Cantidad</label>
                        <input
                            type="number"
                            min={1}
                            max={libro.stock}
                            value={cantidad}
                            onChange={(e) => setCantidad(parseInt(e.target.value))}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>

                    <div>
                        <p>Subtotal: ${subtotal.toFixed(2)}</p>
                        <p>Total (IVA 15%): ${total.toFixed(2)}</p>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg"
                    >
                        Guardar cambios
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
};
