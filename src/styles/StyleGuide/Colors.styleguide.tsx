import {
  Card,
  CardBody,
  Divider,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { brand, grayscale } from "styles/colors";

export const ColorsStyleGuide = () => (
  <>
    <VStack w="100%" align="start">
      <Heading as="h2" size="lg">
        Colors
      </Heading>
      <Divider />
    </VStack>
    <VStack w="100%" align="start">
      <Heading as="h3" size="md">
        Primary
      </Heading>
      <Divider />
    </VStack>
    <SimpleGrid
      templateColumns={"repeat(auto-fit, 200px)"}
      w="100%"
      spacing="40px"
    >
      {Object.entries(brand.primary).map(([name, hexcode], i, arr) => {
        const textColor =
          i < arr.length / 2 ? "grayscale.white" : "grayscale.black";
        return (
          <Card
            bg={`brand.primary.${name}`}
            size="lg"
            align="center"
            justify="center"
          >
            <CardBody>
              <Text align="center" color={textColor}>
                {name}
              </Text>
              <Text align="center" as="b" color={textColor}>
                {hexcode}
              </Text>
            </CardBody>
          </Card>
        );
      })}
    </SimpleGrid>
    <VStack w="100%" align="start">
      <Heading as="h3" size="md">
        Secondary
      </Heading>
      <Divider />
    </VStack>
    <SimpleGrid
      templateColumns={"repeat(auto-fit, 200px)"}
      w="100%"
      spacing="40px"
    >
      {Object.entries(brand.secondary).map(([name, hexcode], i, arr) => {
        const textColor =
          i < arr.length / 2 ? "grayscale.white" : "grayscale.black";
        return (
          <Card
            bg={`brand.secondary.${name}`}
            size="lg"
            align="center"
            justify="center"
          >
            <CardBody>
              <Text align="center" color={textColor}>
                {name}
              </Text>
              <Text align="center" as="b" color={textColor}>
                {hexcode}
              </Text>
            </CardBody>
          </Card>
        );
      })}
    </SimpleGrid>
    <VStack w="100%" align="start">
      <Heading as="h3" size="md">
        Grayscale
      </Heading>
      <Divider />
    </VStack>
    <SimpleGrid
      templateColumns={"repeat(auto-fit, 200px)"}
      w="100%"
      spacing="40px"
    >
      {Object.entries(grayscale).map(([name, hexcode], i, arr) => {
        const textColor =
          i < arr.length / 2 ? "grayscale.white" : "grayscale.black";
        return (
          <Card
            bg={`grayscale.${name}`}
            size="lg"
            align="center"
            justify="center"
          >
            <CardBody>
              <Text align="center" color={textColor}>
                {name}
              </Text>
              <Text align="center" as="b" color={textColor}>
                {hexcode}
              </Text>
            </CardBody>
          </Card>
        );
      })}
    </SimpleGrid>
  </>
);
