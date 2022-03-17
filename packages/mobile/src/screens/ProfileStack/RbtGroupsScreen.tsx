import { useActionSheet } from '@expo/react-native-action-sheet';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView } from 'react-native';
import {
  H2,
  Header,
  Icon,
  InputWithButton,
  ListItemGroup,
  Section,
  Separator,
} from '../../components';
import Title from '../../platform/Title';
import {
  CallGroupsDocument,
  useCallGroupsQuery,
  useCreateRbtGroupMutation,
  useDeleteRbtGroupMutation,
} from '../../queries';
import { Box } from '../../rebass';

const GroupListItem = (props: { groupId: string; name: string; onEllipsisClick?: () => void }) => (
  <ListItemGroup
    groupId={props.groupId}
    icon={<Icon name="album" size={16} />}
    iconPadding={2}
    title={props.name}
    titleWidth={1}
    showEllipsis="visible"
    onEllipsisClick={props.onEllipsisClick}
  />
);
const NewGroupSection = () => {
  const [groupName, setGroupName] = useState('');
  const [createRbtGroup, loading] = useCreateRbtGroupMutation({
    variables: { groupName },
    refetchQueries: [{ query: CallGroupsDocument }],
  });
  const onPress = useCallback(() => {
    createRbtGroup().then(({ data }) => {
      if (data?.createRbtGroup.success) {
        setGroupName('');
      }
      Alert.alert(data?.createRbtGroup.message ?? 'unknown error');
    });
  }, [createRbtGroup]);
  return (
    <Section my={4}>
      <H2 mb={3}>Tạo nhóm mới</H2>
      <InputWithButton
        icon="plus"
        gradient
        border={false}
        value={groupName}
        onChangeText={setGroupName}
        placeholder="Nhập tên nhóm"
        onPress={onPress}
        disabled={!loading}
      />
    </Section>
  );
};
const GroupList = () => {
  const { showActionSheetWithOptions } = useActionSheet();
  const { data, loading } = useCallGroupsQuery();
  const [deleteRbtGroup] = useDeleteRbtGroupMutation({
    refetchQueries: [{ query: CallGroupsDocument }],
  });

  const onGroupPress = (groupId: string) => () =>
    showActionSheetWithOptions(
      {
        options: ['Xóa', 'Thôi'],
        cancelButtonIndex: 1,
        destructiveButtonIndex: 0,
      },
      (selected) => {
        if (selected === 0) {
          deleteRbtGroup({
            variables: { groupId },
          }).then(({ data: resData }) => {
            alert(resData?.deleteRbtGroup.message); //TODO: alert
          });
        }
      }
    );

  return (
    <Section>
      <H2 mb={3}>Danh sách nhóm</H2>
      {loading ? (
        <ActivityIndicator size="large" color="primary" />
      ) : (
        <Box>
          <Separator />
          {(data?.myRbt?.callGroups || []).map((group) => (
            <Box key={group.id}>
              <GroupListItem
                groupId={group.id}
                name={group.name}
                onEllipsisClick={onGroupPress(group.id)}
              />
              <Separator />
            </Box>
          ))}
        </Box>
      )}
    </Section>
  );
};

export function RbtGroupsScreenBase() {
  return (
    <Box bg="defaultBackground">
      <NewGroupSection />
      <GroupList />
    </Box>
  );
}

const RbtGroupsScreen = () => {
  return (
    <Box bg="defaultBackground" height="100%">
      <Title>Nhạc chờ cho nhóm</Title>
      <Header leftButton="back" title="Nhạc chờ cho nhóm" />
      <Box flex={1}>
        <ScrollView>
          <RbtGroupsScreenBase />
        </ScrollView>
      </Box>
    </Box>
  );
};
export default RbtGroupsScreen;
