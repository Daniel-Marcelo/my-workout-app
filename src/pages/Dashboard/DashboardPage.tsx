import { startOfToday } from "date-fns/startOfToday";
import { format } from "date-fns/format";
import { Timeline } from "primereact/timeline";
import { FlexBox } from "../../components/FlexBox";
import { useState } from "react";

export const DashboardPage = () => {
  const [expanded, setExpanded] = useState(false);
  const events = [
    {
      exerciseId: "1",
      exerciseName: "Bench Press",
      goal: {
        sets: [
          {
            reps: 10,
            intensity: "moderate",
          },
          {
            reps: 10,
            intensity: "moderate",
          },
          {
            reps: 10,
            intensity: "moderate",
          },
        ],
      },
      restTimeSeconds: 40,
      sets: [
        {
          reps: 10,
          weight: 40,
          weightScale: "kg",
        },
        {
          reps: 8,
          weight: 40,
          weightScale: "kg",
        },
      ],
    },
    {
      exerciseId: "2",
      exerciseName: "Dumbell Press into Fly",
      restTimeSeconds: 40,
      sets: [
        {
          reps: 12,
          weight: 8,
          weightScale: "kg",
        },
        {
          reps: 12,
          weight: 8,
          weightScale: "kg",
        },
      ],
    },
  ];

  const isGoalSameForAllSets = (goal?: {
    sets: { reps: number; intensity: string }[];
  }) => {
    const baselineSetGoal = goal?.sets[0];
    return goal?.sets.every(
      (set) =>
        set.reps === baselineSetGoal?.reps &&
        set.intensity === baselineSetGoal.intensity
    );
  };

  const customizedContent = (item: (typeof events)[0]) => {
    const isGoalSame = isGoalSameForAllSets(item.goal);
    return (
      <div style={{ marginBottom: "1rem" }}>
        <div style={{ fontWeight: 600 }}>{item.exerciseName}</div>
        {isGoalSame && (
          <div style={{ fontSize: ".875rem", marginBottom: "0.5rem" }}>
            Goal {item.goal?.sets[0].reps} reps - {item.goal?.sets[0].intensity}
          </div>
        )}
        {item.sets.map((set, index) => (
          <FlexBox
            key={index}
            justify="space-between"
            style={{ fontSize: ".75rem" }}
          >
            <div>{set.reps} reps</div>
            <div>
              {set.weight} {set.weightScale}
            </div>
            <div>{item.restTimeSeconds}s rest</div>
          </FlexBox>
        ))}
      </div>
    );
  };

  return (
    <>
      <div style={{ padding: "3rem" }}>
        <FlexBox
          className="routine-workout"
          justify="space-between"
          align="center"
          style={{ marginBottom: "1rem", cursor: "pointer" }}
          onClick={() => setExpanded((prev) => !prev)}
        >
          <div>TODAY - {format(startOfToday(), "EEE dd MMM yyyy")}</div>
          <i
            className={`pi ${expanded ? "pi-chevron-up" : "pi-chevron-down"}`}
            style={{ fontSize: "1rem" }}
          />
        </FlexBox>

        {expanded && (
          <div>
            <Timeline
              pt={{
                opposite: {
                  style: { display: "none" },
                },
              }}
              align="left"
              value={events}
              content={customizedContent}
            />
          </div>
        )}
      </div>
    </>
  );
};
