# Migration Map

Use this map when converting existing UI to the Ant Design vibecoding standard.

| Existing Pattern | Target Pattern |
| --- | --- |
| Custom page title and action row | `PageContainer` |
| `Form` + `Table` + `Pagination` | `ProTable` |
| Hand-written filter bar above table | `ProTable` `search` |
| Hand-written refresh, density, and column settings | `ProTable` `options` |
| Custom table toolbar | `ProTable` `toolBarRender` |
| `Form.Item` + `Input` | `ProFormText` |
| `Form.Item` + `Select` | `ProFormSelect` |
| `Form.Item` + `Input.TextArea` | `ProFormTextArea` |
| Multi-step business form | `StepsForm` |
| Modal form | `ModalForm` |
| Drawer form | `DrawerForm` |
| `Descriptions` for business detail | `ProDescriptions` |
| Hard-coded status `Tag` | `StatusTag` |
| `Statistic` inside custom card | `MetricCard` |
| Simple table with no query workflow | `DataTable` or Ant Design `Table` |
| Local brand color literals | `lib/theme.ts` token |
| Repeated shell button/card styling | `components/ui/*` |

## Page-Level Replacements

### List Page

Before:

```tsx
<Form />
<Table />
<Pagination />
```

After:

```tsx
<PageContainer>
  <ProTable
    columns={columns}
    request={request}
    search={{ labelWidth: "auto" }}
    toolBarRender={() => []}
  />
</PageContainer>
```

### Form Page

Before:

```tsx
<Form>
  <Form.Item name="name">
    <Input />
  </Form.Item>
</Form>
```

After:

```tsx
<PageContainer>
  <ProForm>
    <ProFormText name="name" />
  </ProForm>
</PageContainer>
```

### Detail Page

Before:

```tsx
<Descriptions />
```

After:

```tsx
<PageContainer>
  <ProDescriptions columns={columns} dataSource={data} />
</PageContainer>
```

For Next.js + Turbopack builds, isolate `ProDescriptions` in a client component if prerendering exposes a module initialization issue.

## Checklist Signals

`npm run migration:check` warns about these legacy signals:

- `<Pagination`
- `Form.Item`
- direct `<Table`

These warnings do not always mean the code is wrong, but they should trigger a review. Query-table pages should usually become `ProTable`; business forms should usually become `ProForm`.
