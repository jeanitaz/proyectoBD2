import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { UsuarioService } from "../../services/usuarioService";
import type { Usuario } from "../../model/usuario";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

export const UpdateClient = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [Usuario, setUsuario] = useState<Usuario | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                if (!id) {
                    setNotFound(true);
                    setLoading(false);
                    return;
                }
                const data = await UsuarioService.getUsuarioById(id);
                setUsuario(data);
            } catch (error) {
                console.error("Usuario no encontrado:", error);
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };
        fetchUsuario();
    }, [id]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        if (!Usuario) return;
        setUsuario({ ...Usuario, [e.target.name]: e.target.value });
    };

    const actualizarUsuario = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!Usuario || !id) return;

        try {
            await UsuarioService.updateUsuario(id, Usuario);
            alert("Usuario actualizado exitosamente");
            navigate("/usuarios");
        } catch (error) {
            console.error("Error al actualizar Usuario:", error);
            alert("No se pudo actualizar el Usuario");
        }
    };

    if (loading) return <p className="m-10">Cargando Usuario...</p>;
    if (notFound)
        return <p className="m-10 text-red-600">Usuario con ID {id} no existe.</p>;
    if (!Usuario) return null;
    return (
        <div>
            <>
                <Navbar />
                <div className="max-w-2xl mx-auto mt-12 p-8 bg-gradient-to-br from-green-50 via-cyan-100 to-green-200 rounded-2xl shadow-2xl border border-cyan-300">
                    <h2 className="text-3xl font-extrabold mb-8 text-center text-cyan-800 tracking-wide">
                        Actualizar Usuario
                    </h2>
                    <form onSubmit={actualizarUsuario} className="space-y-6">
                        <div>
                            <label className="block text-cyan-900 font-semibold mb-2">
                                Cédula
                            </label>
                            <input
                                type="text"
                                name="cedula"
                                value={Usuario.cedula}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-cyan-300 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-cyan-900 font-semibold mb-2">
                                Nombre
                            </label>
                            <input
                                type="text"
                                name="nombre"
                                value={Usuario.nombre}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-cyan-300 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-cyan-900 font-semibold mb-2">
                                Apellido
                            </label>
                            <input
                                type="text"
                                name="apellido"
                                value={Usuario.apellido}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-cyan-300 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-cyan-900 font-semibold mb-2">
                                Teléfono
                            </label>
                            <input
                                type="text"
                                name="telefono"
                                value={Usuario.telefono}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-cyan-300 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-cyan-900 font-semibold mb-2">
                                Correo
                            </label>
                            <input
                                type="email"
                                name="correo"
                                value={Usuario.correo}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-cyan-300 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-cyan-900 font-semibold mb-2">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                name="contrasenia"
                                value={Usuario.contrasenia}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-cyan-300 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-cyan-900 font-semibold mb-2">
                                Rol
                            </label>
                            <select
                                name="rolId"
                                value={Usuario.rolId}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-cyan-300 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                required
                            >
                                <option value={1}>Cliente</option>
                                <option value={2}>Admin</option>
                                <option value={3}>Superadmin</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-cyan-500 via-green-400 to-cyan-600 hover:from-cyan-600 hover:to-green-500 text-white font-bold py-3 rounded-xl shadow-lg transition-all"
                        >
                            Actualizar
                        </button>
                    </form>
                </div>
                <Footer />
            </>
        </div>
    );
};
