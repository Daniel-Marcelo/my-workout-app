import { signOut } from "firebase/auth";
import { Button } from "primereact/button";
import { auth } from "../../firebase";

export const DashboardPage = () => {
  return (
    <div>
      Dashboard
      <Button onClick={() => signOut(auth)}>Logout</Button>
    </div>
  );
};
