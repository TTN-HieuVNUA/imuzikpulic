import { useMemo } from 'react';

import { Collection } from '../components/Player/Provider';

export const useCollection = (
  name: string,
  songs?: {
    edges: {
      node: {
        id: string;
        name: string;
        fileUrl: string;
        singers: { alias?: string | null }[];
        imageUrl?: string | null;
      };
    }[];
  }
) =>
  useMemo(
    (): Collection => ({
      name,
      playables: (songs?.edges ?? []).map(({ node: item }) => ({
        id: item.id,
        title: item.name,
        sources: [item.fileUrl],
        artist: item.singers
          .filter((s) => s.alias)
          .map((s) => s.alias)
          .join(' - '),
        image: item.imageUrl,
        meta: {
          id: item.id,
        },
      })),
    }),
    [name, songs]
  );
