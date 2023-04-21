import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white justify-between p-24">
      {children}
    </main>
  );
};

export default MainLayout;
