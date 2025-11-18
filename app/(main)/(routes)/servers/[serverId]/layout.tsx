import { ServerSidebar } from "@/components/server/server-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Server } from "lucide-react";
import { redirect } from "next/navigation";

const ServerIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ serverId: string }>; // 1. Sửa type thành Promise
}) => {
  const profile = await currentProfile();

  if (!profile) {
    redirect("/sign-in");
  }

  // 2. Await params để lấy dữ liệu ra
  const { serverId } = await params;

  const server = await db.server.findFirst({
    where: {
      id: serverId, // 3. Sử dụng biến đã await
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!server) {
    redirect("/");
  }

  return (
    <div className="h-full">
      <div className=" md:flex h-full w-60 z-20 fixed flex-col inset-y-0">
        <ServerSidebar serverId={serverId} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
};

export default ServerIdLayout;
