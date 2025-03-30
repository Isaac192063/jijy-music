import { AuthService } from "@/shared/services/AuthService";
import { User } from "@/shared/types/User";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function RegisterPage() {
    const [nombre, setNombre] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const navigate = useNavigate();

    function handleTelefonoChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value.replace(/\D/g, ""); // Elimina caracteres no numéricos
        setTelefono(value);
    }

    function validatePassword(password: string) {
        const errors = [];
        if (password.length < 6) errors.push("Debe tener al menos 6 caracteres");
        if (!/\d/.test(password)) errors.push("Debe incluir al menos un número");
        if (!/[A-Z]/.test(password)) errors.push("Debe incluir al menos una letra mayúscula");
        return errors;
    }

    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordErrors(validatePassword(newPassword));
    }

    function handleConfirmPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        setConfirmPassword(e.target.value);
        setPasswordsMatch(password === e.target.value);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);

        if (passwordErrors.length > 0) {
            setError("Corrige los errores en la contraseña antes de continuar.");
            return;
        }

        if (!passwordsMatch) {
            setError("Las contraseñas no coinciden");
            return;
        }

        // Aquí iría la lógica para enviar los datos
        console.log("Formulario enviado");
        console.log(nombre, email, telefono, password, confirmPassword, username);

        const user: User = {
            name: nombre,
            email,
            password,
            phone: telefono,
            username,
        };

        AuthService.register(user)
            .then((response) => {
                toast("Usuario autenticado", {
                    description: "Usuario autenticado correctamente",
                    richColors: true,
                });

                setTimeout(() => {
                    navigate("/home");
                }, 1000);
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
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-orange-600 flex-col gap-5 pt-10 px-4">
            <div className="w-full max-w-md bg-white/20 backdrop-blur-lg rounded-xl shadow-lg p-8 mt-5">
                <div className="flex justify-center mb-5">
                    <img
                        src="https://tse2.mm.bing.net/th?id=OIG4.KepMUzUu8OOIM33Wt1Hh&pid=ImgGn"
                        alt="JIJY Music Club"
                        className="w-full max-w-[200px] rounded-xl"
                    />
                </div>

                <div className="w-full">
                    <form className="w-full" onSubmit={handleSubmit}>
                        <h3 className="text-2xl text-white text-center font-bold mb-4">
                            Regístrate en JIJY
                        </h3>

                        {error && (
                            <p className="text-white bg-red-500/70 p-3 rounded-lg mb-4">{error}</p>
                        )}

                        <div className="mb-3">
                            <label className="block text-white text-sm font-medium mb-1">
                                Nombre
                            </label>
                            <input
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                                className="w-full p-3 rounded-lg border-none bg-white/30 text-white placeholder-white/80 text-base focus:outline-none focus:ring-2 focus:ring-white/50"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="block text-white text-sm font-medium mb-1">
                                E-mail
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full p-3 rounded-lg border-none bg-white/30 text-white placeholder-white/80 text-base focus:outline-none focus:ring-2 focus:ring-white/50"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="block text-white text-sm font-medium mb-1">
                                Username
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full p-3 rounded-lg border-none bg-white/30 text-white placeholder-white/80 text-base focus:outline-none focus:ring-2 focus:ring-white/50"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="block text-white text-sm font-medium mb-1">
                                Teléfono
                            </label>
                            <input
                                type="text"
                                value={telefono}
                                onChange={handleTelefonoChange}
                                required
                                className="w-full p-3 rounded-lg border-none bg-white/30 text-white placeholder-white/80 text-base focus:outline-none focus:ring-2 focus:ring-white/50"
                            />
                        </div>

                        <div className="mb-1">
                            <label className="block text-white text-sm font-medium mb-1">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                                className="w-full p-3 rounded-lg border-none bg-white/30 text-white placeholder-white/80 text-base focus:outline-none focus:ring-2 focus:ring-white/50"
                            />
                        </div>

                        {passwordErrors.length > 0 && (
                            <ul className="mb-3 list-disc pl-5">
                                {passwordErrors.map((err, index) => (
                                    <li key={index} className="text-white/90 text-sm">
                                        {err}
                                    </li>
                                ))}
                            </ul>
                        )}

                        <div className="mb-4">
                            <label className="block text-white text-sm font-medium mb-1">
                                Confirma contraseña
                            </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                required
                                className="w-full p-3 rounded-lg border-none bg-white/30 text-white placeholder-white/80 text-base focus:outline-none focus:ring-2 focus:ring-white/50"
                            />
                            {!passwordsMatch && confirmPassword.length > 0 && (
                                <p className="text-white bg-red-500/70 p-2 rounded-lg mt-2 text-sm">
                                    Las contraseñas no coinciden
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 px-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        >
                            Continuar
                        </button>

                        <button
                            type="button"
                            className="w-full mt-3 bg-white hover:bg-gray-100 text-gray-700 flex items-center justify-center gap-2.5 py-3 px-4 rounded-lg text-base border border-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        >
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png"
                                alt="Google"
                                className="w-6 h-6"
                            />
                            Iniciar sesión con Google
                        </button>

                        <p className="text-white text-center mt-4">
                            ¿Ya tienes cuenta?{" "}
                            <a href="login" className="font-bold underline">
                                Inicia sesión aquí
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
