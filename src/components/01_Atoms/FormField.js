import React from 'react';

import FormErrorMessage from '../Forms/FormErrorMessage';
import FormTextInput from '../Forms/FormTextInput';

export default function FormField({ value, width, onChangeText, ...otherProps }) {
  
  return (
    <React.Fragment>
      <FormTextInput
        value={value}
        onChangeText={onChangeText}
        // onBlur={() => setFieldTouched(name)}
        width={width}
        {...otherProps}
      />
      {/* <FormErrorMessage error={errors[name]} visible={touched[name]} /> */}
    </React.Fragment>
  );
}
