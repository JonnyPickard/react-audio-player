import { AllIcons } from "components/atoms/Icon";

export const pickVolumeIcon = (volume: number, isMuted: boolean) => {
  if (isMuted || volume === 0) {
    return AllIcons.VolumeMuted;
  } else if (volume > 0 && volume <= 0.33) {
    return AllIcons.VolumeLow;
  } else if (volume > 0.33 && volume <= 0.66) {
    return AllIcons.VolumeMedium;
  }
  return AllIcons.VolumeHigh;
};
