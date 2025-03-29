import ProtectedComponent from "./component/ProtectedComponent";
import RoleSwitcher from "./component/RoleSwitcher";

export default function Home() {
  return (
    <div >
      
      <ProtectedComponent/>
      <RoleSwitcher/>
    </div>
  );
}
