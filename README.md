# Pokemon-app ... budem písať po slovensky

Aplikácia na zobrazenie pokémonov z [pokeapi.co](https://pokeapi.co/). Pri počiatočnom načítaní sú získané
dáta defaultného množstva pokémonov. Pri zmene množstva pokémov ktorých chceme vidieť sú opäť načítané dáta pokémonov.
V pokeAPI je dohromady 1118 pokémonov a takéto množstvo teda môžeme načítať. Každý pokémon obsahuje iba meno, url na jeho
detaily a nami je ešte pridaná id pokémona získaná z jeho url. Keďže sú to všetko krátke stringy a množstvo pokémonov nie je až
také veľké (v zadaní sa dokonca požaduje len 9 pokémonov) povedal som si že nie potrebné použiť pagination popr. pagination s React Router
a naraz načítavať len menší počet pokémonov pri otvorení stránky. To by ale bolo možné použiť search len pre danú stránku. Takto môžeme
prehľadávať všetkých pokémonov ktorých sme získali pri počiatočnom načítaní. Id uložené v pokémonovy môžeme použiť aj v linku na získanie sprite
pokémona v SearchListe a PokeListe. Pri zobrazení pokémona som sa rozhodol zobraziť aj jeho popis a typy (z rôznych linkov), pretože
karta pokémona bola príliš prázdna. Tak isto používam aj väčší obrázok z iného zdroja, ktorý je nahradení spritom pokiaľ nie je dostupný.
Redux mi neprišlo potrebné používať, stačili contexty. Ešte by sa asi zišiel context na zmenu aktuálnej stránky alebo pridanie tlačítka na
návrat na prvú stránku v PokeListPageNav, pretože momentálne sa nie je možné vrátiť sa priamo na prvú stránku.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
