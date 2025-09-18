import { api } from "../api/api";
import type { Usuario } from "../model/usuario";
export const UsuarioService = {
    getUsuarios: async (): Promise<Usuario[]> => {
        const { data } = await api.get<Usuario[]>("/usuarios");
        return data;
    },
    getUsuarioById: async (id: string): Promise<Usuario> => {
        const { data } = await api.get<Usuario>(`/usuarios/${id}`);
        return data;
    },
    createUsuario: async (Usuario: Usuario): Promise<Usuario> => {
        const { data } = await api.post<Usuario>("/usuarios", Usuario);
        return data;
    },
    updateUsuario: async (id: string, Usuario: Usuario): Promise<Usuario> => {
        const { data } = await api.put<Usuario>(`/usuarios/${id}`, Usuario);
        return data;
    },
    deleteUsuario: async (id: string): Promise<void> => {
        await api.delete(`/usuarios/${id}`);
    },
    login: async (correo: string, contrasenia: string): Promise<Usuario> => {
        const { data } = await api.post<Usuario>("/usuarios/login", {
            correo,
            contrasenia,
        });
        return data;
    },
};
