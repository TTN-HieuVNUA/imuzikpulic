import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import { useAuthenticateMutation } from '../src/queries';
import { Flex } from '../src/rebass';

export default function AutoLoginPage() {
  const router = useRouter();
  const [login] = useAuthenticateMutation();
  useEffect(() => {
    login().then(() => {
      location.href = router.query.r as string;
    });
  }, [login, router.query.r]);
  return (
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <BeatLoader size={10} color="#7D8FA9" />
    </Flex>
  );
}
