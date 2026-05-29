"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Descriptions,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
  Segmented,
  Select,
  Space,
  Steps,
  Tabs,
  Tag,
  Timeline,
  Typography,
  message
} from "antd";
import { PageContainer } from "@ant-design/pro-layout";
import ProTable, { type ProColumns } from "@ant-design/pro-table";
import { Download, FileText, Plus, RefreshCw } from "lucide-react";

import { MetricCard } from "@/components/antd/metric-card";
import { StatusTag } from "@/components/antd/status-tag";
import { AppPageKey, AppShell } from "@/components/layout/app-shell";

const { Paragraph, Text } = Typography;

type TaskType = "新增标签" | "查询标签" | "修改标签" | "下线标签" | "复用标签";
type WorkflowStatus = "草稿" | "待评审" | "已生成";
type RiskLevel = "低" | "中" | "高";
type AssetStatus = "在线" | "待评审" | "已下线";
type AssetTabKey = "assets" | "touchpoints" | "rules";

type DraftTag = {
  tagName: string;
  businessGoal: string;
  tagType: string;
  page: string;
  touchPoint: string;
  targetGoods: string;
  targetUsers: string;
  timeRange: string;
  priority: number;
  styleId: string;
  text: string;
  shape: string;
  bgColor: string;
  textColor: string;
  fontSize: number;
  radius: number;
  excludeTags: string;
  owner: string;
};

type TagAsset = {
  id: string;
  name: string;
  type: string;
  pages: string[];
  touch: string;
  status: AssetStatus;
  priority: number;
  owner: string;
  updated: string;
  risk: RiskLevel;
  rule: string;
  style: string;
  styleId: string;
  reusableParts: string[];
  fallbackRule: string;
};

type TagStyle = {
  styleId: string;
  styleName: string;
  tagType: string;
  shape: string;
  backgroundColor: string;
  textColor: string;
  fontSize: number;
  radius: number;
  useScenes: string[];
  source: string;
};

type TouchPoint = {
  moduleId: string;
  moduleName: string;
  touchPoint: string;
  maxTags: number;
  currentTags: number;
  supportedTagTypes: string[];
  riskLevel: RiskLevel;
  desc: string;
  source: string;
};

type Rule = {
  touchPoint: string;
  maxTags: number;
  preferredTypes: string[];
  fallbackTouchPoint: string;
  conflictPolicy: string;
  source: string;
};

type KnowledgeSlot = {
  id: string;
  index: number;
  name: string;
  position: string;
  type: string;
  displayCount: string;
  definition: string;
  tags: string[];
  priority: string[];
  usageRules: string[];
  conflictRules: string[];
  displayRules: string[];
  abnormalRules: string[];
  examples: string[];
};

const taskFlows: Record<TaskType, string[]> = {
  新增标签: ["诉求澄清", "查找相似", "定位触点", "冲突判断", "配置预览", "生成方案"],
  查询标签: ["输入查询", "匹配标签", "查看路径", "查看详情", "后续操作"],
  修改标签: ["选择标签", "选择修改内容", "查看影响", "预览确认", "生成变更方案"],
  下线标签: ["选择标签", "查看展示范围", "检查依赖", "影响评估", "确认下线"],
  复用标签: ["描述诉求", "匹配相似标签", "选择复用项", "补充配置", "预览生成方案"]
};

const designSources = {
  detailDesign: "商详设计方案 Relay node 37:747",
  tagDesign: "标签设计方案 Relay node 37:7"
};

const tagStyles: TagStyle[] = [
  {
    styleId: "STYLE_PROMO_RED_CAPSULE",
    styleName: "红底白字促销胶囊",
    tagType: "促销",
    shape: "胶囊",
    backgroundColor: "#E1251B",
    textColor: "#FFFFFF",
    fontSize: 12,
    radius: 4,
    useScenes: ["商详价格区域", "商详促销区域"],
    source: designSources.tagDesign
  },
  {
    styleId: "STYLE_PRICE_RED_OUTLINE",
    styleName: "红色描边价格标签",
    tagType: "价格",
    shape: "描边",
    backgroundColor: "#FFFFFF",
    textColor: "#E1251B",
    fontSize: 12,
    radius: 4,
    useScenes: ["商详价格区域"],
    source: designSources.tagDesign
  },
  {
    styleId: "STYLE_MEMBER_BLACK_GOLD",
    styleName: "黑金会员权益标签",
    tagType: "会员",
    shape: "胶囊",
    backgroundColor: "#2B2118",
    textColor: "#FFD18A",
    fontSize: 12,
    radius: 4,
    useScenes: ["商详价格区域", "服务保障区域"],
    source: designSources.tagDesign
  },
  {
    styleId: "STYLE_SERVICE_GRAY",
    styleName: "灰底服务保障标签",
    tagType: "服务",
    shape: "胶囊",
    backgroundColor: "#F2F4F7",
    textColor: "#465366",
    fontSize: 12,
    radius: 4,
    useScenes: ["服务保障区域"],
    source: designSources.tagDesign
  }
];

