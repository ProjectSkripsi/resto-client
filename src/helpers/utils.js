export const convertToRupiah = (angka) => {
  let rupiah = '';
  const checkNull = !angka ? 0 : angka;

  const angkarev = checkNull.toString().split('').reverse().join('');
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < angkarev.length; i++)
    if (i % 3 === 0) rupiah += `${angkarev.substr(i, 3)}.`;
  return `Rp. ${rupiah
    .split('', rupiah.length - 1)
    .reverse()
    .join('')}`;
};
