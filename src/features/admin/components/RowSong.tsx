import { Song } from "@/shared/types/Music";
import { useSongStorage } from "@/store/SongStorage";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Edit, MoreHorizontal, Pause, Play, Trash2 } from "lucide-react";
import { toast, Toaster } from "sonner";
import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RowSong({
    song,
    currentSongIndex,
    index,
    togglePlayPause,
    isPlaying,
}: {
    song: Song;
    currentSongIndex: any;
    index: any;
    togglePlayPause: any;
    isPlaying: boolean;
}) {
    const { deleteSong, updateSong } = useSongStorage();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editedSong, setEditedSong] = useState<Song>({ ...song });

    const deleteMusic = () => {
        deleteSong(song.id!)
            .then(() => {
                console.log("Elimento eliminado");
                toast("Canción eliminada", {
                    description: "Canción eliminada correctamente",
                    richColors: true,
                    style: {
                        backgroundColor: "#FFA559", // Naranja suave
                        color: "#4A2902", // Marrón oscuro para contraste
                        border: "1px solid #FF8C42", // Borde un poco más oscuro
                    },
                });
                setIsDeleteDialogOpen(false);
            })
            .catch((error) => {
                toast("ERROR al eliminar canción", {
                    description: error.response?.data?.message || "Ocurrió un error al eliminar",
                    richColors: true,
                    style: {
                        backgroundColor: "#FFA559",
                        color: "#4A2902",
                        border: "1px solid #FF8C42",
                    },
                });
            });
    };

    const handleSaveEdit = () => {
        updateSong(editedSong, song.id!)
            .then(() => {
                toast("Canción actualizada", {
                    description: "Canción actualizada correctamente",
                    richColors: true,
                    style: {
                        backgroundColor: "white",
                        color: "#4A2902",
                        border: "1px solid #FF8C42",
                    },
                });
                setIsEditDialogOpen(false);
            })
            .catch((error) => {
                toast("ERROR al actualizar canción", {
                    description: error.response?.data?.message || "Ocurrió un error al actualizar",
                    richColors: true,
                    style: {
                        backgroundColor: "#FFA559",
                        color: "#4A2902",
                        border: "1px solid #FF8C42",
                    },
                });
            });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Song) => {
        setEditedSong({
            ...editedSong,
            [field]: e.target.value,
        });
    };

    return (
        <>
            <Toaster />
            <div
                key={song.id}
                className={`flex hover:bg-gray-200 transition cursor-pointer ${
                    currentSongIndex === index ? "bg-orange-100" : ""
                }`}
            >
                <div
                    className="w-14 py-3 px-3 flex items-center"
                    onClick={() => togglePlayPause(index)}
                >
                    <button className="p-2 rounded-full bg-orange-500 hover:bg-orange-400 transition text-white">
                        {currentSongIndex === index && isPlaying ? (
                            <Pause size={14} />
                        ) : (
                            <Play size={14} />
                        )}
                    </button>
                </div>

                <div
                    className={`px-3 py-4 flex-1 font-medium ${
                        currentSongIndex === index ? "text-orange-700" : "text-gray-800"
                    }`}
                >
                    {song.title}
                </div>
                <div className="px-3 py-4 flex-1 text-gray-600 none hidden md:block">
                    {song.artist}
                </div>
                <div className="px-3 py-4 flex-1 text-gray-600 hidden md:block">{song.album}</div>
                <div className="px-3 py-4 flex-1 text-gray-600 hidden md:block">
                    {song.genres.length > 0 ? (
                        song.genres.map((g) => g.name).join(", ")
                    ) : (
                        <span className="text-gray-400">Sin géneros</span>
                    )}
                </div>
                <div className="w-14 py-3 px-3 flex items-center justify-between">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
                                <MoreHorizontal size={18} className="text-gray-600" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="bg-white shadow-md rounded-lg p-2 w-36"
                        >
                            <DropdownMenuItem
                                className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition"
                                onClick={() => setIsEditDialogOpen(true)}
                            >
                                <Edit size={18} className="text-gray-700" />
                                <span className="text-sm">Editar</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md text-red-500 hover:bg-red-50 transition"
                                onClick={() => setIsDeleteDialogOpen(true)}
                            >
                                <Trash2 size={18} />
                                <span className="text-sm">Eliminar</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Modal de Confirmación para Eliminar */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl font-semibold text-gray-800">
                            ¿Estás seguro de eliminar esta canción?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-600">
                            Esta acción eliminará permanentemente "{song.title}" de tu biblioteca.
                            Esta acción no se puede deshacer.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-4">
                        <AlertDialogCancel className="bg-gray-200 hover:bg-gray-300 text-gray-800 border-none">
                            Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={deleteMusic}
                            className="bg-red-500 hover:bg-red-600 text-white"
                        >
                            Eliminar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Diálogo para Editar Canción */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-gray-800">
                            Editar canción
                        </DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title" className="text-gray-700">
                                Título
                            </Label>
                            <Input
                                id="title"
                                value={editedSong.title}
                                onChange={(e) => handleInputChange(e, "title")}
                                className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="artist" className="text-gray-700">
                                Artista
                            </Label>
                            <Input
                                id="artist"
                                value={editedSong.artist}
                                onChange={(e) => handleInputChange(e, "artist")}
                                className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="album" className="text-gray-700">
                                Álbum
                            </Label>
                            <Input
                                id="album"
                                value={editedSong.album}
                                onChange={(e) => handleInputChange(e, "album")}
                                className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsEditDialogOpen(false)}
                            className="text-gray-800 border-gray-300 hover:bg-gray-100"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="button"
                            onClick={handleSaveEdit}
                            className="bg-orange-500 hover:bg-orange-600 text-white"
                        >
                            Guardar cambios
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
