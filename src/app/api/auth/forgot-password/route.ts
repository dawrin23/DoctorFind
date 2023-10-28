import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function POST(request: Request) {

    //recibir email
    const body = request.json();
    const email = body;
    const emailString = String(email);

    //validar que el email sea correcto
    if (!email || !String(email).includes("@")) {

        return NextResponse.json({ message: "Email is incorrect" }, { status: 400 });
    }

    //validar si el email existe en la base de datos
    const userFound = await prisma.user.findUnique({
        where: {
            email: emailString,
        },
    });

    //si el email no existe en la base de datos
    if (!userFound) {
        return NextResponse.json(
            { message: "User not found" },
            { status: 409 }
        );
    }

    //generar otp y guardarlo en la base de datos
    const otp = Math.floor(100000 + Math.random() * 900000);
    

}