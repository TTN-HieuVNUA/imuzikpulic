import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Text } from 'rebass';
import Modal from 'react-modal';
import { useRegisterPackage, useRegisterPackageVIP, useVipBrandId } from '../components';
import { Section } from '../components/Section';
import Footer from '../containers/Footer';
import Header from '../containers/Header';
import { useMyRbtQuery, useRbtPackagesQuery } from '../queries';
import { useHistory } from 'react-router-dom';
const playListIcon = () => {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M64.5156 6.4516V24.1935H67.7414V16.129H90.3221V32.5549C89.8157 32.3738 89.277 32.258 88.7092 32.258C86.0417 32.258 83.8705 34.4293 83.8705 37.0968C83.8705 39.7642 86.0417 41.9355 88.7092 41.9355C91.3766 41.9355 93.5479 39.7642 93.5479 37.0968V6.4516H64.5156ZM67.7414 12.9032V9.6774H90.3221V12.9032H67.7414ZM88.7092 38.7097C87.8192 38.7097 87.0963 37.9867 87.0963 37.0968C87.0963 36.2068 87.8192 35.4838 88.7092 35.4838C89.5991 35.4838 90.3221 36.2068 90.3221 37.0968C90.3221 37.9867 89.5991 38.7097 88.7092 38.7097Z"
        fill="black"
      />
      <path
        d="M56.4516 99.9999H8.06451C3.61801 99.9999 0 96.3819 0 91.9354V53.2258C0 48.7793 3.61801 45.1613 8.06451 45.1613H17.7419V48.3871H8.06451C5.39708 48.3871 3.22581 50.5583 3.22581 53.2258V91.9354C3.22581 94.6029 5.39708 96.7741 8.06451 96.7741H56.4516C59.119 96.7741 61.2903 94.6029 61.2903 91.9354V75.8064H64.5161V91.9354C64.5161 96.3819 60.8981 99.9999 56.4516 99.9999Z"
        fill="black"
      />
      <path
        d="M91.936 54.8387H79.0327V51.6129H91.936C94.6034 51.6129 96.7747 49.4416 96.7747 46.7742V8.06451C96.7747 5.39708 94.6034 3.22581 91.936 3.22581H43.5489C40.8815 3.22581 38.7102 5.39708 38.7102 8.06451V24.1935H35.4844V8.06451C35.4844 3.61801 39.1024 0 43.5489 0H91.936C96.3825 0 100 3.61801 100 8.06451V46.7742C100 51.2207 96.3825 54.8387 91.936 54.8387Z"
        fill="black"
      />
      <path
        d="M72.5805 22.5806H24.1934C19.7469 22.5806 16.1289 26.1986 16.1289 30.6451V69.3548C16.1289 73.8013 19.7469 77.4193 24.1934 77.4193H72.5805C77.027 77.4193 80.645 73.8013 80.645 69.3548V30.6451C80.645 26.1986 77.027 22.5806 72.5805 22.5806ZM37.0966 62.9032V37.0968L62.9031 50L37.0966 62.9032Z"
        fill="#FDCC26"
      />
      <path
        d="M25.8059 45.1613H22.5801V32.258C22.5801 30.479 24.0268 29.0322 25.8059 29.0322H32.2575V32.258H25.8059V45.1613Z"
        fill="black"
      />
      <path d="M22.5801 48.3871H25.8059V51.6129H22.5801V48.3871Z" fill="black" />
      <path d="M22.5801 54.8386H25.8059V58.0644H22.5801V54.8386Z" fill="black" />
      <path
        d="M74.1926 67.7419H70.9668V64.5161H74.1926V67.7419ZM74.1926 61.2903H70.9668V58.0645H74.1926V61.2903ZM74.1926 54.8387H70.9668V51.6129H74.1926V54.8387Z"
        fill="black"
      />
      <path
        d="M9.67698 70.9676H6.45117V67.7418H9.67698V70.9676ZM9.67698 64.516H6.45117V61.2902H9.67698V64.516ZM9.67698 58.0644H6.45117V54.8386H9.67698V58.0644Z"
        fill="black"
      />
      <path
        d="M35.4844 65.5132V34.4869L66.5099 50L35.4844 65.5132ZM38.7102 39.7068V60.2933L59.2975 50L38.7102 39.7068Z"
        fill="black"
      />
      <path d="M22.5801 87.0968H58.0639V90.3226H22.5801V87.0968Z" fill="black" />
      <path d="M6.45117 87.0968H16.1286V90.3226H6.45117V87.0968Z" fill="black" />
      <path d="M24.193 93.5484H14.5156V83.871H24.193V93.5484Z" fill="#FDCC26" />
      <path d="M41.9355 6.4516H61.2904V19.3548H41.9355V6.4516Z" fill="#FDCC26" />
      <path d="M41.9355 6.4516H61.2904V9.6774H41.9355V6.4516Z" fill="black" />
      <path d="M41.9355 12.9033H61.2904V16.1291H41.9355V12.9033Z" fill="black" />
    </svg>
  );
};

