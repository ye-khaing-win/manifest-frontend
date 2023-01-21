import React from 'react';
import Form from '../../../components/form/Form/Form';
import useInput from '../../../hooks/useInput';
import * as validators from '../../../utilities/validators';

const FormCommodity = ({
  currentShipCode = {},
  request,
  actions,
  onHideForm,
}) => {
  const code = useInput(
    'Ship Code',
    currentShipCode.code,
    validators.validateIsEmpty
  );

  const name = useInput(
    'Shipping Line',
    currentShipCode.name,
    validators.validateIsEmpty
  );

  const formGroups = [
    {
      direction: 'cross',
      inputs: [
        { ...code, field: 'code' },
        { isSeparator: true, direction: 'main' },
        { ...name, field: 'name' },
      ],
    },
  ];

  return (
    <Form
      currentItem={currentShipCode}
      formGroups={formGroups}
      request={request}
      actions={actions}
      onHideForm={onHideForm}
    />
  );
};

export default FormCommodity;
