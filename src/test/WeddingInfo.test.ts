import { describe, expect, it, vi } from "vitest";
import { BRIDE, EVENT_DATE, GROOM, SCHEDULE } from "../config/WeddingInfo";

vi.mock("../config/WeddingInfo", () => ({
  BRIDE: { name: "Elena" },
  GROOM: { name: "Davide" },
  EVENT_DATE: new Date("2025-09-20T16:30:00.000Z"),
  SCHEDULE: {
    visibilityBeforeEventDateInMinutes: 30,
    items: [
      {
        time: "16:30",
        titleKey: "schedule.1630",
        descKey: "schedule.1630.desc",
      },
    ],
  },
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

  it("should define a valid schedule", () => {
    expect(SCHEDULE).toBeDefined();
    expect(SCHEDULE.visibilityBeforeEventDateInMinutes).toBe(30);
    expect(Array.isArray(SCHEDULE.items)).toBe(true);
    expect(SCHEDULE.items.length).toBeGreaterThan(0);
  });
});
