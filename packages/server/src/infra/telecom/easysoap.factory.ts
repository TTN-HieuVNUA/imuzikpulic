import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Config } from '../config/config';
import { LoggingService } from './../logging';
import { KpiLogEntity } from './models/kpi-log.entity';
const soapRequest = require('easy-soap-request');
var soap = require('strong-soap').soap;
var XMLHandler = soap.XMLHandler;
var xmlHandler = new XMLHandler();
class EasySoapClient {
  constructor(
    protected clientParams: { url: string; options?: any },
    protected extraParams: { [key: string]: string },
    private msisdn: string | null,
    protected loggingService: LoggingService,
    private kpiLogRepository: Repository<KpiLogEntity>,
    protected options?: any
  ) { }
}
class UserToneManageClient extends EasySoapClient {
  public async easyAddToneBox(params: {
    portalType: string;
    role: string;
    roleCode: string;
    objectRole: string;
    objectCode: string;
    name: string;
    toneCode: string[];
  }) {
    const crbtLogger =
      this.loggingService.getLogger('crbt');
    const endpoint = this.clientParams.url.replace("?wsdl", "");
    const portalAccount = this.extraParams["portalAccount"];
    const portalPwd = this.extraParams["portalPwd"];
    var success;
    var message;
    var toneBoxID;
    const headers = {
      'Content-Type': 'text/xml;charset=UTF-8'
    };
    const arrToneCodes = params.toneCode ?? [];
    let xml_tone_code = ``;
    arrToneCodes.map((code) => {
      xml_tone_code = xml_tone_code + `<item>${code}</item>`
    }
    );
    const xml_soap = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:lis="http://listener.webservice.interfaces.vcrbt.viettel.com" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">
      <soapenv:Header/>
      <soapenv:Body>
        <lis:addToneBox soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
            <AddToneBoxEvt xsi:type="xsd1:com.viettel.vcrbt.webservice.wsdlnode.AddToneBoxEvt" xmlns:xsd1="http://soapinterop.org/xsd">
              <name xsi:type="xsd:string">${params.name}</name>
              <objectCode xsi:type="xsd:string">${params.objectCode}</objectCode>
              <objectRole xsi:type="xsd:string">${params.objectRole}</objectRole>
              <portalAccount xsi:type="xsd:string">${portalAccount}</portalAccount>
              <portalPwd xsi:type="xsd:string">${portalPwd}</portalPwd>
              <portalType xsi:type="xsd:string">${params.portalType}</portalType>
              <role xsi:type="xsd:string">${params.role}</role>
              <roleCode xsi:type="xsd:string">${params.roleCode}</roleCode>
              <toneCode xsi:type="user:ArrayOf_xsd_string" soapenc:arrayType="xsd:string[]" xmlns:user="http://10.52.5.169:9695/jboss-net/services/UserToneManage">
                ${xml_tone_code}
              </toneCode>
            </AddToneBoxEvt>
        </lis:addToneBox>
      </soapenv:Body>
  </soapenv:Envelope>`
    const { response } = await soapRequest({ url: endpoint, headers: headers, xml: xml_soap });
    var rs = xmlHandler.xmlToJson(null, response.body, null);
    rs.Body.addToneBoxResponse.returnCode
    success = rs?.Body?.addToneBoxResponse?.addToneBoxReturn?.returnCode?.$value === this.options.successCode;
    if (success) {
      toneBoxID = rs?.Body?.addToneBoxResponse?.addToneBoxReturn?.toneBoxID?.$value
      message = "Cập nhật thành công!"
    } else {
      message = "Hệ thống đang bận, vui lòng thử lại sau."
    }
    return {
      toneBoxID, success, message
    }
  }


  public async easyEditToneBox(params: {
    portalType: string;
    role: string;
    roleCode: string;
    name: string;
    type: string;
    toneBoxID: string;
    toneCode: string[];
  }) {
    const crbtLogger =
      this.loggingService.getLogger('crbt');
    const endpoint = this.clientParams.url.replace("?wsdl", "");
    const portalAccount = this.extraParams["portalAccount"];
    const portalPwd = this.extraParams["portalPwd"];
    var success;
    var message;
    const headers = {
      'Content-Type': 'text/xml;charset=UTF-8'
    };
    const arrToneCodes = params.toneCode ?? [];
    let xml_tone_code = ``;
    arrToneCodes.map((code) => {
      xml_tone_code = xml_tone_code + `<item>${code}</item>`
    }
    );
    const xml_soap = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:lis="http://listener.webservice.interfaces.vcrbt.viettel.com" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">
          <soapenv:Header/>
          <soapenv:Body>
             <lis:editToneBox soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
                <EditToneBoxEvt xsi:type="xsd1:com.viettel.vcrbt.webservice.wsdlnode.EditToneBoxEvt" xmlns:xsd1="http://soapinterop.org/xsd">
                   <name xsi:type="xsd:string">${params.name}</name>
                   <portalAccount xsi:type="xsd:string">${portalAccount}</portalAccount>
                   <portalPwd xsi:type="xsd:string">${portalPwd}</portalPwd>
                   <portalType xsi:type="xsd:string">${params.portalType}</portalType>
                   <role xsi:type="xsd:string">${params.role}</role>
                   <roleCode xsi:type="xsd:string">${params.roleCode}</roleCode>
                   <toneBoxID xsi:type="xsd:string">${params.toneBoxID}</toneBoxID>
                   <toneCode xsi:type="user:ArrayOf_xsd_string" soapenc:arrayType="xsd:string[]" xmlns:user="http://10.52.5.169:9695/jboss-net/services/UserToneManage">
                   ${xml_tone_code}
                   </toneCode>
                   <type xsi:type="xsd:string">${params.type}</type>
                </EditToneBoxEvt>
             </lis:editToneBox>
          </soapenv:Body>
       </soapenv:Envelope>`
    const { response } = await soapRequest({ url: endpoint, headers: headers, xml: xml_soap });
    var rs = xmlHandler.xmlToJson(null, response.body, null);
    success = rs?.Body?.editToneBoxResponse?.editToneBoxReturn?.returnCode?.$value === this.options.successCode;
    if (success) {
      message = "Cập nhật thành công!"
    } else {
      message = "Hệ thống đang bận, vui lòng thử lại sau."
    }
    return {
      ...rs, success, message
    }
  }


