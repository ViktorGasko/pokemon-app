import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", async () => {
    const getPokemons = 
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// import App from "./App";
// import { rest } from "msw";
// import { setupServer } from "msw/node";
// import { render, fireEvent, waitFor, screen } from "@testing-library/react";
// import "@testing-library/jest-dom";

// const server = setupServer(
//   rest.get("/greeting", (req, res, ctx) => {
//     return res(
//       ctx.json({
//         name: "bulbasaur",
//         id: "1",
//         url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
//         types: ["grass", "poison"],
//       })
//     );
//   })
// );

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

// test("loads and displays greeting", async () => {
//   render(<App />);

//   fireEvent.click(screen.getByText("Load Greeting"));

//   await waitFor(() => screen.getByRole("heading"));

//   expect(screen.getByRole("heading")).toHaveTextContent("hello there");
//   expect(screen.getByRole("button")).toBeDisabled();
// });

// test("handles server error", async () => {
//   server.use(
//     rest.get("/greeting", (req, res, ctx) => {
//       return res(ctx.status(500));
//     })
//   );

//   render(<App />);

//   fireEvent.click(screen.getByText("Load Greeting"));

//   await waitFor(() => screen.getByRole("alert"));

//   expect(screen.getByRole("alert")).toHaveTextContent("Oops, failed to fetch!");
//   expect(screen.getByRole("button")).not.toBeDisabled();
// });
