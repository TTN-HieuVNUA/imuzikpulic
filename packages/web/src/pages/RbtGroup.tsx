import { Input, Label } from '@rebass/forms';
import { useTheme } from 'emotion-theming';
import { useFormik } from 'formik';
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, Flex, Text } from 'rebass';

import { Section, SelectionBarItems, Separator } from '../components';
import Icon, { ICON_GRADIENT_1 } from '../components/Icon';
import { ListItem } from '../components/ListItem';
import { useResponseHandler } from '../hooks';
import {
  AddRbtGroupMemberMutation,
  CallGroupsDocument,
  CreateRbtGroupMutation,
  DeleteRbtGroupMutation,
  RbtGroupInfoDocument,
  RemoveRbtGroupMemberMutation,
  SetRbtGroupTonesMutation,
  TimeType,
  useAddRbtGroupMemberMutation,
  useCallGroupsQuery,
  useCreateRbtGroupMutation,
  useDeleteRbtGroupMutation,
  useRbtGroupInfoQuery,
  useRemoveRbtGroupMemberMutation,
  useSetRbtGroupTonesMutation,
} from '../queries';
import { Theme } from '../themes';
import { PersonalSplitView } from './PersonalInfo';

const GroupMemberTab = ({ groupId }: { groupId: string }) => {
  const { data } = useRbtGroupInfoQuery({ variables: { groupId } });
  const [removeRbtGroupMember] = useRemoveRbtGroupMemberMutation({
    refetchQueries: [{ query: RbtGroupInfoDocument, variables: { groupId } }],
  });
  const handleRemoveMember = useResponseHandler<RemoveRbtGroupMemberMutation>(
    (res) => res.data?.removeRbtGroupMember
  );
  const [addRbtGroupMember, { loading: adding }] = useAddRbtGroupMemberMutation({
    refetchQueries: [{ query: RbtGroupInfoDocument, variables: { groupId } }],
  });
  const handleAddMember = useResponseHandler<AddRbtGroupMemberMutation>(
    (res) => res.data?.addRbtGroupMember
  );
  const formik = useFormik<{ memberName: string; memberNumber: string; groupId: string }>({
    initialValues: { memberName: '', memberNumber: '', groupId },
    onSubmit(values) {
      addRbtGroupMember({ variables: values }).then(handleAddMember);
    },
  });
  return (
    <Box mb={3}>
      {data?.groupInfo?.note ? (
        <Text py={4} fontSize={2} color="lightText">
          {data?.groupInfo?.note}
        </Text>
      ) : (
        <Box py={3}>
          {(data?.groupInfo?.members ?? []).map((m) => (
            <Flex key={m.number} py={1} mb={1}>
              <Box
                onClick={() =>
                  removeRbtGroupMember({ variables: { groupId, memberNumber: m.number } }).then(
                    handleRemoveMember
                  )
                }>
                <Icon name="stop" color={ICON_GRADIENT_1} size={16} />
              </Box>
              <Text ml={4} width={160} fontSize={2} fontWeight="bold" color="normalText">
                {m.number}
              </Text>
              <Text fontSize={2} color="lightText">
                {m.name}
              </Text>
            </Flex>
          ))}
          <form onSubmit={formik.handleSubmit}>
            <Flex my={2} alignItems="center">
              <Input
                width={180}
                mr={2}
                fontSize={2}
                name="memberNumber"
                value={formik.values.memberNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Số điện thoại"
              />
              <Input
                width={200}
                mr={3}
                fontSize={2}
                name="memberName"
                value={formik.values.memberName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Tên"
              />
              <Button type="submit" variant="mutedOutline" disabled={adding}>
                Thêm mới
              </Button>
            </Flex>
          </form>
        </Box>
      )}
    </Box>
  );
};

const TonesTab = ({ groupId }: { groupId: string }) => {
  const { data } = useRbtGroupInfoQuery({ variables: { groupId } });
  const [used, setUsed] = useState<{ [toneCode: string]: boolean }>({});
  const [useAll, setUseAll] = useState(false);
  const [shouldReset, setShouldReset] = useState(false);
  const [setRbtGroupTones] = useSetRbtGroupTonesMutation({
    refetchQueries: [{ query: RbtGroupInfoDocument, variables: { groupId } }],
  });
  const handleSetGroupTones = useResponseHandler<SetRbtGroupTonesMutation>(
    (res) => res.data?.setRbtGroupTones
  );
  useEffect(() => {
    setShouldReset(false);
    setUsed(
      _.fromPairs(
        (data?.groupInfo?.usedTones ?? []).map((usedTone) => [
          usedTone.tone.toneCode,
          usedTone.used,
        ])
      )
    );
  }, [shouldReset]);
  useEffect(() => {
    setUseAll(_.every(_.values(used), _.identity));
  }, [used]);
  const toggleUseAll = useCallback(() => {
    setUsed(
      _.fromPairs(
        (data?.groupInfo?.usedTones ?? []).map((usedTone) => [usedTone.tone.toneCode, !useAll])
      )
    );
  }, [data, useAll]);
  const save = useCallback(() => {
    setRbtGroupTones({
      variables: {
        rbtCodes: _.map(
          _.filter(_.toPairs(used), ([k, v]) => v),
          ([k, v]) => k
        ),
        groupId,
      },
    }).then(handleSetGroupTones);
  }, [groupId, handleSetGroupTones, setRbtGroupTones, used]);
  const toggleItem = (toneCode: string) => () => {
    setUsed({ ...used, [toneCode]: !used[toneCode] });
  };
  const empty = <Icon name="round" size={16} color="emptyCheckBox" />;
  const checked = <Icon name="check" size={16} color={ICON_GRADIENT_1} />;

  return (
    <Section>
      <ListItem
        title="Nhạc chờ"
        value="Hết hạn"
        titleWidth={1 / 2}
        fontWeight="bold"
        iconPadding={3}
        icon={<Box onClick={toggleUseAll}>{useAll ? checked : empty}</Box>}
      />
      <Separator />
      {(data?.groupInfo?.usedTones || []).map((t) => (
        <Box key={t.id}>
          <Box onClick={toggleItem(t.tone.toneCode)}>
            <ListItem
              icon={used[t.tone.toneCode] ? checked : empty}
              iconPadding={3}
              title={t.tone.toneName}
              subtitle={t.tone.toneName}
              value={t.tone.availableDateTime}
              titleWidth={1 / 2}
            />
          </Box>
          <Separator />
        </Box>
      ))}
      <Flex flexDirection="row" justifyContent="flex-end" py={3}>
        <Button variant="clear" mr={2} onClick={() => setShouldReset(true)}>
          Reset
        </Button>
        <Button variant="mutedOutline" onClick={save}>
          Lưu
        </Button>
      </Flex>
    </Section>
  );
};
type GroupDetailTabKey = 'member' | 'tones' | 'time';
const GroupDetailTabs: { key: GroupDetailTabKey; text: string }[] = [
  {
    key: 'member',
    text: 'Số điện thoại',
  },
  {
    key: 'tones',
    text: 'Nhạc chờ',
  },
  {
    key: 'time',
    text: 'Thời gian',
  },
];
const TIME_TYPE_DESCRIPTION = {
  [TimeType.Always]: 'Vĩnh viễn',
  [TimeType.Range]: 'Trong khoảng thời gian xác định',
  [TimeType.Daily]: 'Định kỳ hàng ngày',
  [TimeType.Monthly]: 'Định kỳ hàng tháng',
  [TimeType.Yearly]: 'Định kỳ hàng năm',
};
const ALL_TIME_TYPES: ('ALWAYS' | 'DAILY' | 'MONTHLY' | 'YEARLY' | 'RANGE')[] = [
  TimeType.Always,
  TimeType.Range,
  TimeType.Daily,
  TimeType.Monthly,
  TimeType.Yearly,
];
const TimeTab = ({ groupId }: { groupId: string }) => {
  const { data } = useRbtGroupInfoQuery({ variables: { groupId } });
  const [used, setUsed] = useState<'ALWAYS' | 'DAILY' | 'MONTHLY' | 'YEARLY' | 'RANGE'>();
  const empty = <Icon name="round" size={16} color="emptyCheckBox" />;
  const checked = <Icon name="check" size={16} color={ICON_GRADIENT_1} />;
  useEffect(() => {
    //setShouldReset(false);
    ALL_TIME_TYPES.map((type) => {
      if(data?.groupInfo?.timeSetting?.timeType === type){
        setUsed(type)
      }
    })
  }, [data]);
  const toggleItem = (time_period: 'ALWAYS' | 'DAILY' | 'MONTHLY' | 'YEARLY' | 'RANGE') => () => {
    setUsed(time_period);
  };
  // TODO: set group time
  return (
    <Section pb={4}>
      {ALL_TIME_TYPES.map((type) => (
        <Box key={type} onClick={toggleItem(type)}>
          <ListItem
            py={3}
            icon={
              type === used ? checked : empty
            }
            iconPadding={3}
            title={TIME_TYPE_DESCRIPTION[type]}
            titleWidth={1}
          />
        </Box>
      ))}
    </Section>
  );
};

const GroupDetail = ({ groupId, close }: { groupId: string; close: () => void }) => {
  const [selectedTab, setSelectedTab] = useState<GroupDetailTabKey>('member');
  return (
    <Box px={5} bg="defaultBackground" mb={3}>
      <Flex justifyContent="space-between" py={2} alignItems="center">
        <SelectionBarItems<GroupDetailTabKey>
          fontSize={2}
          selectedKey={selectedTab}
          items={GroupDetailTabs}
          onSelected={(i) => setSelectedTab(i.key)}
          py={1}
        />
        <Button variant="secondary" onClick={close}>
          Hoàn thành
        </Button>
      </Flex>
      <Separator />
      {selectedTab === 'member' ? (
        <GroupMemberTab groupId={groupId} />
      ) : selectedTab === 'tones' ? (
        <TonesTab key={groupId} groupId={groupId} />
      ) : selectedTab === 'time' ? (
        <TimeTab groupId={groupId} />
      ) : null}
    </Box>
  );
};

const CallGroup = (props: { name: string; id: string }) => {
  const [expanded, setExpanded] = useState(false);

  const [deleteRbtGroup] = useDeleteRbtGroupMutation({
    refetchQueries: [{ query: CallGroupsDocument }],
  });
  const handleDeleteGroup = useResponseHandler<DeleteRbtGroupMutation>(
    (res) => res.data?.deleteRbtGroup
  );
  return (
    <Box>
      <Flex
        flexDirection="row"
        alignItems="center"
        minHeight={59}
        onClick={() => setExpanded(!expanded)}>
        <Icon name="albums" size={16} />
        <Text fontSize={2} fontWeight="bold" mb={1} color="normalText" flex={1} ml={3}>
          {props.name}
        </Text>
        <Flex css={{ cursor: 'pointer' }} px={3} alignItems="center">
          <Icon name="info" color={ICON_GRADIENT_1} size={16} />
          <Text ml={2} fontWeight="bold" fontSize={2} color="normalText">
            Thông tin
          </Text>
        </Flex>
        <Flex
          css={{ cursor: 'pointer' }}
          px={3}
          alignItems="center"
          onClick={(e) => {
            e.stopPropagation();
            deleteRbtGroup({ variables: { groupId: props.id } }).then(handleDeleteGroup);
          }}>
          <Icon name="cross" color="red" size={16} />
          <Text ml={2} fontWeight="bold" fontSize={2} color="normalText">
            Xóa
          </Text>
        </Flex>
      </Flex>
      {expanded && <GroupDetail groupId={props.id} close={() => setExpanded(false)} />}
    </Box>
  );
};

type GroupRbtTabKey = 'new' | 'list';
const GroupRbtTabs: { key: GroupRbtTabKey; text: string }[] = [
  {
    key: 'new',
    text: 'Tạo nhóm mới',
  },
  {
    key: 'list',
    text: 'Danh sách nhóm',
  },
];

const NewGroupForm = () => {
  const [createRbtGroup, { loading }] = useCreateRbtGroupMutation({
    refetchQueries: [{ query: CallGroupsDocument }],
  });
  const handleCreateRbtGroup = useResponseHandler<CreateRbtGroupMutation>(
    (res) => res.data.createRbtGroup
  );
  const formik = useFormik<{ groupName: string }>({
    initialValues: {
      groupName: '',
    },
    onSubmit: (values) => {
      createRbtGroup({ variables: values }).then(handleCreateRbtGroup).catch(console.error);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box mx={35} my={5} css={{ '.birthday': { width: '100%' } }}>
        <Label htmlFor="groupName">Tên nhóm</Label>
        <Input
          id="groupName"
          name="groupName"
          placeholder="Tên nhóm"
          mb={3}
          value={formik.values.groupName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Flex flexDirection="row" justifyContent="flex-end" alignItems="center">
          <Button variant="clear" mr={4} onClick={formik.handleReset} disabled={loading}>
            Hủy
          </Button>
          <Button variant="secondary" type="submit" disabled={loading}>
            Lưu thay đổi
          </Button>
        </Flex>
      </Box>
    </form>
  );
};

export default function RbtGroupPage() {
  const { data,loading } = useCallGroupsQuery();
  const [selectedTab, setSelectedTab] = useState<GroupRbtTabKey>('new');
  const theme = useTheme<Theme>();
  useEffect(() => {
    const loading_screen = document.getElementById('ipl-progress-indicator')
    loading_screen.classList.remove('available')
    if(!loading)
    {
      setTimeout(() => {
        loading_screen.classList.add('available')
      }, 500)
    }
  },[loading]);
  return (
    <PersonalSplitView title="Nhạc chờ cho nhóm">
      <Box m={35}>
        <Flex
          justifyContent="space-around"
          py={2}
          alignItems="center"
          css={{ position: 'relative' }}>
          <SelectionBarItems<GroupRbtTabKey>
            flex={1}
            fontSize={2}
            selectedColor="normalText"
            selectedKey={selectedTab}
            items={GroupRbtTabs}
            onSelected={(i) => setSelectedTab(i.key)}
            py={1}
          />
          <Box
            className="000"
            css={{
              background: theme.colors.gradients[0],
              height: 4,
              width: '50%',
              position: 'absolute',
              left: selectedTab === 'new' ? 0 : '50%',
              transition: 'left 500ms ease-out',
              bottom: 0,
            }}
          />
        </Flex>
        {selectedTab === 'new' ? (
          <NewGroupForm />
        ) : (
          (data?.myRbt?.callGroups ?? []).map((g) => (
            <Box key={g.id}>
              <CallGroup {...g} />
              <Separator />
            </Box>
          ))
        )}
      </Box>
    </PersonalSplitView>
  );
}
