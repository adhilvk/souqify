import React from "react";
import Heading from "@/app/components/backoffice/Heading";


export default function PageHeader({heading,linkTitle,href}) {
  return (
          {/* header */}
      <div className="flex justify-between">
        <Heading title={title} />
        <Link
          className="text-white bg-lime-600 hover:bg-lime-600/90 focus:ring-4 focus:outline-none focus:ring-lime-600/50 font-medium rounded-lg text-base px-5 py-3 text-center inline-flex items-center dark:focus:ring-lime-600/55 me-2 space-x-3 "
                    href={href}

        >
          <Plus />  
          <span>{linkTitle}</span>
        </Link>
      </div>

  );
}
