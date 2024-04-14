const descOfGoods =
  'PIPE/PVC SUCTION HOSE PVC PIPE/PVC FIBER HOSE PVC PIPE/PVC CLEAR H OSE HS:391729 (A9W002)BONDED WAREHOUSE APPLICABLE FREE TIME 9 DAYS COM BINED (DETENTION & DEMURRAGE) AT (PORT OF DISCHARGE / PLACE OF DELIVER Y) FREIGHT PREPAID N/M';

const codes = [
  {
    name: 'TEXTILE MATERIALS',
    keywords: ['GERMENT'],
  },
  {
    name: 'RAW MATERIALS',
    keywords: ['IRON HOLLOW PIPE', 'PVC', 'GGWP'],
  },
];

const commodity = codes.find((code) => {
  return code.keywords.find((keyword) =>
    descOfGoods.toLowerCase().includes(keyword.trim().toLowerCase())
  );
});
