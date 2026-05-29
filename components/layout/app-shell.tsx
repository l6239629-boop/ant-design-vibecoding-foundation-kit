"use client";

import { Button, Input, Layout, Menu, Space, Typography } from "antd";
import type { MenuProps } from "antd";
import { Bell, Database, History, Home, Search, Tags } from "lucide-react";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

export type AppPageKey = "workspace" | "history" | "assets" | "knowledge";

const navItems: MenuProps["items"] = [
  { key: "workspace", icon: <Home className="size-4" />, label: "主入口" },
  { key: "history", icon: <History className="size-4" />, label: "历史任务" },
  { key: "assets", icon: <Tags className="size-4" />, label: "标签资产库" },
  { key: "knowledge", icon: <Database className="size-4" />, label: "底层知识库" }
];

export function AppShell({
  activeKey = "workspace",
  children,
  onNavigate
}: {
  activeKey?: AppPageKey;
  children: React.ReactNode;
  onNavigate?: (key: AppPageKey) => void;
}) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth={0}
        theme="light"
        style={{
          background: "#fff",
          borderRight: "1px solid #f0f0f0",
          left: 0,
          position: "fixed",
          top: 0,
          bottom: 0
        }}
        width={248}
      >
        <Space direction="vertical" size={4} style={{ padding: 20 }}>
          <Text strong>京东标签平台</Text>
          <Text type="secondary">商详 MVP 工作台</Text>
        </Space>
        <Menu
          items={navItems}
          mode="inline"
          onClick={(event) => onNavigate?.(event.key as AppPageKey)}
          selectedKeys={[activeKey]}
        />
      </Sider>
      <Layout style={{ marginLeft: 248 }}>
        <Header
          style={{
            alignItems: "center",
            background: "#fff",
            borderBottom: "1px solid #f0f0f0",
            display: "flex",
            gap: 16,
            height: 64,
            justifyContent: "space-between",
            padding: "0 24px",
            position: "sticky",
            top: 0,
            zIndex: 10
          }}
        >
          <Input
            allowClear
            placeholder="搜索标签、触点、历史任务或知识库规则"
            prefix={<Search className="size-4" />}
            style={{ maxWidth: 460 }}
          />
          <Button aria-label="通知" icon={<Bell className="size-4" />} />
        </Header>
        <Content style={{ padding: 24 }}>{children}</Content>
      </Layout>
    </Layout>
  );
}
