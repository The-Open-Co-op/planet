export const getFeatureFlags = () => {
  const urlParams = new URLSearchParams(window.location.search);
  
  return {
    useNextGraph: urlParams.get('nextgraph') === 'true'
  };
};

export const isNextGraphEnabled = (): boolean => {
  return getFeatureFlags().useNextGraph;
};