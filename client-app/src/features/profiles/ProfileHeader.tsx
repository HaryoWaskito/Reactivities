import {
  Button,
  Divider,
  Grid,
  Header,
  Item,
  Reveal,
  Segment,
  Statistic,
} from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { observer } from "mobx-react-lite";
import { useState } from "react";

interface Props {
  profile: Profile;
}

export default observer(function ProfileHeader({ profile }: Props) {
  const [isFollow, setIsFollow] = useState(true);
  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size="small"
                src={profile.image || "/assets/user.png"}
              />
              <Item.Content verticalAlign="middle">
                <Header as="h1" content={profile.displayName} />
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <Statistic.Group widths={2}>
            <Statistic label="Followers" value="5" />
            <Statistic label="Following" value="42" />
          </Statistic.Group>
          <Divider />
          <Reveal animated="move">
            <Reveal.Content visible={!isFollow} style={{ width: "100%" }}>
              <Button
                fluid
                color="teal"
                content="Following"
                onClick={() => {
                  setIsFollow(!isFollow);
                }}
              />
            </Reveal.Content>
            <Reveal.Content visible={isFollow} style={{ width: "100%" }}>
              <Button
                fluid
                basic
                color={isFollow ? "red" : "green"}
                content={isFollow ? "Unfollow" : "Following"}
                onClick={() => {
                  setIsFollow(!isFollow);
                }}
              />
            </Reveal.Content>
          </Reveal>
        </Grid.Column>
      </Grid>
    </Segment>
  );
});
