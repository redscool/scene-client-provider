import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

export default function LockImage({style}) {
  return (
    <Svg
      width={112}
      height={112}
      viewBox="0 0 112 112"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}>
      <Circle opacity={0.2} cx={56} cy={56} r={56} fill="#E1FF41" />
      <Circle opacity={0.5} cx={56} cy={56} r={48} fill="#E1FF41" />
      <Circle cx={56} cy={56} r={40} fill="#E1FF41" />
      <Circle cx={56} cy={56} r={32} fill="#1E1E1E" />
      <Path
        d="M56.444 57.889V61m-7.777-10.066c.733-.045 1.637-.045 2.8-.045h9.955c1.163 0 2.067 0 2.8.045m-15.555 0c-.916.056-1.565.181-2.119.464a4.666 4.666 0 00-2.04 2.039C44 54.435 44 55.742 44 58.356v2.177c0 2.614 0 3.92.509 4.919a4.666 4.666 0 002.039 2.04c.998.508 2.305.508 4.919.508h9.955c2.614 0 3.92 0 4.919-.509a4.665 4.665 0 002.04-2.039c.508-.998.508-2.305.508-4.919v-2.177c0-2.614 0-3.92-.509-4.92a4.665 4.665 0 00-2.04-2.038c-.553-.283-1.203-.409-2.118-.464m-15.555 0v-3.156a7.778 7.778 0 1115.555 0v3.156"
        stroke="#F0F0F0"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
