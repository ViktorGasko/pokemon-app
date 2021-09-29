import React from "react";
import { render, screen } from "@testing-library/react";
import PokeItem from "./PokeItem";

describe("PokeItem", () => {
  test("renders pokemon name", () => {
    render(<PokeItem pokemon={{ name: "bulbasaur", id: "1" }} />);
    const name = screen.getByText(/bulbasaur/i);
    expect(name).toBeInTheDocument();
  });
  test("renders pokemon image", () => {
    render(<PokeItem pokemon={{ name: "bulbasaur", id: "1" }} />);
    const sprite = screen.getByRole("img");
    expect(sprite).toHaveAttribute(
      "src",
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
    );
  });

  // test("renders pokemon backup image", () => {
  //   render(<PokeItem pokemon={{ name: "bulbasaur", id: "" }} />);
  //   const sprite = screen.findByRole("img");

  //   expect(sprite).toHaveAttribute("src", "pokemon-icon.jpg");
  // });
});
