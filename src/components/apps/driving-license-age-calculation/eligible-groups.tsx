import { EligibleGroupsProps } from "./types";

export function EligibleGroups({ groupedEligible }: EligibleGroupsProps) {
  return (
    <div>
      <div className="font-medium text-green-700 dark:text-green-400">
        Eligible License Groups:
      </div>
      {Object.keys(groupedEligible).length > 0 ? (
        <div className="mt-2 flex flex-col gap-2 rounded border border-green-500/50 bg-green-500/20 p-4">
          {Object.entries(groupedEligible)
            .sort((a, b) => Number(a[0]) - Number(b[0]))
            .map(([minAge, groups]) => (
              <div key={minAge}>
                <div className="font-semibold text-green-800 underline dark:text-green-200">
                  Age {minAge}:
                </div>
                <ul className="mt-1 flex flex-wrap gap-2">
                  {groups.map((group) => (
                    <li
                      key={group}
                      className="rounded bg-green-100 px-3 py-2 text-sm text-green-800 dark:bg-green-900 dark:text-green-300"
                    >
                      <strong>{group}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      ) : (
        <div className="text-sm text-muted-foreground">
          You are not eligible for any license group at the moment.
        </div>
      )}
    </div>
  );
}
