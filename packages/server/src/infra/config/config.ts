import { Injectable } from '@nestjs/common';

import { DEFAULT_CACHE_LONG_TIMEOUT, DEFAULT_CACHE_TIMEOUT } from './constants';

@Injectable()
export class Config {
  PORT = parseInt(process.env.PORT || '8300', 10);
  VIETTEL_HOME_PHONE: string[] = (
    process.env.VIETTEL_HOME_PHONE ||
    '625,626,627,628,629,633,664,665,666,667,668,669,220,221,222,223,224,246,247,248,249'
  ).split(',');

  LOGIN_TIMEOUT = '7d';
  JWT_SECRET = process.env.JWT_SECRET || 'super-secret';
  CAPTCHA_SECRET = process.env.CAPTCHA_SECRET || '7234743777217A25432A462D4A614E64';

  SERVICES: {
    [key: string]: {
      CRBTPRESENT: string;
      // SYSTEM: string;
      USER_MANAGE: string;
      USER_TONE_MANAGE: string;
      SERVICE_APP_CODE: string;
      SERVICE_APP_PASSWORD: string;
      SUCCESS_CODE: string;
    };
  } = {
    VCRBT: {
      // CRBTPRESENT: process.env.VCRBT_CRBTPRESENT || 'http://localhost:8001/crbt-present?wsdl',
      // // SYSTEM: process.env.VCRBT_SYSTEM,
      // USER_MANAGE: process.env.VCRBT_USERMANAGE || 'http://localhost:8001/user-manage?wsdl',
      // USER_TONE_MANAGE:
      //   process.env.VCRBT_USERTONEMANAGE || 'http://localhost:8001/user-tone-manage?wsdl',
      CRBTPRESENT:
        process.env.VCRBT_CRBTPRESENT ||
        'http://10.60.27.24:9595/jboss-net/services/CRBTPresent?wsdl',
      //CRBTPRESENT: process.env.VCRBT_CRBTPRESENT || 'http://10.60.27.24:9595/jboss-net/services/CRBTPresent?wsdl',
      // SYSTEM: process.env.VCRBT_SYSTEM,
      USER_MANAGE:
        process.env.VCRBT_USERMANAGE ||
        'http://10.60.27.24:9595/jboss-net/services/UserManage?wsdl',
      //USER_MANAGE: process.env.VCRBT_USERMANAGE || 'http://10.60.27.24:9595/jboss-net/services/UserManage?wsdl',
      USER_TONE_MANAGE:
        process.env.VCRBT_USERTONEMANAGE ||
        'http://10.60.27.24:9595/jboss-net/services/UserToneManage?wsdl',
      //process.env.VCRBT_USERTONEMANAGE || 'http://10.60.27.24:9595/jboss-net/services/UserToneManage?wsdl',
      SERVICE_APP_CODE: process.env.VCRBT_SERVICE_APPCODE || 'TestNCDN',
      SERVICE_APP_PASSWORD: process.env.VCRBT_SERVICE_APPPASSWORD || 'Vcrbt@1234',
      SUCCESS_CODE: process.env.VCRBT_SUCCESS_CODE || '000000',
    },
  };
  RBT_CREATION = {
    RBT_FTP_HOST: process.env.RBT_FTP_HOST || '10.240.158.1',
    RBT_FTP_PORT: 21,
    RBT_FTP_USER: process.env.RBT_FTP_USER || 'ftp_new',
    RBT_FTP_PASS: process.env.RBT_FTP_PASS || 'ftp_new',
    RBT_FTP_FOLDER: process.env.RBT_FTP_FOLDER || '/',
    RBT_DOWNLOAD_FOLDER:process.env.RBT_DOWNLOAD_FOLDER || './downloads/rbt-creation-download/',
    RBT_CREATION_FOLDER:process.env.RBT_CREATION_FOLDER || './downloads/rbt-creation/',
    RBT_MEDIA_HOST:process.env.RBT_MEDIA_HOST || 'http://imedia.imuzik.com.vn',
  };
  RADIUS = {
    WSDL: process.env.RADIUS_WSDL || 'http://10.255.62.201:8280/RadiusGW/Radius?wsdl',
    METHOD: process.env.RADIUS_METHOD || 'getMSISDN',
    CONNECT_TIMEOUT: parseInt(process.env.RADIUS_CONNECT_TIMEOUT || '5000', 10),
    TIMEOUT: parseInt(process.env.RADIUS_TIMEOUT || '5000', 10),
    USERNAME: process.env.RADIUS_USERNAME || 'username_test',
    PASSWORD: process.env.RADIUS_PASSWORD || 'password_test',
  };

  IP_POOLS: string[] = (process.env.IP_POOLS || '192.168.0.0/16').split(',');

