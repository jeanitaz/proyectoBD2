export const Footer = () => (
    <footer className="bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-600 text-cyan-50 py-10 mt-10 shadow-inner">
        <div className="max-w-screen-xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-4 mb-6 md:mb-0">
                <span className="text-4xl animate-spin-slow">📖</span>
                <div>
                    <span className="font-extrabold text-2xl tracking-widest drop-shadow-lg text-cyan-200">BookLinks</span>
                    <p className="text-cyan-300 text-sm font-serif">Tu espacio de lectura y comunidad</p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-6">
                <a
                    href="mailto:biblioteca@correo.com"
                    className="hover:text-cyan-400 transition-colors duration-200 font-semibold"
                >
                    📧 Contacto
                </a>
                <a
                    href="#"
                    className="hover:text-cyan-400 transition-colors duration-200 font-semibold"
                >
                    📜 Términos
                </a>
                <a
                    href="#"
                    className="hover:text-cyan-400 transition-colors duration-200 font-semibold"
                >
                    🔒 Privacidad
                </a>
            </div>
            <div className="text-xs text-cyan-200 mt-6 md:mt-0 font-mono text-center md:text-right w-full md:w-auto">
                &copy; {new Date().getFullYear()} BookLinks Biblioteca. <br className="md:hidden" />
                Todos los derechos reservados.
            </div>
        </div>
    </footer>
);

