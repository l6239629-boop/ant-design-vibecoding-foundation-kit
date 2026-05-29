"use client";

import { Button } from "antd";
import { PageContainer } from "@ant-design/pro-layout";
import ProTable, { type ProColumns } from "@ant-design/pro-table";
import { Download, Plus } from "lucide-react";

import { StatusTag } from "@/components/antd/status-tag";
import { AppShell } from "@/components/layout/app-shell";

type Row = {
  key: string;
  owner: string;
  status: "published" | "reviewing" | "draft";
  title: string;
  updatedAt: string;
};

const rows: Row[] = [
  { key: "1", owner: "运营组", status: "published", title: "智能门锁 A12", updatedAt: "2026-05-28" },
  { key: "2", owner: "内容组", status: "reviewing", title: "便携咖啡机 Mini", updatedAt: "2026-05-27" },
  { key: "3", owner: "商品组", status: "draft", title: "户外露营灯 Pro", updatedAt: "2026-05-26" }
];

const columns: ProColumns<Row>[] = [
  {
    dataIndex: "title",
    title: "标题"
  },
  {
    dataIndex: "owner",
    title: "负责人",
    valueType: "select",
    valueEnum: {
      content: "内容组",
      ops: "运营组",
      product: "商品组"
    }
  },
  {
    dataIndex: "status",
    title: "状态",
    valueType: "select",
    valueEnum: {
      draft: { text: "草稿", status: "Default" },
      published: { text: "已发布", status: "Success" },
      reviewing: { text: "审核中", status: "Processing" }
    },
    render: (_, record) => {
      const map = {
        draft: { label: "草稿", tone: "default" },
        published: { label: "已发布", tone: "success" },
        reviewing: { label: "审核中", tone: "processing" }
      } as const;

      return <StatusTag {...map[record.status]} />;
    }
  },
  {
    dataIndex: "updatedAt",
    hideInSearch: true,
    title: "更新时间",
    valueType: "date"
  }
];

export default function ListExamplePage() {
  return (
    <AppShell>
      <PageContainer
        extra={[
          <Button icon={<Download className="size-4" />} key="export">
            导出
          </Button>,
          <Button icon={<Plus className="size-4" />} key="new" type="primary">
            新建
          </Button>
        ]}
        subTitle="列表页默认使用 ProTable 承载查询表单、工具栏、表格和分页。"
        title="列表页模板"
      >
        <ProTable<Row>
          columns={columns}
          dateFormatter="string"
          options={{ density: true, fullScreen: true, reload: true, setting: true }}
          request={async () => ({
            data: rows,
            success: true,
            total: rows.length
          })}
          rowKey="key"
          rowSelection={{}}
          search={{ labelWidth: "auto" }}
          toolBarRender={() => [<Button key="archive">批量归档</Button>, <Button key="tag">批量打标</Button>]}
        />
      </PageContainer>
    </AppShell>
  );
}
