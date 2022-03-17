var soap = require('soap');
var express = require('express');
var app = express();
var fs = require('fs');
var toneInfos = [
  {
    toneID: 'toneID',
    toneCode: '7969023',
    toneName: 'Neu Nhu',
    singerName: 'Le Hieu',
    price: 'price',
    personID: 'personID-2',
    availableDateTime: 'availableDateTime',
  },
  {
    toneID: 'toneID',
    toneCode: '6566973',
    toneName: 'Tua Dong Song',
    singerName: 'Le Hieu',
    price: 'price',
    personID: 'personID-1',
    availableDateTime: 'availableDateTime',
  },
];
var radius = {
  Radius: {
    RadiusSOAP11port_http: {
      getMSISDN({ ip } = args) {
        // return { return: { code: 1, desc: ip } };
        console.log({ code: parseInt(ip[ip.length - 1], 10) % 2, desc: ip.replace(/\./g, '') });
        return {
          return: { code: parseInt(ip[ip.length - 1], 10) % 2, desc: '9' + ip.replace(/\./g, '') },
        };
      },
    },
  },
};
var userManage = {
  UserManageService: {
    UserManage: {
      subscribe(args) {
        console.log('subscribe', args);
        return { returnCode: '000000' };
      },
      unSubscribe(args) {
        console.log('unSubscribe', args);
      },
      csSubscribe(args) {
        console.log('csSubscribe', args);
      },
      csUnSubscribe(args) {
        console.log('csUnSubscribe', args);
        return {
          returnCode: '302125',
        };
      },
      getValidateCode(args) {
        console.log('getValidateCode', args);
      },
      subscribeBCCS(args) {
        console.log('subscribeBCCS', args);
      },
      addSubscribeReverse(args) {
        console.log('addSubscribeReverse', args);
        return {
          // returnCode: '00000' + Math.round(Math.random()),
          returnCode: '301015',
        };
      },
      subscribeSMS(args) {
        console.log('subscribeSMS', args);
      },
      subscribePlus(args) {
        console.log('subscribePlus', args);

        return {
          returnCode: '000000',
        };
      },
      queryUserAll(args) {
        console.log('queryUserAll', args);
      },
      unSubscribeReverse(args) {
        console.log('unSubscribeReverse', args);
        return {
          // returnCode: '00000' + Math.round(Math.random()),
          returnCode: '301015',
        };
      },
      activateAndPause(args) {
        console.log('activateAndPause', args);
        return {
          returnCode: '000000',
        };
      },
      edit(args) {
        console.log('edit', args);
        return { returnCode: '000000' };
      },
      query(args) {
        console.log(args);
        return {
          returnCode: '000000',
          userInfos: [
            {
              status: 2,
              serviceOrders: 1,
              brand: 1,
            },
            // {
            //   status: 2,
            //   serviceOrders: 1,
            //   brand: 1,
            // },
          ],
        };
      },
    },
  },
};

