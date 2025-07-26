import { IneligibleGroupsProps } from "./types";

export function IneligibleGroups({ groupedIneligible }: IneligibleGroupsProps) {
  return (
    <div>
      <div className="font-medium text-red-700 dark:text-red-400">
        Not Yet Eligible License Groups:
      </div>
      {Object.keys(groupedIneligible).length > 0 ? (
        <div className="mt-2 flex flex-col gap-2 rounded border border-red-500/50 bg-red-500/20 p-4">
          {Object.entries(groupedIneligible)
            .sort((a, b) => Number(a[0]) - Number(b[0]))
            .map(([minAge, items]) => (
              <div key={minAge}>
                <div className="font-semibold text-red-800 underline dark:text-red-200">
                  Age {minAge}:
                </div>
                <ul className="mt-1 flex flex-wrap gap-2">
                  {items.map(({ group, daysLeft }) => (
                    <li
                      key={group}
                      className="flex items-center justify-between gap-1 rounded bg-red-100 px-3 py-2 text-sm text-red-800 dark:bg-red-900 dark:text-red-300"
                    >
                      <span>
                        <strong>{group}</strong>
                      </span>
                      <span>{daysLeft > 0 ? `${daysLeft} days left` : ""}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      ) : (
        <div className="text-sm text-muted-foreground">
          You are eligible for all license groups.
        </div>
      )}
    </div>
  );
}
