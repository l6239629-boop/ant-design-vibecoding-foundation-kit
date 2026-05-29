# AntD Light Visual Standard

Use this standard after conservative Ant Design adoption when the user explicitly wants a unified visual style.

The default target is Ant Design Light. Do not force this visual migration during conservative adoption.

## When To Use

Use this standard only after one of these confirmations:

- `统一 AntD 视觉`
- `执行 AntD 视觉规范化`
- `替换为 AntD 白色规范`
- The user confirms the post-adoption prompt to continue visual standardization.

## Default Visual Target

- Use a white or light gray application background.
- Use Ant Design `theme.defaultAlgorithm`.
- Use `lib/theme.ts` as the runtime token source.
- Use `PageContainer` for business page structure.
- Use Ant Design `Card` for content blocks.
- Use `ProTable` for query-table workflows.
- Use `ProForm` for business forms.
- Use `ProDescriptions` for detail pages.
- Use Tailwind for layout, spacing, and responsive composition only.

## Color Rules

- Page background should align with Ant Design `colorBgLayout`.
- Content surface should align with Ant Design `colorBgContainer`.
- Primary text should align with Ant Design `colorText`.
- Secondary text should align with Ant Design `colorTextSecondary`.
- Brand, status, and semantic colors should be added to `lib/theme.ts` before use.
- Avoid scattered hard-coded colors in page and component files.

## Dark Style Handling

When dark styles are detected, do not delete them during conservative adoption.

After user confirmation:

- Remove default dark theme activation from the main shell.
- Replace black page backgrounds with AntD light layout backgrounds.
- Replace white-on-black text assumptions with token-based text colors.
- Isolate optional dark theme code behind an explicit future theme switch only if the user asks for it.

## Required Prompt After Conservative Adoption

If visual audit detects dark or custom visual styles, report:

```text
已完成保守接入。当前项目仍保留原视觉风格。
检测到暗色/自定义视觉风险。
是否继续统一为 AntD 白色视觉规范？
```

Do not continue visual replacement until the user confirms.
