export const createOptions = (item) => {
  return {
    id: item.code,
    value: item.name,
  };
};

export const createRow = (item) => {
  return {
    id: item._id,
    searchedBy: item.name,

    columns: [
      {
        heading: item.name,
        items: [
          {
            icon: 'icon-code',
            description: item.code,
          },
        ],
      },
    ],
  };
};

export const createDetails = (item) => {
  return {
    crossDetails: [
      {
        label: 'Ship Code',
        description: item.code,
      },
      {
        label: 'Shipping Line',
        description: item.name,
      },
    ],
  };
};
