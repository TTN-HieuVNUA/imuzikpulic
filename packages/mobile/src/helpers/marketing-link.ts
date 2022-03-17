import { RouteProps } from '../platform/links';

export const marketingLink = (
  itemType: string | null | undefined,
  itemId: string | null | undefined
): RouteProps => {
  switch (itemType) {
    case 'SINGER':
      return { route: '/ca-sy/[slug]', params: { slug: itemId } };
    case 'SONG':
      return { route: '/bai-hat/[slug]', params: { slug: itemId } };
    case 'GENRE':
      return { route: '/the-loai/[slug]', params: { slug: itemId } };
    case 'TOPIC':
      return { route: '/chu-de/[slug]', params: { slug: itemId } };
    // case 'RBT':
    // case 'REGISTER':

    default:
      return { route: '#' };
  }
};
