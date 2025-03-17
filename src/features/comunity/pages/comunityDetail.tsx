import AvatarPerfil from "@/shared/components/avatar";
import { useComunityStorage } from "@/store/comunityStorage";
import { useParams } from "react-router-dom";

function Asa(chatUser: ChatUser) {
    return (
        <div
            className="flex items-center gap-2 w-full rounded-md p-2"
            style={{ justifyContent: chatUser.user === 1 ? "end" : "start" }}
        >
            <AvatarPerfil url="" />
            <p className="break-words max-w-[75%] bg-gray-200 p-2 rounded-md">
                {chatUser.message}
            </p>
        </div>
    );
}

interface ChatUser{
    id: number;
    message: string;
    user: number;
}



export function ComunityDetail() {
    const { id } = useParams();
    const { comunities } = useComunityStorage();

    const comunity = comunities.find((c) => c.id == parseInt(id!));

    return (
        <>
            <h2>Comunity detail</h2>
            <article className="flex flex-col  justify-center items-center  ">
            <h3 className="text-xl font-semibold">{comunity?.name}</h3>
                <div className=" relative">
                    <section className="w-[600px] overflow-auto h-96 border-2 rounded-md">
                        <div className="inline">
                            <Asa id={1} message="Hola como estas" user={1}/>
                            <Asa id={1} message="Bein y tu que onda" user={1}/>
                            <Asa id={1} message="Vamos a ver como estas para ver como nos va" user={1}/>
                            <Asa id={1} message="Hola como estasagrvffcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc" user={1}/>
                            <Asa id={1} message="Hola como estas" user={2}/>
                            <Asa id={1} message="Hola como estas" user={1}/>
                            <Asa id={1} message="Hola como estas" user={1}/>
                        </div>
                    </section>
                    <InputWithButton />
                </div>
            </article>
        </>
    );
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function InputWithButton() {
    return (
        <div className="flex w-full space-x-2 mt-5 absolute bottom-[-50px] border-b-1 rounded-md z-10 bg-white">
            <Input type="email" placeholder="Email" />
            <Button type="submit">Enviar</Button>
        </div>
    );
}
