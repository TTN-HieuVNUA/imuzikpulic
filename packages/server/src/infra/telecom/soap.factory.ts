import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getUnixTime } from 'date-fns';
import { Json } from 'fp-ts/lib/Either';
import * as soap from 'soap';
import { Repository } from 'typeorm';

import { Config } from '../config/config';
import { LoggingService } from './../logging';
import { KpiLogEntity } from './models/kpi-log.entity';
import { getCrbtMessage } from './return-code';

const fixList = (prop: string) => (res: any) => {
  console.log("Log-00:["+prop+"]"+JSON.stringify(res));
  if (res[prop]?.[prop]) {
    res[prop] = res[prop][prop];
    if (res[prop].length === undefined) {
      res[prop] = [res[prop]];
    }
  }
  console.log("Log-15:["+prop+"]"+JSON.stringify(res[prop] ));
  if (res[prop] === null) {
    res[prop] = [];
  }
  
};

class SoapClient {
  constructor(
    protected clientParams: { url: string; options?: soap.IOptions },
    private extraParams: { [key: string]: string },
    private msisdn: string | null,
    protected loggingService: LoggingService,
    private kpiLogRepository: Repository<KpiLogEntity>,
    protected options?: any
  ) {}

  protected wrap<T>(event: string, params: T) {
    return {
      [event]: {
        ...this.extraParams,
        ...params,
      },
    };
  }

