import {useActionSheet} from '@expo/react-native-action-sheet';
import {useRoute} from '@react-navigation/native';
import _ from 'lodash';
import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, TouchableOpacity} from 'react-native';

import {
    AddMemberCard,
    Header,
    Icon,
    ICON_GRADIENT_1,
    ListItem,
    Section,
    Separator,
    TabBar,
} from '../../../src/components';
import {
    RbtGroupInfoDocument,
    TimeType,
    useAddRbtGroupMemberMutation,
    useCallGroupsQuery,
    useRbtGroupInfoQuery,
    useRemoveRbtGroupMemberMutation,
    useSetRbtGroupTonesMutation,
} from '../../../src/queries';
import {Box, Button, Flex, Text} from '../../../src/rebass';
import {Modal} from '../../platform/Modal';
import Title from '../../platform/Title';
import {useGoBack} from '../../platform/go-back';

type Tabs = 'phones' | 'tones' | 'time';
const PhonesTab = ({groupId}: { groupId: string }) => {
    const {data, loading} = useRbtGroupInfoQuery({variables: {groupId}});
    const {showActionSheetWithOptions} = useActionSheet();
    const [modalVisible, setModalVisible] = useState(false);
    const [removeRbtGroupMember] = useRemoveRbtGroupMemberMutation({
        refetchQueries: [{query: RbtGroupInfoDocument, variables: {groupId}}],
    });
    const [addRbtGroupMember, {loading: adding}] = useAddRbtGroupMemberMutation({
        refetchQueries: [{query: RbtGroupInfoDocument, variables: {groupId}}],
    });
    const [newPhone, setNewPhone] = useState('');
    const [newName, setNewName] = useState('');
    const onMemberPress = (memberNumber: string) => () =>
        showActionSheetWithOptions(
            {
                options: ['Xóa', 'Thôi'],
                cancelButtonIndex: 1,
                destructiveButtonIndex: 0,
            },
            (selected) => {
                if (selected === 0) {
                    removeRbtGroupMember({
                        variables: {memberNumber, groupId},
                    }).then(({data}) => {
                        alert(data?.removeRbtGroupMember.message); //TODO: alert
                    });
                }
            }
        );
    if (loading)
        return (
            <Box m={3}>
                <ActivityIndicator size="large" color="primary"/>
            </Box>
        );
    return data?.groupInfo?.note ? (
        <Section my={5}>
            <Text fontSize={2} textAlign="center">
                {data?.groupInfo?.note}
            </Text>
        </Section>
    ) : (
        <Section my={4}>
            <ListItem title="Số điện thoại" value="Tên" titleWidth={1 / 3} fontWeight="bold"/>
            <Separator/>
            {(data?.groupInfo?.members || []).map((m) => (
                <Box key={m.id}>
                    <ListItem
                        title={m.number}
                        value={m.name}
                        titleWidth={1 / 3}
                        showEllipsis="visible"
                        onEllipsisClick={onMemberPress(m.number)}
                    />
                    <Separator/>
                </Box>
            ))}
            <Button size="medium" variant="outline" my={5} onPress={() => setModalVisible(true)}>
                Thêm mới
            </Button>
            <Modal animationType="slide" transparent visible={modalVisible}>
                <Box px={3} pt={190} position="relative">
                    <AddMemberCard
                        disabled={adding}
                        onCancel={() => setModalVisible(false)}
                        name={newName}
                        setName={setNewName}
                        phone={newPhone}
                        setPhone={setNewPhone}
                        onAdd={() => {
                            addRbtGroupMember({
                                variables: {
                                    groupId,
                                    memberName: newName,
                                    memberNumber: newPhone,
                                },
                            }).then(({data}) => {
                                alert(data?.addRbtGroupMember.message); //TODO: alert
                                if (data?.addRbtGroupMember.success) {
                                    setNewName('');
                                    setNewPhone('');
                                    setModalVisible(false);
                                }
                            });
                        }}
                    />
                </Box>
            </Modal>
        </Section>
    );
};
const TonesTab = ({groupId}: { groupId: string }) => {
    const {data} = useRbtGroupInfoQuery({variables: {groupId}});
    const [used, setUsed] = useState<{ [toneCode: string]: boolean }>({});
    const [useAll, setUseAll] = useState(false);
    const [shouldReset, setShouldReset] = useState(false);
    const [setRbtGroupTones] = useSetRbtGroupTonesMutation({
        refetchQueries: [{query: RbtGroupInfoDocument, variables: {groupId}}],
    });
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
    }, [data?.groupInfo?.usedTones, shouldReset]);
    useEffect(() => {
        setUseAll(_.every(_.values(used), _.identity));
    }, [used]);
    const toggleUseAll = useCallback(() => {
        setUsed(
            _.fromPairs(
                (data?.groupInfo?.usedTones ?? []).map((usedTone) => [usedTone.tone.toneCode, !useAll])
            )
        );
    }, [data?.groupInfo?.usedTones, useAll]);
    const save = useCallback(() => {
        setRbtGroupTones({
            variables: {
                rbtCodes: _.map(
                    _.filter(_.toPairs(used), ([_k, v]) => v),
                    ([k, _v]) => k
                ),
                groupId,
            },
        }).then((res) => alert(res.data?.setRbtGroupTones.message));
    }, [groupId, setRbtGroupTones, used]);
    const toggleItem = (toneCode: string) => () => {
        setUsed({...used, [toneCode]: !used[toneCode]});
    };
    const checked = <Icon name="check" size={16} color={ICON_GRADIENT_1}/>;
    const unchecked = <Icon name="round" size={16} color="emptyCheckBox"/>;

    return (
        <Section my={4}>
            <Flex flexDirection="row" justifyContent="flex-end">
                <Button mr={2} width={1 / 5} onPress={() => setShouldReset(true)}>
                    Reset
                </Button>
                <Button variant="primary" onPress={save} width={1 / 5}>
                    Save
                </Button>
            </Flex>
            <ListItem
                title="Nhạc chờ"
                value="Hết hạn"
                titleWidth={1 / 2}
                fontWeight="bold"
                iconPadding={3}
                icon={
                    <TouchableOpacity onPress={toggleUseAll}>{useAll ? checked : unchecked}</TouchableOpacity>
                }
            />
            <Separator/>
            {(data?.groupInfo?.usedTones || []).map((t) => (
                <Box key={t.id}>
                    <TouchableOpacity onPress={toggleItem(t.tone.toneCode)}>
                        <ListItem
                            icon={used[t.tone.toneCode] ? checked : unchecked}
                            iconPadding={3}
                            title={t.tone.toneName}
                            subtitle={t.tone.toneName}
                            value={t.tone.availableDateTime}
                            titleWidth={1 / 2}
                        />
                    </TouchableOpacity>
                    <Separator/>
                </Box>
            ))}
        </Section>
    );
};

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
const TimeTab = ({groupId}: { groupId: string }) => {
    const {data} = useRbtGroupInfoQuery({variables: {groupId}});
    // const { showActionSheetWithOptions } = useActionSheet();
    // const onMemberPress = (memberNumber: string) => () =>
    //   showActionSheetWithOptions(
    //     {
    //       options: ['Xóa', 'Thôi'],
    //       cancelButtonIndex: 1,
    //       destructiveButtonIndex: 0,
    //     },
    //     (selected) => {
    //       console.log(selected, memberNumber);
    //       if (selected === 0) {
    //       }
    //     }
    //   );
    const [nameTick, setNameTick] = useState(true);
    const [typeTick, setTypeTick] = useState('ALWAYS');
    const changeIcon = (type: string) => () => {
        // console.log(type);
        setTypeTick(type);
        setNameTick(true);
    };
    // TODO: set group time
    return (
        <Section my={4}>
            {ALL_TIME_TYPES.map((type) => (
                <Box key={type}>
                    <ListItem
                        icon={
                            // data?.groupInfo?.timeSetting?.timeType === type &&
                            typeTick === type && nameTick ? (
                                <Icon name="check" size={16} color={ICON_GRADIENT_1}/>
                            ) : (
                                <Icon name="round" size={16} color="emptyCheckBox"/>
                            )
                        }
                        onIconClick={changeIcon(type)}
                        iconPadding={3}
                        title={TIME_TYPE_DESCRIPTION[type]}
                        titleWidth={1}
                    />
                    <Separator/>
                </Box>
            ))}
        </Section>
    );
};

