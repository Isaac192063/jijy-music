import { create } from "zustand";

interface Comunity {
    id: number;
    name: string;
    members: number;
    description: string;
    category: string;
    image: string;
    isPopular: boolean;
    lastActive: string;
}

interface ComunityStore {
    comunities: Comunity[]; 
    updateAmount: (comunity: Comunity) => void; 
}

export const useComunityStorage = create<ComunityStore>((set) => ({
    comunities: [
        {
            id: 1,
            name: "Samba Palo",
            members: 15000,
            description: "Comunidad para desarrolladores de React y entusiastas de JavaScript.",
            category: "Tecnología",
            image: "https://www.percuforum.com/blog/wp-content/uploads/2021/08/La-situacion-de-la-samba-en-Brasil-2.jpg",
            isPopular: true,
            lastActive: "2024-03-15T14:30:00Z",
          },
          {
            id: 2,
            name: "Solo guaracha",
            members: 8000,
            description: "Un espacio para compartir y descubrir música indie de todo el mundo.",
            category: "Música",
            image: "https://i.ytimg.com/vi/_mZGSYXrZFw/maxresdefault.jpg",
            isPopular: true,
            lastActive: "2024-03-14T18:45:00Z",
          },
          {
            id: 3,
            name: "Cumbias norteñas",
            members: 12000,
            description: "Para los apasionados de los videojuegos en la comunidad latina.",
            category: "Videojuegos",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa0D9wm-c0IoYBasBbuZMJDgy7LZzBDuwUbg&s",
            isPopular: false,
            lastActive: "2024-03-16T08:10:00Z",
          },
          {
            id: 4,
            name: "Electronica full",
            members: 9000,
            description: "Debates, recomendaciones y noticias sobre cine y series.",
            category: "Entretenimiento",
            image: "https://www.visittheusa.mx/sites/default/files/styles/hero_l/public/images/hero_media_image/2018-03/1f193ea1be6ff6877e025ed15bc58e04.jpeg?h=2e3eca71&itok=Q3msz5J1",
            isPopular: false,
            lastActive: "2024-03-12T22:20:00Z",
          },
          {
            id: 5,
            name: "Guarapera forever 2.0",
            members: 5000,
            description: "Comparte y aprende sobre fotografía con expertos y aficionados.",
            category: "Arte",
            image: "https://i.pinimg.com/736x/7f/91/c0/7f91c0cc3ffa82e7446ca76049588fa0.jpg",
            isPopular: true,
            lastActive: "2024-03-11T10:05:00Z",
          },
    ], // ✅ Estado inicial como objeto

    updateAmount: (comunity) =>
        set((state) => ({
            comunities: [...state.comunities, comunity], // ✅ Crear un nuevo array en lugar de mutarlo
        })),
}));
