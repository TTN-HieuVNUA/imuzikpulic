import { useCallback, useState } from 'react';

import { SelectionBarItem } from '../components';
import { OrderByDirection } from '../queries';

type TabKey = 'download' | 'new';

export const usePlaylistOrder = () => {
  const tabs: { key: TabKey; text: string }[] = [
    { key: 'new', text: 'Mới nhất' },
    { key: 'download', text: 'Tải nhiều nhất' },
  ];
  const [selectedTab, setSelectedTab] = useState<TabKey>('new');
  const orderBy =
    selectedTab === 'download'
      ? { downloadNumber: OrderByDirection.Desc }
      : { updatedAt: OrderByDirection.Desc };
  const onSelected = useCallback((item: SelectionBarItem<TabKey>) => {
    setSelectedTab(item.key);
  }, []);
  return {
    selectionBarProps: {
      selectedKey: selectedTab,
      items: tabs,
      onSelected,
    },
    orderBy,
  };
};
