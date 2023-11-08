import React from 'react';
import { useTranslate } from '../../../../locale';
import './SignInPage.styles.sass';
import ExpandingText from '../../../../components/ExpandingText/ExpandingText.tsx';
import { colors } from '../../../../theme/colors.ts';
import { Outlet, useNavigate } from 'react-router-dom';

const SignInPage: React.FC = () => {
  const t = useTranslate();
  const navigate = useNavigate();

  const onLogIn = () => {
    navigate('login');
  };

  const onSignUp = () => {};

  return (
    <div className="container">
      <ExpandingText
        onClick={onLogIn}
        text={t('pages.signIn.logIn')}
        color={colors.white}
        size="xxx-large"
        fontWeight={800}
      />
      <ExpandingText
        onClick={onSignUp}
        text={t('pages.signIn.signUp')}
        color={colors.gainsboro}
        size="x-large"
        fontWeight={600}
      />

      <Outlet />
    </div>
  );
};

export default SignInPage;
