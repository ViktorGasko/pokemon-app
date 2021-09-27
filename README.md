# Pokemon-app ... budem písať po slovensky

Aplikácia na zobrazenie pokémonov z [pokeapi.co](https://pokeapi.co/). Po počiatočnom načítaní dát je možné prezerať si
pokémonov zobrazených v jednoduchých itemoch alebo nájsť pokémona podľa mena v searchbare. Na pokeapi je dostupných viac
ako 1000 pokémonov, počet pokémonov ktorých zobrazí aplikácia je možne upravit zmenou linku
"https://pokeapi.co/api/v2/pokemon?limit=80&offset=0" vo funkcii fetchPokemons() v App.tsx. Po zavolaní tohto linku získame
maticu hodnôt s menom pokemona a linkom na detaily pokémona ktoré obsahujú napr. sprite pokémona. Je teda ďalej nutné získať
detaily každého pokémona z tejto matice. Keďže tento proces sa deje pri otvorení aplikácie, pri zvolenom väčšom množstve (napr. limit=800)
može toto načítanie trvať aj niekoľko sekúnd. To je asi aj najväčší mínus aplikácie. Lepšie by bolo načítavať menšie množstvo pokémonov
pri zmene stránky (presnejšie zmeny hodnoty currentPage v componente PokeList ). Teda pokiaľ by sme mali zvolené zobrazovanie
napr. 24 pokémonov naraz, pri každej zmene currentPage by sme zavolali "https://pokeapi.co/api/v2/pokemon?limit=24&offset=x"
kde offset x by bol zvolený podľa currentPage. Potom by sme načítali detaily o každom z týchto 24 pokémonov. Tento prístup by spôsobil
čakanie pre zmene stránok, ale keďže by sme naraz načítali výrazne menšie množstvo pokémonov, toto čakanie by bolo zanedbateľné.
Riešenie ktoré som zvolil som sa však rozhodol nechať pretože: 1. Zadanie požaduje zobrazenie iba 9 pokémonov, z čoho vyplíva
že dlhé čakanie na načítanie pokémonov nenastane (100-200 pokémonov je načítaných veľmi rýchlo). 2. Rozhodol som sa zobrazovať sprity
pokémonov v SearchListe. Pokiaľ by sme zvolili druhé riešenie tak by sme museli získavať detaily o pokémonoch pri každej zmene
search baru a teda hľadanie by bolo výrazne spomalené. Možnosťou by samozrejme bolo pri hľadaní zobrazovať iba mená, ktore by sme mohli
získať veľmi rýchlo z https://pokeapi.co/api/v2/pokemon?limit=x&offset=y - nezískavali by sme teda pokémon detaily čo je tá pomalá časť,
ale chcel som obrázky a ako som spomenul riešenie požaduje iba 9 pokémonov a teda problém s pomalým počiatočným načítaním odpadá.
Čo sa týka kódu nemám predstavu či je dobrý alebo nie... redux som nepoužil, pôvodne som neplánoval použiť ani context ale nakoniec
sa ukázalo že sa zíde. Čo sa týka testovania s tým moc skúseností nemám tak sa necháme prekvapiť.

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
