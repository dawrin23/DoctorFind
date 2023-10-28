import {prisma} from '@/libs/prisma';
import { NextResponse } from 'next/server';


export async function GET(request: Request, { params }: { params: { id: string } }) {
    const user = await prisma.user.findMany({
        where: {
            id: parseInt(params.id)
        }
    });

    console.log(params.id)

    return NextResponse.json(user);
}

export async function POST(request: Request, { params }: { params: { id: string } }) {

      const data = await request.json();
      console.log(data.idUser);
      console.log(params.id);

      
  
      return NextResponse.json(data);
  
  }
