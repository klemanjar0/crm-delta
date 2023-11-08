import React, { CSSProperties, PropsWithChildren } from 'react';
import './HStack.styles.sass';

interface Props extends PropsWithChildren {
  style: CSSProperties;
}

const HStack: React.FC<Props> = (props) => {
  return <div style={props.style}>{props.children}</div>;
};

export default HStack;