  protected async execute<T extends { returnCode: string }>(
    method: string,
    params: object,
    opts?: {
      skipLogging?: boolean;
      kpiAction?: string;
      type?: 'addSubscribeReverse' | 'unSubscribeReverse';
      transformFunc?: any;
    }
  ) {
    const shouldLogKpi = !!opts?.kpiAction;
    const crbtLogger = opts?.skipLogging
      ? this.loggingService.debugLogger('crbt')
      : this.loggingService.getLogger('crbt');
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const kpiLogger = shouldLogKpi
      ? this.loggingService.getLogger('kpi')
      : this.loggingService.debugLogger('kpi');
    const kpiLog = new KpiLogEntity();
    kpiLog.actionName = opts?.kpiAction ?? null;
    kpiLog.account = this.msisdn;
    kpiLog.startTime = new Date();

    try {
      crbtLogger.info(`${method}: wsdl=${this.clientParams.url}`);
      // crbtLogger.debug('Client: ' + JSON.stringify(client.describe()));
      kpiLog.requestContent = JSON.stringify(params);
      crbtLogger.info(`${method}: params=${kpiLog.requestContent}`);
      const endpoint = this.clientParams.url.replace("?wsdl", "");
      const client = await soap.createClientAsync(this.clientParams.url, this.clientParams.options,endpoint);
      

      const rawResult = await client[`${method}Async`](params);
      const result: T = rawResult[0];
           
      crbtLogger.info(`${method}: response=${JSON.stringify(result)}`);
      const response_result = JSON.stringify(result);
      // parse json
      var jsonParsed = JSON.parse(response_result);
      opts?.transformFunc?.(result);

      var success;
      var message;

      if (method === 'subscribe') {
        crbtLogger.info("[SoapClient][subscribe]:"+JSON.stringify(jsonParsed));
        success = jsonParsed.subscribeReturn.returnCode.$value === this.options.successCode;
        message = getCrbtMessage(jsonParsed.subscribeReturn.returnCode.$value, opts?.type);
      } else if (method === 'unSubscribe') {
        crbtLogger.info("[SoapClient][unSubscribe]:"+JSON.stringify(jsonParsed));
        success = jsonParsed.unSubscribeReturn.returnCode.$value === this.options.successCode;
        message = getCrbtMessage(jsonParsed.unSubscribeReturn.returnCode.$value, opts?.type);
      } else if (method === 'subscribePlus') {
        crbtLogger.info("[SoapClient][subscribePlus]:"+JSON.stringify(jsonParsed));
        success = jsonParsed.subscribePlusReturn.returnCode.$value === this.options.successCode;
        message = getCrbtMessage(jsonParsed.subscribePlusReturn.returnCode.$value, opts?.type);
      }
      else if (method === 'queryGroup') {
        crbtLogger.info("[SoapClient][queryGroup]:"+JSON.stringify(jsonParsed));
        success = jsonParsed.queryGroupReturn.returnCode.$value === this.options.successCode;
        message = getCrbtMessage(jsonParsed.queryGroupReturn.returnCode.$value, opts?.type);
      }
      else if (method === 'querySetting') {
        crbtLogger.info("[SoapClient][querySetting]:"+JSON.stringify(jsonParsed));
        success = jsonParsed.querySettingReturn.returnCode.$value === this.options.successCode;
        message = getCrbtMessage(jsonParsed.querySettingReturn.returnCode.$value, opts?.type);
      } 
      else if (method === 'addGroup') {
        crbtLogger.info("[SoapClient][addGroup]:"+JSON.stringify(jsonParsed));
        success = jsonParsed.addGroupReturn.returnCode.$value === this.options.successCode;
        message = getCrbtMessage(jsonParsed.addGroupReturn.returnCode.$value, opts?.type);
      }
      else if (method === 'queryInboxTone') {
        crbtLogger.info("[SoapClient][queryInboxTone]:"+JSON.stringify(jsonParsed));
        success = jsonParsed.queryInboxToneReturn.returnCode.$value === this.options.successCode;
        message = getCrbtMessage(jsonParsed.queryInboxToneReturn.returnCode.$value, opts?.type);
      }
      else if (method === 'activateAndPause') {
        crbtLogger.info("[SoapClient][activateAndPause]:"+JSON.stringify(jsonParsed));
        success = jsonParsed.activateAndPauseReturn.returnCode.$value === this.options.successCode;
        message = getCrbtMessage(jsonParsed.activateAndPauseReturn.returnCode.$value, opts?.type);
      } 
      else if (method === 'addGroupMember') {
        crbtLogger.info("[SoapClient][addGroupMember]:"+JSON.stringify(jsonParsed));
        success = jsonParsed.addGroupMemberReturn.returnCode.$value === this.options.successCode;
        message = getCrbtMessage(jsonParsed.addGroupMemberReturn.returnCode.$value, opts?.type);
      } 
      else if (method === 'queryGroupMember') {
        crbtLogger.info("[SoapClient][queryGroupMember]:"+JSON.stringify(jsonParsed));
        success = jsonParsed.queryGroupMemberReturn.returnCode.$value === this.options.successCode;
        message = getCrbtMessage(jsonParsed.queryGroupMemberReturn.returnCode.$value, opts?.type);
      } 
      else if (method === 'delGroupMember') {
        crbtLogger.info("[SoapClient][delGroupMember]:"+JSON.stringify(jsonParsed));
        success = jsonParsed.delGroupMemberReturn.returnCode.$value === this.options.successCode;
        message = getCrbtMessage(jsonParsed.delGroupMemberReturn.returnCode.$value, opts?.type);
      }
      else if (method === 'orderTone') {
        crbtLogger.info("[SoapClient][orderTone]:"+JSON.stringify(jsonParsed));
        success = jsonParsed.orderToneReturn.returnCode.$value === this.options.successCode;
        message = getCrbtMessage(jsonParsed.orderToneReturn.returnCode.$value, opts?.type);
      } 
      else if (method === 'presentTone') {
        crbtLogger.info("[SoapClient][presentTone]:"+JSON.stringify(jsonParsed));
        success = jsonParsed.presentToneReturn.returnCode.$value === this.options.successCode;
        message = getCrbtMessage(jsonParsed.presentToneReturn.returnCode.$value, opts?.type);
      } 
      else if (method === 'editToneBox') {
        crbtLogger.info("[SoapClient][editToneBox]:"+JSON.stringify(jsonParsed));
        success = jsonParsed.editToneBoxReturn.returnCode.$value === this.options.successCode;
        message = getCrbtMessage(jsonParsed.editToneBoxReturn.returnCode.$value, opts?.type);
      } 
      else if (method === 'addToneBox') {
        crbtLogger.info("[SoapClient][addToneBox]:"+JSON.stringify(jsonParsed));
        success = jsonParsed.addToneBoxReturn.returnCode.$value === this.options.successCode;
        message = getCrbtMessage(jsonParsed.addToneBoxReturn.returnCode.$value, opts?.type);
      }
      else if (method === 'queryTbTone') {
        crbtLogger.info("[SoapClient][queryTbTone]:"+JSON.stringify(jsonParsed));
        success = jsonParsed.queryTbToneReturn.returnCode.$value === this.options.successCode;
        message = getCrbtMessage(jsonParsed.queryTbToneReturn.returnCode.$value, opts?.type);
      } 
      else if (method === 'delInboxTone') {
        crbtLogger.info("[SoapClient][delInboxTone]:"+JSON.stringify(jsonParsed));
        success = jsonParsed.delInboxToneReturn.returnCode.$value === this.options.successCode;
        message = getCrbtMessage(jsonParsed.delInboxToneReturn.returnCode.$value, opts?.type);
      } 
      else if (method === 'query') {
        success = jsonParsed.queryReturn.returnCode.$value === this.options.successCode;
        message = getCrbtMessage(jsonParsed.queryReturn.returnCode.$value, opts?.type);
      } else {
        success = jsonParsed.queryReturn.returnCode.$value === this.options.successCode;
        message = getCrbtMessage(jsonParsed.queryReturn.returnCode.$value, opts?.type);
      }
      
      kpiLog.errorDescription = message;
      kpiLog.errorCode = result.returnCode;
      kpiLog.transactionStatus = success ? 0 : 1;
      kpiLog.responseContent = JSON.stringify(result);
      kpiLog.endTime = new Date();
      kpiLog.duration = getUnixTime(kpiLog.endTime) - getUnixTime(kpiLog.startTime);

      kpiLogger.info(`${method}: [SoapClient][KPI]=${JSON.stringify(kpiLog)}`);
      if (method === 'queryGroup'){
        let rs_group = jsonParsed.queryGroupReturn;
        opts?.transformFunc?.(rs_group);
        return { ...rs_group, success, message };
      }
      if (method === 'queryGroupMember'){
        let rs_groupMember = jsonParsed.queryGroupMemberReturn;
        opts?.transformFunc?.(rs_groupMember);
        return { ...rs_groupMember, success, message };
      }
      if (method === 'queryInboxTone'){
        let rs_queryInboxTone = jsonParsed.queryInboxToneReturn;
        opts?.transformFunc?.(rs_queryInboxTone);
        return { ...rs_queryInboxTone, success, message };
      }
      if (method === 'querySetting'){
        let rs_querySetting = jsonParsed.querySettingReturn;
        opts?.transformFunc?.(rs_querySetting);
        crbtLogger.info("[SoapClient][queryTbTone][transformFunc]:"+JSON.stringify(rs_querySetting));
        return { ...rs_querySetting, success, message };
      }
      if (method === 'queryTbTone'){
        let rs_queryTbTone = jsonParsed.queryTbToneReturn;
        opts?.transformFunc?.(rs_queryTbTone);
        return { ...rs_queryTbTone, success, message };
      }
      if (method === 'query'){
        let rs = jsonParsed.queryReturn;
        opts?.transformFunc?.(rs);
        return { ...rs, success, message };
      }else{
        return { ...result, success, message };
      }
      
    } catch (error) {
      crbtLogger.error(`${method}: [SoapClient][Error]=${error.message}`);
      kpiLog.errorCode = '2';
      kpiLog.errorDescription = error.message;
      kpiLog.transactionStatus = 1;

      kpiLogger.info(`${method}: [SoapClient][Error-KPI]` + JSON.stringify(kpiLog));
      return {
        success: false,
        message: error.message,
        returnCode: '',
      };
    } finally {
      if (shouldLogKpi) {
        await this.kpiLogRepository.save(kpiLog);
      }
    }
  }
  protected addExtraHeader<T>(params: T) {
    return {
      ...this.extraParams,
      ...params,
    };
  }
}

