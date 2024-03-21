import { Button, Form, Grid, Header, TabPane } from "semantic-ui-react";
import { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";
import MyTextArea from "../../app/common/form/MyTextArea";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function ProfileAbout() {
  const[editMode, setEditMode] = useState(false);
  const {
    profileStore: { profile, updateProfile },
  } = useStore();
  const validationSchema = Yup.object({
    displayName: Yup.string().required(),
  });
  
  return (
    <TabPane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="user" content={`About ${profile?.displayName}`} />
          <Button onClick={() => setEditMode(!editMode)} floated="right" basic content={editMode ? "Cancel" : "Edit Profile"} />
        </Grid.Column>
        <Grid.Column width={16}>
          <Formik
            enableReinitialize
            validationSchema={validationSchema}
            initialValues={{
              displayName: profile?.displayName,
              bio: profile?.bio,
            }}
            onSubmit={(values) => {
              updateProfile(values).then(() => setEditMode(false));
            }}
          >
            {({ handleSubmit, isSubmitting, isValid, dirty }) => (
              <Form
                className="ui form"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                {editMode ? (
                  <>
                    <MyTextInput
                      placeholder="Display Name"
                      name="displayName"
                    />
                    <MyTextArea
                      rows={3}
                      placeholder="Add your bio"
                      name="bio"
                    />
                    <Button
                      positive
                      type="submit"
                      loading={isSubmitting}
                      content="Update profile"
                      floated="right"
                      disabled={!isValid || !dirty}
                    />
                  </>
                ) : (
                  <span style={{whiteSpace: 'pre-wrap'}}>{profile?.bio}</span>
                )}
              </Form>
            )}
          </Formik>
        </Grid.Column>
      </Grid>
    </TabPane>
  );
});
