import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Button = ({ onPress, children, name }) => {
  const { buttonStyle, fontStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <FontAwesome name={name} size={25} style={fontStyle} />

    </TouchableOpacity>
  );
};

const styles = {
  fontStyle: {
    alignSelf: 'center',
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
    marginLeft: 5,
    marginRight: 5
  }
};

export default Button;
