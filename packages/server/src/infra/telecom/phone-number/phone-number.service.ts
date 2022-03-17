import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import * as IpCidr from 'ip-cidr';

import { Config } from '../../config';
import { LoggingService } from '../../logging';
import { SoapFactory } from '../soap.factory';
import { TelecomSettings } from '../telecom.settings';

@Injectable()
export class PhoneNumberService {
  constructor(
    private config: Config,
    private soapFactory: SoapFactory,
    private loggingService: LoggingService,
    private telecomSettings: TelecomSettings
  ) {}

  graphqlContext = (req: Request) => ({
    ip: req.headers['x_forwarded_for'] || req.ip,
    injectedMsisdn: req.headers['msisdn'],
  });

  normalizeMsisdn(msisdn: string, type = 'simple') {
    return (type === 'simple' ? '' : '84') + /(0+|84)?([0-9]+)/.exec(msisdn)?.[2];
  }
  async isViettelPhoneNumberAsync(msisdn: string) {
    return (await this.telecomSettings.getViettelPhoneNumberRegexAsync()).test(msisdn);
  }

  getViettelPhoneNumberRegexAsync = async () =>
    (await this.telecomSettings.getViettelPhoneNumberRegexAsync()).source;

  isHomePhone(msisdn: string): boolean {
    return this.config.VIETTEL_HOME_PHONE.includes(this.normalizeMsisdn(msisdn).substr(0, 3));
  }

  private cidrList: IpCidr[];
  getCidrList() {
    if (!this.cidrList) {
      this.cidrList = this.config.IP_POOLS.map((value) => new IpCidr(value)).filter((value) =>
        value.isValid()
      );
    }
    return this.cidrList;
  }

  is3gIp(ip: string) {
    return !!this.getCidrList().find((cidr) => cidr.contains(ip));
  }

  async getMsisdnFrom3gIp(ip: string) {
    if (this.is3gIp(ip)) {
      const client = await this.soapFactory.getRadiusClient();
      const result = await client.call({ ip });
      if (result?.return?.code === 1) {
        return this.normalizeMsisdn(result.return.desc);
      }
    }
    return null;
  }

  private logVaaa(success: boolean, ip: string, msisdn: string, vaaa: string | null) {
    this.loggingService
      .getLogger('radius')
      .info(
        `[vaaa] ${success ? 'success' : 'fail'}: ` +
          [`CLIENT_IP=${ip}`, `header=${msisdn || 'NULL'}`, `vaaa=${vaaa || 'NULL'}`].join(`; `)
      );
  }

  async validateMsisdn(msisdn: string, ip: string) {
    const normalizedMsisdn = this.normalizeMsisdn(msisdn);
    let msisdnFrom3gIp: string | null = null;
    if (normalizedMsisdn) {
      msisdnFrom3gIp = await this.getMsisdnFrom3gIp(ip);
      if (msisdnFrom3gIp && normalizedMsisdn === msisdnFrom3gIp) {
        this.logVaaa(true, ip, normalizedMsisdn, msisdnFrom3gIp);
        return msisdnFrom3gIp;
      }
    }
    this.logVaaa(false, ip, normalizedMsisdn, msisdnFrom3gIp);
    return null;
  }
}
