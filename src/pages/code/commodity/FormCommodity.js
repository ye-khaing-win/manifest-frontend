import React from 'react';
import Form from '../../../components/form/Form/Form';
import useInput from '../../../hooks/useInput';
import * as validators from '../../../utilities/validators';

const FormCommodity = ({
  currentCommodity = {},
  request,
  actions,
  onHideForm,
}) => {
  const name = useInput(
    'Name',
    currentCommodity.name,
    validators.validateIsEmpty
  );

  const keywords = useInput(
    'Keywords',
    currentCommodity.keywords?.join(', '),
    validators.validateIsEmpty
  );

  const formGroups = [
    {
      direction: 'cross',
      inputs: [
        { ...name, field: 'name' },
        { isSeparator: true, direction: 'main' },
        { ...keywords, field: 'keywords', type: 'textarea' },
      ],
    },
  ];

  return (
    <Form
      currentItem={currentCommodity}
      formGroups={formGroups}
      request={request}
      actions={actions}
      onHideForm={onHideForm}
    />
  );
};

export default FormCommodity;
