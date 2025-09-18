
export const Footer = () => (
    <footer className="bg-gradient-to-r from-yellow-900 via-yellow-800 to-yellow-700 text-yellow-100 py-8 mt-10 shadow-inner">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
                <span className="text-3xl">📚</span>
                <span className="font-bold text-xl tracking-wide">Biblioteca Central</span>
            </div>
            <div className="text-sm text-yellow-200 mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} Biblioteca Central. Todos los derechos reservados.
            </div>
            <div className="flex gap-6">
                <a href="mailto:biblioteca@correo.com" className="hover:text-yellow-300 transition-colors duration-200">Contacto</a>
                <a href="#" className="hover:text-yellow-300 transition-colors duration-200">Términos</a>
                <a href="#" className="hover:text-yellow-300 transition-colors duration-200">Privacidad</a>
            </div>
        </div>
    </footer>
);