type Response<T> = T & { success: boolean; returnCode: string; message: string };

export interface Tone {
  toneID: string;
  toneCode: string;
  toneName: string;
  singerName: string;
  price: string;
  personID: string;
  availableDateTime: string;
}

class UserToneManageClient extends SoapClient {
  queryInboxTone(params: {
    startRecordNum: string;
    endRecordNum: string;
    resourceType: string;
    phoneNumber: string;
  }): Promise<
    Response<{
      toneInfos?: Tone[];
      toneBoxInfos?: Tone[];
    }>
  > {
    return this.execute('queryInboxTone', this.wrap('QueryInboxToneEvt', params), {
      transformFunc: fixList('toneInfos'),
    });
  }
  queryGroup(params: {
    startRecordNum: string;
    endRecordNum: string;
    queryType: string;
    phoneNumber: string;
  }): Promise<
    Response<{
        groupInfos?: { groupCode: string; groupName: string }[];
    }>
  > {
    return this.execute('queryGroup', this.wrap('QueryGroupEvt', params), {
      skipLogging: true,
      transformFunc: fixList('groupInfos'),
    });
  }

  queryGroupMember(params: {
    portalType: string;
    groupCode: string;
    phoneNumber: string;
  }): Promise<
    Response<{
      groupMemberInfos?: { memberName: string; memberNumber: string }[];
    }>
  > {
    return this.execute('queryGroupMember', this.wrap('QueryGroupMemberEvt', params), {
      skipLogging: true,
      transformFunc: fixList('groupMemberInfos'),
    });
  }

