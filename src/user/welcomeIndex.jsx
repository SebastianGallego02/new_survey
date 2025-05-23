import WelcomeContent from "./welcome";
import NavbarUser from "../header/navbarUser"

export default function WelcomeIndex() {

    return (
      <>
        <NavbarUser />
        <div className="mx-auto max-w-9/10">
          <WelcomeContent />
        </div>
      </>
    );
  }
  