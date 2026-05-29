"use client";

import type { ReactNode } from "react";
import { Card, Col, List, Row, Space, Tag, Typography } from "antd";
import { PageContainer } from "@ant-design/pro-layout";
import { Blocks, ClipboardCheck, FileCode2, GitBranch, LayoutDashboard, WandSparkles } from "lucide-react";

import { MetricCard } from "@/components/antd/metric-card";
import { StatusTag } from "@/components/antd/status-tag";
import { AppShell } from "@/components/layout/app-shell";

const { Text } = Typography;

type Workflow = {
  icon: ReactNode;
  tone: "processing" | "success" | "warning";
  statusLabel: string;
  title: string;
  description: string;
};

const workflows: Workflow[] = [
  {
    icon: <WandSparkles className="size-4" />,
    tone: "success",
    statusLabel: "就绪",
    title: "新建规范项目",
    description: "Next.js、React、TypeScript、Tailwind CSS、Ant Design 和 ProComponents 已完成基础组合。"
  },
  {
    icon: <ClipboardCheck className="size-4" />,
    tone: "success",
    statusLabel: "就绪",
    title: "审计既有项目",
    description: "通过规则文档和脚本检查 Provider、主题、组件调用、迁移边界和验证命令。"
  },
  {
    icon: <GitBranch className="size-4" />,
    tone: "processing",
    statusLabel: "分步",
    title: "迁移到规范栈",
    description: "先输出差异清单，再按页面、组件、主题、数据流分批替换。"
  }
];

const standards = [
  "AGENTS.md 作为 AI 默认入口",
  "components/antd/* 作为业务组件封装层",
  "lib/theme.ts 统一 Ant Design token",
  "docs/* 维护安装、迁移和官方链接"
];

export default function Home() {
  return (
    <AppShell activeKey="workspace">
      <PageContainer
        extra={[
          <Tag color="blue" key="antd">
            Ant Design 5
          </Tag>,
          <Tag color="purple" key="pro">
            ProComponents
          </Tag>,
          <Tag color="cyan" key="next">
            Next.js
          </Tag>
        ]}
        title="AntD Vibecoding 规范工作台"
      >
        <Space direction="vertical" size={16} style={{ width: "100%" }}>
          <Row gutter={[16, 16]}>
            <Col lg={8} md={12} xs={24}>
              <MetricCard title="规范入口" value="AGENTS" />
            </Col>
            <Col lg={8} md={12} xs={24}>
              <MetricCard suffix="项" title="标准示例" value={4} />
            </Col>
            <Col lg={8} md={12} xs={24}>
              <MetricCard title="验证命令" value="verify" />
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col lg={15} xs={24}>
              <Card title="标准流程">
                <List
                  dataSource={workflows}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={item.icon}
                        description={item.description}
                        title={
                          <Space>
                            <Text strong>{item.title}</Text>
                            <StatusTag label={item.statusLabel} tone={item.tone} />
                          </Space>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>

            <Col lg={9} xs={24}>
              <Card title="基础资产">
                <Space direction="vertical" size={12} style={{ width: "100%" }}>
                  {standards.map((item) => (
                    <Space key={item}>
                      <FileCode2 className="size-4" />
                      <Text>{item}</Text>
                    </Space>
                  ))}
                </Space>
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col md={12} xs={24}>
              <Card title="页面模板">
                <Space>
                  <LayoutDashboard className="size-4" />
                  <Text>列表、表单、详情和数据看板示例位于 /examples。</Text>
                </Space>
              </Card>
            </Col>
            <Col md={12} xs={24}>
              <Card title="组件封装">
                <Space>
                  <Blocks className="size-4" />
                  <Text>优先复用本地 AntD wrapper，再补充业务组件。</Text>
                </Space>
              </Card>
            </Col>
          </Row>
        </Space>
      </PageContainer>
    </AppShell>
  );
}
