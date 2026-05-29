"use client";

import { App, ConfigProvider, theme } from "antd";
import zhCN from "antd/locale/zh_CN";
import { ProConfigProvider } from "@ant-design/pro-provider";

import { antdTheme } from "@/lib/theme";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: theme.defaultAlgorithm,
        ...antdTheme
      }}
    >
      <ProConfigProvider>
        <App>{children}</App>
      </ProConfigProvider>
    </ConfigProvider>
  );
}
