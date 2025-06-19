import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const typeNameMap: Record<string, string> = {
    SNS: "인싸 무너",
    Youtube: "팝콘 무너",
    Chat: "투머치톡커 무너",
    Calling: "여보세무너",
    Books: "꼬꼬무너",
    Saving: "알뜰 무너",
  };

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      email: true,
      my_plan: true,
      invited_count: true,
      characterProfile: {
        select: {
          type: true,
        },
      },
    },
  });

  return NextResponse.json({
    id: user?.id,
    email: user?.email,
    my_plan: user?.my_plan,
    invited_count: user?.invited_count,
    type: user?.characterProfile?.type
      ? (typeNameMap[user.characterProfile.type] ?? user.characterProfile.type)
      : null,
  });
}
