export const createRow = (item) => {
  return {
    id: item._id,
    searchedBy: item.name,

    columns: [
      {
        heading: item.name,
        items: [
          {
            icon: 'icon-document',
            description:
              item.keywords.length > 3
                ? [...item.keywords.slice(0, 3), '...'].join(', ')
                : item.keywords.join(', '),
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
        label: 'Name',
        description: item.name,
      },
      {
        label: 'Keywords',
        description: item.keywords.join(', '),
      },
    ],
  };
};
