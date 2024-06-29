export const isServerSideRendering = () => {
  return typeof window === 'undefined';
};

export const isClientSideRendering = () => {
  return typeof window === 'object';
};
