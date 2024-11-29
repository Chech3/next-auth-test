import { NextResponse, NextRequest } from "next/server";
import prisma from "@/libs/db";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
  console.log(data);
  const emailFound = await prisma.user.findUnique({
    where: { email: data.email },
  });
  const userFound = await prisma.user.findUnique({
    where: { username: data.username },
  });

  if (emailFound) {
    return NextResponse.json(
      {
        message: "email already exist",
      },
      {
        status: 400,
      }
    );
  }
  if (userFound) {
    return NextResponse.json(
      {
        message: "username already exist",
      },
      {
        status: 400,
      }
    );
  }

// data.password = await bcrypt.hash(data.password, 10)
const hashedPassword = await bcrypt.hash(data.password, 10)
  const newUser = await prisma.user.create({
    data: {
        username: data.username,
        email: data.email,
        password: hashedPassword
    }
  });

  const {password: _, ...user} = newUser //De esta forma ocultamos la contraseña para que no la devuelva en caso de requerir devoolver informacion

  return NextResponse.json(user);
  } catch (error ) {
    const e = error as Error;
    return NextResponse.json(
    {
        message: e.message,
    },
    {status: 500}
)
  }
}
