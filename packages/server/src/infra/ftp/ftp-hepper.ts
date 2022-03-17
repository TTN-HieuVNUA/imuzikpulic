import { Injectable } from '@nestjs/common';
import { Config } from '../config';
import { LoggingService } from '../logging';
const ftp = require("basic-ftp")
@Injectable()
export class FTP {
  constructor(
    private loggingService: LoggingService,
    private config: Config
  ) { 
    config = new Config();
  }
  // From DB
  uploadFTP = async (
    localFilePath:String,
    ftpFilePath:String
    ) => {
    const crbtLogger = this.loggingService.getLogger('[FTP-HEPPER]');
    const client = new ftp.Client()
    client.ftp.verbose = true
    try {
    crbtLogger.info('[FTP][RBT_CREATION.RBT_FTP_HOST]'+this.config.RBT_CREATION.RBT_FTP_HOST);
    crbtLogger.info('[FTP][RBT_CREATION.RBT_FTP_PORT]'+this.config.RBT_CREATION.RBT_FTP_PORT);
    crbtLogger.info('[FTP][RBT_CREATION.RBT_FTP_USER]'+this.config.RBT_CREATION.RBT_FTP_USER);
    crbtLogger.info('[FTP][RBT_CREATION.RBT_FTP_PASS]'+this.config.RBT_CREATION.RBT_FTP_PASS);
    crbtLogger.info('[FTP][LOCAL_FILE_PATH]'+localFilePath);
    crbtLogger.info('[FTP][FTP_FILE_PATH]'+ftpFilePath);
    await client.access({
        host: this.config.RBT_CREATION.RBT_FTP_HOST,
        port: this.config.RBT_CREATION.RBT_FTP_PORT,
        user: this.config.RBT_CREATION.RBT_FTP_USER,
        password: this.config.RBT_CREATION.RBT_FTP_PASS
      })
    await client.uploadFrom(localFilePath, ftpFilePath)
    }
    catch (ex) {
      crbtLogger.error('[FTP][ERROR-001]'+ex);
      return false;
    }
    client.close()
    return true;
  }
}
