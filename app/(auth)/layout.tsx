import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h1>Auth</h1>
      <div>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default AuthLayout;
