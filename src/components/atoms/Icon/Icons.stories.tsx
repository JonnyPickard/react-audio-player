// Copied + reworked a bit from Chakra
// https://github.com/chakra-ui/chakra-ui-docs/blob/main/src/components/mdx-components/icons-list.tsx
import {
  Button,
  Icon as ChakraIcon,
  Grid,
  Heading,
  Link,
  Text,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import type { Meta } from "@storybook/react";

import { AllIcons, Icon } from ".";

const meta: Meta<typeof ChakraIcon> = {
  title: "components/Icon/Icons",
};

export default meta;

export const Icons = () => {
  const toast = useToast();

  return (
    <>
      <Heading as={"h1"} size="lg">
        Icons
      </Heading>
      <Text>
        Click to copy name. See{" "}
        <Link color="blue" href="?path=/docs/icon--docs">
          Icon
        </Link>{" "}
        for more information.
      </Text>
      <Grid
        mt={7}
        gap={5}
        templateColumns="repeat( auto-fit, minmax(150px, 1fr) )"
      >
        {(Object.keys(AllIcons) as Array<keyof typeof AllIcons>).map(
          (key, i) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const { onCopy } = useClipboard(key);

            const onCopyIcon = () => {
              onCopy();

              toast({
                title: `'${key}' copied to clipboard`,
                status: "success",
                duration: 2000,
                isClosable: false,
              });
            };

            return (
              <Button
                pt={9}
                pb={9}
                onClick={() => onCopyIcon()}
                key={i}
                textAlign="center"
                variant="outline"
                flexDir="column"
                justifyContent="center"
                w="150px"
                h="100px"
                bg="grayscale.almostBlack"
                _hover={{
                  bg: "grayscale.tintedBlack",
                  transform: "scale(1.02)",
                }}
              >
                <Icon icon={key} size="lg" color="white" />
                <Text
                  color="grayscale.almostWhite"
                  as="span"
                  mt={3}
                  fontSize="sm"
                  fontWeight="normal"
                  textAlign="center"
                >
                  {key}
                </Text>
              </Button>
            );
          },
        )}
      </Grid>
    </>
  );
};
