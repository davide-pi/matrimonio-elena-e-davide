export class Spouse {
  readonly name: string;
  readonly phoneNumber: string;
  readonly phonePrefix: string;
  readonly formattedPhone: string;
  readonly whatsappLink: string;
  readonly telLink: string;

  constructor(name: string, phonePrefix: string, phoneNumber: string) {
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.phonePrefix = phonePrefix;
    this.formattedPhone = `${phonePrefix} ${phoneNumber.replace(
      /(\d{3})(\d{3})(\d{4})/,
      "$1 $2 $3",
    )}`.trim();
    this.whatsappLink = `https://wa.me/${phonePrefix}${phoneNumber}`.trim();
    this.telLink = `tel:${phonePrefix}${phoneNumber}`.trim();
  }
}

export interface Schedule {
  visibilityBeforeEventDateInMinutes: number;
  items: ScheduleItem[];
}

export interface ScheduleItem {
  time: string;
  titleKey: string;
  descKey: string;
}

export const BRIDE: Spouse = new Spouse("Elena", "+39", "3466049340");

export const GROOM: Spouse = new Spouse("Davide", "+39", "3493560581");

export const EVENT_DATE: Date = new Date("2025-09-20T16:30:00");

export const SCHEDULE: Schedule = {
  visibilityBeforeEventDateInMinutes: 30,
  items: [
    { time: "16:30", titleKey: "schedule.1630", descKey: "schedule.1630.desc" },
    { time: "17:30", titleKey: "schedule.1730", descKey: "schedule.1730.desc" },
    { time: "19:00", titleKey: "schedule.1900", descKey: "schedule.1900.desc" },
    { time: "22:00", titleKey: "schedule.2200", descKey: "schedule.2200.desc" },
    { time: "22:30", titleKey: "schedule.2230", descKey: "schedule.2230.desc" },
  ],
} as const;
