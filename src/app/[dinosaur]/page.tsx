
"use client";

import { useEffect, useState } from "react";
import { Dino } from "../types.ts";
import Link from "next/link";

type RouteParams = {
    params: Promise<{ dinosaur: string }>
};

export default function Dinosaur({ params }: RouteParams) {

    const selectedDinosaur = params.then((params) => params.dinosaur);

    const [dinosaur, setDinosaur] = useState<Dino>({ name: "", description: "" });

    useEffect(() => {
        (async () => {
            const resp = await fetch(`/api/dinosaurs/${await selectedDinosaur}`);
            const dino = await resp.json() as Dino;
            setDinosaur(dino);
        })();
    }, []);

    return (
        <main>
            <h1>{dinosaur.name}</h1>
            <p>{dinosaur.description}</p>
            <Link href="/">
                --- Back to all dinosaurs.
            </Link>
        </main>
    );
}