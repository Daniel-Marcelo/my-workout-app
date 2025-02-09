import { startOfToday } from "date-fns/startOfToday";
import { format } from "date-fns/format";

export const DashboardPage = () => {
  return (
    <>
      <div>
        <div>{format(startOfToday(), "EEE dd MMM yyyy")}</div>
      </div>
    </>
  );
};
