import React from 'react';
import { Box } from 'rebass';

import { ActivePackage, AvailablePackage } from '../components/Package';

export default {
  title: 'Package',
  component: ActivePackage,
};

export const Active = () => (
  <Box bg="defaultBackground" p={5}>
    <ActivePackage
      name="Gói tháng"
      price="9.000đ/tháng"
      description="2500đ/tuần đầu tiên, 5000đ/các tuần tiếp theo, đã bao gồm VAT - Tải nhạc chờ không giới hạn"
    />
  </Box>
);

export const Available = () => (
  <Box bg="defaultBackground" p={5}>
    <AvailablePackage
      name="Gói tháng"
      price="9.000đ/tháng"
      description="2500đ/tuần đầu tiên, 5000đ/các tuần tiếp theo, đã bao gồm VAT - Tải nhạc chờ không giới hạn"
    />
  </Box>
);
