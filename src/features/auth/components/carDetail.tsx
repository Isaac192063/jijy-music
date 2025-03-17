import { Button } from "@/components/ui/button";

interface IDetailCard {
    title: string;
    description: string;
    nameBoton: string;
}

export function CarDetail({ title, description, nameBoton }: IDetailCard) {
    return (
        <article className="p-5 bg-amber-200 rounded-3xl m-2 flex flex-col shadow-sm">
            <div>
                <h4 className="text-lg font-bold mb-1 text-amber-900">{title}</h4>
                <p className="text-xs text-amber-800 mb-3">{description}</p>
            </div>
            <Button className="rounded-3xl bg-amber-500 hover:bg-amber-600 text-white text-sm self-start mt-auto cursor-pointer">
                {nameBoton}
            </Button>
        </article>
    );
}