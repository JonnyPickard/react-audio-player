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
import { AllIcons, Icon } from "components/Icon";
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
      <Card size="sm" align="center" justify="center">
        <CardHeader>Small</CardHeader>
        <CardBody p={2}>
          <Icon icon={AllIcons.PlayCircle} />
        </CardBody>
        <CardFooter>
          <Text fontSize="xs">
            {`${tokens.Icon.sm.px}px`} x {`${tokens.Icon.sm.px}px`}
          </Text>
        </CardFooter>
      </Card>
      <Card size="sm" align="center">
        <CardHeader>Medium</CardHeader>
        <CardBody p={2}>
          <Icon size="md" icon={AllIcons.PlayCircle} />
        </CardBody>
        <CardFooter>
          <Text fontSize="xs">
            {`${tokens.Icon.md.px}px`} x {`${tokens.Icon.md.px}px`}
          </Text>
        </CardFooter>
      </Card>
      <Card size="sm" align="center">
        <CardHeader>Large</CardHeader>
        <CardBody p={2}>
          <Icon size="lg" icon={AllIcons.PlayCircle} />
        </CardBody>
        <CardFooter>
          <Text fontSize="xs">
            {`${tokens.Icon.lg.px}px`} x {`${tokens.Icon.lg.px}px`}
          </Text>
        </CardFooter>
      </Card>
    </SimpleGrid>
  </>
);
