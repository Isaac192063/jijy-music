import React, {  useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { Music, Play, Headphones } from "lucide-react";
import { AuthService } from "@/shared/services/AuthService";
import { toast, Toaster } from "sonner";

interface LoginFormProps {
    onSubmit?: (email: string, password: string) => void;
}

export const LoginPage: React.FC<LoginFormProps> = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("object");
        console.log(email, password);

        AuthService.login({ email, password })
            .then((response) => {
                const role = response.role[0].authority || "ROLE_USER";
                toast("Usuario autenticado", {
                    description: "Usuario autenticado correctamente",
                    richColors: true,
                });

                setTimeout(() => {
                    if (role === "ROLE_ADMIN") {
                        navigate("/admin");
                    }
                    if (role === "ROLE_USER") {
                        navigate("/home");
                    }
                }, 1200);
            })
            .catch((error) => {
                toast("Error de authenticacion", {
                    description: error.response.data.message[0],
                    richColors: true,
                    style: {
                        backgroundColor: "#FFA559",
                        color: "#4A2902",
                        border: "1px solid #FF8C42",
                    },
                });
            });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
            <Toaster />
            <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
                {/* Imagen y branding */}
                <div className="hidden md:flex flex-col items-center justify-center space-y-6 p-6">
                    <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-2xl">
                        <img
                            src="https://tse2.mm.bing.net/th?id=OIG4.KepMUzUu8OOIM33Wt1Hh&pid=ImgGn"
                            alt="JIJY Music Club"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-orange-900/70 to-transparent flex flex-col justify-end p-6">
                            <div className="flex items-center space-x-2 text-white mb-2">
                                <Music className="w-8 h-8" />
                                <h2 className="text-2xl font-bold">JIJY Music Club</h2>
                            </div>
                            <p className="text-white/90 text-sm">
                                Tu pasión por la música comienza aquí
                            </p>
                        </div>
                    </div>

                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg w-full">
                        <h3 className="text-lg font-medium text-orange-800 mb-3 flex items-center">
                            <Headphones className="w-5 h-5 mr-2" />
                            Descubre el ritmo de tu vida
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Únete a nuestra comunidad de amantes de la música y disfruta de
                            experiencias sonoras inolvidables.
                        </p>
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                            <p className="text-sm text-orange-700">Miles de canciones</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                            <p className="text-sm text-orange-700">Playlists personalizadas</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                            <p className="text-sm text-orange-700">Eventos exclusivos</p>
                        </div>
                    </div>
                </div>

                {/* Formulario */}
                <Card className="w-full bg-white/95 backdrop-blur border-orange-200 shadow-xl overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600"></div>

                    <CardHeader className="space-y-1">
                        <div className="flex justify-center mb-2">
                            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                                <Play className="w-6 h-6 ml-1" />
                            </div>
                        </div>
                        <CardTitle className="text-2xl text-center text-orange-800">
                            Bienvenido a JIJY
                        </CardTitle>
                        <CardDescription className="text-center text-gray-500">
                            Inicia sesión para descubrir tu próxima canción favorita
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-gray-700">
                                    Correo electrónico
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="tu@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="password" className="text-gray-700">
                                        Contraseña
                                    </Label>
                                    <Link
                                        to="/reset-password"
                                        className="text-xs text-orange-600 hover:text-orange-800 font-medium"
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </Link>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-2 rounded-md transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
                            >
                                Iniciar sesión
                            </Button>
                        </form>

                        <div className="mt-6 relative flex items-center justify-center">
                            <Separator className="absolute w-full bg-gray-200" />
                            <span className="relative bg-white px-2 text-xs text-gray-500">
                                o continúa con
                            </span>
                        </div>

                        <Button
                            variant="outline"
                            className="w-full mt-6 border-gray-300 text-gray-700 flex items-center justify-center gap-2 hover:bg-gray-50"
                        >
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png"
                                alt="Google"
                                className="w-4 h-4"
                            />
                            Iniciar sesión con Google
                        </Button>
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-4 pt-0">
                        <p className="text-sm text-center text-gray-600">
                            ¿Aún no tienes cuenta en JIJY?{" "}
                            <Link
                                to="/auth/register"
                                className="font-medium text-orange-600 hover:text-orange-800 hover:underline transition-colors"
                            >
                                Regístrate aquí
                            </Link>
                        </p>

                        <p className="text-xs text-center text-gray-500">
                            Al iniciar sesión, aceptas nuestros{" "}
                            <Link to="/terms" className="text-orange-600 hover:underline">
                                Términos de servicio
                            </Link>{" "}
                            y{" "}
                            <Link to="/privacy" className="text-orange-600 hover:underline">
                                Política de privacidad
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};
