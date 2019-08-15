import React from 'react';
import { TextInput } from './UI/Text';

const titleInput  = props => {
  return (
    <TextInput
      placeholder="Title"
      value={props.title}
      onChangeText={props.onChangeText}
    />
  );
};

export default titleInput;
