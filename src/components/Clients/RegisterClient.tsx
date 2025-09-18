import { useState } from "react";
import { UsuarioService } from "../../services/usuarioService";
import { useNavigate } from "react-router-dom";
import type { Usuario } from "../../model/usuario";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";

export const RegisterClient = () => {
    const navigate = useNavigate();
    const [Usuario, setUsuario] = useState<Usuario>({
        cedula: "",
        nombre: "",
        apellido: "",
        telefono: "",
        correo: "",
        contrasenia: "",
        rolId: 0,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setUsuario({ ...Usuario, [e.target.name]: e.target.value });
    };

    const guardarUsuario = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await UsuarioService.createUsuario(Usuario);
            alert("Usuario Registrado Exitosamente");
            setUsuario({
                cedula: "",
                nombre: "",
                apellido: "",
                telefono: "",
                correo: "",
                contrasenia: "",
                rolId: 0,
            });
            navigate("/");
        } catch (error) {
            alert("Error al registrar Usuario");
            console.log("Error:", error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="max-w-2xl mx-auto mt-12 p-8 bg-gradient-to-br from-green-50 via-cyan-100 to-green-200 rounded-2xl shadow-2xl border border-cyan-300">
                <h2 className="text-3xl font-extrabold mb-8 text-center text-cyan-800 tracking-wide">
                    Registrar Usuario
                </h2>
                <form onSubmit={guardarUsuario} className="space-y-6">
                    <div>
                        <label className="block text-cyan-900 font-semibold mb-2">
                            Cédula
                        </label>
                        <input
                            type="text"
                            name="cedula"
                            value={Usuario.cedula}
                            onChange={handleChange}
                            required
                            minLength={10}
                            maxLength={10}
                            className="w-full px-4 py-2 border border-cyan-300 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-cyan-400"
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
                            required
                            minLength={2}
                            maxLength={50}
                            className="w-full px-4 py-2 border border-cyan-300 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-cyan-400"
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
                            required
                            minLength={2}
                            maxLength={50}
                            className="w-full px-4 py-2 border border-cyan-300 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                    </div>
                    <div>
                        <label className="block text-cyan-900 font-semibold mb-2">
                            Teléfono
                        </label>
                        <input
                            type="tel"
                            name="telefono"
                            value={Usuario.telefono}
                            onChange={handleChange}
                            required
                            pattern="^\+?[0-9]{7,15}$"
                            title="Debe tener 10 dígitos"
                            className="w-full px-4 py-2 border border-cyan-300 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-cyan-400"
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
                            required
                            className="w-full px-4 py-2 border border-cyan-300 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-cyan-400"
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
                            required
                            minLength={8}
                            className="w-full px-4 py-2 border border-cyan-300 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-cyan-400"
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
                            required
                            className="w-full px-4 py-2 border border-cyan-300 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        >
                            <option value={0}>Seleccione un rol</option>
                            <option value={1}>Cliente</option>
                            <option value={2}>Admin</option>
                            <option value={3}>Admin Master</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-cyan-500 via-green-400 to-cyan-600 hover:from-cyan-600 hover:to-green-500 text-white font-bold py-3 rounded-xl shadow-lg transition-all"
                    >
                        Registrar
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
};
