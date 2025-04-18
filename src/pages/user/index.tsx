import { useAppSelector } from "@/store/hooks";
import React from "react";

function UserPage() {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <div>
      UserPage
      <p>{user?.name}</p>
    </div>
  );
}

export default UserPage;
