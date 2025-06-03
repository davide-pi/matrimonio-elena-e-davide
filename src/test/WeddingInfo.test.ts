import { describe, expect, it, vi } from "vitest";
import { BRIDE, EVENT_DATE, GROOM } from "../config/WeddingInfo";

vi.mock("../config/WeddingInfo", () => ({
  BRIDE: { name: "Elena" },
  GROOM: { name: "Davide" },
  EVENT_DATE: new Date("2025-09-20T16:30:00.000Z"),
}));

describe("WeddingInfo Config", () => {
  it("should define bride and groom", () => {
    expect(BRIDE).toBeDefined();
    expect(GROOM).toBeDefined();
    expect(BRIDE.name).toBe("Elena");
    expect(GROOM.name).toBe("Davide");
  });

  it("should define a valid event date", () => {
    expect(EVENT_DATE).toBeDefined();
    expect(EVENT_DATE instanceof Date).toBe(true);

    expect(EVENT_DATE.toISOString()).toBe(
      new Date("2025-09-20T16:30:00.000Z").toISOString()
    );
  });
});
