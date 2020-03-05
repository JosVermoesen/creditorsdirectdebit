# Creditors Direct Debit - Domiciliëringen Schuldeiser

## Getting started for users

<a href="https://rv.be/" target="_blank">Hello, world!</a>

You can use directly via [demo](https://cdd.vsoft.be){:target="\_blank"}
Your data is stored as json files inside the localStorage of the browser you are using. With jsZip you can zip and transfert your data to other browsers and/or other computers

## Getting started for developers

- [Install NodeJS](https://nodejs.org/). Hint: eventually install and use [nvm](https://medium.com/@Joachim8675309/installing-node-js-with-nvm-4dc469c977d9) for easy installing and/or switching between node versions
- Clone this repository: `git clone https://github.com/JosVermoesen/ng-cdirectdebit9.git`.
- Run `npm install` inside the project root.
- Run `ng serve` in a terminal from the project root.
- Profit. :tada:

## Development Tools used for this app

- [NodeJS](https://nodejs.org/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Angular CLI](https://www.npmjs.com/package/@angular/cli): `npm i -g @angular/cli`

## NPM packages used for this app

- [bootstrap](https://www.npmjs.com/package/bootstrap): `npm i bootstrap`
- [ngx-bootstrap](https://www.npmjs.com/package/ngx-bootstrap): `npm i ngx-bootstrap@5.3.2` (or greater)
- [file-saver](https://www.npmjs.com/package/file-saver): `npm i file-saver`
- [@types/file-saver](https://www.npmjs.com/package/@types/file-saver): `npm i @types/file-saver`
- [jszip](https://www.npmjs.com/package/jszip): `npm i jszip`
- [@types/jszip](https://www.npmjs.com/package/@types/jszip): `npm i @types/jszip`
- [moment](https://www.npmjs.com/package/moment): `npm i moment`
- [@ngx-translate/core](https://www.npmjs.com/package/@ngx-translate/core): `npm i @ngx-translate/core`
- [@ngx-translate/http-loader](https://www.npmjs.com/package/@ngx-translate/http-loader): `npm i @ngx-translate/http-loader`
- [vsoftvalidation](https://www.npmjs.com/package/vsoftvalidation): `npm i vsoftvalidation`

- install all packages in one commandline: `npm i bootstrap ngx-bootstrap@5.3.2 file-saver @types/file-saver jszip @types/jszip moment @ngx-translate/core @ngx-translate/http-loader vsoftvalidation`

## styles.css

For use of bootstrap, add into styles.css:

```
@import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
@import '../node_modules/ngx-bootstrap//datepicker//bs-datepicker.css';
```

## Important1: tsconfig.json

Before building, add paths for jszip in compilerOptions AND set resolveJsonModule to 'true' :

```
"compilerOptions": {
    "paths": {
      "jszip": [
        "node_modules/jszip/dist/jszip.min.js"
      ]
    },
    "baseUrl": "./",
    ...
    "resolveJsonModule": true,
    ...
```

## Updating to latest Angular 9

This app is on Angular 9. Before starting an update, always commit first any valid open changes

update to latest Angular 9:
`ng update @angular/cli@9 @angular/core@9`

Follow the instructions eventualy to fixes and test good working app
