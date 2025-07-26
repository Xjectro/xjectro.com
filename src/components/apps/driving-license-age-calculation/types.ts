export type IneligibleGroup = {
  group: string;
  minAge: number;
  daysLeft: number;
};

export type EligibleGroupsProps = {
  groupedEligible: Record<number, string[]>;
};

export type IneligibleGroupsProps = {
  groupedIneligible: Record<number, IneligibleGroup[]>;
};

export type LicenseFormProps = {
  onAgeChange?: (age: number) => void;
};
