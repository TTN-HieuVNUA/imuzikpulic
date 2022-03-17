import React from 'react';

import { Footer } from '../components';
import { NavLink } from '../platform/links';
import { useHelpArticleCategoriesQuery } from '../queries';

export const FooterSection = () => {
  const { data } = useHelpArticleCategoriesQuery();
  return (
    <Footer>
      {data?.helpArticleCategories.map((cat) => (
        <NavLink route="/huong-dan/[slug]" params={{ slug: cat.slug }} key={cat.id}>
          <Footer.Item>{cat.name}</Footer.Item>
        </NavLink>
      ))}
    </Footer>
  );
};
