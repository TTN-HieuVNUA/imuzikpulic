import { useServerSettingsQuery } from '../queries';

export * from './auto-refresh-token';
export * from './collection';
export * from './fetch-more';
export * from './local-storage';
export * from './modal-names';
export * from './modals';
export * from './playlist-order';
export * from './share';
export * from './themes';

export const useVipBrandId = () => {
  const { data } = useServerSettingsQuery();
  return data?.serverSettings.vipBrandId;
};
