import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import type { Usuario } from "../model/usuario";

export const Navbar = () => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    useEffect(() => {
        const storedUsuario = localStorage.getItem("usuario");
        if (storedUsuario) {
            setUsuario(JSON.parse(storedUsuario));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("usuario");
        setUsuario(null);

        Swal.fire({
            icon: "success",
            title: "Sesión cerrada",
            text: "Has cerrado sesión correctamente",
            timer: 1500,
            showConfirmButton: false,
        });

        setTimeout(() => {
            navigate("/login");
        }, 1500);
    };

    return (
        <nav className="w-full bg-green-800 shadow-lg">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-3">
                <Link to={"/"} className="flex items-center gap-2">
                    <span className="text-3xl">📚</span>
                    <span className="self-center text-2xl font-bold text-white drop-shadow">BookLinks</span>
                </Link>
                <ul className="flex gap-6 items-center font-medium">
                    <li>
                        <Link
                            to={"/"}
                            className="text-white hover:text-green-300 font-semibold transition"
                        >
                            Inicio
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={"/libros"}
                            className="text-white hover:text-green-300 font-semibold transition"
                        >
                            Libros
                        </Link>
                    </li>
                    {usuario?.rolId === 1 && (
                        <li>
                            <Link
                                to={"/prestamos/mis-prestamos"}
                                className="text-white hover:text-green-300 font-semibold transition"
                            >
                                Mis Préstamos
                            </Link>
                        </li>
                    )}
                    {usuario?.rolId === 2 && (
                        <li>
                            <Link
                                to={"/dashboard/admin"}
                                className="text-white hover:text-green-300 font-semibold transition"
                            >
                                Dashboard Admin
                            </Link>
                        </li>
                    )}
                    {usuario?.rolId === 3 && (
                        <li>
                            <Link
                                to={"/dashboard/admin2"}
                                className="text-white hover:text-green-300 font-semibold transition"
                            >
                                Dashboard Admin2
                            </Link>
                        </li>
                    )}
                    {!usuario && (
                        <>
                            <li>
                                <Link
                                    to={"/login"}
                                    className="bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg px-5 py-2 shadow transition"
                                >
                                    Iniciar Sesión
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={"/usuarios/registrar"}
                                    className="bg-green-500 hover:bg-green-400 text-white font-semibold rounded-lg px-5 py-2 shadow transition"
                                >
                                    Registrarse
                                </Link>
                            </li>
                        </>
                    )}
                    {usuario && (
                        <li>
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg px-5 py-2 shadow transition"
                            >
                                Cerrar Sesión
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};
