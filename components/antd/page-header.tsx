import type { ReactNode } from "react";

export function PageHeader({
  actions,
  description,
  title
}: {
  actions?: ReactNode;
  description?: string;
  title: string;
}) {
  return (
    <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        {description ? (
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}
