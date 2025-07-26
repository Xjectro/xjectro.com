"use client";

import {
  LICENSE_GROUPS,
  LICENSE_GROUP_AGE,
  calculateAge,
  daysUntil,
  IneligibleGroup,
} from "./utils";
import { useState } from "react";
import { Button } from "@//components/ui/button";
import { Input } from "@//components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@//components/ui/select";
import { EligibleGroups } from "./eligible-groups";
import { IneligibleGroups } from "./ineligible-groups";
import { LicenseFormProps } from "./types";
import { Card, CardContent, CardTitle } from "@//components/ui/card";
import { Separator } from "@//components/ui/separator";

export function LicenseForm({ onAgeChange }: LicenseFormProps) {
  const [birthDate, setBirthDate] = useState("");
  const [country, setCountry] = useState("turkey");
  const [age, setAge] = useState<number | null>(null);
  const [groupedEligible, setGroupedEligible] = useState<
    Record<number, string[]>
  >({});
  const [groupedIneligible, setGroupedIneligible] = useState<
    Record<number, IneligibleGroup[]>
  >({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!birthDate) {
      setAge(null);
      return;
    }
    const userAge = calculateAge(birthDate);
    setAge(userAge);
    if (onAgeChange) onAgeChange(userAge);
    const eligible: string[] = [];
    const ineligible: IneligibleGroup[] = [];
    for (const group of LICENSE_GROUPS) {
      const minAge =
        LICENSE_GROUP_AGE[country as keyof typeof LICENSE_GROUP_AGE][
          group as keyof (typeof LICENSE_GROUP_AGE)["turkey"]
        ];
      if (userAge >= minAge) {
        eligible.push(group);
      } else {
        const daysLeft = daysUntil(birthDate, minAge);
        ineligible.push({ group, minAge, daysLeft });
      }
    }
    const eligibleByAge: Record<number, string[]> = {};
    eligible.forEach((group) => {
      const minAge =
        LICENSE_GROUP_AGE[country as keyof typeof LICENSE_GROUP_AGE][
          group as keyof (typeof LICENSE_GROUP_AGE)["turkey"]
        ];
      if (!eligibleByAge[minAge]) eligibleByAge[minAge] = [];
      eligibleByAge[minAge].push(group);
    });
    const ineligibleByAge: Record<number, IneligibleGroup[]> = {};
    ineligible.forEach((item) => {
      if (!ineligibleByAge[item.minAge]) ineligibleByAge[item.minAge] = [];
      ineligibleByAge[item.minAge].push(item);
    });
    setGroupedEligible(eligibleByAge);
    setGroupedIneligible(ineligibleByAge);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <label className="font-medium" htmlFor="country">
        Country
      </label>
      <Select value={country} onValueChange={setCountry}>
        <SelectTrigger id="country" className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="turkey">Turkey</SelectItem>
          <SelectItem value="usa">USA</SelectItem>
          <SelectItem value="uk">United Kingdom</SelectItem>
          <SelectItem value="germany">Germany</SelectItem>
          <SelectItem value="switzerland">Switzerland</SelectItem>
        </SelectContent>
      </Select>
      <label className="font-medium" htmlFor="dob">
        Date of Birth
      </label>
      <Input
        id="dob"
        type="date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        required
      />
      <Button type="submit" size="lg">
        Calculate
      </Button>
      {age !== null && (
        <>
          <Separator />
          <Card>
            <CardContent>
              <CardTitle className="text-center">Your Age: {age}</CardTitle>
            </CardContent>
          </Card>
          <EligibleGroups groupedEligible={groupedEligible} />
          <IneligibleGroups groupedIneligible={groupedIneligible} />
        </>
      )}
    </form>
  );
}
