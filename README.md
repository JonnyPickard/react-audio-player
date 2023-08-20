# React Audio Player

## About

Having written an audio player in the past, under strict time constraints, I wanted to see if I can make a better one.

Currently in a fairly rough sudo state!

## TODO

- [ ] Create the underlying logic required for a UI to function.
  - [x] Create basic OO class structure for the player.
    - [x] Logical grouping of player elements
    - [x] Add basic tests.
  - [x] Add some api documentation/ TSDOC autogenerate API spec
    - [x] [typedoc](https://typedoc.org/)
  - [ ] Add more error logging to make it more obvious what issues are

## Generate Type Docs

Runs [typedoc](https://typedoc.org/) against the Player model code.

Open `docs/index.html` to see the generated API documentation.

```sh
  npm run documentation
```
