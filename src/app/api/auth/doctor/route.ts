import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import bcrypt from "bcryptjs";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import {v2 as cloudinary} from "cloudinary";

cloudinary.config({ 
  cloud_name: 'dbvlq1k1b', 
  api_key: process.env.API_KEY_CLOUDINARY, 
  api_secret: process.env.API_SECRET_CLOUDINARY
});



export async function POST(request: Request) {
  const data =
    await request.formData();

  const email = data.get("email");
  const password = data.get("password");
  const confirmPassword = data.get("confirmPassword");
  const name = data.get("name");
  const lastname = data.get("lastname");
  const foto = data.get("foto") as Blob;
  const MedicalSpecialty = data.get("MedicalSpecialty");
  const Exequatur = data.get("Exequatur");
  const ContactPhone = data.get("ContactPhone");
  const OfficeAddress = data.get("OfficeAddress");
  const WorkExperience = data.get("WorkExperience");
  const WorkingHours = data.get("WorkingHours");
    

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
  const userFound = await prisma.user.findUnique({
    where: {
      email: email as string,
    },
  });

  if (userFound) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 409 }
    );
  }

  //validar que el password no este vacio
  if (!password) {
    return NextResponse.json(
      { message: "Password is required" },
      { status: 400 }
    );
  }

  //validar que la contraseña tenga al menos 6 caracteres
  if (password.length < 6) {
    return NextResponse.json(
      { message: "Password must be at least 6 characters" },
      { status: 400 }
    );
  }

  //validar que la contraseña y la confirmacion sean iguales
  if (password !== confirmPassword) {
    return NextResponse.json(
      { message: "Password and confirm password must be equal" },
      { status: 400 }
    );
  }

 // Validar que la especialidad médica no esté vacía
if (!MedicalSpecialty) {
  return NextResponse.json({ message: "La especialidad médica es requerida" }, { status: 400 });
}

// Validar que el número de Exequatur no esté vacío
if (!Exequatur) {
  return NextResponse.json({ message: "El número de Exequatur es requerido" }, { status: 400 });
}

// Validar que el número de teléfono de contacto no esté vacío y tenga un formato válido
if (!ContactPhone || ContactPhone.length <= 10  ) {
  return NextResponse.json({ message: "El número de teléfono de contacto es requerido y debe tener 10 dígitos" }, { status: 400 });
}

// Validar que la dirección de la consulta no esté vacía
if (!OfficeAddress) {
  return NextResponse.json({ message: "La dirección de la consulta es requerida" }, { status: 400 });
}

// Validar que la experiencia laboral no esté vacía
if (!WorkExperience) {
  return NextResponse.json({ message: "La experiencia laboral es requerida" }, { status: 400 });
}

// Validar que el horario de trabajo no esté vacío
if (!WorkingHours) {
  return NextResponse.json({ message: "El horario de trabajo es requerido" }, { status: 400 });
}


  // var res = null

//   if(foto){

const bytes = await foto.arrayBuffer();
const buffer = Buffer.from(bytes)

const filePath = path.join(process.cwd(), "public", foto.name)

await writeFile(filePath, buffer)

const res = await cloudinary.uploader.upload(filePath)
console.log(res)

if(res){
await unlink(filePath)
}

// }

  try {
    //encryptar la contraseña
    const passwordString = password.toString();
    const hashedPassword = await bcrypt.hash(passwordString, 12);

    //crear el usuario
    const user = await prisma.user.create({
      data: {
        email: email as string,
        name: name as string,
        lastname: lastname as string,
        password: hashedPassword,
        updatedAt: new Date().toISOString(),
        //@ts-ignore
        foto: res ? res.secure_url : null,


      },
    });
Estas ahi??? bueno me fui a recoger la ropa cualquier cosa tienes el control del mouses

     //crear el usuario 
     const userDoctor = await prisma.userdoctor.create({
      data: { 
        email: email as string,
        name: name as string,
        lastname: lastname as string,
        password: hashedPassword,
        ContactPhone: ContactPhone as string,
        Exequatur: Exequatur as string,
        MedicalSpecialty: MedicalSpecialty as string,
        OfficeAddress: OfficeAddress as string,
        WorkExperience: WorkExperience as string,
        WorkingHours: WorkingHours as string,
        updatedAt: new Date().toISOString(),
        //@ts-ignore
        foto: res ? res.secure_url : null,
        

      },
    });


    return NextResponse.json({
      id: userDoctor.id,
      email: userDoctor.email,
      name: userDoctor.name,
      lastname: userDoctor.lastname,
      foto: userDoctor.foto,
      ContactPhone: userDoctor.ContactPhone,
      Exequatur: userDoctor.Exequatur,
      MedicalSpecialty: userDoctor.MedicalSpecialty,
      OfficeAddress: userDoctor.OfficeAddress,
      WorkExperience: userDoctor.WorkExperience,
      WorkingHours: userDoctor.WorkingHours
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message || "Something went wrong",
        },
        { status: 400 }
      );
    }
  }
}
