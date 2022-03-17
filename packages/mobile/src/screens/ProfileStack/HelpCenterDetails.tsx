import React from 'react';
import { Box, Flex, Text } from '../../rebass';
import { Header, NotificationIcon, Section } from '../../components';
import { ConditionalGoVipButton } from '../../containers';
import { useRoute } from '@react-navigation/native';
import { useHelpArticlesQuery } from '../../queries';
import { ScrollView, useWindowDimensions } from 'react-native';
import { RenderHTML } from 'react-native-render-html';
import { useThemeManager } from '../../hooks';

export function HelpCenterDetailsBase({ slug = '' }: { slug?: string }) {
  const { width } = useWindowDimensions();
  const baseVariables = { slug };
  const detail = useHelpArticlesQuery({ variables: baseVariables });
  // const renderersProps = {
  //   img: {
  //     enableExperimentalPercentWidth: false,
  //   },
  // };
  const { theme } = useThemeManager();
  return (
    <Box bg="defaultBackground" position="relative" flex={1}>
      <Box bg="defaultBackground">
        <Header leftButton="back" title="Điều khoản" search>
          <ConditionalGoVipButton />
          <NotificationIcon />
        </Header>
      </Box>
      <ScrollView>
        {(detail?.data?.helpArticleCategory?.articles ?? []).map((item, index) => (
          <Box key={index}>
            <Section>
              <Flex flexDirection="row" mx={-3} my={2} alignItems="center">
                <Box borderRadius={2} overflow="hidden" bg="secondary" width={4} height={16} />
                <Text fontSize={3} ml={1} fontWeight="bold" color="normalText">
                  {item.title}
                </Text>
              </Flex>
            </Section>
            <RenderHTML
              baseStyle={{
                color: theme === 'dark' ? 'white' : 'black',
                paddingHorizontal: 8,
                backgroundColor: theme === 'dark' ? 'secondary' : 'white',
              }}
              contentWidth={width}
              source={{ html: item.body }}
            />
          </Box>
        ))}
      </ScrollView>
    </Box>
  );
}

export default function HelpCenterDetails() {
  const route: { params?: { slug?: string } } = useRoute();
  return <HelpCenterDetailsBase slug={route.params?.slug ?? ''} />;
}
