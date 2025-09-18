import { api } from "../api/api";
import type { Libro } from "../model/libro";

export const LibroService = {
    getLibro: async (): Promise<Libro[]> => {
        const { data } = await api.get<Libro[]>("/libros");
        return data;
    },

    getLibroById: async (id: string): Promise<Libro> => {
        const { data } = await api.get<Libro>(`/libros/${id}`);
        return data;
    },

    createLibros: async (libro: Libro): Promise<Libro> => {
        const { data } = await api.post<Libro>("/libros", libro);
        return data;
    },

    updateLibros: async (id: string, libro: Libro): Promise<Libro> => {
        const { data } = await api.put<Libro>(`/libros/${id}`, libro);
        return data;
    },

    deleteLibrosjuego: async (id: string): Promise<void> => {
        await api.delete(`/libros/${id}`);
    },

    getLibrosPorGenero: async (genero: string): Promise<Libro[]> => {
        const { data } = await api.get<Libro[]>(`/libros/genero/${genero}`);
        return data;
    },

    getLibrosPorAutor: async (autor: string): Promise<Libro[]> => {
        const { data } = await api.get<Libro[]>(`/libros/autor/${autor}`);
        return data;
    },
};
