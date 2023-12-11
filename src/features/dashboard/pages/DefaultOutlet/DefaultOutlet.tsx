import React from 'react';
import { Box, Center, Link, Text, VStack } from '@chakra-ui/react';
import LoadingPlane from '../../../../components/LoadingPlane/LoagingPlane.tsx';
import { colors } from '../../../../theme/colors.ts';

const DefaultOutlet: React.FC = () => {
  return (
    <Center mt={8}>
      <VStack gap={4} m={4}>
        <LoadingPlane />

        <Text textAlign={'center'} fontWeight={800} fontSize={48}>
          Thanks for choosing Avian. Your best flight manager.
        </Text>

        <Box h={40} />

        <Text>Help needed?</Text>
        <Link color={colors.lochmara}>Contact Us</Link>
      </VStack>
    </Center>
  );
};

export default DefaultOutlet;
