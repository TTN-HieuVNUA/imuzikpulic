import { LinearGradient } from 'expo-linear-gradient';
import React, { PropsWithChildren, ReactNode, useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { FontSizeProps } from 'styled-system';

import { Flex, Text } from '../rebass';
import { Icon, IconColor, IconName } from './svg-icon';

type TabBarIndicatorType = undefined | 'short' | 'long';
interface TabBarContextType extends FontSizeProps {
  indicator?: TabBarIndicatorType;
  activeColor?: IconColor;
  inactiveColor?: IconColor;
}
const TabBarContext = React.createContext<TabBarContextType | null>(null);

const TabBar = ({ children: c, ...props }: PropsWithChildren<TabBarContextType>) => {
  const children = c as ReactNode[];
  return (
    <TabBarContext.Provider value={props}>
      <Flex flexDirection="row" alignItems="center" position="relative">
        {props.indicator === 'long' && (
          <Flex
            width="100%"
            position="absolute"
            height={4}
            bg="separator"
            bottom={0}
            borderRadius={2}
            overflow="hidden"
          />
        )}
        {children.map((c, idx) => (
          <Flex key={idx} width={1 / children.length}>
            {c}
          </Flex>
        ))}
      </Flex>
    </TabBarContext.Provider>
  );
};

const Item = (props: {
  title: string;
  icon?: IconName;
  isActive?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
}) => {
  const context = useContext(TabBarContext);
  if (!context) return null;
  const color: IconColor = props.isActive
    ? context.activeColor ?? 'normalText'
    : context.inactiveColor ?? 'lightText';
  return (
    <TouchableOpacity onPress={props.onPress} onLongPress={props.onLongPress}>
      <Flex alignItems="center" pt={2} pb={context.indicator ? 0 : 2}>
        {!!props.icon && (
          <Flex style={{ marginBottom: 2 }}>
            <Icon name={props.icon} color={color} size={20} />
          </Flex>
        )}
        <Text color={color} fontSize={context.fontSize || 1} fontWeight="bold">
          {props.title}
        </Text>

        {!!context.indicator && (
          <Flex
            width={context.indicator === 'long' ? '100%' : 30}
            height={4}
            overflow="hidden"
            borderRadius={2}
            mt={2}>
            {!!props.isActive && (
              <LinearGradient
                colors={['#38EF7D', '#11998E']}
                start={[0, 0]}
                end={[1, 1]}
                style={{ height: '100%' }}
              />
            )}
          </Flex>
        )}
      </Flex>
    </TouchableOpacity>
  );
};
TabBar.Item = Item;

export { TabBar };