  querySetting(params: {
    portalType: string;
    calledUserType: string;
    calledUserID: string;
  }): Promise<
    Response<{
      settingInfos?: {
        setType: string;
        callerNumber: string;
        toneBoxID: string;
        timeType: string;
        startTime: string;
        endTime: string;
        settingID: string;
        loopType: string;
        resourceType: string;
      }[];
    }>
  > {
    return this.execute('querySetting', this.wrap('QuerySettingEvt', params), {
      transformFunc: fixList('settingInfos'),
    });
  }
  queryTbTone(params: {
    portalType: string;
    type: string;
    approveType: string;
    toneBoxID: string;
  }): Promise<
    Response<{
      toneInfos?: { toneCode: string }[];
    }>
  > {
    return this.execute('queryTbTone', this.wrap('QueryTbToneEvt', params), {
      skipLogging: false,
      transformFunc: fixList('toneInfos'),
    });
  }

  addGroup(params: {
    portalType: string;
    role: string;
    roleCode: string;
    phoneNumber: string;
    groupCode: string;
    groupName: string;
    description: string;
  }): Promise<Response<{ groupID?: string }>> {
    return this.execute('addGroup', this.wrap('AddGroupEvt', params), { skipLogging: true });
  }

  addToneBox(params: {
    portalType: string;
    role: string;
    roleCode: string;
    objectRole: string;
    objectCode: string;
    name: string;
    toneCode: string[];
  }): Promise<Response<{ toneBoxID?: string }>> {
    return this.execute('addToneBox', this.wrap('AddToneBoxEvt', params), { skipLogging: false });
  }

  editToneBox(params: {
    portalType: string;
    role: string;
    roleCode: string;
    name: string;
    type: string;
    toneBoxID: string;
    toneCode: string[];
  }) {
    return this.execute('editToneBox', this.wrap('EditToneBoxEvt', params), { skipLogging: false });
  }

  editSetting(params: {
    portalType: string;
    role: string;
    roleCode: string;
    settingID: string;
    calledUserID: string;
    loopType: string;
    setType: string;
    timeType: string;
    startTime: string | null;
    endTime: string | null;
    resourceType: string;
  }) {
    return this.execute('editSetting', this.wrap('EditSettingEvt', params));
  }
  setTone(params: {
    portalType: string;
    role: string;
    roleCode: string;
    toneBoxID: string;
    calledUserType: string;
    calledUserID: string;
    resourceType: string;
    loopType?: string;
    setType: string;
    callerNumber?: string;
    timeType?: string;
    startTime?: string | null;
    endTime?: string | null;
  }) {
    return this.execute('setTone', this.wrap('SetToneEvt', params));
  }

  delGroup(params: {
    portalType: string;
    role: string;
    roleCode: string;
    phoneNumber: string;
    groupCode: string;
  }): Promise<Response<{ groupID?: string }>> {
    return this.execute('delGroup', this.wrap('DelGroupEvt', params), { skipLogging: true });
  }

