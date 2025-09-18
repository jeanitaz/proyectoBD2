import { api } from "../api/api";
import type { Rol } from "../model/rol";

export const RolService = {
    getRoles: async (): Promise<Rol[]> => {
        const { data } = await api.get<Rol[]>("/api/roles");
        return data;
    },

    getRolById: async (id: number): Promise<Rol> => {
        const { data } = await api.get<Rol>(`/api/roles/${id}`);
        return data;
    },

    createRol: async (rol: Rol): Promise<Rol> => {
        const { data } = await api.post<Rol>("/api/roles", rol);
        return data;
    },

    updateRol: async (id: number, rol: Rol): Promise<Rol> => {
        const { data } = await api.put<Rol>(`/api/roles/${id}`, rol);
        return data;
    },

    deleteRol: async (id: number): Promise<void> => {
        await api.delete(`/api/roles/${id}`);
    },
};
