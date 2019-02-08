export const filterChips = (chips, category) => {
  const CATEGORY = category.toUpperCase().replace(/ /, '');
  const chipFilter = chips.reduce(
    (a, b) => ({ ...a, [b.label]: b.select }),
    {}
  );
  return { type: `FILTER_${CATEGORY}`, chipFilter };
};
