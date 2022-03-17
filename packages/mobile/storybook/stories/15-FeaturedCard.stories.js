import { storiesOf } from '@storybook/react-native';
import { subMinutes } from 'date-fns';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { FeaturedCard } from '../../src/components';
import { Box } from '../../src/rebass';
import { darkTheme, lightTheme } from '../../src/themes';

const fakeDate1 = subMinutes(new Date(), 60);

storiesOf('FeaturedCard', module)
  .add('Dark', () => (
    <ThemeProvider theme={darkTheme}>
      <Box bg="defaultBackground" p={2}>
        <FeaturedCard
          time={fakeDate1}
          image="https://sohanews.sohacdn.com/thumb_w/660/2020/3/15/photo-1-1584256702578674647209-crop-15842567774431431189564.jpg"
          title="Anh hiểu không-HariWon"
          description="“Anh hiểu không” thuộc thể loại balad trữ tình với ca từ lẫn giai điệu nhẹ nhàng, sâu lắng. Nội dung bài hát là câu chuyện kể về nỗi lòng của cô gái trong tình yêu"
        />
      </Box>
      <Box bg="defaultBackground" p={2}>
        <FeaturedCard
          time={fakeDate1}
          image="https://sohanews.sohacdn.com/thumb_w/660/2020/3/15/photo-1-1584256702578674647209-crop-15842567774431431189564.jpg"
          title="Anh hiểu không-HariWon"
          description="“Anh hiểu không” thuộc thể loại balad trữ tình với ca từ lẫn giai điệu nhẹ nhàng, sâu lắng. Nội dung bài hát là câu chuyện kể về nỗi lòng của cô gái trong tình yêu"
        />
      </Box>
    </ThemeProvider>
  ))
  .add('Light', () => (
    <ThemeProvider theme={lightTheme}>
      <Box bg="defaultBackground" p={2}>
        <FeaturedCard
          time={fakeDate1}
          image="https://sohanews.sohacdn.com/thumb_w/660/2020/3/15/photo-1-1584256702578674647209-crop-15842567774431431189564.jpg"
          title="Anh hiểu không-HariWon"
          description="“Anh hiểu không” thuộc thể loại balad trữ tình với ca từ lẫn giai điệu nhẹ nhàng, sâu lắng. Nội dung bài hát là câu chuyện kể về nỗi lòng của cô gái trong tình yêu"
        />
      </Box>
      <Box bg="defaultBackground" p={2}>
        <FeaturedCard
          time={fakeDate1}
          image="https://sohanews.sohacdn.com/thumb_w/660/2020/3/15/photo-1-1584256702578674647209-crop-15842567774431431189564.jpg"
          title="Anh hiểu không-HariWon"
          description="“Anh hiểu không” thuộc thể loại balad trữ tình với ca từ lẫn giai điệu nhẹ nhàng, sâu lắng. Nội dung bài hát là câu chuyện kể về nỗi lòng của cô gái trong tình yêu"
        />
      </Box>
    </ThemeProvider>
  ));
