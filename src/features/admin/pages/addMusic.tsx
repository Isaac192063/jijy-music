import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Music, Upload } from "lucide-react";
import { SongRequest } from "@/shared/types/Music";
import { SongService } from "@/shared/services/SongService";
import { GenreCombobox } from "../components/comboBox";
import { toast, Toaster } from "sonner"
import { useNavigate } from "react-router-dom";
import { Genres } from "@/shared/types/Genres";

const AddMusicPage = () => {
    // Datos de ejemplo
    const [selectedGenres, setSelectedGenres] = useState<Genres[]>([]);
    const navigator = useNavigate()
    

    // Estado para el formulario de subida
    const [newSong, setNewSong] = useState<SongRequest>({
        title: "",
        artist: "",
        album: "",
    });

    // Estado para el archivo seleccionado
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    // Manejar selección de archivo
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);

            // Extraer información básica del archivo
            const fileName = file.name;

            // Intentar extraer título del nombre del archivo
            let title = fileName.split(".")[0].replace(/_/g, " ");
            title = title.replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalizar primera letra de cada palabra

            setNewSong({
                ...newSong,
                title: title,
            });
        }
    };

    // Manejar drag and drop
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            setSelectedFile(file);

            const fileName = file.name;
            let title = fileName.split(".")[0].replace(/_/g, " ");
            title = title.replace(/\b\w/g, (char) => char.toUpperCase());

            setNewSong({
                ...newSong,
                title: title,
            });
        }
    };

    // Agregar canción
    const handleAddSong = () => {
        console.log(selectedGenres);

        newSong.genres = selectedGenres.map(genre => genre.id).join(",");
        
        newSong.song = selectedFile || new File([], "");

        SongService.create({...newSong})
        .then(res => {
            console.log(res);
            toast("Canción agregada correctamente", {
                description: new Date().toLocaleString("es-ES", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                action: {
                  label: "Ver",
                  onClick: () => navigator('/admin/songs'),
                },
              });
        })
        .catch(erro =>{
            console.log(erro);

            toast("Error al agregar la cancion", {
                description: erro,
                className: 'bg-red-200',

              });
        })


        //  *** clean ***
        // setSelectedFile(null);
        // setNewSong({
        //     title: "",
        //     artist: "",
        //     album: "",
        // });
        // setSelectedGenres([])
    };

    return (
        <div className="min-h-screen bg-orange-50">
            <Toaster />
            <main className="container mx-auto p-4">
                <section className="space-y-4 mt-4">
                    <Card className="bg-white">
                        <CardHeader>
                            <CardTitle>Subir Nueva Canción</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* Área de Drop Zone */}
                            <div
                                className={`border-2 border-dashed rounded-lg p-6 mb-6 text-center cursor-pointer transition-colors ${
                                    isDragging
                                        ? "border-orange-500 bg-orange-50"
                                        : "border-gray-300 hover:border-orange-400"
                                }`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={() => document.getElementById("file-upload")?.click()}
                            >
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept="audio/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />

                                {selectedFile ? (
                                    <div className="flex flex-col items-center justify-center">
                                        <Music className="h-12 w-12 text-orange-500 mb-2" />
                                        <p className="text-lg font-medium text-gray-700">
                                            {selectedFile.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center">
                                        <Upload className="h-12 w-12 text-gray-400 mb-2" />
                                        <p className="text-lg font-medium text-gray-700">
                                            Arrastra o haz clic para subir un archivo
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            MP3, WAV, FLAC (Max. 10MB)
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Título</Label>
                                    <Input
                                        id="title"
                                        value={newSong.title}
                                        onChange={(e) =>
                                            setNewSong({ ...newSong, title: e.target.value })
                                        }
                                        className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="artist">Artista</Label>
                                    <Input
                                        id="artist"
                                        value={newSong.artist}
                                        onChange={(e) =>
                                            setNewSong({ ...newSong, artist: e.target.value })
                                        }
                                        className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="album">Álbum</Label>
                                    <Input
                                        id="album"
                                        value={newSong.album}
                                        onChange={(e) =>
                                            setNewSong({ ...newSong, album: e.target.value })
                                        }
                                        className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="duration">Generos</Label>
                                    <GenreCombobox
                                        selectedGenres={selectedGenres}
                                        setSelectedGenres={setSelectedGenres}
                                    />
                                </div>
                            </div>

                            <Button
                                className="mt-6 bg-orange-500 hover:bg-orange-600 w-full py-6 text-lg font-medium rounded-md shadow-lg hover:shadow-xl transition-all"
                                onClick={handleAddSong}
                                disabled={!selectedFile}
                            >
                                <PlusCircle className="mr-2 h-5 w-5" />
                                Subir Canción
                            </Button>
                        </CardContent>
                    </Card>
                </section>
            </main>
        </div>
    );
};

export default AddMusicPage;
