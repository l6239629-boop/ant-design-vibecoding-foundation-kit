"use client";

import { Statistic } from "antd";
import type { StatisticProps } from "antd";

import { Card, CardContent } from "@/components/ui/card";

export function MetricCard(props: StatisticProps) {
  return (
    <Card>
      <CardContent>
        <Statistic {...props} />
      </CardContent>
    </Card>
  );
}
