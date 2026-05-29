"use client";

import {
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea
} from "@ant-design/pro-form";
import { PageContainer } from "@ant-design/pro-layout";

import { AppShell } from "@/components/layout/app-shell";

export default function FormExamplePage() {
  return (
    <AppShell>
      <PageContainer subTitle="表单页默认使用 ProForm 和语义化字段组件。" title="表单页模板">
        <ProForm
          grid
          layout="vertical"
          onFinish={async () => true}
          submitter={{
            searchConfig: {
              resetText: "取消",
              submitText: "提交保存"
            }
          }}
        >
          <ProFormText
            colProps={{ md: 12, xs: 24 }}
            label="商品名称"
            name="name"
            placeholder="输入商品名称"
            rules={[{ required: true }]}
          />
          <ProFormSelect
            colProps={{ md: 12, xs: 24 }}
            label="商品类目"
            name="category"
            options={[
              { label: "家居安防", value: "home" },
              { label: "厨房电器", value: "kitchen" },
              { label: "户外装备", value: "outdoor" }
            ]}
            placeholder="选择类目"
            rules={[{ required: true }]}
          />
          <ProFormTextArea
            colProps={{ span: 24 }}
            fieldProps={{ rows: 4 }}
            label="卖点描述"
            name="description"
            placeholder="输入面向用户的核心卖点"
            rules={[{ required: true }]}
          />
        </ProForm>
      </PageContainer>
    </AppShell>
  );
}
