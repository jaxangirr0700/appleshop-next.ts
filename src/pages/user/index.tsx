"use client";

import { useAppSelector } from "@/store/hooks";
import React, { useEffect, useState } from "react";

function UserPage() {
  const user = useAppSelector((state) => state.auth.user);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div>
      UserPage
      <p>{user?.name}</p>
    </div>
  );
}

export default UserPage;
