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
import { AllIcons, Icon } from "components/atoms/Icon";
import { tokens } from "styles/components/tokens";

export const IconStyleGuide = () => (
  <>
    <VStack w="100%" align="start">
      <Heading as="h2" size="lg">
        Icons
      </Heading>
      <Divider />
    </VStack>
    <SimpleGrid gap="2" columns={3}>
      <Card
        color="white"
        bg="grayscale.almostBlack"
        size="sm"
        align="center"
        justify="center"
      >
        <CardHeader>Small</CardHeader>
        <CardBody p={2}>
          <Icon color="white" icon={AllIcons.PlayCircle} />
        </CardBody>
        <CardFooter>
          <Text fontSize="xs">
            {`${tokens.Icon.sm.px}`} x {`${tokens.Icon.sm.px}`}
          </Text>
        </CardFooter>
      </Card>
      <Card color="white" bg="grayscale.almostBlack" size="sm" align="center">
        <CardHeader>Medium</CardHeader>
        <CardBody p={2}>
          <Icon color="white" size="md" icon={AllIcons.PlayCircle} />
        </CardBody>
        <CardFooter>
          <Text fontSize="xs">
            {`${tokens.Icon.md.px}`} x {`${tokens.Icon.md.px}`}
          </Text>
        </CardFooter>
      </Card>
      <Card color="white" bg="grayscale.almostBlack" size="sm" align="center">
        <CardHeader>Large</CardHeader>
        <CardBody p={2}>
          <Icon color="white" size="lg" icon={AllIcons.PlayCircle} />
        </CardBody>
        <CardFooter>
          <Text fontSize="xs">
            {`${tokens.Icon.lg.px}`} x {`${tokens.Icon.lg.px}`}
          </Text>
        </CardFooter>
      </Card>
    </SimpleGrid>
  </>
);
