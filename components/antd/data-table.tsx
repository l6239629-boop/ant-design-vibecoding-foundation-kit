"use client";

import { Table } from "antd";
import type { TableProps } from "antd";

export function DataTable<RecordType extends object>({
  pagination,
  scroll,
  size = "middle",
  ...props
}: TableProps<RecordType>) {
  return (
    <Table<RecordType>
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        ...pagination
      }}
      scroll={{ x: "max-content", ...scroll }}
      size={size}
      {...props}
    />
  );
}
