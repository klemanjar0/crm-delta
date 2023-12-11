import React from 'react';
import Lottie from 'lottie-react';
import spinn from './assets/spinner.json';

interface Props {
  size?: number;
}

const Spinner: React.FC<Props> = (props) => {
  const { size = 60 } = props;

  const style = {
    width: size,
    height: size,
  };

  return <Lottie style={style} animationData={spinn} loop={true} />;
};

export default Spinner;
