import {prisma} from '@/libs/prisma';
import { NextResponse } from 'next/server';


export async function GET(request: Request, { params }: { params: { id: string } }) {
    const user = await prisma.user.findMany({
        where: {
            id: parseInt(params.id)
        }
    });
    return NextResponse.json(user);
}