  addGroupMember(params: {
    portalType: string;
    role: string;
    roleCode: string;
    phoneNumber: string;
    groupCode: string;
    memberNumber: string;
    memberName: string;
    memberDetails: string;
  }) {
    return this.execute('addGroupMember', this.wrap('AddGroupEvt', params), { skipLogging: true });
  }

  delGroupMember(params: {
    portalType: string;
    role: string;
    roleCode: string;
    phoneNumber: string;
    groupCode: string;
    memberNumber: Json;
  }) {
    return this.execute('delGroupMember', this.wrap('DelGroupMemberEvt', params), {
      skipLogging: true,
    });
  }

  delInboxTone(params: {
    portalType: string;
    role: string;
    roleCode: string;
    phoneNumber: string;
    personId: string;
  }) {
    return this.execute('delInboxTone', this.wrap('DelInboxToneEvt', params), {
      skipLogging: true,
    });
  }

  orderTone(params: {
    role: string;
    roleCode: string;
    phoneNumber: string;
    resourceCode: string;
    resourceType: string;
    portalType: string;
    moduleCode: string;
    discount: string;
  }) {
    return this.execute('orderTone', this.wrap('OrderToneEvt', params), {
      kpiAction: 'Tải nhạc chờ',
    });
  }
}
class CrbtPresentClient extends SoapClient {
  presentTone(params: {
    role: string;
    roleCode: string;
    fromUserPhoneNumber: string;
    toUserPhoneNumber: string;
    resourceType: string;
    resourceCode: string;
  }) {
    return this.execute('presentTone', this.wrap('PresentToneEvt', params), {
      kpiAction: 'Tặng nhạc chờ',
    });
  }
}
class UserManageClient extends SoapClient {
  async query(params: {
    startRecordNum: string;
    endRecordNum: string;
    queryType: string;
    phoneNumber: string;
  }): Promise<
    Response<{ 
        userInfos?: { status: string; serviceOrders: string; brand: string }[]
  }>
  > {
    return this.execute('query', this.wrap('QueryUserEvt', params), {
      kpiAction: 'query info',
      transformFunc: fixList('userInfos'),
    });
  }

  async addSubscribeReverse(params: {
    serviceID: string;
    role: string;
    roleCode: string;
    phoneNumber: string;
  }) {
    return this.execute('addSubscribeReverse', this.wrap('SubscribeEvt', params), {
      kpiAction: 'Đăng ký Reverse',
      type: 'addSubscribeReverse',
    });
  }
  async unSubscribeReverse(params: {
    serviceID: string;
    role: string;
    roleCode: string;
    phoneNumber: string;
  }) {
    return this.execute('unSubscribeReverse', this.wrap('UnSubscribeEvt', params), {
      kpiAction: 'Hủy Reverse',
      type: 'unSubscribeReverse',
    });
  }
  async subscribe(params: {
    portalType: string;
    role: string;
    roleCode: string;
    phoneNumber: string;
    validateCode: string;
    tradeMark: string;
  }) {
    return this.execute('subscribe', this.wrap('SubscribeEvt', params), { kpiAction: 'Đăng ký' });
  }

  async subscribePlus(params: {
    serviceID: string;
    role: string;
    roleCode: string;
    phoneNumber: string;
    validateCode: string;
    tradeMark: string;
  }) {
    return this.execute('subscribePlus', this.wrap('SubscribeEvt', params), {
      kpiAction: 'Đăng ký gói Plus',
    });
  }
  async edit(params: {
    portalType: string;
    role: string;
    roleCode: string;
    phoneNumber: string;
    tradeMark: string;
  }) {
    return this.execute('edit', this.wrap('EditUserEvt', params));
  }

  async activateAndPause(params: {
    portalType: string;
    role: string;
    roleCode: string;
    type: string;
    phoneNumber: string;
  }) {
    return this.execute('activateAndPause', this.wrap('ActivateAndPauseEvt', params));
  }

  async csUnSubscribe(params: {
    portalType: string;
    role: string;
    roleCode: string;
    phoneNumber: string;
  }) {
    return this.execute('csUnSubscribe', this.wrap('CsUnSubscribeEvt', params), {
      kpiAction: 'Huỷ đăng ký',
    });
  }

