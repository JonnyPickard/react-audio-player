# React Audio Player

## About

- Porting over the Audio player from an old project (Currently not in a great state).

## TODO

- [ ] Add some error logging to make it more obvious what issues are
- [ ] Add some api documentation/ TSDOC autogenerate API spec?
  - [ ] [typedoc](https://typedoc.org/)
- [ ] Logical grouping of player elements

## Getting this ready for production

- Get the core player.ts functionality robust & add the tests back.
- Remove specific project related code and replace with more generic code.
- fix/ rework the ui.

## Generate Type Docs

Runs [typedoc](https://typedoc.org/) against the Player model code.

Open `docs/index.html` to see the generated API documentation.

```sh
  npm run documentation
```
