// Dùng "redirect" của chính Next.js
import { redirect } from "next/navigation";
// Dùng "currentUser" từ gói "/server" của Clerk
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (profile) {
    return profile;
  }

  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageURL: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newProfile;
};