  MYSQL_HOST = process.env.MYSQL_HOST || '192.168.146.8';
  MYSQL_PORT = parseInt(process.env.MYSQL_PORT ?? '', 10) || 8306;
  MYSQL_USERNAME = process.env.MYSQL_USERNAME || 'imuzik';
  MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || 'imuzik@1231!';
  MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'imuzikp3';
  MYSQL_LOGDB_HOST = process.env.MYSQL_LOGDB_HOST || '192.168.146.8';
  MYSQL_LOGDB_PORT = parseInt(process.env.MYSQL_LOGDB_PORT ?? '', 10) || 13306;
  // MYSQL_LOGDB_USERNAME = process.env.MYSQL_LOGDB_USERNAME
  // MYSQL_LOGDB_PASSWORD = process.env.MYSQL_LOGDB_PASSWORD
  // MYSQL_LOGDB_DATABASE = process.env.MYSQL_LOGDB_DATABASE
  MYSQL_LOGDB_USERNAME = process.env.MYSQL_LOGDB_USERNAME || 'ttpm';
  MYSQL_LOGDB_PASSWORD = process.env.MYSQL_LOGDB_PASSWORD || 'Ttpm*123456@';
  MYSQL_LOGDB_DATABASE = process.env.MYSQL_LOGDB_DATABASE || 'imuziklog';

  FREE_DOWNLOAD_PHONE_NUMBERS = (
    process.env.FREE_DOWNLOAD_PHONE_NUMBERS ||
    '977929922,988781354,986953037,1692040587,1649600112,973549017,1674372633'
  ).split(',');

  WHITELIST_ACCESS_RBT = (
    '*'
  ).split(',');
  FREE_ORDER_TONE_TYPE = parseInt(process.env.FREE_ORDER_TONE_TYPE || '0', 10);
  FREE_ORDER_TONE_FROM = process.env.FREE_ORDER_TONE_FROM || ''; // '2020-04-04' new type === 1, '2020-04-04,2020-04-06,2020-04-10' neu type === 2
  FREE_ORDER_TONE_TO = process.env.FREE_ORDER_TONE_TO || ''; // '2020-04-04';

  CACHE_TIMEOUT = process.env.CACHE_TIMEOUT ?? DEFAULT_CACHE_TIMEOUT;
  CACHE_LONG_TIMEOUT = process.env.CACHE_LONG_TIMEOUT ?? DEFAULT_CACHE_LONG_TIMEOUT;

  SYSTEM_SETTING_CACHE_TIMEOUT = process.env.CACHE_TIMEOUT ?? DEFAULT_CACHE_LONG_TIMEOUT;

  MEMBER_CACHE_TIMEOUT = process.env.MEMBER_CACHE_TIMEOUT ?? DEFAULT_CACHE_TIMEOUT;

  UPLOAD_PATH = process.env.UPLOAD_PATH ?? 'uploads';
  UPLOAD_PREFIX = process.env.UPLOAD_PREFIX ?? 'media2';
  MEDIA_ROOT_IMAGE_MEMBER = process.env.MEDIA_ROOT_IMAGE_MEMBER ?? 'images/member';
  MEDIA_MEMBER_HOST =
    process.env.MEDIA_MEMBER_HOST ?? 'http://localhost:4000/uploads/media2/images/member';

  LIST_LIMIT = parseInt(process.env.LIST_LIMIT ?? '', 10) || 1000;
  TAKE_LIMIT = parseInt(process.env.TAKE_LIMIT ?? '', 10) || 50;

  // ElasticSearch
  ES_HOST = process.env.ES_HOST || 'http://10.240.158.1:9200';
  ES_USERNAME = process.env.ES_USERNAME || 'elastic';

  ES_PASSWORD = process.env.ES_PASSWORD || 'changeme';
  ES_NODE_IDX = process.env.ES_NODE_IDX || 'node_idx';

  MONGO_HOST = process.env.MONGO_HOST || '192.168.146.8';
  MONGO_PORT = parseInt(process.env.MONGO_PORT ?? '', 10) || 8000;
  MONGO_USERNAME = process.env.MONGO_USERNAME || 'imuzik';
  MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'Imuzik2021';
  MONGO_DATABASE = process.env.MONGO_DATABASE || 'imuzik';

  // REDIS = {
  //   host: process.env.REDIS_HOST || '10.240.158.79',
  //   //port: parseInt(process.env.REDIS_PORT ?? '') || 9379,
  //   //password: (process.env.REDIS_PASSWORD ?? '') || 'Redis',

  //   port: parseInt(process.env.REDIS_PORT ?? '') || 9379,
  //   db: parseInt(process.env.REDIS_DB ?? '') || 0,
  //   password: (process.env.REDIS_PASSWORD ?? '') || 'P@ssW0rd#2018',
  //   keyPrefix: process.env.REDIS_PREFIX || 'v2',
  // };

  REDIS = {
    host: process.env.REDIS_HOST || '192.168.146.252',
    //port: parseInt(process.env.REDIS_PORT ?? '') || 9379,
    //password: (process.env.REDIS_PASSWORD ?? '') || 'Redis',

    port: parseInt(process.env.REDIS_PORT ?? '') || 9300,
    db: parseInt(process.env.REDIS_DB ?? '') || 15,
    password: (process.env.REDIS_PASSWORD ?? '') || 'Sxpm@2021',
    keyPrefix: process.env.REDIS_PREFIX || 'imuzik-portal:',
  };

  REDIS_HOT_KEYWORD_KEY = 'top_keywords';
}
