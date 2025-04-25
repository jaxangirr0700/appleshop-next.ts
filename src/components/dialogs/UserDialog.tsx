import dynamic from "next/dynamic";
import React from "react";
const LoginDialog = dynamic(() => import("../login/LoginDialog"), {
  ssr: false,
});

function UserModal() {
  return (
    <div>
      <LoginDialog />
    </div>
  );
}

export default UserModal;
