export interface Prestamo {
    id?: string;
    fechaPrestamo: string;
    fechaDevolucion: string;
    estado: string;
    cantidad: number;
    subtotal: number;
    total: number;
    libroId: string;
    usuarioId: string;
}