const touchPoints: TouchPoint[] = [
  {
    moduleId: "IMAGE_MODULE",
    moduleName: "主图区域",
    touchPoint: "主图区域",
    maxTags: 2,
    currentTags: 1,
    supportedTagTypes: ["氛围", "运营"],
    riskLevel: "低",
    desc: "适合活动氛围、首发、新品等视觉角标。",
    source: designSources.detailDesign
  },
  {
    moduleId: "TITLE_MODULE",
    moduleName: "标题区域",
    touchPoint: "标题区域",
    maxTags: 2,
    currentTags: 1,
    supportedTagTypes: ["服务", "运营"],
    riskLevel: "低",
    desc: "适合自营、官方、商品身份和服务承诺。",
    source: designSources.detailDesign
  },
  {
    moduleId: "PRICE_MODULE",
    moduleName: "价格区域",
    touchPoint: "价格区域",
    maxTags: 2,
    currentTags: 2,
    supportedTagTypes: ["价格", "促销", "会员"],
    riskLevel: "高",
    desc: "最适合强化价格心智，但容量敏感，需要冲突检测。",
    source: designSources.detailDesign
  },
  {
    moduleId: "PROMO_MODULE",
    moduleName: "促销区域",
    touchPoint: "促销区域",
    maxTags: 5,
    currentTags: 3,
    supportedTagTypes: ["促销", "服务", "价格"],
    riskLevel: "中",
    desc: "承载优惠券、满减、换新等权益，可作为价格区降级位置。",
    source: designSources.detailDesign
  },
  {
    moduleId: "SERVICE_MODULE",
    moduleName: "服务保障区域",
    touchPoint: "服务保障区域",
    maxTags: 4,
    currentTags: 2,
    supportedTagTypes: ["服务", "会员"],
    riskLevel: "低",
    desc: "适合价保、赔付、履约、售后保障。",
    source: designSources.detailDesign
  }
];

const touchRules: Rule[] = [
  {
    touchPoint: "价格区域",
    maxTags: 2,
    preferredTypes: ["价格", "促销", "会员"],
    fallbackTouchPoint: "促销区域",
    conflictPolicy: "容量满时按优先级排序，命中互斥标签时展示高优先级标签。",
    source: designSources.detailDesign
  },
  {
    touchPoint: "促销区域",
    maxTags: 5,
    preferredTypes: ["促销", "价格", "服务"],
    fallbackTouchPoint: "服务保障区域",
    conflictPolicy: "权益类标签可共存，但优惠券、满减、补贴需按业务优先级排序。",
    source: designSources.detailDesign
  },
  {
    touchPoint: "服务保障区域",
    maxTags: 4,
    preferredTypes: ["服务", "会员"],
    fallbackTouchPoint: "店铺区域",
    conflictPolicy: "只承载服务保障表达，不建议放置价格促销类强营销标签。",
    source: designSources.detailDesign
  }
];

const initialAssets: TagAsset[] = [
  {
    id: "TAG_DETAIL_001",
    name: "限时低价",
    type: "价格/促销",
    pages: ["商品详情页"],
    touch: "价格区域",
    status: "待评审",
    priority: 80,
    owner: "商详产品组",
    updated: "2026-05-22",
    risk: "中",
    rule: "活动商品 && 降价幅度 >= 10%",
    style: "红底白字胶囊",
    styleId: "STYLE_PROMO_RED_CAPSULE",
    reusableParts: ["样式", "互斥规则"],
    fallbackRule: "与京东秒杀互斥，价格区容量不足时降级促销区"
  },
  {
    id: "TAG_DETAIL_002",
    name: "京东秒杀",
    type: "促销",
    pages: ["商品详情页", "搜索结果页"],
    touch: "价格区域",
    status: "在线",
    priority: 95,
    owner: "营销产品组",
    updated: "2026-05-18",
    risk: "高",
    rule: "秒杀活动商品 && 活动库存 > 0",
    style: "红底白字胶囊",
    styleId: "STYLE_PROMO_RED_CAPSULE",
    reusableParts: ["样式", "互斥规则"],
    fallbackRule: "与低价类标签互斥，秒杀优先"
  },
  {
    id: "TAG_DETAIL_003",
    name: "百亿补贴",
    type: "价格",
    pages: ["商品详情页", "首页"],
    touch: "价格区域",
    status: "在线",
    priority: 92,
    owner: "补贴频道",
    updated: "2026-05-17",
    risk: "中",
    rule: "补贴池商品 && 补贴价有效",
    style: "红底描边",
    styleId: "STYLE_PRICE_RED_OUTLINE",
    reusableParts: ["样式", "规则"],
    fallbackRule: "补贴价有效时优先展示，支持与限时低价排序共存"
  },
  {
    id: "TAG_DETAIL_004",
    name: "PLUS 专享价",
    type: "会员",
    pages: ["商品详情页"],
    touch: "价格区域",
    status: "在线",
    priority: 78,
    owner: "会员产品组",
    updated: "2026-05-12",
    risk: "中",
    rule: "PLUS 用户 && 会员价商品",
    style: "黑金胶囊",
    styleId: "STYLE_MEMBER_BLACK_GOLD",
    reusableParts: ["样式", "会员规则"],
    fallbackRule: "PLUS 用户命中时展示，低于秒杀和补贴优先级"
  },
  {
    id: "TAG_DETAIL_007",
    name: "价保 30 天",
    type: "服务",
    pages: ["商品详情页"],
    touch: "服务保障区域",
    status: "在线",
    priority: 62,
    owner: "服务产品组",
    updated: "2026-05-06",
    risk: "低",
    rule: "支持价保服务商品",
    style: "灰底服务标签",
    styleId: "STYLE_SERVICE_GRAY",
    reusableParts: ["规则", "服务表达"],
    fallbackRule: "服务保障区域稳定展示"
  },
  {
    id: "TAG_DETAIL_012",
    name: "即将下线",
    type: "运营",
    pages: ["商品详情页"],
    touch: "标题区域",
    status: "已下线",
    priority: 20,
    owner: "商详产品组",
    updated: "2026-04-18",
    risk: "低",
    rule: "人工运营配置",
    style: "灰色文字",
    styleId: "STYLE_SERVICE_GRAY",
    reusableParts: ["状态流转"],
    fallbackRule: "历史标签，仅保留版本记录"
  }
];