  async unSubscribe(params: {
    portalType: string;
    role: string;
    roleCode: string;
    phoneNumber: string;
  }) {
    return this.execute('unSubscribe', this.wrap('UnSubscribeEvt', params), {
      kpiAction: 'Huỷ đăng ký',
    });
  }
}

// class SystemClient extends SoapClient {
//   sendSms(params: {
//     portalType: string;
//     role: string;
//     roleCode: string;
//     timeType: string;
//     smContent: string;
//     phoneNumbers: string;
//   }) {
//     return this.client.sendSmAsync(this.wrap('SendSmEvt', params));
//   }
// }
class RadiusClient extends SoapClient {
  async call(params: {
    ip: string;
  }): Promise<{ return: { code: number; desc: string } } | undefined> {
    try {
      const extendedParams = this.addExtraHeader(params);
      const client = await soap.createClientAsync(this.clientParams.url, this.clientParams.options);
      const [res] = await client[this.options.method + 'Async'](extendedParams, {
        timeout: this.options.timeout,
      });
      this.loggingService
        .getLogger('radius')
        .debug(`'[vaaa] CALL VAAA FAIL: CLIENT_IP=${params.ip}; vaaa res: `, res);
      return res;
    } catch (e) {
      // \Yii::error('[vaaa] CALL VAAA FAIL: CLIENT_IP=' . $ip . '; vaaa exception: ' . $e->getMessage(), "radius");
      this.loggingService
        .getLogger('radius')
        .error(`'[vaaa] CALL VAAA FAIL: CLIENT_IP=${params.ip}; vaaa exception: ${e.message}`);
    }
  }
}
@Injectable()
export class SoapFactory {
  constructor(
    private config: Config,
    @InjectRepository(KpiLogEntity, 'log_db') private kpiLogRepository: Repository<KpiLogEntity>,
    private loggingService: LoggingService
  ) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private getService(routeKey: string) {
    return this.config.SERVICES.VCRBT;
  }
  private getExtraParams(routeKey: string) {
    return {
      portalAccount: this.getService(routeKey).SERVICE_APP_CODE,
      portalPwd: this.getService(routeKey).SERVICE_APP_PASSWORD,
    };
  }
  private getWsdl(service: 'CRBTPRESENT' | 'USER_MANAGE' | 'USER_TONE_MANAGE', routeKey: string) {
    return this.getService(routeKey)[service];
  }
  async getUserToneManageClient(msisdn: string) {
    return new UserToneManageClient(
      { url: this.getWsdl('USER_TONE_MANAGE', msisdn),options:{wsdl_options: {timeout: 10000}} },
      this.getExtraParams(msisdn),
      msisdn,
      this.loggingService,
      this.kpiLogRepository,
      { successCode: this.getService(msisdn).SUCCESS_CODE }
    );
  }
  async getUserManageClient(msisdn: string) {
    return new UserManageClient(
      {
        url: this.getWsdl('USER_MANAGE', msisdn),
        options: { namespaceArrayElements: true, wsdl_options: {timeout: 10000}},
      },
      this.getExtraParams(msisdn),
      msisdn,
      this.loggingService,
      this.kpiLogRepository,
      { successCode: this.getService(msisdn).SUCCESS_CODE }
    );
  }
  async getCrbtPresentClient(msisdn: string) {
    return new CrbtPresentClient(
      { url: this.getWsdl('CRBTPRESENT', msisdn),options:{wsdl_options: {timeout: 10000}} },
      this.getExtraParams(msisdn),
      msisdn,
      this.loggingService,
      this.kpiLogRepository,
      { successCode: this.getService(msisdn).SUCCESS_CODE }
    );
  }
  // async getSystemClient(routeKey?: string) {
  //   return new SystemClient(
  //     await soap.createClientAsync(this.getWsdl('SYSTEM', routeKey)),
  //     this.getExtraParams(routeKey),
  //   );
  // }
  async getRadiusClient() {
    return new RadiusClient(
      { url: this.config.RADIUS.WSDL, options: { disableCache: true } },
      {
        username: this.config.RADIUS.USERNAME,
        password: this.config.RADIUS.PASSWORD,
      },
      null,
      this.loggingService,
      this.kpiLogRepository,
      { method: this.config.RADIUS.METHOD, timeout: this.config.RADIUS.TIMEOUT }
    );
  }
}
