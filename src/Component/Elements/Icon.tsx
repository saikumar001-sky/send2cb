import * as React from 'react';
import {Text, View} from 'react-native';
import kyc from 'assets/svg/kyc.svg';

interface IIconProps {
  size?: number;
  name: string;
  containerStyles?: Object;
  color?: string;
  fill?: string;
  isFill?: boolean;
}

const defaultProps = {
  size: 20,
  color: '#ACADAE',
  isFil: false,
  fill: '#807A7A',
};
const Icon: React.FunctionComponent<IIconProps> = props => {
  const {size, name, containerStyles, color, fill, isFill} = props;
  const getIcon = () => {
    switch (name) {
      case 'kyc':
        return kyc;

      default:
        return null;
    }
  };
  let IconComp = getIcon();
  return (
    <View style={containerStyles}>
      {IconComp ? (
        isFill ? (
          <IconComp width={size} height={size} color={color} fill={fill} />
        ) : (
          <IconComp width={size} height={size} color={color} />
        )
      ) : (
        <Text>Invalid icon</Text>
      )}
    </View>
  );
};
Icon.defaultProps = defaultProps;

export default Icon;
