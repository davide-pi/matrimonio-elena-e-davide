import { describe, expect, it } from "vitest";
import itTranslations from "../i18n/translations/it";
import roTranslations from "../i18n/translations/ro";

describe("Translation Files", () => {
  it("should have matching keys between Italian and Romanian translations", () => {
    const itKeys = Object.keys(itTranslations);
    const roKeys = Object.keys(roTranslations);

    expect(itKeys).toEqual(roKeys);
  });
});