const RingMobileIcon = () => {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M45.0092 44.442C44.0528 42.8 43.5479 40.9339 43.5479 39.0339V38.8984C43.5479 35.7129 44.9625 32.692 47.4092 30.6532L51.4915 27.2516C51.5302 27.2194 51.5738 27.1984 51.6125 27.1678V19.3549H6.45117V80.6452H51.6125V53.9758C49.1931 50.9678 46.9673 47.7968 45.0092 44.442Z"
        fill="#FDCC26"
      />
      <path d="M35.4833 6.4516H22.5801V9.67741H35.4833V6.4516Z" fill="black" />
      <path d="M41.9348 6.4516H38.709V9.67741H41.9348V6.4516Z" fill="black" />
      <path d="M19.3547 6.4516H16.1289V9.67741H19.3547V6.4516Z" fill="black" />
      <path d="M33.8708 90.3226H24.1934V93.5484H33.8708V90.3226Z" fill="black" />
      <path
        d="M84.6532 50.1145C83.5387 49 82.0581 48.3871 80.4839 48.3871C78.8613 48.3871 77.2919 49.0661 76.1823 50.25L73.0936 53.5435C71.5758 55.1629 68.779 55.2097 67.2081 53.6387L64.1 50.5306C63.329 49.7581 62.9032 48.729 62.9032 47.6355C62.9032 46.5065 63.3742 45.4177 64.1984 44.6468L67.4919 41.5581C68.6758 40.4484 69.3548 38.8806 69.3548 37.2581C69.3548 35.6839 68.7419 34.2032 67.6274 33.0903L61.0306 26.4935C60.1806 25.6435 59.1694 25.0113 58.0645 24.6274V8.06452C58.0645 3.61774 54.4468 0 50 0H8.06452C3.61774 0 0 3.61774 0 8.06452V91.9355C0 96.3823 3.61774 100 8.06452 100H50C54.4468 100 58.0645 96.3823 58.0645 91.9355V58.8403L57.6081 58.371C53.2935 53.9355 49.5226 48.9758 46.4032 43.629C45.5903 42.2355 45.1613 40.6452 45.1613 38.8968C45.1613 36.1823 46.3565 33.629 48.4419 31.8903L49.6081 30.9194L61.5226 42.8339C60.3613 44.1613 59.6774 45.8597 59.6774 47.6355C59.6774 49.5919 60.4387 51.4306 61.8226 52.8129L64.9306 55.921C66.3129 57.3032 68.1516 58.0661 70.1081 58.0661C71.8839 58.0661 73.5823 57.3823 74.9081 56.2226L86.8226 68.1371L85.8516 69.3032C84.1113 71.3855 81.5581 72.5806 78.8436 72.5806C77.1548 72.5806 75.5032 72.1129 74.0645 71.2274L72.2968 70.1403C68.8436 68.0145 65.5387 65.5968 62.471 62.9516L60.3645 65.3952C63.5597 68.15 67.0065 70.671 70.6048 72.8887L72.3742 73.9758C74.321 75.1726 76.5581 75.8064 78.8436 75.8064C82.5177 75.8064 85.9758 74.1871 88.3274 71.3645L91.729 67.2823C92.9032 65.8758 93.5484 64.0903 93.5484 62.2597C93.5484 60.1645 92.7323 58.1935 91.25 56.7129L84.6532 50.1145ZM8.06452 3.22581H50C52.6677 3.22581 54.8387 5.39677 54.8387 8.06452V12.9032H3.22581V8.06452C3.22581 5.39677 5.39677 3.22581 8.06452 3.22581ZM50 96.7742H8.06452C5.39677 96.7742 3.22581 94.6032 3.22581 91.9355V87.0968H54.8387V91.9355C54.8387 94.6032 52.6677 96.7742 50 96.7742ZM46.3774 29.4145C43.5548 31.7661 41.9355 35.2226 41.9355 39.0339C41.9355 41.2161 42.5161 43.3677 43.6161 45.2532C46.7581 50.6387 50.5306 55.6452 54.8387 60.1484V83.871H3.22581V16.129H54.8387V24.221C53.2355 24.3532 51.7016 24.9774 50.4597 26.0129L46.3774 29.4145ZM52.5242 28.4903C54.3 27.0113 57.1129 27.1387 58.7484 28.7726L65.3452 35.3694C65.8516 35.8742 66.129 36.5452 66.129 37.2581C66.129 37.9935 65.821 38.7032 65.2855 39.2065L63.8242 40.5774L52.0968 28.85L52.5242 28.4903ZM89.2516 65.2177L88.8935 65.6468L77.1661 53.9194L78.5371 52.4581C79.5258 51.4016 81.3468 51.3726 82.3726 52.3968L88.9694 58.9935C89.8419 59.8645 90.3226 61.0242 90.3226 62.2597C90.3226 63.3387 89.9419 64.3887 89.2516 65.2177Z"
        fill="black"
      />
      <path
        d="M94.8029 24.5516C87.8851 17.6338 76.6287 17.6338 69.7109 24.5516L71.9916 26.8322C77.6513 21.1726 86.8609 21.1726 92.5222 26.8322C98.1819 32.4919 98.1819 41.7016 92.5222 47.3629L94.8029 49.6435C101.721 42.7242 101.721 31.4693 94.8029 24.5516Z"
        fill="black"
      />
      <path
        d="M90.2415 45.0806C94.6431 40.679 94.6431 33.5161 90.2415 29.1144C85.8399 24.7128 78.677 24.7128 74.2754 29.1144L76.556 31.3951C79.6996 28.2515 84.8173 28.2515 87.9609 31.3951C91.1044 34.5402 91.1044 39.6564 87.9609 42.7999L90.2415 45.0806Z"
        fill="black"
      />
      <path
        d="M33.8701 52.0096V51.5806C35.8798 50.0661 37.0959 47.6838 37.0959 45.1629V42.2725C37.0959 37.9371 33.8685 34.2629 29.7475 33.9048C27.4878 33.708 25.2443 34.4693 23.583 35.9919C21.9201 37.5145 20.9669 39.6822 20.9669 41.9354V45.1612C20.9669 47.6822 22.183 50.0661 24.1927 51.579V52.008L18.7249 53.5709C15.2959 54.55 12.9023 57.7258 12.9023 61.2903V66.129H45.1604V61.2903C45.1604 57.7258 42.7669 54.55 39.3378 53.5709L33.8701 52.0096ZM41.9346 61.2903V62.9032H16.1282V61.2903C16.1282 59.158 17.5604 57.258 19.612 56.6725L27.4185 54.4419V49.7903L26.6169 49.3241C25.0991 48.4403 24.1927 46.8838 24.1927 45.1612V41.9354C24.1927 40.5838 24.7652 39.2822 25.7636 38.3677C26.7733 37.4403 28.083 36.9919 29.4701 37.1161C31.9362 37.3306 33.8701 39.5935 33.8701 42.2709V45.1612C33.8701 46.8838 32.9636 48.4403 31.4459 49.3241L30.6443 49.7903V54.4419L38.4507 56.6725C40.5023 57.258 41.9346 59.158 41.9346 61.2903Z"
        fill="black"
      />
    </svg>
  );
};

