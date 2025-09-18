import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { UsuarioService } from "../services/usuarioService";
import Swal from "sweetalert2";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [correo, setCorreo] = useState("");
    const [contrasenia, setContrasenia] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const usuario = await UsuarioService.login(correo, contrasenia);

            login({
                ...usuario,
                id: usuario.id ?? "",
            });

            localStorage.setItem("usuario", JSON.stringify(usuario));

            Swal.fire({
                icon: "success",
                title: "¡Bienvenido!",
                text: `Hola ${usuario.nombre}`,
                timer: 1500,
                showConfirmButton: false,
            });

            switch (usuario.rolId) {
                case 1:
                    navigate("/prestamos/mis-prestamos");
                    break;
                case 2:
                    navigate("/dashboard/admin");
                    break;
                case 3:
                    navigate("/dashboard/admin2");
                    break;
                default:
                    navigate("/");
            }
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Correo o contraseña incorrectos",
            });
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300">
                <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white/80 backdrop-blur-lg border border-yellow-300">
                    <div className="flex flex-col items-center mb-6">
                        <span className="text-5xl mb-2">📚</span>
                        <h2 className="text-3xl font-bold text-yellow-900 mb-2">
                            Bienvenido a la Biblioteca
                        </h2>
                        <p className="text-yellow-800 text-center">
                            Accede a tu cuenta para gestionar tus préstamos y explorar
                            libros.
                        </p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-yellow-900 font-semibold mb-1">
                                Correo
                            </label>
                            <input
                                type="email"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                className="w-full px-4 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-yellow-50"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-yellow-900 font-semibold mb-1">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                value={contrasenia}
                                onChange={(e) => setContrasenia(e.target.value)}
                                className="w-full px-4 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-yellow-50"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-yellow-800 hover:bg-yellow-700 text-yellow-100 font-bold py-2 px-4 rounded-lg shadow transition"
                        >
                            Iniciar Sesión
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};
