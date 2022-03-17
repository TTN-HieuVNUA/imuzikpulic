import React from 'react';
import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

export const SongLink = ({ slug, ...props }: PropsWithChildren<{ slug?: string | null }>) => (
  <Link to={slug ? `/bai-hat/${slug}` : '#'} {...props} />
);