var userToneManage = {
  UserToneManageService: {
    UserToneManage: {
      setTone(args) {
        console.log('setTone', args);
        return {
          returnCode: '00000' + Math.round(Math.random()),
        };
      },
      addGroup(args) {
        console.log('addGroup', args);
        return {
          returnCode: '000000',
          groupID: '2',
        };
      },
      delGroup(args) {
        console.log('delGroup', args);
        return {
          returnCode: '000030',
        };
      },
      queryGroup(args) {
        console.log('queryGroup', args);
        return {
          returnCode: '000000',
          queryGroupInfos: [
            {
              groupName: 'groupName',
              groupCode: '1',
            },
            {
              groupName: 'groupName',
              groupCode: '2',
            },
            {
              groupName: 'groupName',
              groupCode: '3',
            },
          ],
        };
      },
      addGroupMember(args) {
        console.log('addGroupMember', args);
        return { returnCode: '000000' };
      },
      delGroupMember(args) {
        console.log('delGroupMember', args);
        return { returnCode: '000000' };
      },
      queryGroupMember(args) {
        console.log('queryGroupMember', args);
        return {
          returnCode: '000000',
          groupMemberInfos: [
            {
              memberName: 'memberName',
              memberNumber: '98343434',
            },
            {
              memberName: 'memberName',
              memberNumber: '98343431',
            },
            {
              memberName: 'memberName',
              memberNumber: '98343432',
            },
          ],
        };
      },
      addToneBox(args) {
        console.log('addToneBox', args);
        return {
          returnCode: '00000' + Math.round(Math.random()),
          toneBoxID: '1234',
        };
      },
      editToneBox(args) {
        console.log('editToneBox', args);
        return {
          returnCode: '00000' + Math.round(Math.random()),
        };
      },
      orderTone(args) {
        console.log('orderTone', args);
        return {
          returnCode: '00000' + Math.round(Math.random()),
        };
      },
      delInboxTone(args) {
        console.log('delInboxTone', args);
        toneInfos = toneInfos.filter((t) => t.personID !== args.DelInboxToneEvt.personId);
        console.log(toneInfos);
        return { returnCode: '000000' };
      },
      addTbTone(args) {
        console.log('addTbTone', args);
      },
      delTbTone(args) {
        console.log('delTbTone', args);
      },
      sendSm(args) {
        console.log('sendSm', args);
      },
      queryToneBox(args) {
        console.log('queryToneBox', args);
      },
      queryTbTone(args) {
        console.log('queryTbTone', args);
        return {
          returnCode: '000000',
          queryToneInfos: [
            {
              toneID: 'toneID',
              toneCode: '6547912',
              toneName: 'toneName',
              singerName: 'singerName',
              price: 'price',
              personID: 'personID',
              availableDateTime: 'availableDateTime',
            },
            {
              toneID: 'toneID',
              toneCode: 'toneCode',
              toneName: 'toneName',
              singerName: 'singerName',
              price: 'price',
              personID: 'personID',
              availableDateTime: 'availableDateTime',
            },
          ],
        };
      },
      reOrderTone(args) {
        console.log('reOrderTone', args);
      },
      uploadTone(args) {
        console.log('uploadTone', args);
      },
      querySetting(args) {
        console.log('querySetting', args);
        return {
          returnCode: '000000',
          querySettingInfos: [
            {
              setType: '3',
              toneBoxID: '213',
              callerNumber: '434',
              startTime: '14:00:00',
              endTime: '17:00:00',
              timeType: 2,
              settingID: 'groupSettingID',
            },
            { setType: '2', toneBoxID: '999', settingID: 'defaultSettingID', resourceType: '1' },
          ],
        };
      },
      editSetting(args) {
        console.log('editSetting', args);
        return {
          returnCode: '00000' + Math.round(Math.random()),
        };
      },
      delSetting(args) {
        console.log('delSetting', args);
      },
      queryInboxTone(args) {
        console.log('queryInboxTone', args);
        return {
          returnCode: '000000',
          toneInfos,
        };
      },
    },
  },
};
var crbtPresent = {
  CRBTPresentService: {
    CRBTPresent: {
      presentTone(args) {
        console.log('presentTone', args);
        return {
          returnCode: '000000',
        };
      },
    },
  },
};

app.listen(8001, function () {
  //Note: /wsdl route will be handled by soap module
  //and all other routes & middleware will continue to work
  soap.listen(app, '/radius', radius, fs.readFileSync('./wsdl/Radius.xml', 'utf8'), function () {
    console.log('server initialized');
  });
  soap.listen(
    app,
    '/user-manage',
    userManage,
    fs
      .readFileSync('./wsdl/UserManage.xml', 'utf8')
      .replace(/http:\/\/localhost:8001/g, process.env.HOST || 'http://localhost:8001'),
    function () {
      console.log('userManage initialized');
    }
  );
  soap.listen(
    app,
    '/user-tone-manage',
    userToneManage,
    fs
      .readFileSync('./wsdl/UserToneManage.xml', 'utf8')
      .replace(/http:\/\/localhost:8001/g, process.env.HOST || 'http://localhost:8001'),
    function () {
      console.log('userToneManage initialized');
    }
  );
  soap.listen(
    app,
    '/crbt-present',
    crbtPresent,
    fs
      .readFileSync('./wsdl/CRBTPresent.xml', 'utf8')
      .replace(/http:\/\/localhost:8001/g, process.env.HOST || 'http://localhost:8001'),
    function () {
      console.log('crbtPresent initialized');
    }
  );
});
