import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function Plus({color, size, style}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      >
      <Path
        d="M12 22.667V1.333M1.333 12h21.334"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}
