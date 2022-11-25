const getConfig = ({ token }) => {
  // config
  const config = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  return config;
};

export default getConfig;
