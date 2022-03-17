import { LinkProps } from 'react-router-dom';

export const marketingLink = (
  itemType: string | null | undefined,
  itemId: string | null | undefined
): LinkProps => {
  switch (itemType) {
    case 'SINGER':
      return { to: `/ca-sy/${itemId}` };
    case 'SONG':
      return { to: `/bai-hat/${itemId}` };
    case 'GENRE':
      return { to: `/the-loai/${itemId}` };
    case 'TOPIC':
      return { to: `/chu-de/${itemId}` };
    // case 'RBT':
    // case 'REGISTER':

    default:
      return { to: '#' };
  }
};
