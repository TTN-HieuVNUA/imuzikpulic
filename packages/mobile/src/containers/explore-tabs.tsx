import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

import { SelectionBar, SelectionBarItem } from '../components';

export type ExploreTabKey = 'the-loai' | 'ca-sy' | 'nha-cung-cap';
export const exploreTabs: { key: ExploreTabKey; text: string }[] = [
  { key: 'the-loai', text: 'Thể loại' },
  { key: 'ca-sy', text: 'Ca sỹ' },
  { key: 'nha-cung-cap', text: 'Nhà cung cấp' },
];

export const ExploreTabs = (props: { currentTab: ExploreTabKey }) => {
  const router = useRouter();
  const onSelected = useCallback(
    (item: SelectionBarItem<ExploreTabKey>) => {
      router.push(`/${item.key}`);
    },
    [router]
  );
  return (
    <SelectionBar selectedKey={props.currentTab} items={exploreTabs} onSelected={onSelected} />
  );
};
