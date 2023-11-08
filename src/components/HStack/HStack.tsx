import React, { CSSProperties, PropsWithChildren } from 'react';
import './HStack.styles.sass';

interface Props extends PropsWithChildren {
  style?: CSSProperties;
  onClick: () => void;
}

const HStack: React.FC<Props> = (props) => {
  return (
    <div onClick={props.onClick} style={props.style}>
      {props.children}
    </div>
  );
};

export default HStack;
