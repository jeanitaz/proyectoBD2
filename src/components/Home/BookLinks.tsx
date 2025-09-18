import { Link } from "react-router-dom";
import "../../styles/home.css";

export const BooksLinks = () => {
    const librosDestacados = [
        {
            titulo: "Cien años de soledad",
            descripcion: "La obra maestra de Gabriel García Márquez sobre la familia Buendía.",
            imagenUrl: "https://images.ctfassets.net/4cd45et68cgf/2Ct3i2g818EuxwPDUFOyl5/82043f6b4636ecb08331b3c34e1e659a/es_mx_cads_main_main_teaser_key_art_-_coronel_vertical_27x40_rgb_pre_1.jpg?w=2000",
        },
        {
            titulo: "El Principito",
            descripcion: "Un clásico universal sobre la inocencia y la sabiduría.",
            imagenUrl: "https://online.fliphtml5.com/ilypf/stri/files/large/1.webp?1601836779&1601836779",
        },
        {
            titulo: "Don Quijote de la Mancha",
            descripcion: "La gran novela de Miguel de Cervantes sobre la aventura y la imaginación.",
            imagenUrl: "https://cdn.kobo.com/book-images/27525b70-25dd-479b-91f6-107b3646cb3f/1200/1200/False/don-quijote-de-la-mancha-para-ninos-nueva-edicion-1.jpg",
        },
    ];

    return (
        <section className="bg-gradient-to-b from-white via-green-50 to-green-100 text-gray-900">
            {/* Hero */}
            <div className="relative w-full h-screen">
                <img
                    src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80"
                    alt="Biblioteca"
                    className="w-full h-full object-cover brightness-75"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-start px-8 lg:px-32 space-y-4">
                    <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-xl text-white">
                        BookLinks: Tu Biblioteca Digital
                    </h1>
                    <p className="text-lg md:text-xl drop-shadow-sm text-gray-200">
                        Descubre, solicita y gestiona tus libros favoritos desde cualquier lugar.<br />
                        BookLinks te conecta con la lectura y el conocimiento.
                    </p>
                    <div className="flex flex-wrap gap-4 mt-6">
                        <Link
                            to={"/libros"}
                            className="px-6 py-3 bg-green-700 rounded-lg shadow-lg hover:bg-green-600 transition-all"
                        >
                            Explorar Libros
                        </Link>
                    </div>
                </div>
            </div>

            {/* Libros destacados */}
            <div className="py-24 max-w-screen-xl mx-auto px-4">
                <h2 className="text-5xl font-bold text-center mb-16">
                    Libros Destacados
                </h2>
                <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-12">
                    {librosDestacados.map((l, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-700"
                        >
                            <img
                                src={l.imagenUrl}
                                alt={l.titulo}
                                className="w-full h-72 object-cover"
                            />
                            <div className="p-8 text-center">
                                <h3 className="text-3xl font-bold mb-3">{l.titulo}</h3>
                                <p className="text-gray-700 text-lg">{l.descripcion}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA final */}
            <div className="py-24 bg-gradient-to-r from-green-50 via-green-100 to-white text-center">
                <h2 className="text-5xl font-bold mb-6">¿Listo para leer?</h2>
                <p className="text-gray-700 mb-8 text-xl">
                    Únete a BookLinks y accede a los mejores libros de la biblioteca.
                </p>
                <Link
                    to={"/libros"}
                    className="px-10 py-4 bg-green-700 rounded-lg font-bold text-white hover:bg-green-600 transition-colors shadow-lg hover:shadow-2xl"
                >
                    Comenzar Ahora
                </Link>
                <div className="loader-wrapper">
                    <div className="book-loader"></div>
                </div>
            </div>
        </section>
    );
};
