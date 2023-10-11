import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AllIcons } from "components/Icon";
import { IconButton } from "components/IconButton";
import { tokens } from "styles/components/tokens";

export const IconButtonStyleGuide = () => (
  <>
    <VStack w="100%" align="start">
      <Heading as="h2" size="lg">
        Icon Button
      </Heading>
      <Divider />
    </VStack>
    <SimpleGrid gap="2" columns={3}>
      <Card size="sm" align="center" justify="center">
        <CardHeader>Small</CardHeader>
        <CardBody p={2}>
          <IconButton aria-label="Play Track" icon={AllIcons.PlayCircle} />
        </CardBody>
        <CardFooter>
          <Text fontSize="xs">
            {`${tokens.IconButton.sm.px}px`} x {`${tokens.IconButton.sm.px}px`}
          </Text>
        </CardFooter>
      </Card>
      <Card size="sm" align="center">
        <CardHeader>Medium</CardHeader>
        <CardBody p={2}>
          <IconButton
            size="md"
            aria-label="Play Track"
            icon={AllIcons.PlayCircle}
          />
        </CardBody>
        <CardFooter>
          <Text fontSize="xs">
            {`${tokens.IconButton.md.px}px`} x {`${tokens.IconButton.md.px}px`}
          </Text>
        </CardFooter>
      </Card>
      <Card size="sm" align="center">
        <CardHeader>Large</CardHeader>
        <CardBody p={2}>
          <IconButton
            size="lg"
            aria-label="Play Track"
            icon={AllIcons.PlayCircle}
          />
        </CardBody>
        <CardFooter>
          <Text fontSize="xs">
            {`${tokens.IconButton.lg.px}px`} x {`${tokens.IconButton.lg.px}px`}
          </Text>
        </CardFooter>
      </Card>
    </SimpleGrid>
  </>
);
