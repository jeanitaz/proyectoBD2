import { UserRoundPen, UserRoundX, SquareChartGantt } from "lucide-react";
import { useEffect, useState } from "react";
import { UsuarioService } from "../../services/usuarioService";
import { Link } from "react-router-dom";
import type { Usuario } from "../../model/usuario";

export const TableClients = () => {
    const [loading, setLoading] = useState(true);
    const [Usuarios, setUsuarios] = useState<Usuario[]>([]);
    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const data = await UsuarioService.getUsuarios();
                setUsuarios(data);
            } catch (error) {
                console.error("Error al cargar Usuarios:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsuarios();
    }, []);
    const eliminarUsuario = async (id: string) => {
        try {
            await UsuarioService.deleteUsuario(id);
            alert("Usuario eliminado correctamente");
            setUsuarios((prevUsuarios) =>
                prevUsuarios.filter((Usuario) => Usuario.id != id)
            );
        } catch (error) {
            alert("Error al eliminar el Usuario");
            console.log("error: ", error);
        }
    };
    if (loading) return <p className="m-10">Cargando Usuarios...</p>;

    const nombrarRol = (id: number) => {
        let nombre = "";
        switch (id) {
            case 1:
                nombre = "Cliente";
                break;
            case 2:
                nombre = "Admin";
                break;
            case 3:
                nombre = "SuperAdmin";
                break;
            default:
                nombre = "Rol desconocido";
                break;
        }
        return nombre;
    };
    return (
        <div className="m-10">
            <div className="overflow-x-auto rounded-xl shadow-2xl bg-gradient-to-br from-green-50 via-cyan-100 to-green-200 p-4">
                <table className="w-full text-sm text-left text-gray-700">
                    <thead>
                        <tr className="bg-cyan-700 text-cyan-50">
                            <th className="px-6 py-4 rounded-tl-xl">Cédula</th>
                            <th className="px-6 py-4">Nombre</th>
                            <th className="px-6 py-4">Teléfono</th>
                            <th className="px-6 py-4">Correo</th>
                            <th className="px-6 py-4">Rol</th>
                            <th className="px-6 py-4 text-center">Préstamos</th>
                            <th className="px-6 py-4 rounded-tr-xl">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Usuarios.map((Usuario, idx) => (
                            <tr
                                key={Usuario.id}
                                className={`border-b last:border-none ${
                                    idx % 2 === 0
                                        ? "bg-white/80"
                                        : "bg-cyan-50"
                                } hover:bg-cyan-100 transition`}
                            >
                                <td className="px-6 py-4 font-semibold text-cyan-900">{Usuario.cedula}</td>
                                <td className="px-6 py-4">{Usuario.nombre.concat(" ", Usuario.apellido)}</td>
                                <td className="px-6 py-4">{Usuario.telefono}</td>
                                <td className="px-6 py-4">{Usuario.correo}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 rounded-full bg-cyan-700 text-cyan-50 text-xs font-bold">
                                        {nombrarRol(Usuario.rolId)}
                                    </span>
                                </td>
                                {Usuario.rolId !== 1 ? (
                                    <td className="px-6 py-4 text-center text-gray-400">No aplica</td>
                                ) : (
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center">
                                            <Link
                                                to={`/usuarios/prestamos/${Usuario.id}`}
                                                className="text-cyan-700 hover:text-cyan-900 transition"
                                            >
                                                <SquareChartGantt />
                                            </Link>
                                        </div>
                                    </td>
                                )}
                                <td className="px-6 py-4">
                                    <div className="flex gap-2 justify-center">
                                        <Link
                                            to={`/usuarios/editar/${Usuario.id}`}
                                            className="bg-cyan-700 hover:bg-cyan-800 text-cyan-50 rounded-full p-2 shadow transition"
                                            title="Editar usuario"
                                        >
                                            <UserRoundPen size={20} />
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                Usuario.id &&
                                                window.confirm("¿Deseas eliminar este Usuario?") &&
                                                eliminarUsuario(Usuario.id)
                                            }
                                            className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow transition"
                                            title="Eliminar usuario"
                                        >
                                            <UserRoundX size={20} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-8 flex justify-end">
                <Link
                    to={`/usuarios/registrar`}
                    className="bg-cyan-700 hover:bg-cyan-600 text-cyan-50 font-semibold rounded-lg px-6 py-3 shadow-lg transition"
                >
                    Registrar Nuevo Usuario
                </Link>
            </div>
        </div>
    );
};
