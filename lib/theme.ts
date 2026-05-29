import type { ThemeConfig } from "antd";

export const appTheme = {
  color: {
    primary: "#e1251b",
    primaryHover: "#c81623",
    success: "#16a34a",
    warning: "#d97706",
    danger: "#dc2626",
    info: "#2563eb",
    background: "#f4f6f8",
    surface: "#ffffff",
    surfaceMuted: "#f7f8fa",
    text: "#171717",
    textMuted: "#64748b",
    border: "#e5e7eb"
  },
  radius: {
    sm: 6,
    md: 8,
    lg: 10
  },
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
} as const;

export const antdTheme: ThemeConfig = {
  token: {
    borderRadius: appTheme.radius.md,
    colorBgContainer: appTheme.color.surface,
    colorBgLayout: appTheme.color.background,
    colorBorder: appTheme.color.border,
    colorError: appTheme.color.danger,
    colorInfo: appTheme.color.info,
    colorPrimary: appTheme.color.primary,
    colorSuccess: appTheme.color.success,
    colorText: appTheme.color.text,
    colorTextSecondary: appTheme.color.textMuted,
    colorWarning: appTheme.color.warning,
    fontFamily: appTheme.fontFamily
  },
  components: {
    Button: {
      controlHeight: 36
    },
    Layout: {
      bodyBg: appTheme.color.background,
      headerBg: appTheme.color.surface,
      siderBg: appTheme.color.surface
    },
    Menu: {
      itemSelectedBg: "#fff1f0",
      itemSelectedColor: appTheme.color.primary
    },
    Card: {
      borderRadiusLG: appTheme.radius.md
    },
    Table: {
      headerBg: appTheme.color.surfaceMuted,
      rowHoverBg: "#f8fafc"
    }
  }
};
