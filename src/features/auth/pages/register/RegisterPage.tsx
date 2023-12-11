import React, { useEffect, useState } from 'react';
import { IoChevronForward } from 'react-icons/io5';

import './RegisterPage.styles.sass';
import { useTranslate } from '../../../../locale';
import HStack from '../../../../components/HStack/HStack.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { registerRequest, resetAuthError } from '../../redux/reducer.ts';
import Spinner from '../../../../components/Spinner/Spinner.tsx';
import { colors } from '../../../../theme/colors.ts';

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

    dispatch(registerRequest(user));
    setUser(initialUserState);
  };

  useEffect(() => {
    dispatch(resetAuthError());
  }, []);

  return (
    <div className="container">
      <h2>Create new account</h2>
      <section>
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
      </section>

      <div className="top-container">
        <button className="button" disabled={fetching}>
          <HStack onClick={onSubmit}>
            <span>{t('misc.submit')}</span>
            {fetching ? <Spinner size={60} /> : <IoChevronForward style={{ fontSize: 22 }} />}
          </HStack>
        </button>
      </div>

      {error ? <span style={{ color: colors.sunsetOrange }}>{error}</span> : null}
    </div>
  );
};

export default RegisterPage;
