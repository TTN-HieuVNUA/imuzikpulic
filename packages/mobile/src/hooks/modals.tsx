import React, { useMemo, useState } from 'react';

import { ModalName } from './modal-names';

const ModalsContext = React.createContext<{
  isVisible: (modal: ModalName) => boolean;
  isEverVisible: (modal: ModalName) => boolean;
  show: (modal: ModalName, params?: object) => void;
  params: (modal: ModalName) => object | null;
  pop: () => void;
  popAll: () => void;
  hasModalShown: boolean;
} | null>(null);

export const useModals = () => React.useContext(ModalsContext);

const DEFAULT = {
  notification: false,
  search: false,
  vip: false,
  player: false,
  playlist: false,
  rbt: false,
  login: false,
  popup: false,
};

export const ModalsProvider = (props: React.PropsWithChildren<object>) => {
  const [modalParams, setModalParams] = useState<Record<ModalName, boolean | object>>(DEFAULT);
  const [everVisible, setEverVisible] = useState<Record<ModalName, boolean>>(DEFAULT);
  const [modalStack, setModalStack] = useState<ModalName[]>([]);

  const value = useMemo(() => {
    return {
      isVisible: (modal: ModalName) => !!modalParams[modal],
      isEverVisible: (modal: ModalName) => everVisible[modal],
      show: (modal: ModalName, params?: object) => {
        if (!modalParams[modal]) {
          setModalParams({ ...modalParams, [modal]: params ?? true });
          setEverVisible({ ...everVisible, [modal]: true });
          setModalStack([...modalStack, modal]);
        } else {
          console.warn(`Show ${modal} more than once!`);
        }
      },
      params(modal: ModalName) {
        const params = modalParams[modal];
        if (params === true) return {};
        return params || null;
      },
      pop() {
        if (modalStack.length > 0) {
          const modal = modalStack[modalStack.length - 1];
          setModalParams({ ...modalParams, [modal]: false });
          setModalStack(modalStack.slice(0, -1));
        }
      },
      popAll() {
        setModalParams(DEFAULT);
        setModalStack([]);
      },
      hasModalShown: modalStack.length > 0,
    };
  }, [everVisible, modalParams, modalStack]);
  return <ModalsContext.Provider value={value} {...props} />;
};
