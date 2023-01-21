export const createRow = (item) => {
  return {
    id: item.id,
    searchedBy: item.containerNo,
    status: item.commodity ? 'valid' : 'invalid',

    columns: [
      {
        heading: item.containerNo,
        items: [
          {
            icon: 'icon-bl',
            description: item.blNumber,
          },
          {
            icon: 'icon-status',
            description: item.commodity ? 'Valid' : 'Invalid',
          },
          {
            icon: 'icon-stack',
            description: item.isMapped ? 'Mapped' : 'Unmapped',
          },
        ],
      },
    ],
  };
};

export const createDetails = (item) => {
  return {
    main: {
      icon: 'icon-box',
      text: item.descOfGoods,
    },

    crossDetails: [
      {
        label: 'Vessel',
        description: item.vessel || 'NULL',
      },
      {
        label: 'Voyage',
        description: item.voyage || 'NULL',
      },
      {
        label: 'HS Code',
        description: item.hsCode || 'NULL',
      },
      {
        label: 'CY Operator',
        description: item.cyOperator,
      },
      {
        label: 'ML Number',
        description: item.mlNumber,
      },
      {
        label: 'BL Number',
        description: item.blNumber,
      },
      {
        label: 'Container No',
        description: item.containerNo,
      },
      {
        label: 'Container Type',
        description: `${item.containerType} (${item.isoType})`,
      },
      {
        label: 'Commodity',
        description: item.commodity,
      },
      {
        label: 'Packages',
        description: item.pkgs,
      },
      {
        label: 'Weight',
        description: item.weight,
      },
      {
        label: 'Volume',
        description: item.volume,
      },
      {
        label: 'Consignor',
        description: item.consignor,
      },
      {
        label: 'Consignee',
        description: item.consignee,
      },
      {
        label: 'Notify Party',
        description: item.notifyParty,
      },
      {
        label: 'Status',
        description: `${item.commodity ? 'Valid' : 'Invalid'} (${
          item.isMapped ? 'Mapped' : 'Unmapped'
        })`,
      },
    ],
  };
};
