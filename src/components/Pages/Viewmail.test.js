import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Viewmail from "./Viewmail";

describe("view mail component", () => {
  test("Renders the message content", () => {
    render(
      <Router>
        <Viewmail />
      </Router>
    );

    const contentElement = screen.getByText("Subject:", { exact: false });
    expect(contentElement).toBeInTheDocument();
  });
  test("Displays the home link", () => {
    const subject = "Test Subject";
    const content = "Test Content";

    render(
      <Router>
        <Viewmail subject={subject} content={content} />
      </Router>
    );

    const homeLink = screen.getByRole("link", {
      name: "",
      class: "d-block mt-3",
      style: { textDecoration: "none" },
    });

    expect(homeLink).toBeInTheDocument();
  });
});
