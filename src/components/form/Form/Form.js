import React from 'react';
import classes from './Form.module.scss';
import Modal from '../../containers/Modal/Modal';
import Button from '../../widgets/Button/Button';
import Action from '../../widgets/Action/Action';
import FormGroup from '../FormGroup/FormGroup';
import { useDispatch } from 'react-redux';
import * as helpers from '../../../utilities/helpers';

const Form = ({ currentItem, formGroups, actions, onHideForm }) => {
  const dispatch = useDispatch();

  const inputs = formGroups.reduce(
    (inputs, formGroup) => [
      ...inputs,
      ...formGroup.inputs.filter((input) => !input.isSeparator),
    ],
    []
  );

  const isFormValid = inputs.reduce(
    (isValid, input) => isValid && input.isValid
  );

  const newItem = inputs.reduce(
    (newItem, input) => ({
      ...newItem,
      [input.field]: input.id
        ? input.id
        : input.value.includes(',')
        ? input.value.split(',').map((v) => v.trim().toUpperCase())
        : input.value,
    }),
    {}
  );

  const updatedItem = inputs.reduce(
    (updatedItem, input) => ({
      ...updatedItem,
      ...(input.isTouched && {
        [input.field]: input.id
          ? input.id
          : input.value.includes(',')
          ? input.value.split(',').map((v) => v.trim().toUpperCase())
          : input.value,
      }),
    }),
    {}
  );

  const touch = () => {
    inputs.forEach((input) => input.touch());
  };

  const reset = () => {
    inputs.forEach((input) => input.reset());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid) return touch();

    if (helpers.isEmptyObj(currentItem)) {
      dispatch(actions.createOne(newItem));
      reset();
    } else {
      dispatch(actions.updateOne(currentItem._id, updatedItem));
      onHideForm();
    }
  };

  return (
    <Modal onHideModal={onHideForm}>
      <form className={classes.form} onSubmit={handleSubmit} tabIndex="0">
        <div className={classes.form__close}>
          <Action icon="icon-close" action="close" onClick={onHideForm} />
        </div>

        <div className={classes.form__controls}>
          {formGroups.map((formGroup, i) => (
            <FormGroup
              key={i}
              direction={formGroup.direction}
              inputs={formGroup.inputs}
            />
          ))}
        </div>

        <Button action="upload" icon="icon-upload" description="Upload" />
      </form>
    </Modal>
  );
};

export default Form;
