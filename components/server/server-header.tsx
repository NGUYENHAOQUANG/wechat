"use client";

import { Server } from "@prisma/client";

interface ServerHeaderProps {
  server: Server;
  role?: "admin" | "member";
}

export const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  return <div>server header</div>;
};
