import React from "react";
import Link from "next/link";
import PageHeader from "@/app/components/backoffice/PageHeader";
import TableActions from "@/app/components/backoffice/TableActions";

export default function Coupons() {
  return (
    <div>
      {/* header */}
      <PageHeader
        heading="Farmers"
        href="/dashboard/farmers/new"
        linkTitle="Add Farmer"
      />
      {/* table actions */}
<TableActions/>
<div className="py-8">
  <h2>Table</h2>
</div>
</div>
);
}
