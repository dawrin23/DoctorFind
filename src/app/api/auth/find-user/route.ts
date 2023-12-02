import {prisma} from '@/libs/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, res: NextResponse) { 

    //endpoint para buscar un usuario por id
    //recibe un id por body
    //localhost:3000/api/auth/find-user

    const body = await request.text();
  let id;

  if (body) {
    id = JSON.parse(body);
    id.id = Number(id.id);
    console.log(id);
  } else {
    return NextResponse.json(
        {
            message: "No hay nada en el body",
        },
        {
            status: 404,
        }
    );
  }

    console.log(id)

    const userFound = await prisma.user.findUnique(
        {
            where: {
                id: Number(id.id)
            }
        }
    )

    if(!userFound){
        const userFoundDoctor = await prisma.userDoctor.findUnique(
            {
                where: {
                    id: Number(id)
                }
            }
        )
        if(!userFoundDoctor){
            return NextResponse.json({
                message: "User not found"
            })
        } else {
            return NextResponse.json(userFoundDoctor)
        }
    }

    return NextResponse.json(userFound);


}