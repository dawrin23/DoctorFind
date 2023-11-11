import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import {prisma} from "@/libs/prisma";

interface Params {
   params: { id: string };
 }

 export async function PUT(request: Request, { params }: Params) {
   try {
     const { resetPassword } = await request.json();

     const updatedPassword = await prisma.user.update({
      where: {
        id: Number(params.id),
      },
      data: {
        password: resetPassword as string,
      },
     })
 
     return NextResponse.json('Contraseña actualizada');
   } catch (error) {
     if (error instanceof Prisma.PrismaClientKnownRequestError) {
       if (error.code === "P2025") {
         return NextResponse.json(
           {
             message: "Usuario no encontrado",
           },
           {
             status: 404,
           }
         );
       }
 
       return NextResponse.json(
         {
           message: error.message,
         },
         {
           status: 500,
         }
       );
     }
   }
 }