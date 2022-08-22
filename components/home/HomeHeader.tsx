import SettingsBtn from "../buttons/SettingsBtn";
import GroupModeBtn from "../buttons/GroupModeBtn";
import Logo from "../Logo";

export default function HomeHeader() {
  return (
    <div className="flex justify-between items-center h-24 px-8 bg-dark-jungle-green">
      <SettingsBtn clickHandler={() => {}}/>
      <Logo />
      <GroupModeBtn />
    </div>
  );
}
