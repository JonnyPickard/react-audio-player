# React Audio Player

- [Components](https://jonnypickard.github.io/react-audio-player/storybook/?path=/docs/react-audio-player-overview-links--docs)
- [Player model API reference](https://jonnypickard.github.io/react-audio-player/typedoc/index.html)
- (WIP) Demo: [React Audio Player](https://jonnypickard.github.io/react-audio-player)

## About

Having written an audio player in the past, under strict time constraints, I wanted to see if I can make a better one.

I will potentially end up open-sourcing this.

Apologies in advance for the test tracks included. They are tracks I made ~10 years ago.

## Designs

### Desktop Player

<img src="./docs/designs/PlayerDesktop.svg" alt="Desktop Design" style="max-width:1080px;">

### Mobile Player - Slim

<img src="./docs/designs/PlayerMobileSlim.svg" alt="Moible - Slim Design" style="max-width:1080px;">

### Mobile Player - Expanded

<img src="./docs/designs/PlayerMobileExpaded.svg" alt="Mobile - Expanded Design" style="max-width:1080px;">

## Wireframes

  <img src="./docs/designs/ReactAudioPlayer.drawio.png" alt="Wireframes" style="max-width:600px;">

## Generate Type Docs

```sh
  npm run documentation:generate
```

Runs [typedoc](https://typedoc.org/) against the Player model code.

```sh
  npm run documentation:open
```

Opens `docs/typedoc/index.html` to see the generated API documentation.

## Dependency Choices

### Chakra UI - Component Library

Instead of manually creating specific components with all required features as a first pass I've decided to use Chakra UI.

The main benefits of Chakra are significant time-saved. And the ability to handle all of the UI-related requirements without having to install multiple dependencies. Finally, it has rich accessibility features built in.

### [Chromatic By Storybook](https://www.chromatic.com/) - Hosting + Component Explorer

Mainly testing this out to see how the figma integration works.

To deploy you need an `.env` file at root containing:

```sh
CHROMATIC_PROJECT_TOKEN='<project token>'
```

Then run the script to build and deploy storybook with:

```sh
npm run chromatic:deploy
```

## TODO

- [ ] **API** - Create the underlying logic required for a UI to function.
  - [x] Create basic OO class structure for the player.
    - [x] Logical grouping of player elements
    - [x] Add basic tests.
  - [x] Add some api documentation/ TSDOC autogenerate API spec.
    - [x] [typedoc](https://typedoc.org/)
  - [ ] Add more error logging to make it more obvious what issues are.
  - [x] UI Designs/ Blueprints to check all required logic exists.
- [ ] **Repo/ Docs/ Demos/ Publishing**
  - [x] Create basic static pages site w/ cd pipeline to host the api documentation, designs & player demo.
  - [x] Add steps to build + deploy the storybook library to the GH pages site.
  - [ ] Optimise output to publish to NPM. Potentially also split out player API if users want to create their own GUI's for it.
  - [ ] Maybe switch Chakra storybook plugin for [custom theme decorator.](https://github.com/chakra-ui/chakra-ui/issues/6855#issuecomment-1284552528) - Because initially the player is dark mode only & light mode changes colors.
- [ ] **Frontend**
  - [x] Setup/ create theme solution + design tokens.
  - [x] Customizable icon solution.
  - [x] Component designs - Figma
  - [ ] Link more component designs to storybook?
  - [ ] Components (First pass)
    - [ ] Atoms
      - [x] Icon
      - [ ] Image \*
      - [ ] Text \*
      - [ ] Link \*
      - [ ] Timestamp
        - [x] Basic component
        - [ ] Work out how to subscribe it to duration/ seek times etc
    - [ ] Molecules
      - [x] IconButton (w/ Tooltip)
      - [x] Slider
      - [ ] Track Details
        - [x] Rework artist -> artists incase there are multiple, with links to their pages.
        - [ ] Text roll animation if title/ artist name are too long and go off screen.
          - Will need to calculate visible space + text length
      - [ ] Track Controls
        - [ ] Playback Controls
        - [x] Seek Bar
      - [ ] Player Global Controls
        - [ ] Volume Bar
    - [ ] Organisms (Player)

\* don't think its worth remaking
