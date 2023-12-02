import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import bcrypt from "bcryptjs";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dbvlq1k1b",
  api_key: process.env.API_KEY_CLOUDINARY,
  api_secret: process.env.API_SECRET_CLOUDINARY,
});

export async function POST(request: Request) {
  const data = await request.formData();

  const email = data.get("email");
  const password = data.get("password");
  const confirmPassword = data.get("confirmPassword");
  const name = data.get("name");
  const lastname = data.get("lastname");
  const foto = data.get("foto") as Blob;
  const medicalSpeciality = data.get("medicalSpeciality");
  const contactPhone = data.get("contactPhone");
  const workExperience = data.get("workExperience");
  const officeAddress = data.get("officeAddress");
  const workingHours = data.get("workingHours");
  const exequatur = data.get("exequatur");

  //validar que el medicalSpeciality no este vacio
  if (!medicalSpeciality) {
    return NextResponse.json(
      { message: "MedicalSpeciality is required" },
      { status: 400 }
    );
  }

  //validar que el contactPhone no este vacio
  if (!contactPhone) {
    return NextResponse.json(
      { message: "ContactPhone is required" },
      { status: 400 }
    );
  }

  //validar que el workExperience no este vacio
  if (!workExperience) {
    return NextResponse.json(
      { message: "WorkExperience is required" },
      { status: 400 }
    );
  }

  //validar que el officeAddress no este vacio
  if (!officeAddress) {
    return NextResponse.json(
      { message: "OfficeAddress is required" },
      { status: 400 }
    );
  }

  //validar que el workingHours no este vacio
  if (!workingHours) {
    return NextResponse.json(
      { message: "WorkingHours is required" },
      { status: 400 }
    );
  }

  //validar que el exequatur no este vacio
  if (!exequatur) {
    return NextResponse.json(
      { message: "Exequatur is required" },
      { status: 400 }
    );
  }

  //validar que el nombre no este vacio
  if (!name) {
    return NextResponse.json({ message: "Name is required" }, { status: 400 });
  }

  //validar que el apellido no este vacio
  if (!lastname) {
    return NextResponse.json(
      { message: "Lastname is required" },
      { status: 400 }
    );
  }

  //validar que el email sea correcto
  if (!email || !String(email).includes("@")) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  //validar si el usuario ya existe
  const userFound = await prisma.userDoctor.findUnique({
    where: {
      email: email as string,
    },
  });

  if (userFound) {
    return NextResponse.json(
      { message: "Este correo ya existe" },
      { status: 409 }
    );
  }

  //validar que el password no este vacio
  if (!password) {
    return NextResponse.json(
      { message: "Contrasena es requerida" },
      { status: 400 }
    );
  }

  //validar que la contraseña tenga al menos 6 caracteres
  if (password.length < 6) {
    return NextResponse.json(
      { message: "La contrasena debe tener al menos 6 caracteres" },
      { status: 400 }
    );
  }

  //validar que la contraseña y la confirmacion sean iguales
  if (password !== confirmPassword) {
    return NextResponse.json(
      { message: "Las contrasenas deberian ser iguales" },
      { status: 400 }
    );
  }

  // var res = null

  //   if(foto){

  const bytes = await foto.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filePath = path.join(process.cwd(), "public", foto.name);

  await writeFile(filePath, buffer);

  const res = await cloudinary.uploader.upload(filePath);
  console.log(res);

  if (res) {
    await unlink(filePath);
  }

  // }

  try {
    //encryptar la contraseña
    const passwordString = password.toString();
    const hashedPassword = await bcrypt.hash(passwordString, 12);

    //crear el usuario doctor
    const userDoctor = await prisma.userDoctor.create({
      data: {
        email: email as string,
        password: hashedPassword,
        name: name as string,
        lastname: lastname as string,
        foto: res?.url,
        MedicalSpecialty: medicalSpeciality as string,
        ContactPhone: contactPhone as string,
        WorkExperience: workExperience as string,
        OfficeAddress: officeAddress as string,
        WorkingHours: workingHours as string,
        Exequatur: exequatur as string,
      },
    });

    console.log(userDoctor);

    return NextResponse.json({
      id: userDoctor.id,
      email: userDoctor.email,
      name: userDoctor.name,
      lastname: userDoctor.lastname,
      foto: userDoctor.foto,
      MedicalSpecialty: userDoctor.MedicalSpecialty,
      ContactPhone: userDoctor.ContactPhone,
      WorkExperience: userDoctor.WorkExperience,
      OfficeAddress: userDoctor.OfficeAddress,
      WorkingHours: userDoctor.WorkingHours,
      Exequatur: userDoctor.Exequatur,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message || "Algo sucedio verifca que esta mal",
        },
        { status: 400 }
      );
    }
  }
}
