import React from 'react';
import Form from '../../../components/form/Form/Form';
import useInput from '../../../hooks/useInput';
import * as validators from '../../../utilities/validators';

const FormHsCode = ({ currentHsCode = {}, request, actions, onHideForm }) => {
  const hsCode = useInput(
    'HS Code',
    currentHsCode.hsCode,
    validators.validateFixedLength(4)
  );

  const name = useInput('Name', currentHsCode.name, validators.validateIsEmpty);

  const description = useInput(
    'Description',
    currentHsCode.description,
    validators.validateIsEmpty
  );

  const formGroups = [
    {
      direction: 'cross',
      inputs: [
        { ...hsCode, field: 'hsCode' },
        { isSeparator: true, direction: 'main' },
        { ...name, field: 'name' },
        { isSeparator: true, direction: 'main' },
        { ...description, field: 'description', type: 'textarea' },
      ],
    },
  ];

  return (
    <Form
      currentItem={currentHsCode}
      formGroups={formGroups}
      request={request}
      actions={actions}
      onHideForm={onHideForm}
    />
  );
};

export default FormHsCode;
