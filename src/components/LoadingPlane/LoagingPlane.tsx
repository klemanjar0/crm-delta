import React from 'react';
import Lottie from 'lottie-react';
import planeAnimation from './assets/plane.json';

const LoadingPlane: React.FC = () => <Lottie animationData={planeAnimation} loop={true} />;

export default LoadingPlane;
