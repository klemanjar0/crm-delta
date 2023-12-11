import React from 'react';
import { useTranslate } from '../../../../locale';
import './SignInPage.styles.sass';
import ExpandingText from '../../../../components/ExpandingText/ExpandingText.tsx';
import { colors } from '../../../../theme/colors.ts';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

const SignInPage: React.FC = () => {
  const t = useTranslate();
  const navigate = useNavigate();
  const currentRoute = useSelector((state: RootState) => state.router.currentRoute);

  const onLogIn = () => {
    navigate('login');
  };

  const onSignUp = () => {
    navigate('register');
  };

  const isOnLogin = currentRoute.includes('login');
  const isOnRegister = currentRoute.includes('register');
  return (
    <div className="container-sign-in">
      <h1 className="h1-sign-in">Avian</h1>
      <hr className="mb-2" />
      <div className="sign-in-item">
        <ExpandingText
          onClick={onLogIn}
          text={t('pages.signIn.logIn')}
          color={isOnLogin ? colors.black : colors.dolphinIOS}
          size="xxx-large"
          fontWeight={800}
          className={isOnLogin ? 'active' : undefined}
        />
      </div>
      <div className="sign-in-item">
        <ExpandingText
          onClick={onSignUp}
          text={t('pages.signIn.signUp')}
          color={isOnRegister ? colors.black : colors.dolphinIOS}
          size="x-large"
          fontWeight={600}
          className={isOnRegister ? 'active' : undefined}
        />
      </div>

      <Outlet />
    </div>
  );
};

export default SignInPage;