const knowledgeSlots: KnowledgeSlot[] = [
  {
    id: "POINT_01",
    index: 1,
    name: "平台模式标签",
    position: "商品主图/基础信息区域",
    type: "平台经营身份",
    displayCount: "1个",
    definition: "表达商品所属的平台经营身份，帮助用户快速判断商品的平台属性和基础可信度。",
    tags: ["京东自营", "自营", "全球购"],
    priority: ["京东自营", "自营", "全球购"],
    usageRules: ["多个平台模式标签同时命中时，仅展示优先级最高的 1 个。"],
    conflictRules: ["本点位内所有平台模式标签互斥。"],
    displayRules: ["最多展示 1 个标签。"],
    abnormalRules: ["商品经营身份缺失时不展示。"],
    examples: ["商品同时命中京东自营和自营，最终展示京东自营。"]
  },
  {
    id: "POINT_03",
    index: 3,
    name: "重点服务标签",
    position: "标题下方/服务承诺区域",
    type: "核心服务权益",
    displayCount: "多个，按优先级控制",
    definition: "表达直接降低购买顾虑的核心服务权益，例如退换、价保、质保等。",
    tags: ["免费上门退换", "不要吃包退", "安心质保", "7天价保"],
    priority: ["免费上门退换", "7天价保", "安心质保", "不要吃包退"],
    usageRules: ["商品命中服务权益时按服务价值排序。", "服务权益失效后不展示。"],
    conflictRules: ["服务标签原则上可共存。", "语义重复的服务权益需要合并表达。"],
    displayRules: ["多个服务可按优先级展示。"],
    abnormalRules: ["服务权益已失效时不展示。"],
    examples: ["商品命中免费上门退换、7天价保、安心质保时按优先级展示。"]
  },
  {
    id: "POINT_06",
    index: 6,
    name: "物流服务标签",
    position: "配送信息区域",
    type: "配送时效",
    displayCount: "1个或少量",
    definition: "表达商品当前地址下的配送时效能力，帮助用户判断收货预期。",
    tags: ["今日达", "明日达"],
    priority: ["今日达", "明日达"],
    usageRules: ["基于当前地址、库存、截单时间和配送能力判断。"],
    conflictRules: ["今日达和明日达互斥时展示时效更快者。"],
    displayRules: ["通常展示 1 个时效标签。"],
    abnormalRules: ["地址不支持时效承诺时不展示。"],
    examples: ["当前地址同时支持今日达和明日达时展示今日达。"]
  },
  {
    id: "POINT_09",
    index: 9,
    name: "店铺经营模式标签",
    position: "店铺信息区域",
    type: "店铺经营身份",
    displayCount: "1个或少量",
    definition: "表达店铺经营身份、资质或评级，帮助用户判断店铺可信度。",
    tags: ["自营", "旗舰店", "专卖店", "全球购", "精选二手", "年费京店", "五星店铺"],
    priority: ["自营", "旗舰店", "专卖店", "全球购", "五星店铺", "年费京店", "精选二手"],
    usageRules: ["店铺经营身份按资质和信任价值排序。"],
    conflictRules: ["店铺经营模式不得与点位1的平台模式混合判断。"],
    displayRules: ["通常展示 1 个或少量标签。"],
    abnormalRules: ["店铺资质过期时不展示。"],
    examples: ["店铺为旗舰店且五星店铺时，旗舰店优先，可展示五星店铺。"]
  }
];

const previewProducts = [
  {
    sceneId: "PROMO_SKU",
    sceneName: "促销活动商品",
    skuName: "京东自营 家用智能空气净化器 高效除醛低噪音",
    activityPrice: "1099",
    tags: ["限时低价", "店铺券", "价保 30 天"]
  },
  {
    sceneId: "PLUS_SKU",
    sceneName: "会员权益商品",
    skuName: "PLUS 专享 无线降噪蓝牙耳机 长续航",
    activityPrice: "799",
    tags: ["PLUS 专享价", "买贵双倍赔"]
  }
];

const initialDraft: DraftTag = {
  tagName: "限时低价",
  businessGoal: "提升低价商品转化，强化活动期价格心智",
  tagType: "价格/促销",
  page: "商品详情页",
  touchPoint: "价格区域",
  targetGoods: "活动商品 && 降价幅度 >= 10%",
  targetUsers: "全量用户",
  timeRange: "2026-06-01 至 2026-06-18",
  priority: 80,
  styleId: "STYLE_PROMO_RED_CAPSULE",
  text: "限时低价",
  shape: "胶囊",
  bgColor: "#E1251B",
  textColor: "#FFFFFF",
  fontSize: 12,
  radius: 4,
  excludeTags: "京东秒杀",
  owner: "商详产品组"
};

const riskColor: Record<RiskLevel, string> = {
  低: "green",
  中: "orange",
  高: "red"
};

const statusMap = {
  在线: { label: "在线", tone: "success" },
  已下线: { label: "已下线", tone: "default" },
  待评审: { label: "待评审", tone: "warning" }
} as const;

function inferTaskType(text: string): TaskType {
  if (/下线|删除|不用|关掉/.test(text)) return "下线标签";
  if (/修改|调整|改|换|变更/.test(text)) return "修改标签";
  if (/复用|类似|沿用/.test(text)) return "复用标签";
  if (/查|查询|在哪|有哪些|状态/.test(text)) return "查询标签";
  return "新增标签";
}

