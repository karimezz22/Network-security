import { NavBarMain } from "../components/NavBarMain";
import { ErrorPage } from "../pages/Error/Error";

export function LayoutError() {
  return (
    <div>
      <NavBarMain />
      <ErrorPage />
    </div>
  );
}
