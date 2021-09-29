import SearchContext from "../store/pokemonDetail-context";
import NavBar from "./NavBar";
import { render, screen, fireEvent } from "@testing-library/react";

describe('NavBar', () => { 
test(" renders pokemon's description", async () => {
    let searchString =  ""
      const onStringChange = (string) => {
        searchString = string
      }
const component = render(
       <SearchContext.Provider value={{ pokemonDetail: pokemonDetail,
        onStringChange: onStringChange
         }}>
         <NavBar />
       </SearchContext.Provider>,
     )
     const button = screen.getByRole('button')
     expect(button).toBeFalsy();
    });

// test(" renders pokemon's types", async () => {
// const component = render(
//      <SearchContext.Provider value={{ pokemonDetail: 
//      {name: 'bulbasaur', 
//      url: "https://pokeapi.co/api/v2/pokemon/1/", 
//      id: '1', 
//      } }}>
//        <NavBar />
//      </SearchContext.Provider>,
//    )
//    const type1 = await screen.findByText('grass')
//    const type2 = await screen.findByText('poison')
//    expect(type1).toBeInTheDocument();
//    expect(type2).toBeInTheDocument();
//   });

//   test(" renders description not found", async () => {
//     const component = render(
//          <SearchContext.Provider value={{ pokemonDetail: 
//          {name: 'bulbasaur', 
//          url: "https://pokeapi.co/api/v2/pokemon/1/", 
//          id: 'made_up_id', 
//          } }}>
//            <NavBar />
//          </SearchContext.Provider>,
//        )
//        const description = await screen.findByText("Sorry, this Pokémon currently doesn't have description.",{},{timeout: 8000})
//        expect(description).toBeInTheDocument();
//       });

//       test(" pokemon image",async () => {
//         const component = render(
//           <SearchContext.Provider value={{ pokemonDetail: 
//           {name: 'bulbasaur', 
//           url: "https://pokeapi.co/api/v2/pokemon/1/", 
//           id: '1', 
//           } }}>
//             <NavBar />
//           </SearchContext.Provider>,
//         )
//         const image = await screen.findByRole('img');
//         expect(image).toHaveAttribute('src', 'https://img.pokemondb.net/artwork/bulbasaur.jpg');
//       });

//       test(" pokemon sprite",async () => {
//         const component = render(
//           <SearchContext.Provider value={{ pokemonDetail: 
//           {name: 'made_up_name', 
//           url: "https://pokeapi.co/api/v2/pokemon/1/", 
//           id: '1', 
//           } }}>
//             <NavBar />
//           </SearchContext.Provider>,
//         )
//         const sprite = await screen.findByRole('img',{},{timeout: 3000});
//         // src is initialy set to 'https://img.pokemondb.net/artwork/made_up_name.jpg', we have to wait short time until onerror in img 
//         //is executed, because i didnt know how to access it, i had chose this approch, onerror doesnt take 3000ms but i wanted to be sure
//         setTimeout(() => expect(sprite).toHaveAttribute('src', 
//       'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'),3000);
//       });

//       test(" pokemon backup image",async () => {
//         const component = render(
//           <SearchContext.Provider value={{ pokemonDetail: 
//           {name: 'made_up_name', 
//           url: "https://pokeapi.co/api/v2/pokemon/made_up_url/", 
//           id: '1', 
//           } }}>
//             <NavBar />
//           </SearchContext.Provider>,
//         )
//         const backup = await screen.findByRole('img',{},{timeout: 3000});
//         // src is initialy set to 'https://img.pokemondb.net/artwork/made_up_name.jpg', we have to wait short time until onerror in img 
//         //is executed, because i didnt know how to access it, i had chose this approch, onerror doesnt take 3000ms but i wanted to be sure
//         setTimeout(() => expect(backup).toHaveAttribute('src', 'pokemon-icon.jpg'),3000);
//       });

//       test(" pokemon button",async () => {
//         const pokemonDetail =  
//         {name: 'bulbasaur', 
//         url: "https://pokeapi.co/api/v2/pokemon/1/", 
//         id: '1', 
//         }
//         const setPokemonDetail = () => {
//           pokemonDetail.name = ""
//         }
//         const component = render(
//           <SearchContext.Provider value={{ pokemonDetail: pokemonDetail,
//           setPokemonDetail: setPokemonDetail
//            }}>
//             <NavBar />
//           </SearchContext.Provider>,
//         )
//         const button =await screen.findByRole('button');
//         fireEvent.click(button)
//         //again timeout... pokemonDetail.name isnt set to "" immediatly
//         setTimeout(() => expect(screen.getByText('bulbasaur')).toBeFalsy(),500);
//       });

    })