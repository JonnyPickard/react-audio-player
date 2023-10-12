import {
  Card,
  CardBody,
  Divider,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { tokens } from "styles/tokens";

export const TypeographyStyleGuide = () => (
  <>
    <VStack w="100%" align="start">
      <Heading as="h2" size="lg">
        Typeography
      </Heading>
      <Divider />
    </VStack>
    <VStack w="100%" align="start">
      <Heading as="h3" size="md">
        Font Sizes
      </Heading>
      <Divider />
    </VStack>
    <Card bg="grayscale.almostBlack">
      <CardBody>
        <VStack align="start">
          <Text color="grayscale.almostWhite" fontSize="xxs">
            XXS: {tokens.Text.xxs.px}
          </Text>
          <Text color="grayscale.almostWhite" fontSize="xs">
            XS: {tokens.Text.xs.px}
          </Text>
          <Text color="grayscale.almostWhite" fontSize="sm">
            SM: {tokens.Text.sm.px}
          </Text>
          <Text color="grayscale.almostWhite" fontSize="md">
            MD: {tokens.Text.md.px}
          </Text>
          <Text color="grayscale.almostWhite" fontSize="lg">
            LG: {tokens.Text.lg.px}
          </Text>
        </VStack>
      </CardBody>
    </Card>
  </>
);
