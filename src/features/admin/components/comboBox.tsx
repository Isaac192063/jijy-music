import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Genres } from "@/shared/types/Genres";
import { GenresService } from "@/shared/services/GenresService";

interface GenreComboboxProps {
    selectedGenres: Genres[];
    setSelectedGenres: React.Dispatch<React.SetStateAction<Genres[]>>;
}

export function GenreCombobox({ selectedGenres, setSelectedGenres }: GenreComboboxProps) {
    const [open, setOpen] = React.useState(false);

    const [genres, setGenres] = React.useState<Genres[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchGenres = async () => {
            try {
                setIsLoading(true);
                const data = await GenresService.getAll();
                setGenres(data);
            } catch (error) {
                console.error("Error al cargar los géneros:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchGenres();
    }, []);

    const handleSelect = (value: string) => {
        const selected = genres.find((genre) => genre.id === value);
        if (!selected) return;
        setSelectedGenres((prev) =>
            prev.some((g) => g.id === value)
                ? prev.filter((g) => g.id !== value)
                : [...prev, selected]
        );
    };

    if (isLoading) {
        return <div>Cargando géneros...</div>;
    }

    return (
        <div className="space-y-2">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                    >
                        {selectedGenres.length > 0
                            ? selectedGenres.map((g) => g.name).join(", ")
                            : "Seleccionar géneros"}
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[250px] p-0">
                    <Command>
                        <CommandInput placeholder="Buscar género..." className="h-9" />
                        <CommandList>
                            <CommandEmpty>No se encontró ningún género.</CommandEmpty>
                            <CommandGroup>
                                {genres.map((genre) => (
                                    <CommandItem
                                        key={genre.id}
                                        value={genre.name} // Usamos name para el filtrado automático
                                        onSelect={() => handleSelect(genre.id)}
                                    >
                                        {genre.name}
                                        <Check
                                            className={cn(
                                                "ml-auto",
                                                selectedGenres.some((g) => g.id === genre.id)
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
