import React, { useEffect, useState } from 'react';
import { IoChevronForward } from 'react-icons/io5';

import './RegisterPage.styles.sass';
import { useTranslate } from '../../../../locale';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { registerRequest, resetAuthError } from '../../redux/reducer.ts';
import Spinner from '../../../../components/Spinner/Spinner.tsx';
import { colors } from '../../../../theme/colors.ts';
import { Box, Center, HStack, Text, VStack } from '@chakra-ui/react';
import { showToast } from '../../../../utils/utility.tsx';

const initialUserState = { email: '', password: '', role: 'regular' };

const RegisterPage: React.FC = () => {
  const t = useTranslate();
  const dispatch = useDispatch();

  const fetching = useSelector((state: RootState) => state.auth.fetching);
  const error = useSelector((state: RootState) => state.auth.error);

  const [user, setUser] = useState<typeof initialUserState>(initialUserState);

  const onChange = (e: any) => {
    setUser((user) => ({ ...user, [e.target.name]: e.target.value }));
  };

  const onSubmit = () => {
    if (fetching) {
      return;
    }

    if (user.email.toLowerCase() !== 'admin') {
      showToast('Only admin can register a user');
      return;
    }

    dispatch(registerRequest(user));
    setUser(initialUserState);
  };

  useEffect(() => {
    dispatch(resetAuthError());
  }, []);

  return (
    <Box w="100%" className="container-register">
      <Center mb={2}>
        <Text>Create new account</Text>
      </Center>
      <VStack w="100%">
        <input
          placeholder={t('pages.signIn.email')}
          key="email"
          name="email"
          type="text"
          value={user.email}
          onInput={onChange}
        />
        <input
          placeholder={t('pages.signIn.password')}
          key="password"
          name="password"
          type="password"
          value={user.password}
          onInput={onChange}
        />
        <span>{`User Role: ${user.role}`}</span>
      </VStack>

      <div className="top-container">
        <button className="button" disabled={fetching}>
          <HStack onClick={onSubmit}>
            <span>{t('misc.submit')}</span>
            {fetching ? <Spinner size={60} /> : <IoChevronForward style={{ fontSize: 22 }} />}
          </HStack>
        </button>
      </div>

      {error ? <span style={{ color: colors.sunsetOrange }}>{error}</span> : null}
    </Box>
  );
};

export default RegisterPage;
