import UserProfile from "./UserProfile";
import TypeLevel from "./TypeLevel";
import UserStamp from "./UserStamp";

type Props = {
  invitedCount: number;
  userType: string | null;
};

export default function UserSection({ invitedCount, userType }: Props) {
  return (
    <>
      <div className="relative shrink-0">
        <UserProfile invitedCount={invitedCount} />
      </div>
    </>
  );
}