const BlockAdsIcon = () => {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M93.5482 44H74.1934V47.2258H93.5482V44Z" fill="black" />
      <path d="M93.5482 50.4515H74.1934V53.6773H93.5482V50.4515Z" fill="black" />
      <path d="M87.0966 56.9032H74.1934V60.129H87.0966V56.9032Z" fill="black" />
      <path d="M93.5481 56.9032H90.3223V60.129H93.5481V56.9032Z" fill="black" />
      <path d="M85.4836 63.3549H82.2578V66.5807H85.4836V63.3549Z" fill="black" />
      <path d="M91.9348 63.3549H88.709V66.5807H91.9348V63.3549Z" fill="black" />
      <path d="M79.0324 63.3549H75.8066V66.5807H79.0324V63.3549Z" fill="black" />
      <path d="M59.677 77.4193H56.4512V80.6435H59.677V77.4193Z" fill="black" />
      <path
        d="M3.22581 12.9032H56.4516V19.3548H59.6774V8.06452C59.6774 3.61774 56.0597 0 51.6129 0H8.06452C3.61774 0 0 3.61774 0 8.06452V80.6452H3.22581V12.9032ZM8.06452 3.22581H51.6129C54.2806 3.22581 56.4516 5.39677 56.4516 8.06452V9.67742H3.22581V8.06452C3.22581 5.39677 5.39677 3.22581 8.06452 3.22581Z"
        fill="black"
      />
      <path
        d="M0 91.9355C0 96.3823 3.61774 100 8.06452 100H51.6129C56.0597 100 59.6774 96.3823 59.6774 91.9355V83.871H0V91.9355ZM3.22581 87.0968H56.4516V91.9355C56.4516 94.6032 54.2806 96.7742 51.6129 96.7742H8.06452C5.39677 96.7742 3.22581 94.6032 3.22581 91.9355V87.0968Z"
        fill="black"
      />
      <path d="M35.4837 90.3226H24.1934V93.5484H35.4837V90.3226Z" fill="black" />
      <path
        d="M9.67773 22.5807V74.1936H100V22.5807H9.67773ZM96.7745 70.9678H12.9035V25.8065H96.7745V70.9678Z"
        fill="black"
      />
      <path
        d="M41.9357 58.0646V51.6129V48.3871V46.7742C41.9357 42.3275 38.3179 38.7097 33.8712 38.7097C29.4244 38.7097 25.8066 42.3275 25.8066 46.7742V48.3871V51.6129V58.0646H29.0324V51.6129H38.7099V58.0646H41.9357ZM29.0324 48.3871V46.7742C29.0324 44.1065 31.2034 41.9355 33.8712 41.9355C36.5389 41.9355 38.7099 44.1065 38.7099 46.7742V48.3871H29.0324Z"
        fill="#FDCC26"
      />
      <path
        d="M45.1621 38.7097V58.0646H51.6137C56.9508 58.0646 61.2911 53.7242 61.2911 48.3871C61.2911 43.05 56.9508 38.7097 51.6137 38.7097H45.1621ZM58.0653 48.3871C58.0653 51.9452 55.1718 54.8387 51.6137 54.8387H48.3879V41.9355H51.6137C55.1718 41.9355 58.0653 44.8291 58.0653 48.3871Z"
        fill="#FDCC26"
      />
      <path d="M19.3547 32.258H70.9676V29.0322H16.1289V61.2903H19.3547V32.258Z" fill="#FDCC26" />
      <path d="M70.9676 35.4839H67.7418V64.5161H16.1289V67.742H70.9676V35.4839Z" fill="#FDCC26" />
      <path
        d="M89.9104 31.6389L86.2208 35.3285L90.1386 39.2463L88.2272 41.1576L84.3095 37.2398L80.6389 40.9104L78.8988 39.1702L82.5693 35.4996L78.6705 31.6009L80.5819 29.6895L84.4806 33.5883L88.1702 29.8988L89.9104 31.6389Z"
        fill="#FDCC26"
      />
    </svg>
  );
};

