import { formatDistanceToNow } from 'date-fns';
import { parseISO } from 'date-fns/esm';
import { vi } from 'date-fns/locale';

import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Text } from 'rebass';
import { Section, useRegisterPackage } from '../components';
import { marketingLink } from '../helpers/marketing-links';
import { useBannerPackagesQuery, usePageBannerQuery } from '../queries';
import Banner from './Banner';

export const BannerPackage = () => {
  const { data } = useBannerPackagesQuery();
  //const lines = data?.bannerPackages?.[0]?.note?.split(/[\n\r]+/) ?? [];
  const lines = data?.bannerPackages?.[0];
  const { register, node } = useRegisterPackage(data?.bannerPackages?.[0]?.brandId);
  return (
    <Section mt={-100} pt={3}>
      <Box
        css={{ position: 'relative', textAlign: 'center', minHeight: 100, cursor: 'pointer' }}
        onClick={() => register()}>
        <Text color="white" fontSize={3} key="ads">
          {lines?.name}
        </Text>
        {/* {_(lines)
          .drop(1)
          .map((text) => (
            <Text color="primary" fontSize={3} key="price">
              {text}
            </Text>
          ))
          .value()} */}
          <Text color="primary" fontSize={3} key="price">
              {lines?.note}
          </Text>
      </Box>
      {node}
    </Section>
  );
};
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
    <Box>
      <Banner autoPlay interval={3000}>
        {(data?.pageBanner?.edges ?? []).map(({ node }) => (
          <Link {...marketingLink(node.itemType, node.itemId)} key={node.id}>
            <div>
              <img src={node.fileUrl} alt="placeholder" />
              <Banner.Content>
                <Text color="white" fontSize={5} mb={2} fontWeight="bold">
                  {node.name}
                </Text>
                <Text color="#B2B2B2" fontSize={3} mb={2}>
                  {node.alterText}
                </Text>
                <Text color="primary" fontSize={2}>
                  {!!node.publishedTime &&
                    formatDistanceToNow(parseISO(node.publishedTime), {
                      addSuffix: true,
                      locale: vi,
                    })}
                </Text>
              </Banner.Content>
            </div>
          </Link>
        ))}
      </Banner>
      <BannerPackage />
    </Box>
  );
};
