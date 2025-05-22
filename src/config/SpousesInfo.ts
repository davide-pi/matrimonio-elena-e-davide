class SpouseInfo {
  readonly name: string;
  readonly phoneNumber: string;
  readonly phonePrefix: string;

  constructor(name: string, phonePrefix: string, phoneNumber: string) {
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.phonePrefix = phonePrefix;
  }

  get formattedPhone(): string {
    return `${this.phonePrefix} ${this.phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')}`.trim();
  }

  get whatsappLink(): string {
    return `https://wa.me/${this.phoneNumber}`.trim();
  }
}

export const SPOUSES = {
  bride: new SpouseInfo('Elena', '+39', '3406049340'),
  groom: new SpouseInfo('Davide', '+39', '3493560581')
} as const;