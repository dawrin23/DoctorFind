import { message } from "@/utils/message";
import { NextRequest, NextResponse } from "next/server";
import {headers} from "next/headers"
import jwt from "jsonwebtoken";
import { prisma } from "@/libs/prisma";
import bcrypt from "bcryptjs";

interface BodyProps {
    newPassword: string;
    confirmPassword: string;
}

export async function POST(request: NextRequest){

    try {
        const body: BodyProps = await request.json();
        const {newPassword, confirmPassword} = body;

        //Validar que los campos no esten vacios
        if(!newPassword || !confirmPassword){
            return NextResponse.json(
                {message: message.error.needProps},
                {
                    status: 400,
                }
            );
        }

        //Validar que las contraseñas sean iguales
        if(newPassword !== confirmPassword){
            return NextResponse.json(
                {message: message.error.passwordNotValid},
                {
                    status: 400,
                }
            );
        }

        const headersList = headers()
        const token = headersList.get('token')

        //Validar que el token sea valido
        if(!token){
            return NextResponse.json(
                {message: message.error.tokenNotValid},
                {
                    status: 400,
                }
            );
        }

        try {
            const isTokenValid = jwt.verify(token, 'secreto')
            
            //@ts-ignore
            const {data} = isTokenValid
            
            const userFind = await prisma.user.findUnique({
                where: {
                    id: data.id,
                },
            })

            //Validar que el usuario exista
            if(!userFind){
                return NextResponse.json(
                    {message: message.error.userNotFound},
                    {
                        status: 400,
                    }
                );
            }

            //validar que la nueva contraseña sea igual a la confirmacion
            if(newPassword !== confirmPassword){
                return NextResponse.json(
                    {message: message.error.passwordNotValid},
                    {
                        status: 400,
                    }
                );
            }

            //Encriptar la nueva contraseña
            const hashedPassword = await bcrypt.hash(newPassword, 10);


            userFind.password = hashedPassword

            await prisma.user.update({
                where: {
                    id: userFind.id,
                },
                data: {
                    password: userFind.password,
                },
            })

            return NextResponse.json(
                {message: message.success.passwordChanged},
                {
                    status: 200,
                }
            )

        } catch (error) {
            return NextResponse.json(
                { message: "El token no es valido", error },
                {
                  status: 500,
                }
              );
        }

    } catch (error) {
        return NextResponse.json(
            { message: "Error al cambiar la contraseña", error },
            {
              status: 500,
            }
        )
    }

}