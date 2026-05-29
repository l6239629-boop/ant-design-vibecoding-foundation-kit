"use client";

import ProDescriptions, { type ProDescriptionsItemProps } from "@ant-design/pro-descriptions";

import { StatusTag } from "@/components/antd/status-tag";

type DetailRow = {
  category: string;
  name: string;
  owner: string;
  status: "published";
};

const detail: DetailRow = {
  category: "家居安防",
  name: "智能门锁 A12",
  owner: "运营组",
  status: "published"
};

const detailColumns: ProDescriptionsItemProps<DetailRow>[] = [
  { dataIndex: "name", title: "商品名称" },
  { dataIndex: "category", title: "类目" },
  { dataIndex: "owner", title: "负责人" },
  {
    dataIndex: "status",
    render: () => <StatusTag label="已发布" tone="success" />,
    title: "状态"
  }
];

export function DetailDescriptions() {
  return (
    <ProDescriptions<DetailRow>
      bordered
      column={{ md: 2, xs: 1 }}
      columns={detailColumns}
      dataSource={detail}
      title="核心信息"
    />
  );
}
