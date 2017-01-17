import config from '../config/index';
let crossHeaders = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', config.accessControlAllowOrigin);
  res.setHeader('Access-Control-Allow-Methods', config.accessControlAllowMethods);
  res.setHeader('Access-Control-Allow-Headers', config.accessControlAllowHeaders);
  next();
}
export default crossHeaders;
