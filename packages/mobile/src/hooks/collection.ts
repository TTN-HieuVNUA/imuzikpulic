import { useMemo } from 'react';
import { Collection } from '../components/Player/Provider';
import { Maybe } from '../queries';

export const useCollection = (
  name?: string | null,
  songs?: {
    edges: {
      node: {
        id: string;
        liked?: Maybe<boolean>;
        name: string;
        fileUrl: string;
        singers: { alias?: string | null }[];
        imageUrl?: string | null;
        slug?: string | null;
      };
    }[];
  }
) =>
  useMemo(
    (): Collection => ({
      name: name ?? '',
      playables: (songs?.edges ?? []).map(({ node: item }) => ({
        id: item.id,
        liked: !!item.liked,
        title: item.name,
        sources: [item.fileUrl],
        artist: item.singers
          .filter((s) => s.alias)
          .map((s) => s.alias)
          .join(' - '),
        image: item.imageUrl,
        slug: item.slug,
      })),
    }),
    [name, songs]
  );