export default function Home() {
  const [activePage, setActivePage] = useState<AppPageKey>("workspace");
  const [assetTab, setAssetTab] = useState<AssetTabKey>("assets");
  const [taskType, setTaskType] = useState<TaskType>("新增标签");
  const [stepIndex, setStepIndex] = useState(0);
  const [intentText, setIntentText] = useState("我想在商详价格区新增一个限时低价标签");
  const [draftTag, setDraftTag] = useState<DraftTag>(initialDraft);
  const [workflowStatus, setWorkflowStatus] = useState<WorkflowStatus>("草稿");
  const [selectedKnowledgeId, setSelectedKnowledgeId] = useState("POINT_03");
  const [selectedSceneId, setSelectedSceneId] = useState("PROMO_SKU");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const currentSteps = taskFlows[taskType];
  const currentStepName = currentSteps[stepIndex] ?? currentSteps[0];
  const currentStyle = tagStyles.find((item) => item.styleId === draftTag.styleId) ?? tagStyles[0];
  const selectedKnowledge =
    knowledgeSlots.find((slot) => slot.id === selectedKnowledgeId) ?? knowledgeSlots[0];
  const selectedProduct =
    previewProducts.find((product) => product.sceneId === selectedSceneId) ?? previewProducts[0];
  const touchRule = touchRules.find((rule) => rule.touchPoint === draftTag.touchPoint);

  useEffect(() => {
    const payload = {
      activePage,
      draftTag,
      intentText,
      source: "antd-starter",
      taskStep: currentStepName,
      taskType,
      updatedAt: new Date().toISOString(),
      workflowStatus
    };
    localStorage.setItem("jdTagPlatformState", JSON.stringify(payload));
  }, [activePage, currentStepName, draftTag, intentText, taskType, workflowStatus]);

  const updateDraft = <K extends keyof DraftTag>(key: K, value: DraftTag[K]) => {
    setDraftTag((current) => ({ ...current, [key]: value }));
  };

  const chooseQuickTask = (type: TaskType) => {
    const examples: Record<TaskType, string> = {
      下线标签: "我想把即将下线标签关掉",
      修改标签: "我想把限时低价标签调整到促销区域展示",
      查询标签: "我想查一下商详价格区有哪些低价标签",
      复用标签: "我想复用百亿补贴的标签样式",
      新增标签: "我想在商详价格区新增一个限时低价标签"
    };
    setTaskType(type);
    setIntentText(examples[type]);
    setStepIndex(0);
    setActivePage("history");
  };

  const startIntent = () => {
    const nextType = inferTaskType(intentText);
    setTaskType(nextType);
    setStepIndex(0);
    setActivePage("history");
  };

  const nextStep = () => {
    if (stepIndex < currentSteps.length - 1) {
      setStepIndex((index) => index + 1);
      return;
    }
    setWorkflowStatus("待评审");
  };

  const applyRecommendation = () => {
    if (currentStepName.includes("定位")) updateDraft("touchPoint", "价格区域");
    if (currentStepName.includes("冲突")) {
      setDraftTag((current) => ({ ...current, excludeTags: "京东秒杀", priority: 80 }));
    }
    if (currentStepName.includes("配置")) {
      const style = tagStyles[0];
      setDraftTag((current) => ({
        ...current,
        bgColor: style.backgroundColor,
        radius: style.radius,
        shape: style.shape,
        styleId: style.styleId,
        textColor: style.textColor
      }));
    }
  };

  const markdown = useMemo(
    () => `# ${draftTag.tagName} 标签方案

## 产品目标
${draftTag.businessGoal}

## 基础信息
- 任务类型：${taskType}
- 展示页面：${draftTag.page}
- 展示触点：${draftTag.touchPoint}
- 标签类型：${draftTag.tagType}
- 当前状态：${workflowStatus}

## 规则与冲突
- 商品条件：${draftTag.targetGoods}
- 用户条件：${draftTag.targetUsers}
- 生效时间：${draftTag.timeRange}
- 互斥标签：${draftTag.excludeTags}
- 优先级：${draftTag.priority}

## 样式
- 文案：${draftTag.text}
- 样式名称：${currentStyle.styleName}
- 形态：${currentStyle.shape}
- 背景色：${currentStyle.backgroundColor}
- 字体色：${currentStyle.textColor}
- 字号：${currentStyle.fontSize}px
- 圆角：${currentStyle.radius}px

## 设计依据
- 标签样式来源：${currentStyle.source}
- 商详触点来源：${touchRule ? touchRule.source : designSources.detailDesign}
- 触点承载规则：${touchRule ? touchRule.conflictPolicy : "按商详触点规则展示"}

## 标准知识库依据
- 适用点位：点位${selectedKnowledge.index} ${selectedKnowledge.name}
- 点位位置：${selectedKnowledge.position}
- 展示规则：${selectedKnowledge.displayRules[0]}
- 冲突规则：${selectedKnowledge.conflictRules[0]}
`,
    [currentStyle, draftTag, selectedKnowledge, taskType, touchRule, workflowStatus]
  );

  const copyMarkdown = async () => {
    await navigator.clipboard.writeText(markdown);
    message.success("已复制方案");
  };

  const downloadMarkdown = () => {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const element = document.createElement("a");
    element.href = url;
    element.download = `${draftTag.tagName}-标签方案.md`;
    element.click();
    URL.revokeObjectURL(url);
  };

  const assetColumns: ProColumns<TagAsset>[] = [
    { dataIndex: "name", title: "标签名称", render: (_, row) => <Text strong>{row.name}</Text> },
    {
      dataIndex: "pages",
      hideInSearch: true,
      title: "页面",
      render: (_, row) => row.pages.join(" / ")
    },
    {
      dataIndex: "touch",
      title: "触点",
      valueType: "select",
      valueEnum: {
        价格区域: "价格区域",
        促销区域: "促销区域",
        服务保障区域: "服务保障区域",
        标题区域: "标题区域"
      }
    },
    {
      dataIndex: "type",
      title: "类型",
      valueType: "select",
      valueEnum: {
        价格: "价格",
        促销: "促销",
        会员: "会员",
        服务: "服务",
        运营: "运营"
      }
    },
    {
      dataIndex: "status",
      title: "状态",
      valueType: "select",
      valueEnum: {
        在线: { text: "在线", status: "Success" },
        已下线: { text: "已下线", status: "Default" },
        待评审: { text: "待评审", status: "Warning" }
      },
      render: (_, row) => <StatusTag {...statusMap[row.status]} />
    },
    {
      dataIndex: "risk",
      hideInSearch: true,
      title: "风险",
      render: (_, row) => <Tag color={riskColor[row.risk]}>{row.risk}</Tag>
    },
    { dataIndex: "owner", hideInSearch: true, title: "负责人" },
    {
      hideInSearch: true,
      title: "操作",
      valueType: "option",
      render: (_, row) => [
        <Button
          key="edit"
          onClick={() => {
            setDraftTag((current) => ({
              ...current,
              excludeTags: row.name === "限时低价" ? "京东秒杀" : current.excludeTags,
              priority: row.priority,
              styleId: row.styleId,
              tagName: row.name,
              text: row.name,
              touchPoint: row.touch
            }));
            chooseQuickTask("修改标签");
          }}
          type="link"
        >
          处理
        </Button>
      ]
    }
  ];

  const pageTitle = {
    assets: "标签资产库",
    history: "历史任务",
    knowledge: "底层知识库",
    workspace: "京东 App 标签一站式平台"
  }[activePage];

  return (
    <AppShell activeKey={activePage} onNavigate={setActivePage}>
      <PageContainer
        extra={[
          <Button icon={<RefreshCw className="size-4" />} key="sync" onClick={() => message.success("已同步当前模拟知识库")}>
            同步知识库
          </Button>,
          <Button icon={<Download className="size-4" />} key="export" onClick={downloadMarkdown}>
            导出方案
          </Button>,
          <Button icon={<Plus className="size-4" />} key="new" onClick={() => chooseQuickTask("新增标签")} type="primary">
            新建任务
          </Button>
        ]}
        subTitle={`${taskType} · ${currentStepName} · ${workflowStatus}`}
        title={pageTitle}
      >
        {activePage === "workspace" && renderWorkspace()}
        {activePage === "history" && renderHistory()}
        {activePage === "assets" && renderAssets()}
        {activePage === "knowledge" && renderKnowledge()}
        <Drawer
          onClose={() => setDrawerOpen(false)}
          open={drawerOpen}
          placement="right"
          title="判断依据"
          width={560}
        >
          {renderDecisionBasis()}
        </Drawer>
      </PageContainer>
    </AppShell>
  );

  function renderWorkspace() {
    return (
      <Space direction="vertical" size={16} style={{ display: "flex" }}>
        <Row gutter={[16, 16]}>
          <Col lg={6} sm={12} xs={24}>
            <MetricCard title="线上标签" value={initialAssets.filter((item) => item.status === "在线").length} />
          </Col>
          <Col lg={6} sm={12} xs={24}>
            <MetricCard suffix="个" title="商详触点" value={touchPoints.length} />
          </Col>
          <Col lg={6} sm={12} xs={24}>
            <MetricCard suffix="个" title="需校验冲突" value={3} />
          </Col>
          <Col lg={6} sm={12} xs={24}>
            <MetricCard precision={0} suffix="%" title="MVP 跑通度" value={86} />
          </Col>
        </Row>

        <Card title="01 主入口：从模糊诉求开始" extra={<Tag color="red">渐进式披露</Tag>}>
          <Form layout="vertical">
            <Form.Item label="你想处理什么标签问题">
              <Input.TextArea
                autoSize={{ minRows: 3, maxRows: 5 }}
                onChange={(event) => setIntentText(event.target.value)}
                value={intentText}
              />
            </Form.Item>
            <Space size={8} wrap>
              {(Object.keys(taskFlows) as TaskType[]).map((type) => (
                <Button key={type} onClick={() => chooseQuickTask(type)}>
                  {type}
                </Button>
              ))}
              <Button onClick={startIntent} type="primary">
                开始处理
              </Button>
            </Space>
          </Form>
        </Card>

        <Row gutter={[16, 16]}>
          <Col xl={12} xs={24}>
            <Card title="平台识别结果">
              <Space direction="vertical" size={12}>
                <Alert message={`识别任务：${taskType}`} showIcon type="success" />
                <Space size={[8, 8]} wrap>
                  {["目标商品范围", "活动周期", "是否需要点击跳转"].map((item) => (
                    <Tag color="orange" key={item}>
                      待确认：{item}
                    </Tag>
                  ))}
                </Space>
                <Paragraph type="secondary">
                  推荐参考：点位{selectedKnowledge.index} {selectedKnowledge.name}。{selectedKnowledge.definition}
                </Paragraph>
              </Space>
            </Card>
          </Col>
          <Col xl={12} xs={24}>
            <Card title="当前任务进度">
              <Steps current={stepIndex} items={currentSteps.map((title) => ({ title }))} />
            </Card>
          </Col>
        </Row>

        <Card title="设计方案数据接入状态" extra={<Tag color="green">已结构化</Tag>}>
          <Row gutter={[16, 16]}>
            <Col lg={6} sm={12} xs={24}>
              <MetricCard title="标签样式库" value={tagStyles.length} />
            </Col>
            <Col lg={6} sm={12} xs={24}>
              <MetricCard title="商详触点" value={touchPoints.length} />
            </Col>
            <Col lg={6} sm={12} xs={24}>
              <MetricCard title="标签资产" value={initialAssets.length} />
            </Col>
            <Col lg={6} sm={12} xs={24}>
              <MetricCard title="标准点位" value={knowledgeSlots.length} />
            </Col>
          </Row>
        </Card>
      </Space>
    );
  }

  function renderHistory() {
    return (
      <Space direction="vertical" size={16} style={{ display: "flex" }}>
        <Card title="历史任务链路" extra={<Tag color="blue">{taskType}</Tag>}>
          <Steps
            current={stepIndex}
            items={currentSteps.map((title) => ({ title }))}
            onChange={setStepIndex}
          />
        </Card>
        <Row gutter={[16, 16]}>
          <Col xl={16} xs={24}>
            <Card
              title={`当前步骤：${currentStepName}`}
              extra={
                <Segmented
                  onChange={(value) => {
                    setTaskType(value as TaskType);
                    setStepIndex(0);
                  }}
                  options={Object.keys(taskFlows)}
                  value={taskType}
                />
              }
            >
              {renderFlowStep()}
              <Space style={{ marginTop: 16 }} wrap>
                <Button onClick={() => setStepIndex(Math.max(0, stepIndex - 1))}>上一步</Button>
                <Button onClick={applyRecommendation}>我不确定，帮我推荐</Button>
                <Button onClick={nextStep} type="primary">
                  {stepIndex === currentSteps.length - 1 ? "生成任务方案" : "下一步"}
                </Button>
              </Space>
            </Card>
          </Col>
          <Col xl={8} xs={24}>
            <Card title="平台推荐">
              <Timeline
                items={[
                  { color: "blue", children: "先判断用户诉求属于查、新增、改、下线还是复用。" },
                  { color: "orange", children: "再检索已有标签、触点容量、样式资产和互斥规则。" },
                  { color: "green", children: "最后输出推荐方案、预览结果和可导出文档。" }
                ]}
              />
            </Card>
          </Col>
        </Row>
        {renderPlan()}
      </Space>
    );
  }

  function renderFlowStep() {
    if (taskType === "查询标签") {
      return (
        <Space direction="vertical" size={16} style={{ display: "flex" }}>
          <Alert message="查询类任务优先返回标签位置、状态、路径和后续操作。" showIcon type="info" />
          <ProTable<TagAsset>
            columns={assetColumns}
            dataSource={initialAssets}
            options={false}
            pagination={false}
            rowKey="id"
            search={{ labelWidth: "auto" }}
          />
        </Space>
      );
    }

    if (taskType === "修改标签" || taskType === "下线标签" || taskType === "复用标签") {
      return (
        <Space direction="vertical" size={16} style={{ display: "flex" }}>
          <Alert
            message={`${taskType} 会先选择标签，再展示影响范围、可复用项和风险。`}
            showIcon
            type="warning"
          />
          <Row gutter={[12, 12]}>
            <Col md={12} xs={24}>
              <Select
                onChange={(value) => {
                  const asset = initialAssets.find((item) => item.name === value);
                  if (asset) {
                    setDraftTag((current) => ({
                      ...current,
                      priority: asset.priority,
                      styleId: asset.styleId,
                      tagName: asset.name,
                      text: asset.name,
                      touchPoint: asset.touch
                    }));
                  }
                }}
                options={initialAssets.map((asset) => ({ label: asset.name, value: asset.name }))}
                style={{ width: "100%" }}
                value={draftTag.tagName}
              />
            </Col>
            <Col md={12} xs={24}>
              <Select
                onChange={(value) => updateDraft("touchPoint", value)}
                options={touchPoints.map((point) => ({ label: point.touchPoint, value: point.touchPoint }))}
                style={{ width: "100%" }}
                value={draftTag.touchPoint}
              />
            </Col>
          </Row>
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="影响范围">商品详情页 · {draftTag.touchPoint} · 历史覆盖约 90 万曝光</Descriptions.Item>
            <Descriptions.Item label="依赖检查">{taskType === "下线标签" ? "无强依赖，建议保留历史版本" : "可复用样式、触点和部分命中规则"}</Descriptions.Item>
            <Descriptions.Item label="处理建议">{taskType === "复用标签" ? "复用样式，不直接复用互斥规则" : "先预览变更，再进入方案导出"}</Descriptions.Item>
          </Descriptions>
        </Space>
      );
    }

    if (currentStepName === "配置预览") return renderConfigForm();
    if (currentStepName === "定位触点") return renderTouchChoices();
    if (currentStepName === "冲突判断") return renderConflicts();

    return (
      <Space direction="vertical" size={16} style={{ display: "flex" }}>
        <Form layout="vertical">
          <Row gutter={12}>
            <Col md={12} xs={24}>
              <Form.Item label="标签名称">
                <Input onChange={(event) => updateDraft("tagName", event.target.value)} value={draftTag.tagName} />
              </Form.Item>
            </Col>
            <Col md={12} xs={24}>
              <Form.Item label="业务目标">
                <Input onChange={(event) => updateDraft("businessGoal", event.target.value)} value={draftTag.businessGoal} />
              </Form.Item>
            </Col>
            <Col md={12} xs={24}>
              <Form.Item label="目标页面">
                <Select
                  onChange={(value) => updateDraft("page", value)}
                  options={["商品详情页", "搜索结果页", "首页", "购物车", "不确定"].map((value) => ({
                    label: value,
                    value
                  }))}
                  value={draftTag.page}
                />
              </Form.Item>
            </Col>
            <Col md={12} xs={24}>
              <Form.Item label="展示触点">
                <Select
                  onChange={(value) => updateDraft("touchPoint", value)}
                  options={touchPoints.map((point) => ({ label: point.touchPoint, value: point.touchPoint }))}
                  value={draftTag.touchPoint}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Alert message="平台会在下一步查找京东秒杀、百亿补贴、PLUS 专享价等相似标签。" showIcon type="info" />
      </Space>
    );
  }

  function renderTouchChoices() {
    return (
      <Row gutter={[12, 12]}>
        {touchPoints.map((point) => (
          <Col lg={8} md={12} xs={24} key={point.moduleId}>
            <Card
              extra={<Tag color={riskColor[point.riskLevel]}>{point.riskLevel}风险</Tag>}
              onClick={() => updateDraft("touchPoint", point.touchPoint)}
              style={{
                borderColor: draftTag.touchPoint === point.touchPoint ? "#e1251b" : undefined,
                cursor: "pointer",
                height: "100%"
              }}
              title={point.moduleName}
            >
              <Paragraph type="secondary">{point.desc}</Paragraph>
              <Text>容量：{point.currentTags}/{point.maxTags}</Text>
              <div style={{ marginTop: 8 }}>
                {point.supportedTagTypes.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    );
  }

  function renderConflicts() {
    const conflicts = [
      ["高", "触点容量冲突", "商详价格区域当前 2/2，新增后超过承载上限。", "建议排序或降级到促销区域。"],
      ["中", "规则命中冲突", "与京东秒杀存在活动商品重叠。", "建议与京东秒杀互斥，秒杀优先。"],
      ["中", "样式语义冲突", "与到手价、百亿补贴都表达价格优惠。", "建议突出“限时”，避免单纯表达优惠。"]
    ] as const;

    return (
      <Row gutter={[12, 12]}>
        {conflicts.map(([level, title, impact, action]) => (
          <Col md={8} xs={24} key={title}>
            <Card title={title} extra={<Tag color={riskColor[level]}>{level}风险</Tag>}>
              <Paragraph type="secondary">{impact}</Paragraph>
              <Text strong>建议：</Text>
              <Paragraph>{action}</Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    );
  }

  function renderConfigForm() {
    return (
      <Space direction="vertical" size={16} style={{ display: "flex" }}>
        <Row gutter={12}>
          <Col md={8} xs={24}>
            <Form.Item label="标签文案">
              <Input onChange={(event) => updateDraft("text", event.target.value)} value={draftTag.text} />
            </Form.Item>
          </Col>
          <Col md={8} xs={24}>
            <Form.Item label="优先级">
              <InputNumber onChange={(value) => updateDraft("priority", Number(value ?? 0))} style={{ width: "100%" }} value={draftTag.priority} />
            </Form.Item>
          </Col>
          <Col md={8} xs={24}>
            <Form.Item label="互斥标签">
              <Input onChange={(event) => updateDraft("excludeTags", event.target.value)} value={draftTag.excludeTags} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[12, 12]}>
          {tagStyles.map((style) => (
            <Col md={6} xs={24} key={style.styleId}>
              <Card
                onClick={() =>
                  setDraftTag((current) => ({
                    ...current,
                    bgColor: style.backgroundColor,
                    fontSize: style.fontSize,
                    radius: style.radius,
                    shape: style.shape,
                    styleId: style.styleId,
                    textColor: style.textColor
                  }))
                }
                style={{
                  borderColor: draftTag.styleId === style.styleId ? "#e1251b" : undefined,
                  cursor: "pointer",
                  height: "100%"
                }}
                title={style.styleName}
              >
                <Tag style={{ background: style.backgroundColor, color: style.textColor }}>
                  {draftTag.text}
                </Tag>
                <Paragraph style={{ marginTop: 12 }} type="secondary">
                  {style.shape} · {style.fontSize}px · {style.useScenes.join(" / ")}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </Space>
    );
  }

  function renderPlan() {
    return (
      <Row gutter={[16, 16]}>
        <Col xl={10} xs={24}>
          <Card title="商详实时预览" extra={<Tag color="red">结果确认</Tag>}>
            <Space style={{ marginBottom: 12 }} wrap>
              {previewProducts.map((product) => (
                <Button
                  key={product.sceneId}
                  onClick={() => setSelectedSceneId(product.sceneId)}
                  type={selectedSceneId === product.sceneId ? "primary" : "default"}
                >
                  {product.sceneName}
                </Button>
              ))}
            </Space>
            <div className="phone-preview">
              <div className="phone-image">商品主图区域</div>
              <div className="phone-body">
                <Text strong>{selectedProduct.skuName}</Text>
                <div className="price-line">
                  <span>¥{selectedProduct.activityPrice}</span>
                  {draftTag.touchPoint === "价格区域" && previewTag()}
                </div>
                <Space wrap>
                  {draftTag.touchPoint === "促销区域" && previewTag()}
                  {selectedProduct.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </Space>
              </div>
            </div>
          </Card>
        </Col>
        <Col xl={14} xs={24}>
          <Card title="方案交付包">
            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label="产品方案">业务目标、展示路径、命中规则、互斥排序。</Descriptions.Item>
              <Descriptions.Item label="设计说明">{currentStyle.styleName}，来源：{currentStyle.source}</Descriptions.Item>
              <Descriptions.Item label="样式代码">自动生成标签组件参数和 CSS 片段。</Descriptions.Item>
              <Descriptions.Item label="测试用例">命中、不命中、互斥、降级、下线状态。</Descriptions.Item>
            </Descriptions>
            <pre className="markdown-preview">{markdown}</pre>
            <Space wrap>
              <Button icon={<FileText className="size-4" />} onClick={copyMarkdown} type="primary">
                复制方案
              </Button>
              <Button onClick={downloadMarkdown}>下载 Markdown</Button>
              <Button onClick={() => setDrawerOpen(true)}>查看判断依据</Button>
            </Space>
          </Card>
        </Col>
      </Row>
    );
  }

  function previewTag() {
    return (
      <Tag
        style={{
          background: draftTag.bgColor,
          borderColor: draftTag.bgColor,
          borderRadius: draftTag.radius,
          color: draftTag.textColor,
          fontSize: draftTag.fontSize
        }}
      >
        {draftTag.text}
      </Tag>
    );
  }

  function renderAssets() {
    return (
      <Card>
        <Tabs
          activeKey={assetTab}
          items={[
            {
              children: (
                <ProTable<TagAsset>
                  columns={assetColumns}
                  dataSource={initialAssets}
                  options={false}
                  pagination={{ pageSize: 5 }}
                  rowKey="id"
                  search={{ labelWidth: "auto" }}
                  toolbar={{ title: "标签资产" }}
                />
              ),
              key: "assets",
              label: "标签资产"
            },
            {
              children: renderTouchChoices(),
              key: "touchpoints",
              label: "商详点位"
            },
            {
              children: renderRuleCards(),
              key: "rules",
              label: "规则依据"
            }
          ]}
          onChange={(key) => setAssetTab(key as AssetTabKey)}
        />
      </Card>
    );
  }

  function renderRuleCards() {
    return (
      <Row gutter={[12, 12]}>
        {touchRules.map((rule) => (
          <Col md={8} xs={24} key={rule.touchPoint}>
            <Card title={rule.touchPoint}>
              <Paragraph type="secondary">{rule.conflictPolicy}</Paragraph>
              <Text>降级触点：{rule.fallbackTouchPoint}</Text>
              <div style={{ marginTop: 8 }}>
                {rule.preferredTypes.map((type) => (
                  <Tag key={type}>{type}</Tag>
                ))}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    );
  }

  function renderKnowledge() {
    return (
      <Row gutter={[16, 16]}>
        <Col xl={9} xs={24}>
          <Card title="标准点位">
            <Space direction="vertical" style={{ display: "flex" }}>
              {knowledgeSlots.map((slot) => (
                <Button
                  block
                  key={slot.id}
                  onClick={() => setSelectedKnowledgeId(slot.id)}
                  style={{ textAlign: "left" }}
                  type={selectedKnowledgeId === slot.id ? "primary" : "default"}
                >
                  点位{slot.index} {slot.name}
                </Button>
              ))}
            </Space>
          </Card>
        </Col>
        <Col xl={15} xs={24}>
          <Card title={`点位${selectedKnowledge.index} ${selectedKnowledge.name}`}>
            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label="位置">{selectedKnowledge.position}</Descriptions.Item>
              <Descriptions.Item label="类型">{selectedKnowledge.type}</Descriptions.Item>
              <Descriptions.Item label="定义">{selectedKnowledge.definition}</Descriptions.Item>
              <Descriptions.Item label="展示数量">{selectedKnowledge.displayCount}</Descriptions.Item>
            </Descriptions>
            <KnowledgeSection items={selectedKnowledge.tags} title="标签清单" />
            <KnowledgeSection items={selectedKnowledge.usageRules} title="使用逻辑" />
            <KnowledgeSection items={selectedKnowledge.conflictRules} title="互斥与冲突规则" />
            <KnowledgeSection items={selectedKnowledge.examples} title="示例" />
          </Card>
        </Col>
      </Row>
    );
  }

  function renderDecisionBasis() {
    return (
      <Space direction="vertical" size={16} style={{ display: "flex" }}>
        <Alert
          description="商详标签标准规范、Relay 标签设计方案、Relay 商详设计方案，以及历史任务沉淀结果。"
          message="依据来源"
          showIcon
          type="success"
        />
        <Descriptions bordered column={1} size="small">
          <Descriptions.Item label="样式来源">{currentStyle.styleName} · {currentStyle.source}</Descriptions.Item>
          <Descriptions.Item label="触点规则">{touchRule?.conflictPolicy ?? "按商详触点规则展示"}</Descriptions.Item>
          <Descriptions.Item label="知识库点位">点位{selectedKnowledge.index} {selectedKnowledge.name}</Descriptions.Item>
        </Descriptions>
      </Space>
    );
  }
}

function KnowledgeSection({ items, title }: { items: string[]; title: string }) {
  return (
    <div style={{ marginTop: 16 }}>
      <Text strong>{title}</Text>
      <div style={{ marginTop: 8 }}>
        <Space size={[8, 8]} wrap>
          {items.map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </Space>
      </div>
    </div>
  );
}
