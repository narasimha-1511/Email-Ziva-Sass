import ThemeToggle from "@/components/theme-toggle";

import { UserButton } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import React from "react";
const ComposeButton = dynamic(
  () => {
    return import("./components/compose-button");
  },
  { ssr: false },
);

const Mail = dynamic(
  () => {
    return import("./mail");
  },
  { ssr: false },
);

const page = () => {
  return (
    <div>
      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        <UserButton />
        <ThemeToggle />
        <ComposeButton />
      </div>
      <Mail
        defaultCollaped={false}
        navCollapsedSize={4}
        defaultLayout={[20, 32, 48]}
      />
    </div>
  );
};

export default page;
