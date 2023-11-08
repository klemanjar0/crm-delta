import React, { useState } from 'react';
import { IoChevronForward } from 'react-icons/io5';

import './LoginPage.styles.sass';
import { useTranslate } from '../../../../locale';
import HStack from '../../../../components/HStack/HStack.tsx';

const LoginPage: React.FC = () => {
  const t = useTranslate();

  const [user, setUser] = useState({ username: '', password: '' });

  const onChange = (e: any) => {
    setUser((user) => ({ ...user, [e.target.name]: e.target.value }));
  };

  const onSubmit = () => {};

  return (
    <div className="container">
      <section>
        <input
          placeholder={t('pages.signIn.email')}
          key="username"
          name="username"
          type="text"
          value={user.username}
          onInput={onChange}
        />
        <input
          placeholder={t('pages.signIn.password')}
          key="password"
          name="password"
          type="text"
          value={user.password}
          onInput={onChange}
        />
      </section>

      <div className="top-container">
        <button>
          <HStack onClick={onSubmit}>
            <span>{t('misc.submit')}</span>
            <IoChevronForward style={{ fontSize: 22 }} />
          </HStack>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
