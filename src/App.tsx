import { useState } from "react";

import reactLogo from "./assets/react.svg";
import { testTrack1 } from "./components/Player/fixtures/test-tracks";
import { AudioPlayer } from "./components/Player/models/AudioPlayer";

function App() {
  const [Player] = useState(() => new AudioPlayer());
  const [trackList, setTrackList] = useState(Player.getTrackList());

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h2>Selected Track</h2>
      {Player.getSelectedTrack()?.title}
      <h2>Track List</h2>
      <ul>
        {trackList.map((track, i) => (
          <li key={`tracklist-${i}`}>{track.title}</li>
        ))}
      </ul>
      <div className="card">
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
    </>
  );
}

export default App;
