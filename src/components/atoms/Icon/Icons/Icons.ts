export enum AllIcons {
  ChevronDown = "ChevronDown",
  ChevronUp = "ChevronUp",
  PauseCircle = "PauseCircle",
  PlayCircle = "PlayCircle",
  Repeat = "Repeat",
  SkipBackward = "SkipBackward",
  SkipForward = "SkipForward",
  StepBackward = "StepBackward",
  StepForward = "StepForward",
  VolumeHigh = "VolumeHigh",
  VolumeLow = "VolumeLow",
  VolumeMedium = "VolumeMedium",
  VolumeMuted = "VolumeMuted",
}

export type Icons = keyof typeof AllIcons;
