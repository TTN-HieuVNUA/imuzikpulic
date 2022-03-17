import React from 'react';
import { Box } from 'rebass';

import Grid from '../components/Grid';

export default {
  title: 'Grid',
  component: Grid,
};

export const Default = () => (
  <Box bg="defaultBackground" p={5}>
    <Grid
      data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((v) => ({
        title: `Ballad ${v}`,
        description:
          'Ballad bắt nguồn từ dòng nhạc country và folk vì giai điệu chậm, thong thả. Có lẽ ballad nên tự hào vì chính nó là một trong những loại nhạc dùng từ ngữ "sang nhất" - không hoa mỹ, nhưng đủ để tạo cảm hứng; và làm cho người nghe có cảm giác dễ chịu khi thưởng thức.',
        image: 'https://via.placeholder.com/229x155',
      }))}
    />
  </Box>
);
