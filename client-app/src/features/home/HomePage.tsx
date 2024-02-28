import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";

export default function HomePage() {
  return (
    <div>
      <Container style={{ margintTop: "7em" }}>
        <h1>Home Page</h1>
        <h3>
          Go to <Link to="/activities">Activities</Link>
        </h3>
      </Container>
    </div>
  );
}
