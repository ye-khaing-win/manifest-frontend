export const createDetails = (item) => {
  return {
    crossDetails: [
      {
        label: 'HS Code',
        description: item.hsCode,
      },
      {
        label: 'Name',
        description: item.name,
      },
      {
        label: 'Description',
        description: item.description,
      },
      {
        label: 'Details',
        description: item.details,
      },
    ],
  };
};

export const createRow = (item) => {
  return {
    id: item._id,
    searchedBy: item.hsCode,

    columns: [
      {
        heading: item.hsCode,
        items: [
          {
            icon: 'icon-box',
            description: item.name,
          },
        ],
      },
    ],
  };
};
