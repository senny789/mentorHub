import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
	return <div className="overflow">{children}</div>;
};

export default MainLayout;
