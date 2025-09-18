
import { api } from "../api/api";
import type { Prestamo } from "../model/prestamo";

export const PrestamoService = {
    getPrestamos: async (): Promise<Prestamo[]> => {
        const { data } = await api.get<Prestamo[]>("/prestamo");
        return data;
    },

    getPrestamoById: async (id: string): Promise<Prestamo> => {
        const { data } = await api.get<Prestamo>(`/prestamo/${id}`);
        return data;
    },

    createPrestamo: async (prestamo: Prestamo): Promise<Prestamo> => {
        const { data } = await api.post<Prestamo>("/prestamo", prestamo);
        return data;
    },

    updatePrestamo: async (id: string, prestamo: Prestamo): Promise<Prestamo> => {
        const { data } = await api.put<Prestamo>(`/prestamo/${id}`, prestamo);
        return data;
    },

    deletePrestamo: async (id: string): Promise<void> => {
        await api.delete(`/prestamo/${id}`);
    },

    getPrestamosPorUsuario: async (usuarioId: string): Promise<Prestamo[]> => {
        const { data } = await api.get<Prestamo[]>(`/prestamo/usuario/${usuarioId}`);
        return data;
    },

    getPrestamosPorLibro: async (libroId: string): Promise<Prestamo[]> => {
        const { data } = await api.get<Prestamo[]>(`/prestamo/libro/${libroId}`);
        return data;
    },

    getPrestamosPorEstado: async (estado: string): Promise<Prestamo[]> => {
        const { data } = await api.get<Prestamo[]>(`/prestamo/estado/${estado}`);
        return data;
    },

    cambiarEstado: async (id: string, nuevoEstado: string): Promise<void> => {
        await api.patch(`/prestamo/${id}/estado`, { estado: nuevoEstado });
    },

};