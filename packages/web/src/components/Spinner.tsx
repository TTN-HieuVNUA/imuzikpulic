import { useTheme } from 'emotion-theming';
import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import { CommonProps, LoaderSizeProps } from 'react-spinners/interfaces';
import { Theme } from '../themes';

export const Spinner = (props: Pick<CommonProps & LoaderSizeProps, 'loading' | 'size'>) => {
  const theme = useTheme<Theme>();

  return <BeatLoader color={theme.colors.primary} {...props} />;
};
