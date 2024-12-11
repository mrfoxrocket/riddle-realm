import { getCurrentSession } from "@/auth/sessionActions";
import { redirect } from "next/navigation";

export const getUser = async () => {
  const { user } = await getCurrentSession();
  return user;
};

export const redirectUser = async () => {
  const { user } = await getCurrentSession();
  if (user === null) {
    return redirect("/sign-up");
  }
};
