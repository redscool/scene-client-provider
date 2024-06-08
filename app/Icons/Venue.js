import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function Venue({color, size, style}) {
  return (
    <Svg
      width={size}
      height={(24 * size) / 19}
      viewBox="0 0 19 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}>
      <Path
        d="M3.263 10.54h12.423a.23.23 0 00.154-.4l-5.397-4.852a1.427 1.427 0 00-.561-.307V3.406l2.55-1.165a.266.266 0 000-.485L9.882.59V.406a.406.406 0 00-.812 0V4.98c-.202.06-.395.158-.56.307l-5.4 4.853a.228.228 0 00.153.398zM18.922 22.988L15.946 11.38H3.002L.026 22.988A.809.809 0 00.81 24h5.796c.148 0 .281-.09.335-.229l2.196-5.565a.359.359 0 01.336-.229c.148 0 .282.09.336.229l2.197 5.565a.36.36 0 00.335.23h5.797a.81.81 0 00.783-1.013z"
        fill={color}
      />
    </Svg>
  );
}
