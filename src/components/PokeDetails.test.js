import PokemonDetailContext from "../store/pokemonDetail-context";
import PokeDetails from "./PokeDetails";
import { render, screen } from "@testing-library/react";

// test("PokeDetails renders pokemon's name", async () => {
//     // window.fetch = jest.fn()
//     // window.fetch.mockResolvedValueOnce({
//         //     json: async () => {flavor_text_entries: [{flavor_text: "pokemon description", language: {name: "en"}}]}
//         // })
//         const component = render(
//             <PokemonDetailContext.Provider value={{ pokemonDetail: 
//                 {name: 'bulbasaur', 
//                 url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png", 
//                 id: '1', 
//                 types: ['grass']} }}>
//          <PokeDetails />
//        </PokemonDetailContext.Provider>,
//      )
//      global.fetch = jest.fn(() =>
//    Promise.resolve({
//      json: () => Promise.resolve({flavor_text_entries: [{flavor_text: "pokemon description", language: {name: "en"}}]}),
//    })
//  );
//      const name = await screen.findByText('bulbasaur')
//      expect(name).toBeInTheDocument();
//     });

    
test("PokeDetails renders pokemon's description", async () => {
    // window.fetch = jest.fn()
    // window.fetch.mockResolvedValueOnce({
    //     json: async () => {flavor_text_entries: [{flavor_text: "pokemon description", language: {name: "en"}}]}
    // })
const component = render(
       <PokemonDetailContext.Provider value={{ pokemonDetail: 
       {name: 'bulbasaur', 
       url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png", 
       id: '1', 
       types: ['grass']} }}>
         <PokeDetails />
       </PokemonDetailContext.Provider>,
     )
     const name = await screen.findByText('pokemon description')
     expect(name).toBeInTheDocument();
    });