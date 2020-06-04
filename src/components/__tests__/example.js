import React from "react"
import { render } from "@testing-library/react"

// You have to write data-testid
const Title = () => <h1>Gatsby is awesome!</h1>

test("Displays the correct title", () => {
  const { getByText } = render(<Title />)
  // Assertion
  expect(getByText("Gatsby is awesome!")).toBeInTheDocument()
  // --> Test will pass
})
