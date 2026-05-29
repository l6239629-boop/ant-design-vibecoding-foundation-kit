# Visual Migration Map

Use this map when replacing an existing project's visual style with the AntD Light visual standard.

## Tailwind Class Mapping

| Existing pattern | Replace with |
| --- | --- |
| `bg-black` | AntD layout background or remove when inside `PageContainer` |
| `bg-neutral-950` | AntD layout background |
| `bg-zinc-950` | AntD layout background |
| `bg-slate-950` | AntD layout background |
| `text-white` | AntD text token or normal inherited text |
| `text-zinc-100` | AntD text token or normal inherited text |
| `border-zinc-800` | AntD border token or normal `Card` border |
| `dark:*` | Remove from default light path or isolate behind an explicit theme switch |

## CSS Mapping

| Existing pattern | Replace with |
| --- | --- |
| `background: #000` | `colorBgLayout` / light layout token |
| `background-color: #000` | `colorBgLayout` / light layout token |
| `color: #fff` | `colorText` / inherited text |
| `--background: 0 0% 0%` | light CSS variable matching AntD layout |
| `--foreground: 0 0% 100%` | light CSS variable matching AntD text |

## Structure Mapping

| Existing pattern | Replace with |
| --- | --- |
| Custom page shell | `components/layout/*` with Ant Design `Layout` |
| Custom content header | `PageContainer` |
| Custom metric block | `MetricCard` or Ant Design `Statistic` inside `Card` |
| Custom query table | `ProTable` |
| Custom business form | `ProForm` |
| Custom detail block | `ProDescriptions` |
| Custom status badge | `StatusTag` or Ant Design `Tag` |

## Migration Order

1. Replace global dark activation and page background.
2. Replace the application shell.
3. Replace page containers and content cards.
4. Replace query tables, business forms, and detail blocks.
5. Replace remaining hard-coded colors with tokens.
6. Run `npm run visual:audit`, `npm run visual:check`, and `npm run verify`.
