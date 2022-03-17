module.exports = function overrides(config, env) {
  let loaders = config;
  loaders.externals = { 'react-native-fs': 'reactNativeFs' };
  return config;
};
