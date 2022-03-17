import React from 'react';
import { Box, Flex } from '../../rebass';
import {
  Header,
  Icon,
  ICON_GRADIENT_1,
  IconName,
  ListItem,
  NotificationIcon,
  Separator,
} from '../../components';
import { ConditionalGoVipButton } from '../../containers';
import { NavLink } from '../../platform/links';
import { useHelpArticleCategoriesQuery } from '../../queries';
import { TouchableOpacity } from 'react-native';

const SettingItem = (props: {
  onPress?: () => void;
  title: string;
  icon?: IconName;
  value?: string;
  rightNode?: React.ReactNode;
}) => {
  const item = (
    <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
      <Box flex={1}>
        <ListItem
          icon={props.icon && <Icon name={props.icon} size={16} color={ICON_GRADIENT_1} />}
          iconPadding={3}
          title={props.title}
          value={props.value}
          titleWidth={props.value ? 0.5 : 1}
          showCaret={!props.rightNode}
          py={4}
        />
      </Box>
      {props.rightNode}
    </Flex>
  );
  return (
    <Box>
      {props.onPress ? <TouchableOpacity onPress={props.onPress}>{item}</TouchableOpacity> : item}
      <Separator />
    </Box>
  );
};

export function HelpCenterBase() {
  const { data } = useHelpArticleCategoriesQuery();
  return (
    <Box bg="defaultBackground" position="relative" flex={1}>
      <Box bg="defaultBackground">
        <Header leftButton="back" title="Hỗ trợ">
          <ConditionalGoVipButton />
          <NotificationIcon />
        </Header>
      </Box>
      {data?.helpArticleCategories.map((cat, index) => (
        <Box key={index} px={3}>
          <NavLink route="/huong-dan/[slug]" params={{ slug: cat.slug }} key={cat.id}>
            <SettingItem title={cat.name} />
          </NavLink>
        </Box>
      ))}
    </Box>
  );
}

export default function HelpCenterScreen() {
  return <HelpCenterBase />;
}
