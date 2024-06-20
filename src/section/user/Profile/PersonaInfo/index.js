"use client";
import ChangeEmail from "./ChangeEmail";
import ChangeNumber from "./ChangeNumber";
import ChangePassword from "./ChangePassword";
import ProfileInfo from "./ProfileInfo";

function ProfilePersonalInfo() {
  return (
    <>
      <ProfileInfo />
      <ChangeEmail />
      <ChangeNumber />
      <ChangePassword />
    </>
  );
}

export default ProfilePersonalInfo;
