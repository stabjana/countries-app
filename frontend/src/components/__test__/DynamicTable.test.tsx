import { render, screen } from "@testing-library/react";
import { describe } from "vitest";
import { DynamicTable } from "../DynamicTable";

describe("DynamicTable Test", () => {
  it("should not render the table with no data", () => {
    const data: [] = [];
    // render the component and check if it renders with no data:
    render(<DynamicTable data={data} />);
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });
  it("should render the table with data", () => {
    const data = [
      { id: 1, name: "John Drei", age: 25 },
      { id: 2, name: "Jane Doe", age: 22 },
    ];
    render(<DynamicTable data={data} />);
    expect(screen.queryByRole("table")).toBeInTheDocument(); // finds html element
    expect(screen.getByText("John Drei")).toBeInTheDocument(); // finds the text inside
  });
});
