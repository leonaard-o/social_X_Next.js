import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prismadb";

export async function DELETE(
  req: Request,
  { params }: { params: { notificationId: string } }
) {
  try {
    // 1. Autenticación
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    // 2. Validar ID de notificación
    const notificationId = parseInt(params.notificationId);
    if (isNaN(notificationId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    // 3. Eliminar solo si pertenece al usuario
    await prisma.notification.deleteMany({
      where: {
        id: notificationId,
        userId: parseInt(session.user.id) // Verifica propiedad
      }
    });

    return NextResponse.json(
      { message: "Notificación eliminada" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error eliminando notificación:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}