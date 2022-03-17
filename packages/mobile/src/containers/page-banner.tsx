import React from 'react';

import { Banner } from '../components';
import { marketingLink } from '../helpers/marketing-link';
import { NavLink } from '../platform/links';
import { usePageBannerQuery } from '../queries';
import { Text } from '../rebass';

export const PageBanner = ({
  page,
  slug,
  take,
}: {
  page: string;
  slug?: string;
  take?: number;
}) => {
  const { data } = usePageBannerQuery({ variables: { page, slug, first: take ?? 5 } });

  return (
    <Banner>
      {(data?.pageBanner?.edges ?? []).map(({ node }) => (
        <NavLink {...marketingLink(node.itemType, node.itemId)} key={node.id}>
          <Banner.Item image={node.fileUrl}>
            <Text fontWeight="bold" fontSize={3} color="white">
              {node.name}
            </Text>
            <Text fontWeight="bold" color="primary" fontSize={2}>
              {node.alterText}
            </Text>
          </Banner.Item>
        </NavLink>
      ))}
    </Banner>
  );
};
