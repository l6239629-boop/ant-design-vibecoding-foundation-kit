"use client";

import { Tag } from "antd";

type StatusTone = "default" | "success" | "processing" | "warning" | "error";

const toneColor: Record<StatusTone, string | undefined> = {
  default: undefined,
  error: "red",
  processing: "blue",
  success: "green",
  warning: "orange"
};

export function StatusTag({ label, tone = "default" }: { label: string; tone?: StatusTone }) {
  return <Tag color={toneColor[tone]}>{label}</Tag>;
}
