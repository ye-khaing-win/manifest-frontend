import React from 'react';
import Input from '../Input/Input';
import classes from './FormGroup.module.scss';
import Separator from '../../widgets/Separator/Separator';

const FormGroup = ({ inputs, direction }) => {
  const formGroupClasses = [classes.form__group];

  direction && formGroupClasses.push(classes[`form__group--${direction}`]);

  return (
    <div className={formGroupClasses.join(' ')}>
      {inputs.map((input, i) =>
        input.isSeparator ? (
          <Separator key={`sep-${i}`} direction={input.direction} />
        ) : (
          <Input key={i} {...input} />
        )
      )}
    </div>
  );
};

export default FormGroup;
