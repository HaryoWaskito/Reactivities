import { UserActivity } from "../../app/models/profile";
import { Card } from "semantic-ui-react";

interface Props {
  userActivity: UserActivity;
}

export default function ProfileActivityCard({ userActivity }: Props) {
  return (
    <Card>
      {/* <Image src= "/assets/user.png" /> */}
      <Card.Content>
        <Card.Header>{userActivity.title}</Card.Header>
        <Card.Description>{userActivity.date.toString()}</Card.Description>
      </Card.Content>
    </Card>
  );
}
