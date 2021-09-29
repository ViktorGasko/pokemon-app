import PokemonDetailContext from "../store/pokemonDetail-context";
import PokeDetails from "./PokeDetails";
import { render, screen, fireEvent } from "@testing-library/react";

describe('PokeDetails', () => { 
test("PokeDetails renders pokemon's description", async () => {
  // i failed so hard to create mockup async function
    // window.fetch = jest.fn()
    // window.fetch.mockResolvedValueOnce({
    //     json: async () => {flavor_text_entries: [{flavor_text: "pokemon description", language: {name: "en"}}]}
    // })
const component = render(
       <PokemonDetailContext.Provider value={{ pokemonDetail: 
       {name: 'bulbasaur', 
       url: "https://pokeapi.co/api/v2/pokemon/1/", 
       id: '1', 
       } }}>
         <PokeDetails />
       </PokemonDetailContext.Provider>,
     )
     const name = await screen.findByText('A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON.')
     expect(name).toBeInTheDocument();
    });

test("PokeDetails renders pokemon's types", async () => {
const component = render(
     <PokemonDetailContext.Provider value={{ pokemonDetail: 
     {name: 'bulbasaur', 
     url: "https://pokeapi.co/api/v2/pokemon/1/", 
     id: '1', 
     } }}>
       <PokeDetails />
     </PokemonDetailContext.Provider>,
   )
   const type1 = await screen.findByText('grass')
   const type2 = await screen.findByText('poison')
   expect(type1).toBeInTheDocument();
   expect(type2).toBeInTheDocument();
  });

  test("PokeDetails renders description not found", async () => {
    const component = render(
         <PokemonDetailContext.Provider value={{ pokemonDetail: 
         {name: 'bulbasaur', 
         url: "https://pokeapi.co/api/v2/pokemon/1/", 
         id: 'made_up_id', 
         } }}>
           <PokeDetails />
         </PokemonDetailContext.Provider>,
       )
       const description = await screen.findByText("Sorry, this Pokémon currently doesn't have description.",{},{timeout: 8000})
       expect(description).toBeInTheDocument();
      });

      test("PokeDetails pokemon image",async () => {
        const component = render(
          <PokemonDetailContext.Provider value={{ pokemonDetail: 
          {name: 'bulbasaur', 
          url: "https://pokeapi.co/api/v2/pokemon/1/", 
          id: '1', 
          } }}>
            <PokeDetails />
          </PokemonDetailContext.Provider>,
        )
        const image = await screen.findByRole('img');
        expect(image).toHaveAttribute('src', 'https://img.pokemondb.net/artwork/bulbasaur.jpg');
      });

      test("PokeDetails pokemon sprite",async () => {
        const component = render(
          <PokemonDetailContext.Provider value={{ pokemonDetail: 
          {name: 'made_up_name', 
          url: "https://pokeapi.co/api/v2/pokemon/1/", 
          id: '1', 
          } }}>
            <PokeDetails />
          </PokemonDetailContext.Provider>,
        )
        const sprite = await screen.findByRole('img',{},{timeout: 3000});
        // src is initialy set to 'https://img.pokemondb.net/artwork/made_up_name.jpg', we have to wait short time until onerror in img 
        //is executed, because i didnt know how to access it, i had chose this approch, onerror doesnt take 3000ms but i wanted to be sure
        setTimeout(() => expect(sprite).toHaveAttribute('src', 
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'),3000);
      });

      test("PokeDetails pokemon backup image",async () => {
        const component = render(
          <PokemonDetailContext.Provider value={{ pokemonDetail: 
          {name: 'made_up_name', 
          url: "https://pokeapi.co/api/v2/pokemon/made_up_url/", 
          id: '1', 
          } }}>
            <PokeDetails />
          </PokemonDetailContext.Provider>,
        )
        const backup = await screen.findByRole('img',{},{timeout: 3000});
        // src is initialy set to 'https://img.pokemondb.net/artwork/made_up_name.jpg', we have to wait short time until onerror in img 
        //is executed, because i didnt know how to access it, i had chose this approch, onerror doesnt take 3000ms but i wanted to be sure
        setTimeout(() => expect(backup).toHaveAttribute('src', 'pokemon-icon.jpg'),3000);
      });

      test("PokeDetails pokemon button",async () => {
        const pokemonDetail =  
        {name: 'bulbasaur', 
        url: "https://pokeapi.co/api/v2/pokemon/1/", 
        id: '1', 
        }
        const setPokemonDetail = () => {
          pokemonDetail.name = ""
        }
        const component = render(
          <PokemonDetailContext.Provider value={{ pokemonDetail: pokemonDetail,
          setPokemonDetail: setPokemonDetail
           }}>
            <PokeDetails />
          </PokemonDetailContext.Provider>,
        )
        const button =await screen.findByRole('button');
        fireEvent.click(button)
        //again timeout... pokemonDetail.name isnt set to "" immediatly
        setTimeout(() => expect(screen.getByText('bulbasaur')).toBeFalsy(),500);
      });

    })