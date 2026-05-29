"use client";

import { Button, Space } from "antd";

export function FilterActions({
  onReset,
  onSubmit
}: {
  onReset?: () => void;
  onSubmit?: () => void;
}) {
  return (
    <Space>
      <Button onClick={onSubmit} type="primary">
        查询
      </Button>
      <Button onClick={onReset}>重置</Button>
    </Space>
  );
}
