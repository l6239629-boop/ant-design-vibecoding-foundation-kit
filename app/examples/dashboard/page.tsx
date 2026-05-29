"use client";

import { Progress, Select } from "antd";
import { PageContainer } from "@ant-design/pro-layout";

import { MetricCard } from "@/components/antd/metric-card";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardExamplePage() {
  return (
    <AppShell>
      <PageContainer
        extra={
          <Select
            defaultValue="7d"
            options={[
              { label: "近 7 天", value: "7d" },
              { label: "近 30 天", value: "30d" }
            ]}
            style={{ width: 120 }}
          />
        }
        subTitle="看板页先给关键指标，再展示趋势、分布和明细入口。"
        title="看板页模板"
      >
        <div className="space-y-5">
        <div className="grid gap-4 md:grid-cols-4">
          <MetricCard title="商品数" value={1280} />
          <MetricCard title="新增标签" value={86} />
          <MetricCard precision={1} suffix="%" title="完整率" value={92.8} />
          <MetricCard precision={1} suffix="%" title="审核通过率" value={88.4} />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>标签完整度</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress percent={92} />
              <Progress percent={76} status="active" />
              <Progress percent={38} status="exception" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>内容占位</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-48 items-center justify-center rounded-[var(--radius-md)] border border-dashed border-[var(--color-border)] text-sm text-[var(--color-text-muted)]">
                图表区域后续接入业务图表库
              </div>
            </CardContent>
          </Card>
        </div>
        </div>
      </PageContainer>
    </AppShell>
  );
}
