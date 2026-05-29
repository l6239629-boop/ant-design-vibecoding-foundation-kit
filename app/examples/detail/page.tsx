"use client";

import nextDynamic from "next/dynamic";
import { Button, Tabs } from "antd";
import { PageContainer } from "@ant-design/pro-layout";
import ProTable, { type ProColumns } from "@ant-design/pro-table";

import { AppShell } from "@/components/layout/app-shell";

export const dynamic = "force-dynamic";

const DetailDescriptions = nextDynamic(
  () => import("./detail-descriptions").then((mod) => mod.DetailDescriptions),
  { ssr: false }
);

type RecordRow = {
  key: string;
  action: string;
  operator: string;
  time: string;
};

const records: RecordRow[] = [
  { action: "创建商品", key: "1", operator: "内容组", time: "2026-05-26 10:20" },
  { action: "提交审核", key: "2", operator: "运营组", time: "2026-05-27 14:32" }
];

const recordColumns: ProColumns<RecordRow>[] = [
  { dataIndex: "action", title: "操作" },
  { dataIndex: "operator", title: "操作人" },
  { dataIndex: "time", title: "时间", valueType: "dateTime" }
];

export default function DetailExamplePage() {
  return (
    <AppShell>
      <PageContainer
        extra={<Button type="primary">编辑</Button>}
        subTitle="详情页默认使用 ProDescriptions 展示关键字段，复杂内容再放入 Tabs。"
        title="详情页模板"
      >
        <div className="space-y-5">
          <DetailDescriptions />

          <Tabs
            items={[
              {
                children: (
                  <ProTable<RecordRow>
                    columns={recordColumns}
                    dataSource={records}
                    options={false}
                    pagination={false}
                    rowKey="key"
                    search={false}
                  />
                ),
                key: "records",
                label: "操作记录"
              },
              {
                children: (
                  <div className="rounded-[var(--radius-md)] border border-dashed border-[var(--color-border)] p-5 text-sm text-[var(--color-text-muted)]">
                    这里放关联商品、素材或标签。
                  </div>
                ),
                key: "related",
                label: "关联信息"
              }
            ]}
          />
        </div>
      </PageContainer>
    </AppShell>
  );
}
