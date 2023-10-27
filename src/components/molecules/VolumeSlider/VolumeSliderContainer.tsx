// VolumeSliderContainer
// Note: This is not the finalised way of doing this as ideally state will be
//   centralised/ provided by the Player. This is more of an intermediary step to
//   show how it could eventually work.
import React, { createContext, useState } from "react";

const DEFAULT_VOLUME = 0.7;

type VolumeContext = {
  /* From 0 - 1 (0 meaning muted & 1 being full volume) */
  volume: number;
  onVolumeChange: (volume: number) => void;
  muted: boolean;
  toggleMute: () => void;
};

export const VolumeContext = createContext<VolumeContext>({
  volume: DEFAULT_VOLUME,
  onVolumeChange: () => {},
  muted: false,
  toggleMute: () => {},
});

export const VolumeSliderContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [muted, setMuted] = useState(false);

  const toggleMute = () => {
    const shouldMute = !muted;

    if (shouldMute === false && volume === 0) {
      setMuted(false);
      setVolume(DEFAULT_VOLUME);
    } else {
      setMuted(shouldMute);
    }
  };

  const onVolumeChange = (vol: number) => {
    if (vol === volume) {
      return;
    }

    if (muted && vol !== 0) {
      setMuted(false);
    }

    if (vol === 0) {
      setMuted(true);
    }

    setVolume(vol);
  };

  return (
    <VolumeContext.Provider
      value={{ volume, onVolumeChange, muted, toggleMute }}
    >
      {children}
    </VolumeContext.Provider>
  );
};
