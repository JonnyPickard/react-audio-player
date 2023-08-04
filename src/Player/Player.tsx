import React, { useEffect, useRef, useState } from "react";
import { Player as AudioPlayer } from "./models/player";
import { Controls, Volume } from "./components/Controls";
import { SeekBar } from "./components/SeekBar/SeekBar";
import { TrackInfo } from "./components/TrackInfo/TrackInfo";
import { Spinner } from "./components/Spinner";
import { testTrack1, testTrack2 } from "./fixtures/test-tracks";
import { Button } from "../SharedComponents/Button/Button";
import * as styles from "./Player.styles";
import { getTimeRemaining, getTimePlayed } from "./utils/durationHelpers";
import get from "lodash.get";
import {
  PlayerContainer,
  PlayerContainerWrapper,
  TrackInfoContainerDiv,
  ControlsContainer,
  VisuallyHiddenH2,
  VolumeContainer,
} from "./Player.styles";
import { pollingTimer } from "./utils/pollingTimer";
import throttle from "lodash.throttle";

export const PLAYER_NOW_PLAYING_COPY_TEXT = "Music Player. Now Playing:";

export const Player = () => {
  const playerRef = useRef(null);
  const [state, setState] = useState({
    isPlaying: false,
    isLoading: false,
    isSeeking: false,
    duration: 0,
    seek: 0,
    timeRemaining: 0,
    timePlayed: 0,
    hasEverLoadedATrack: false,
    isMuted: false,
    volume: 100,
    isSlimPlayer: true,
  });

  const player = new AudioPlayer({});
  player.loadTrack(testTrack1);
  const timerRef = useRef(null);

  const startTrackTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = pollingTimer(() => {
      if (player.isPlaying()) {
        setState((prevState) => ({ ...prevState, isSeeking: false }));
      }
      if (player.getTimeRemaining() && player.getTimeRemaining() <= 0) {
        clearInterval(timerRef.current);
        setState((prevState) => ({
          ...prevState,
          seek: 0,
          timeRemaining: player.getTimeRemaining() || prevState.timeRemaining,
          timePlayed: player.getTimePlayed() || prevState.timePlayed,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          seek: player.seek() || prevState.seek,
          timeRemaining: player.getTimeRemaining() || prevState.timeRemaining,
          timePlayed: player.getTimePlayed() || prevState.timePlayed,
        }));
      }
    }, 500);
  };

  const onPlayClick = () => {
    player.playCurrentlyLoadedTrack();
    player.getDurationAsync().then((duration) => {
      if (duration) {
        setState((prevState) => ({
          ...prevState,
          duration,
          timeRemaining: player.getTimeRemaining() || prevState.timeRemaining,
          seek: player.seek() || prevState.seek,
          isPlaying: true,
          isLoading: false,
        }));

        startTrackTimer();
        playerRef.current?.focus();
      }
    });
  };

  const onPauseClick = () => {
    clearTimer();
    player.pauseTrack();
    setState((prevState) => ({ ...prevState, isPlaying: false }));
  };

  const onStepForwardClick = () => {
    if (!!player.getNextTrack()) {
      clearTimer();

      setState((prevState) => ({
        ...prevState,
        isPlaying: false,
        seek: 0,
        timeRemaining: 0,
        timePlayed: 0,
      }));

      if (player.getNextTrack()) {
        player.nextTrack();
        startTrackTimer();
        setState((prevState) => ({ ...prevState, isPlaying: true }));
      }
    } else {
      setState((prevState) => ({
        ...prevState,
        isPlaying: false,
        seek: 0,
        timeRemaining: 0,
        timePlayed: 0,
      }));
    }
  };

  const onStepBackwardClick = () => {
    clearTimer();

    setState((prevState) => ({
      ...prevState,
      seek: 0,
      timeRemaining: 0,
      timePlayed: 0,
    }));

    player.previousTrack();
    startTrackTimer();
    setState((prevState) => ({ ...prevState, isPlaying: true }));
  };

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const handleSeek = (seekTo) => {
    clearTimer();

    setState((prevState) => ({
      ...prevState,
      seek: seekTo,
      timePlayed: getTimePlayed(seekTo),
      timeRemaining: getTimeRemaining(state.duration, seekTo),
    }));
  };

  const handleSeekEnd = (seekTo) => {
    player.seek(seekTo);

    setState((prevState) => ({ ...prevState, isSeeking: true }));

    startTrackTimer();
  };

  const handleSeekForward = (seekByMs) => {
    const seekTo = (player.getTimePlayed() ?? 0) + seekByMs;

    const canSeekForward = state.duration - seekTo > 0;
    if (canSeekForward) {
      handleSeek(seekTo);
    }
  };

  const handleSeekBackward = (seekByMs) => {
    const seekTo = (player.getTimePlayed() ?? 0) - seekByMs;

    const canSeekBackward = seekTo > 0;

    if (canSeekBackward) {
      handleSeek(seekTo);
    }
  };

  const handleToggleMute = () => {
    player.toggleMute(!state.isMuted);
    setState((prevState) => ({ ...prevState, isMuted: !prevState.isMuted }));
  };

  const handleVolumeChange = throttle((volume) => {
    const betweenZeroAndOne = volume / 100;
    player.setVolume(betweenZeroAndOne);
    setState((prevState) => ({ ...prevState, volume }));
  }, 50);

  const handleKeyPress = (e) => {
    if (player.currentlyLoadedTrack) {
      switch (e.key) {
        case "Enter":
        case " ":
          e.preventDefault();
          if (state.isPlaying) {
            onPauseClick();
          } else {
            onPlayClick();
          }
          break;
        case "z":
          e.preventDefault();
          handleSeekBackward(5);
          break;
        case "x":
          e.preventDefault();
          handleSeekForward(5);
          break;
        case "ArrowRight":
          e.preventDefault();
          onStepForwardClick();
          break;
        case "ArrowLeft":
          e.preventDefault();
          onStepBackwardClick();
          break;
        case "m":
          e.preventDefault();
          handleToggleMute();
          break;
        default:
          break;
      }
    }
  };

  const toggleSlimPlayer = () => {
    setState((prevState) => ({
      ...prevState,
      isSlimPlayer: !prevState.isSlimPlayer,
    }));
  };

  const title = get(player, "currentlyLoadedTrack.title", "");
  const artist = get(player, "currentlyLoadedTrack.artist", "");
  const artworkUrl = get(player, "currentlyLoadedTrack.artworkUrl", "");
  const productUrl = get(player, "currentlyLoadedTrack.productUrl", "#");

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.AudioPlayer = {
        playTrack: playTrack,
        loadTracks: loadTracks,
      };
    }
    // loadTracks([testTrack1, testTrack2]);
  }, []);

  const resetPlayerState = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setState({
      isPlaying: false,
      isLoading: false,
      duration: 0,
      timeRemaining: 0,
      timePlayed: 0,
      seek: 0,
    });
  };

  const removeAllTracks = () => {
    player.removeAllTracks();
    resetPlayerState();
  };

  const playTrack = (title, artist, trackUrl, artworkUrl) => {
    removeAllTracks();
    setState((prevState) => ({
      ...prevState,
      isPlaying: false,
      isLoading: true,
      hasEverLoadedATrack: true,
      isSlimPlayer: prevState.hasEverLoadedATrack
        ? prevState.isSlimPlayer
        : false,
    }));

    player.loadTrack({
      title,
      artist,
      url: trackUrl,
      label: "",
      artworkUrl,
    });
    onPlayClick();
  };

  const loadTracks = (tracks) => {
    removeAllTracks();
    setState((prevState) => ({
      ...prevState,
      isPlaying: false,
      isLoading: true,
      hasEverLoadedATrack: true,
      isSlimPlayer: prevState.hasEverLoadedATrack
        ? prevState.isSlimPlayer
        : false,
      seek: 0,
    }));

    player.addMultipleTracks(tracks);
    onPlayClick();
  };

  return (
    <PlayerContainerWrapper isSeeking={state.isSeeking}>
      <VisuallyHiddenH2 id="player-container">
        {PLAYER_NOW_PLAYING_COPY_TEXT}
      </VisuallyHiddenH2>
      <PlayerContainer
        ref={playerRef}
        aria-labelledby="player-container player-currently-playing-title player-currently-playing-artist"
        aria-keyshortcuts="Enter Space z x ArrowRight ArrowLeft m"
        tabIndex={0}
        onKeyDown={handleKeyPress}
        css={state.isSlimPlayer ? styles.playerContainerSlim : ""}
      >
        {productUrl ? (
          <TrackInfoContainerDiv
            hasEverLoadedATrack={state.hasEverLoadedATrack}
          >
            {state.isLoading ? (
              <div css={styles.spinnerContainer}>
                <Spinner data-testid="spinner" />
              </div>
            ) : (
              <TrackInfo
                isSlimPlayer={state.isSlimPlayer}
                toggleSlimPlayer={toggleSlimPlayer}
                artist={artist}
                title={title}
                artworkUrl={artworkUrl}
                productUrl={productUrl}
              />
            )}
          </TrackInfoContainerDiv>
        ) : (
          <TrackInfoContainerDiv
            hasEverLoadedATrack={state.hasEverLoadedATrack}
          >
            {state.isLoading ? (
              <div css={styles.spinnerContainer}>
                <Spinner data-testid="spinner" />
              </div>
            ) : (
              <TrackInfo
                isSlimPlayer={state.isSlimPlayer}
                toggleSlimPlayer={toggleSlimPlayer}
                artist={artist}
                title={title}
                artworkUrl={artworkUrl}
                productUrl={productUrl}
              />
            )}
          </TrackInfoContainerDiv>
        )}
        <ControlsContainer>
          <Controls
            trackIsLoaded={!!player.currentlyLoadedTrack}
            isPlaying={state.isPlaying}
            onPlayClick={onPlayClick}
            onStepForwardClick={onStepForwardClick}
            onStepBackwardClick={onStepBackwardClick}
            onPauseClick={onPauseClick}
            canStepForward={!!player.getNextTrack()}
          />
          {!state.isSlimPlayer && (
            <SeekBar
              onSeekEnd={handleSeekEnd}
              onSeek={handleSeek}
              timePlayed={state.timePlayed}
              timeRemaining={state.timeRemaining}
              duration={state.duration}
              value={state.seek}
            />
          )}
        </ControlsContainer>
        <div
          css={[
            styles.secondaryControls,
            state.isSlimPlayer && styles.secondaryControlsSlim,
          ]}
        >
          <div css={styles.toggleSlimPlayerCaret}>
            <Button
              icon="AiFillCaretRight"
              onClick={toggleSlimPlayer}
              styles={state.isSlimPlayer ? styles.rotateCaret : styles.caret}
            ></Button>
          </div>
          {!state.isSlimPlayer && (
            <VolumeContainer>
              <Volume
                currentVolume={state.volume}
                handleToggleMute={handleToggleMute}
                isMuted={state.isMuted}
                handleVolumeChange={handleVolumeChange}
              />
            </VolumeContainer>
          )}
        </div>
      </PlayerContainer>
    </PlayerContainerWrapper>
  );
};
