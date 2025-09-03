import React from "react";
import Link from "next/link";
import PageHeader from "@/app/components/backoffice/PageHeader";
import TableActions from "@/app/components/backoffice/TableActions";

export default function page() {
  return (
    <div>
      {/* header */}
      <PageHeader
        heading="Markets"
        href="/dashboard/markets/new"
        linkTitle="Add Markets"
      />
      {/* table actions */}
<TableActions/>
<div className="py-8">
  <h2>Table</h2>
</div>
</div>
);
}
