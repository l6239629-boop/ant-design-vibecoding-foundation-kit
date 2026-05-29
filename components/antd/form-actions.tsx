"use client";

import { Button, Space } from "antd";

export function FormActions({
  cancelText = "取消",
  loading,
  onCancel,
  submitText = "保存"
}: {
  cancelText?: string;
  loading?: boolean;
  onCancel?: () => void;
  submitText?: string;
}) {
  return (
    <Space>
      <Button htmlType="submit" loading={loading} type="primary">
        {submitText}
      </Button>
      <Button onClick={onCancel}>{cancelText}</Button>
    </Space>
  );
}
