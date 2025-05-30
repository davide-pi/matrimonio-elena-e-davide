import { describe, expect, it, vi } from "vitest";
import i18nConfig from "../i18n/config";

vi.mock("react-i18next", () => ({
  initReactI18next: {
    type: "3rdParty",
    init: vi.fn(),
  },
}));

vi.mock("i18next", () => ({
  default: {
    use: vi.fn().mockReturnThis(),
    init: vi.fn().mockReturnThis(),
    language: "it",
    options: {
      resources: {
        it: { translation: {} },
        ro: { translation: {} },
      },
    },
  },
}));

describe("i18n Config", () => {
  it("should be defined", () => {
    expect(i18nConfig).toBeDefined();
  });

  it("should have a valid default language", () => {
    expect(i18nConfig.language).toBeDefined();
    expect(typeof i18nConfig.language).toBe("string");
  });

  it("should have supported languages as an object", () => {
    expect(i18nConfig.options.resources).toBeDefined();
    expect(typeof i18nConfig.options.resources).toBe("object");
    expect(
      Object.keys(i18nConfig.options.resources || {}).length
    ).toBeGreaterThan(0);
  });

  it("should include the default language in supported languages", () => {
    expect(Object.keys(i18nConfig.options.resources || {})).toContain(
      i18nConfig.language
    );
  });

  it("should have Italian as the default language", () => {
    expect(i18nConfig.language).toBe("it");
  });
});