const RingPhoneIcon = () => {
  return (
    <svg
      width="101"
      height="100"
      viewBox="0 0 101 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M50.306 67.7419C52.193 67.7419 53.9996 68.42 55.4188 69.662L63.4676 76.7098C65.1608 78.1778 66.1287 80.3231 66.1287 82.5652C66.1287 84.4522 65.4514 86.258 64.2094 87.678L63.8708 88.0647L45.2413 69.436L45.209 69.3871C46.5644 68.3232 48.2576 67.7419 49.9997 67.7419H50.306Z"
        fill="#FDCC26"
      />
      <path
        d="M32.2583 49.6936V50C32.2583 51.7421 31.6779 53.4361 30.5973 54.7907L11.9521 36.1454L11.9355 36.1297L12.323 35.791C13.7422 34.5491 15.5488 33.871 17.4358 33.871C19.678 33.871 21.8225 34.8389 23.2904 36.5329L30.339 44.5809C31.581 46 32.2583 47.8067 32.2583 49.6936Z"
        fill="#FDCC26"
      />
      <path
        d="M67.7431 0C56.1819 0 46.7754 9.4065 46.7754 20.9677V30.6452H48.4253C48.4253 30.4341 48.3977 30.2278 48.419 30.012C48.738 26.657 51.748 24.1936 55.1171 24.1936H56.0606C60.4418 24.1936 64.6449 22.4539 67.7431 19.3548C70.8414 22.4539 75.0429 24.1936 79.4257 24.1936H80.3691C83.7383 24.1936 86.7483 26.657 87.0673 30.012C87.0885 30.2278 87.061 30.4325 87.061 30.6452H88.7109V20.9677C88.7109 9.4065 79.3044 0 67.7431 0Z"
        fill="#FDCC26"
      />
      <path
        d="M100.095 63.7506C100.095 58.7355 96.7277 54.2717 91.9064 52.8958L77.5147 48.784V44.5746C79.2772 42.9633 80.6404 40.9274 81.4422 38.6262C83.4126 38.4277 85.2697 37.5488 86.6132 36.0698C88.1371 34.3923 88.8885 32.1297 88.6727 29.8584C88.2821 25.7781 84.6357 22.5807 80.368 22.5807H79.4245C75.4418 22.5807 71.6986 21.0308 68.8823 18.2145L67.7419 17.0749L66.6016 18.2145C63.7853 21.0308 60.0421 22.5807 56.0594 22.5807H54.8387V22.5862C50.6923 22.7201 47.1932 25.8663 46.8112 29.86C46.5954 32.1297 47.3467 34.3939 48.8707 36.0714C50.2142 37.5488 52.0713 38.4277 54.0417 38.6278C54.8584 40.9715 56.2547 43.0373 58.0645 44.662V48.7856L43.6728 52.8974C38.8514 54.2717 35.4839 58.7355 35.4839 63.7506V72.2924C34.4632 72.031 33.4985 71.5403 32.7306 70.7732L29.2276 67.2694C28.0793 66.1196 27.4194 64.5295 27.4194 62.9032C27.4194 61.2777 28.0793 59.6877 29.2276 58.5371L31.1193 56.6438C32.8936 54.871 33.871 52.5131 33.871 50.0055V49.6968C33.871 47.4231 33.0448 45.2275 31.5485 43.5145L24.5062 35.4666C22.7208 33.4276 20.1471 32.2581 17.4387 32.2581C15.1627 32.2581 12.9678 33.0842 11.2549 34.5814L5.16948 39.9068C1.88382 42.7813 0 46.9325 0 51.2971C0 53.8905 0.672568 56.4571 1.94367 58.7182C10.439 73.8195 22.7437 86.5794 37.5307 95.6165L41.1598 97.8343C43.4807 99.2503 46.1434 100 48.8644 100C53.1274 100 57.1809 98.1603 59.9854 94.9534L65.4179 88.7436C66.9158 87.0322 67.7419 84.8373 67.7419 82.5613C67.7419 81.9116 67.6711 81.2697 67.5403 80.6452H100.095V63.7506ZM82.5487 53.5779L76.9547 63.6435L70.1306 57.9566L76.2971 51.7909L82.5487 53.5779ZM85.461 30.1648C85.5934 31.5516 85.1547 32.8795 84.2262 33.8985C83.6694 34.5097 82.9598 34.9405 82.1903 35.2019C82.2305 34.7633 82.2581 34.3215 82.2581 33.871V26.1538C83.9938 26.8114 85.287 28.3408 85.461 30.1648ZM51.2577 33.9001C50.3292 32.8795 49.8905 31.5532 50.0228 30.1663C50.1969 28.3424 51.4901 26.813 53.2258 26.1553V33.871C53.2258 34.3215 53.2534 34.7633 53.2935 35.2035C52.5241 34.9405 51.8145 34.5113 51.2577 33.9001ZM56.4516 33.871V25.7891C60.6288 25.7001 64.576 24.2195 67.7419 21.5442C70.9079 24.2195 74.8551 25.7001 79.0323 25.7891V33.871C79.0323 40.0958 73.9675 45.1613 67.7419 45.1613C61.5164 45.1613 56.4516 40.0958 56.4516 33.871ZM67.7419 48.3871C70.0983 48.3871 72.3176 47.8114 74.2889 46.8096V49.2377L67.7419 55.7846L61.2903 49.333V46.8553C63.2372 47.828 65.4226 48.3871 67.7419 48.3871ZM59.208 51.8114L65.3533 57.9566L58.5292 63.6435L52.9502 53.6007L59.208 51.8114ZM62.9922 86.6211L57.5597 92.8309C55.3664 95.3362 52.1965 96.7742 48.8644 96.7742C46.7372 96.7742 44.6549 96.1891 42.842 95.0794L39.2129 92.8617C24.8968 84.112 12.9804 71.7585 4.75523 57.136C3.75504 55.3569 3.22581 53.3377 3.22581 51.2971C3.22581 47.8634 4.70798 44.5974 7.29193 42.3356L13.3773 37.0102C14.5035 36.0265 15.9455 35.4839 17.4387 35.4839C19.2162 35.4839 20.9063 36.2517 22.0774 37.589L29.1197 45.6378C30.1033 46.7616 30.6452 48.2036 30.6452 49.6968V50.0055C30.6452 51.6523 30.0049 53.199 28.8385 54.363L26.9468 56.2571C25.1969 58.007 24.1936 60.4295 24.1936 62.9032C24.1936 65.3777 25.1969 67.8002 26.9468 69.5502L30.4499 73.0532C32.2242 74.8291 34.5853 75.8065 37.0968 75.8065C39.6083 75.8065 41.9694 74.8291 43.7437 73.0532L45.6354 71.1599C46.8018 69.9951 48.3501 69.3549 49.9969 69.3549H50.3032C51.7964 69.3549 53.2384 69.8975 54.363 70.8811L62.411 77.9226C63.7483 79.0921 64.5161 80.7846 64.5161 82.5613C64.5161 84.0553 63.9743 85.4973 62.9922 86.6211ZM96.8695 77.4194H87.1448V66.1291H83.919V77.4194H66.1936C65.7305 76.7145 65.1824 76.0616 64.5358 75.4954L56.4886 68.4539C54.7741 66.9552 52.5792 66.1291 50.3032 66.1291H49.9969C47.4885 66.1291 45.1306 67.1048 43.3562 68.8792L41.4645 70.7732C40.6951 71.5403 39.7319 72.031 38.7113 72.2924V63.7506C38.7113 60.1681 41.1164 56.9809 44.5596 55.9972L49.7661 54.5103L57.6014 68.6146L66.129 61.5085V74.1936H69.3549V61.5085L77.884 68.6146L85.732 54.4875L91.0211 55.9988C94.4643 56.9809 96.8695 60.1697 96.8695 63.7522V77.4194Z"
        fill="black"
      />
    </svg>
  );
};
const RoundTickIcon = () => {
  return (
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d)">
        <circle cx="45" cy="45" r="25" fill="#262523" />
        <circle cx="45" cy="45" r="23.5" stroke="url(#paint0_linear)" strokeWidth="3" />
      </g>
      <path
        d="M41.6 48.6L37.4 44.4L36 45.8L41.6 51.4L53.6 39.4L52.2 38L41.6 48.6Z"
        fill="url(#paint1_linear)"
        stroke="url(#paint2_linear)"
        strokeLinejoin="round"
      />
      <defs>
        <filter
          id="filter0_d"
          x="0"
          y="0"
          width="90"
          height="90"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="10" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <linearGradient
          id="paint0_linear"
          x1="70"
          y1="20"
          x2="20"
          y2="20"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#11998E" />
          <stop offset="1" stopColor="#38EF7D" />
        </linearGradient>
        <linearGradient
          id="paint1_linear"
          x1="53.6"
          y1="38"
          x2="36"
          y2="38"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#11998E" />
          <stop offset="1" stopColor="#38EF7D" />
        </linearGradient>
        <linearGradient
          id="paint2_linear"
          x1="53.6"
          y1="38"
          x2="36"
          y2="38"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#11998E" />
          <stop offset="1" stopColor="#38EF7D" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const IconFilter = (props: { name: string }) => {
  switch (props.name) {
    case 'playListIcon':
      return playListIcon();
    case 'RingMobileIcon':
      return RingMobileIcon();
    case 'BlockAdsIcon':
      return BlockAdsIcon();
    case 'RingPhoneIcon':
      return RingPhoneIcon();
    default:
      return <React.Fragment></React.Fragment>;
  }
};
const CardVip = (props: {
  title: string;
  description: string;
  iconName: string;
  padding?: number;
}) => {
  return (
    <Box width={0.25} p={2}>
      <Flex
        height="387px"
        flex={1}
        bg="alternativeBackground"
        alignItems="center"
        px={4}
        py={5}
        flexDirection="column"
        css={{
          boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.5)',
          position: 'relative',
          borderRadius: '10px',
        }}>
        <Flex
          bg="defaultBackground"
          height={0}
          css={{
            position: 'absolute',
            top: '-45px',
            boxShadow: ' 0px 0px 20px rgba(0, 0, 0, 0.5);',
          }}>
          <RoundTickIcon />
        </Flex>
        <Flex
          mt={4}
          height={40}
          alignItems="center"
          px={props.padding ? props.padding : 4}
          justifyContent="center">
          <Text textAlign="center" flex={1} color="yellow" fontSize={3} fontWeight="bold">
            {props.title}
          </Text>
        </Flex>
        <Text
          flex={1}
          fontFamily="Helvetica"
          textAlign="center"
          mt={7}
          maxWidth={218}
          fontSize={1}
          color="#848484">
          {props.description}
        </Text>
        <Box mb={5} bg="alternativeBackground">
          <IconFilter name={props.iconName} />
        </Box>
      </Flex>
    </Box>
  );
};
const FeeCard = (props: { price: string }) => {
  return (
    <Flex
      height={331}
      mt={5}
      style={{
        backgroundImage: `url("/imgs/vipmember.svg")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        objectFit: 'cover',
      }}
      justifyContent="center">
      <Box marginTop={9}>
        <Flex alignItems="center" justifyContent="center">
          <Text color="#737373" fontSize={3}>
            Chỉ
          </Text>
          <Text color="#222222" fontSize={7} fontWeight="bold">
            {props.price}
          </Text>
        </Flex>
        <Flex alignItems="center" justifyContent="center">
          <Text color="#737373" textAlign="center" fontSize={3}>
            Để trở thành IVIP <br></br>và hưởng mọi đặc quyền của VIP member
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};
const VipBanner = () => {
  let history = useHistory();
  const [modalAlert1, setModalAlert1] = useState(false);
  const [modalAlert2, setModalAlert2] = useState(false);
  const vipBrandId = useVipBrandId();
  const [brandId, setBrandId] = useState("");
  const [myPackage, setMyPackage] = useState(null);
  const { register, node,myRbtData,packagesData, loading } = useRegisterPackageVIP(vipBrandId);

  useEffect(() => {
    setBrandId(myRbtData?.myRbt?.brandId);
  }, [myRbtData]);
  const redirectToPackageScreen = () => {
    history.push('/ca-nhan/goi-cuoc');
  }
  const showConfirmStep1 = () => {
    const _myPackage = packagesData?.rbtPackages?.find((p) => p.brandId === brandId);
    setMyPackage(_myPackage);
    setModalAlert1(true);
  }
  const showConfirmStep2 = () => {
    setModalAlert1(false);
    setModalAlert2(true);
  }
  return (
    <Flex
      pt={8}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height={374}
      style={{
        backgroundImage: `url("/imgs/bannervip.svg")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        objectFit: 'cover',
      }}>
      <Text fontSize={7} fontWeight="bold">
        Nâng cấp
      </Text>
      <Text fontSize={7} fontWeight="bold" color="#FDCC26">
        VIP MEMBER
      </Text>
      {brandId === "472" ? (
        <Button
          disabled={true}
          variant="primary"
          mt={4}
          fontSize={3}
          py={3}
          px={8}
          style={{ borderRadius: '8px' }}
        >
          Bạn đang là thành viên VIP
        </Button>
      ) : (brandId ?? "0") === "0" ? (
        <Button
          disabled={loading}
          variant="secondary"
          mt={4}
          fontSize={3}
          py={3}
          px={8}
          style={{ borderRadius: '8px' }}
          onClick={register}>
          Đăng ký thành viên VIP
        </Button>
      ) : (<Button
        disabled={loading}
        variant="secondary"
        mt={4}
        fontSize={3}
        py={3}
        px={8}
        style={{ borderRadius: '8px' }}
        onClick={() => showConfirmStep1()}>
        Đăng ký thành viên VIP
      </Button>
      )}
      {node}

      <Modal
        isOpen={modalAlert1}
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 1000,
          },
          content: {
            position: 'absolute',
            top: '0px',
            left: '0px',
            right: '0px',
            bottom: '0px',
            border: 'none',
            background: 'transparent',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: 'none',
            outline: 'none',
            padding: '0px',
          },
        }}>
        <Flex
          justifyContent="space-around"
          alignItems="center"
          height="100%"
          width="100%"
          css={{ position: 'relative' }}>
          <Box
            css={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
            onClick={() => setModalAlert1(false)}
          />
          <Flex
            maxWidth="700px"
            maxHeight="250px"
            width="100%"
            height="100%"
            css={{ position: 'relative' }}
            bg="#121212"
            sx={{
              boxShadow: '0px 0px 20px #000000',
              borderRadius: 16,
            }}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            px={57}
            py={37}>
            <Text
              color="white"
              fontSize="20px"
              lineHeight="24px"
              fontWeight="bold"
              textAlign="center">
              Bạn đang sử dụng gói cước {myPackage?.name}, giá cước {myPackage?.price} đồng/
              {myPackage?.period}. Bạn có đồng ý chuyển sang gói VIP để trở thành VIP Member?
            </Text>
            <Flex alignItems="center" mt={27}>
              <Button
                onClick={() => setModalAlert1(false)}
                variant="clear"
                fontSize={20}
                lineHeight="24px"
                mr={32}>
                Bỏ qua
              </Button>
              <Button
                disabled={loading}
                onClick={() => showConfirmStep2()}
                width={113}
                height={48}
                sx={{ borderRadius: 5 }}>
                Đồng ý
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Modal>

      <Modal
        isOpen={modalAlert2}
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 1000,
          },
          content: {
            position: 'absolute',
            top: '0px',
            left: '0px',
            right: '0px',
            bottom: '0px',
            border: 'none',
            background: 'transparent',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: 'none',
            outline: 'none',
            padding: '0px',
          },
        }}>
        <Flex
          justifyContent="space-around"
          alignItems="center"
          height="100%"
          width="100%"
          css={{ position: 'relative' }}>
          <Box
            css={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
            onClick={() => setModalAlert2(false)}
          />
          <Flex
            maxWidth="700px"
            maxHeight="250px"
            width="100%"
            height="100%"
            css={{ position: 'relative' }}
            bg="#121212"
            sx={{
              boxShadow: '0px 0px 20px #000000',
              borderRadius: 16,
            }}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            px={57}
            py={37}>
            <Text
              color="white"
              fontSize="20px"
              lineHeight="24px"
              fontWeight="bold"
              textAlign="center">
              Để đăng ký, vui lòng hủy gói cước đang sử dụng tại trang thông tin gói cước.
            </Text>
            <Flex alignItems="center" mt={27}>
              <Button
                onClick={() => setModalAlert2(false)}
                variant="clear"
                fontSize={20}
                lineHeight="24px"
                mr={32}>
                Bỏ qua
              </Button>
              <Button
                disabled={loading}
                onClick={() => redirectToPackageScreen()}
                width={113}
                height={48}
                sx={{ borderRadius: 5 }}>
                Đồng ý
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Modal>

    </Flex>
  );
};
export default function VipMember() {
  useEffect(() => {
    const loading_screen = document.getElementById('ipl-progress-indicator')
    loading_screen.classList.remove('available')
    setTimeout(() => {
      loading_screen.classList.add('available')
    }, 500)
  }, []);
  return (
    <Box>
      <Header.Fixed />
      <VipBanner />
      <Section>
        <FeeCard price="15000đ/tháng" />
      </Section>
      <Section>
        <Flex
          mt={9}
          mb={9}
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap">
          <CardVip
            title={'Âm nhạc sống động, đẳng cấp'}
            description={
              'Thưởng thức kho nhạc số chất lượng cao freedata, cập nhật thường xuyên nội dung Hot'
            }
            iconName={'playListIcon'}
          />
          <CardVip
            title={'Cài đặt nhạc chờ không giới hạn'}
            description={'Cài đặt tất cả các bài nhạc chờ chỉ với giá 0 đồng'}
            iconName={'RingMobileIcon'}
            padding={5}
          />
          <CardVip
            title={'Không quảng cáo'}
            description={'Nghe nhạc thoải mái mà không sợ bị quảng cáo làm phiền'}
            iconName={'BlockAdsIcon'}
          />
          <CardVip
            title={'Nhạc chờ cho người gọi'}
            description={
              'Tính năng miễn phí cho phép người gọi nghe nhạc chờ do chính mình cài đặt khi gọi tới thuê bao khác'
            }
            iconName={'RingPhoneIcon'}
          />
        </Flex>
      </Section>
      <Footer />
    </Box>
  );
}
