import { useState } from "react";

import * as styles from "./App.styles";
import typedocLogo from "./assets/typedoc.svg";
import { testTrack1 } from "./components/Player/fixtures/test-tracks";
import { AudioPlayer } from "./components/Player/models/AudioPlayer";

function App() {
  const [Player] = useState(() => new AudioPlayer());
  const [trackList, setTrackList] = useState(Player.getTrackList());

  return (
    <div css={styles.app}>
      <a css={styles.iconLink} href="/react-audio-player/typedoc/index.html">
        <img
          css={styles.icon}
          src={typedocLogo}
          alt="Typedoc API documentation"
        />
        Typedoc API documentation
      </a>
      <h1>React Audio Player</h1>
      <h2>Selected Track</h2>
      {Player.getSelectedTrack()?.title}
      <h2>Track List</h2>
      <ul>
        {trackList.map((track, i) => (
          <li key={`tracklist-${i}`}>{track.title}</li>
        ))}
      </ul>
      <div>
        <button
          onClick={() => {
            Player.addTrackToTrackList(testTrack1, { selectTrack: true });
            setTrackList(Player.getTrackList());
          }}
        >
          Add Track
        </button>
        <button onClick={() => Player.playSelectedTrack()}>Play Track</button>
        <button onClick={() => Player.stopSelectedTrack()}>Stop Track</button>
      </div>
    </div>
  );
}

export default App;
