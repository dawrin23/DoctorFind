import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs"; 

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) { 
  
//@ts-ignore
const session = getServerSession();
console.log(session);

return NextResponse.json(session);
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const deleteOtp = await prisma.otp.delete({
      where: {
        authorId: Number(params.id),
      },
    });

    if (!deleteOtp) {
      return NextResponse.json(
        {
          message: "Otp not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(deleteOtp);
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Otp not found",
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

export async function PUT(request: Request, { params }: Params) {
  try {

    const { password, confirmPassword } = await request.json();

    if (password !== confirmPassword) {
      return NextResponse.json(
        {
          message: "Las contraseñas no coinciden",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatePassword = await prisma.user.update({
      where: {
        id: Number(params.id),
      },
      data: {
        password: hashedPassword,
      },
    });

    if (!updatePassword) {
      return NextResponse.json(
        {
          message: "Usuario no encontrado",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.otp.delete({
      where: {
        authorId: Number(params.id),
      },
    })

    return NextResponse.json(
      {
        message: "Contraseña actualizada",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "User not found",
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