  public async uploadTone(params: {
    cp_code:string;
    toneName: string;
    toneValidDay: string;
    singerName: string;
  }) {
    const crbtLogger =
      this.loggingService.getLogger('crbt');
    const endpoint = this.clientParams.url.replace("?wsdl", "");
    const portalAccount = this.extraParams["portalAccount"];
    const portalPwd = this.extraParams["portalPwd"];
    let success = false;
    let message;
    let tone_id;
    let tone_code;
    let return_code = "-1";
    const headers = {
      'Content-Type': 'text/xml;charset=UTF-8'
    };

    const xml_soap = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:lis="http://listener.webservice.interfaces.vcrbt.viettel.com">
    <soapenv:Header/>
    <soapenv:Body>
       <lis:uploadTone soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
          <UploadToneEvt xsi:type="xsd1:com.viettel.vcrbt.webservice.wsdlnode.UploadToneEvt" xmlns:xsd1="http://soapinterop.org/xsd">
             <partnerID xsi:type="xsd:string">${params.cp_code}</partnerID>
             <portalAccount xsi:type="xsd:string">${portalAccount}</portalAccount>
             <portalPwd xsi:type="xsd:string">${portalPwd}</portalPwd>
             <resourceServiceType xsi:type="xsd:string">3</resourceServiceType>
             <role xsi:type="xsd:string">1</role>
             <price xsi:type="xsd:string">3000</price>
             <toneName xsi:type="xsd:string">${params.toneName}</toneName>
             <singerName xsi:type="xsd:string">${params.singerName}</singerName>
             <toneValidDay xsi:type="xsd:string">${params.toneValidDay}</toneValidDay>
             <uploadType xsi:type="xsd:string">14</uploadType>
          </UploadToneEvt>
       </lis:uploadTone>
    </soapenv:Body>
 </soapenv:Envelope>`;
    try {
      console.log(`TONE-GEN:toneName:${params.toneName}|singerName:${params.singerName}|toneValidDay:${params.toneValidDay}|cp_code:${params.cp_code}`);
      crbtLogger.info(`TONE-GEN:toneName:${params.toneName}|singerName:${params.singerName}|toneValidDay:${params.toneValidDay}|cp_code:${params.cp_code}`);
      const { response } = await soapRequest({ url: endpoint, headers: headers, xml: xml_soap });
      var rs = xmlHandler.xmlToJson(null, response.body, null);
      success = rs?.Body?.uploadToneResponse?.uploadToneReturn?.returnCode?.$value === this.options.successCode;
      crbtLogger.info("RESPONSE:" + JSON.stringify(rs?.Body));
      return_code = rs?.Body?.uploadToneResponse?.uploadToneReturn?.returnCode?.$value;
      if (success) {
        tone_code = rs?.Body?.uploadToneResponse?.uploadToneReturn?.toneCode?.$value;
        tone_id = rs?.Body?.uploadToneResponse?.uploadToneReturn?.toneID?.$value;
        message = "Cập nhật thành công!";
      } else {
        message = "Hệ thống đang bận, vui lòng thử lại sau.";
      }
    } catch (ex) {
      return_code = "-1";
      success = false;
      message = "Hệ thống đang bận, vui lòng thử lại sau.";
      crbtLogger.error("[EasySoapClient][EX-02]:" + ex);
    }

    return {
      tone_id, tone_code, success, message,return_code
    }
  }

}
@Injectable()
export class EasySoapFactory {
  constructor(
    private config: Config,
    @InjectRepository(KpiLogEntity, 'log_db') private kpiLogRepository: Repository<KpiLogEntity>,
    private loggingService: LoggingService
  ) { }
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
      { url: this.getWsdl('USER_TONE_MANAGE', msisdn) },
      this.getExtraParams(msisdn),
      msisdn,
      this.loggingService,
      this.kpiLogRepository,
      { successCode: this.getService(msisdn).SUCCESS_CODE }
    );
  }
}