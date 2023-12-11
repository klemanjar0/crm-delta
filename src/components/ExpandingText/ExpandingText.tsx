import React, { CSSProperties } from 'react';
import './ExpandingText.sass';

interface Props {
  text: string;
  active?: boolean;
  size: 'small' | 'medium' | 'large' | 'x-large' | 'xx-large' | 'xxx-large';
  color: string;
  fontWeight: number;
  onClick?: () => void;
  className?: string;
}

const ExpandingText: React.FC<Props> = (props) => {
  const { text, size, color, active = true, fontWeight, onClick, className = '' } = props;

  const styles: CSSProperties = {
    color,
    opacity: active ? 1 : 0.6,
    fontWeight,
    cursor: onClick ? 'pointer' : undefined,
  };

  return (
    <span onClick={onClick} style={styles} className={`expanding-text ${size} ${className}`}>
      {text}
    </span>
  );
};

export default ExpandingText;