export default function RbtGroupScreen() {
    const route: { params?: { groupId?: string } } = useRoute();
    return <RbtGroupScreenBase groupId={route.params?.groupId ?? ''}/>;
}

export function RbtGroupScreenBase({groupId}: { groupId: string }) {
    const [activeTab, setActiveTab] = useState<Tabs>('phones');
    const {data} = useCallGroupsQuery();
    const groupName = (data?.myRbt?.callGroups ?? []).find((g) => g.id === groupId)?.name;
    const goBack = useGoBack();
    return (
        <Box bg="defaultBackground" flex={1}>
            <Title>{groupName}</Title>
            <Header leftButton="back" title={groupName}/>
            <Section>
                <TabBar indicator="long" fontSize={3}>
                    <TabBar.Item
                        title="Số điện thoại"
                        isActive={activeTab === 'phones'}
                        onPress={() => setActiveTab('phones')}
                    />
                    <TabBar.Item
                        title="Nhạc chờ"
                        isActive={activeTab === 'tones'}
                        onPress={() => setActiveTab('tones')}
                    />
                    <TabBar.Item
                        title="Thời gian"
                        isActive={activeTab === 'time'}
                        onPress={() => setActiveTab('time')}
                    />
                </TabBar>
            </Section>
            <Flex flex={1}>
                {activeTab === 'phones' ? (
                    <PhonesTab groupId={groupId as string}/>
                ) : activeTab === 'tones' ? (
                    <TonesTab groupId={groupId as string}/>
                ) : activeTab === 'time' ? (
                    <TimeTab groupId={groupId as string}/>
                ) : null}
            </Flex>
            <Box mb={5} mt={2} mx={3} >
                {activeTab === 'phones' ? (
                    <Button size="large" variant="secondary" onPress={() => setActiveTab('tones')}>
                        CHỌN NHẠC CHỜ
                    </Button>
                ) : activeTab === 'tones' ? (
                    <Flex flexDirection="row" justifyContent="space-between">
                        <Button
                            size="large"
                            width={0.48}
                            onPress={() => setActiveTab('phones')}
                            variant="muted">
                            QUAY LẠI
                        </Button>
                        <Button
                            size="large"
                            width={0.48}
                            variant="secondary"
                            onPress={() => setActiveTab('time')}>
                            CHỌN THỜI GIAN
                        </Button>
                    </Flex>
                ) : activeTab === 'time' ? (
                    <Flex flexDirection="row" justifyContent="space-between">
                        <Button size="large" width={0.48} onPress={() => setActiveTab('tones')} variant="muted">
                            QUAY LẠI
                        </Button>
                        <Button size="large" width={0.48} variant="secondary" onPress={goBack}>
                            HOÀN THÀNH
                        </Button>
                    </Flex>
                ) : null}
            </Box>
        </Box>
    );
}
