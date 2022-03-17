import { Test, TestingModule } from '@nestjs/testing';

import { SoapFactory } from '../soap.factory';
import { TelecomSettings } from '../telecom.settings';
import { Config } from './../../config';
import { LoggingService } from './../../logging';
import { PhoneNumberService } from './phone-number.service';

describe('PhoneNumberService', () => {
  let service: PhoneNumberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PhoneNumberService,
        { provide: Config, useValue: { VIETTEL_HOME_PHONE: ['111'] } },
        { provide: SoapFactory, useValue: null },
        { provide: LoggingService, useValue: null },
        { provide: TelecomSettings, useValue: null },
      ],
    }).compile();

    service = module.get<PhoneNumberService>(PhoneNumberService);
  });

  it('normalize phone number', () => {
    [
      ['0988111222', '988111222'],
      ['84988111222', '988111222'],
      ['988111222', '988111222'],
    ].forEach(([input, output]) => {
      expect(service.normalizeMsisdn(input)).toEqual(output);
      expect(service.normalizeMsisdn(input, '84')).toEqual('84' + output);
    });
  });
  it('should detect home phone', () => {
    [
      ['0111111222', true],
      ['84111111222', true],
      ['84988111222', false],
      ['988111222', false],
    ].forEach(([input, output]: [string, boolean]) => {
      expect(service.isHomePhone(input)).toEqual(output);
    });
  });
});
