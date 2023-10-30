import { Flex, Grid, SimpleGrid } from "@chakra-ui/react";
import { AllIcons } from "components/atoms/Icon";
import { IconButton } from "components/molecules/IconButton";
import { useContext } from "react";

import { PlaybackControlsContext } from ".";

export function PlaybackControls() {
  const {
    variant,
    trackState,
    onPlayPress,
    canStepBackward,
    onStepBackwardPress,
    canStepForward,
    onStepForwardPress,
  } = useContext(PlaybackControlsContext);

  const pickAriaLabel = () => {
    switch (trackState) {
      case "loading":
        return "Loading";
      case "playing":
        return "Pause";
      default:
        return "Play";
    }
  };

  // For everything but mobile-slim
  const pickLargePlayIcon = () => {
    switch (trackState) {
      case "playing":
        return AllIcons.PauseCircle;
      default:
        return AllIcons.PlayCircle;
    }
  };

  const isPlayButtonDisabled = () => {
    if (trackState === "playing" || trackState === "paused") {
      return false;
    }

    return true;
  };

  switch (variant) {
    case "mobile-slim":
      return (
        <Flex justify="end">
          <IconButton
            isDisabled={isPlayButtonDisabled()}
            onClick={onPlayPress}
            size="md"
            icon={trackState === "playing" ? AllIcons.Pause : AllIcons.Play}
            aria-label={pickAriaLabel()}
          />
        </Flex>
      );
    case "mobile-expanded":
      return (
        <Grid templateColumns="repeat(5, 1fr)" justifyItems="center" gap={4}>
          <IconButton
            gridColumnStart={2}
            size="lg"
            icon={AllIcons.StepBackward}
            aria-label={pickAriaLabel()}
            onClick={onStepBackwardPress}
            isDisabled={canStepBackward}
          />
          <IconButton
            isDisabled={isPlayButtonDisabled()}
            isLoading={trackState === "loading"}
            gridColumnStart={3}
            size="xl"
            icon={pickLargePlayIcon()}
            aria-label={pickAriaLabel()}
            onClick={onPlayPress}
          />
          <IconButton
            gridColumnStart={4}
            size="lg"
            icon={AllIcons.StepForward}
            aria-label={pickAriaLabel()}
            onClick={onStepForwardPress}
            isDisabled={canStepForward}
          />
        </Grid>
      );
    default:
      return (
        <Flex justifyContent={"space-around"}>
          <SimpleGrid
            columns={3}
            spacing={4}
            width={"fit-content"}
            alignItems={"center"}
            justifyItems={"center"}
          >
            <IconButton
              size="sm"
              icon={AllIcons.StepBackward}
              aria-label={pickAriaLabel()}
              onClick={onStepBackwardPress}
              isDisabled={canStepBackward}
            />
            <IconButton
              isDisabled={isPlayButtonDisabled()}
              isLoading={trackState === "loading"}
              size="lg"
              icon={pickLargePlayIcon()}
              aria-label={pickAriaLabel()}
              onClick={onPlayPress}
            />
            <IconButton
              size="sm"
              icon={AllIcons.StepForward}
              aria-label={pickAriaLabel()}
              onClick={onStepForwardPress}
              isDisabled={canStepForward}
            />
          </SimpleGrid>
        </Flex>
      );
  }
}
