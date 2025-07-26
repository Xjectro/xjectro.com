export const LICENSE_GROUPS = [
  "A1",
  "A2",
  "A",
  "B",
  "BE",
  "C1",
  "C1E",
  "C",
  "CE",
  "D1",
  "D1E",
  "D",
  "DE",
  "F",
  "G",
];

export const LICENSE_GROUP_AGE = {
  turkey: {
    A1: 16,
    A2: 18,
    A: 20,
    B: 18,
    BE: 18,
    C1: 18,
    C1E: 18,
    C: 21,
    CE: 21,
    D1: 21,
    D1E: 21,
    D: 24,
    DE: 24,
    F: 18,
    G: 18,
  },
  usa: {
    A1: 16,
    A2: 16,
    A: 16,
    B: 16,
    BE: 16,
    C1: 16,
    C1E: 16,
    C: 16,
    CE: 16,
    D1: 16,
    D1E: 16,
    D: 16,
    DE: 16,
    F: 16,
    G: 16,
  },
  uk: {
    A1: 17,
    A2: 19,
    A: 21,
    B: 17,
    BE: 17,
    C1: 18,
    C1E: 18,
    C: 21,
    CE: 21,
    D1: 21,
    D1E: 21,
    D: 24,
    DE: 24,
    F: 17,
    G: 17,
  },
  germany: {
    A1: 16,
    A2: 18,
    A: 24,
    B: 18,
    BE: 18,
    C1: 18,
    C1E: 18,
    C: 21,
    CE: 21,
    D1: 21,
    D1E: 21,
    D: 24,
    DE: 24,
    F: 18,
    G: 16,
  },
  switzerland: {
    A1: 16,
    A2: 18,
    A: 25,
    B: 18,
    BE: 18,
    C1: 18,
    C1E: 18,
    C: 21,
    CE: 21,
    D1: 21,
    D1E: 21,
    D: 24,
    DE: 24,
    F: 18,
    G: 16,
  },
};

export type IneligibleGroup = {
  group: string;
  minAge: number;
  daysLeft: number;
};

export function calculateAge(dateString: string) {
  const today = new Date();
  const birth = new Date(dateString);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

export function daysUntil(dateString: string, targetAge: number) {
  const birth = new Date(dateString);
  const targetDate = new Date(birth);
  targetDate.setFullYear(birth.getFullYear() + targetAge);
  const today = new Date();
  const diff = targetDate.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
