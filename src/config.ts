const env = process.env.NODE_ENV || 'production';
const pwd = process.cwd();
const baseConfig = {
  jwtConfig: {
    expiresIn: '999d', // token过期时间
    secret: 'fe-server', // 加密key
  },
};

const configMap = {
  dev: {
    ossConfig: {
      region: 'xxxx',
      accessKeyId: 'xxxxx',
      accessKeySecret: 'xxxxx',
      bucket: 'xxx',
      // 上传到指定Bucket的文件夹下
      ossFolder: 'xxx',
    },
  },
  production: {
    ossConfig: {
      region: 'xxxx',
      accessKeyId: 'xxxxx',
      accessKeySecret: 'xxxxx',
      bucket: 'xxx',
      // 上传到指定Bucket的文件夹下
      ossFolder: 'xxx',
    },
    uploadConfig: {
      tempFile: `${pwd}/public/temp-upload-oos`,
    },
  },
};
export default () => Object.assign(baseConfig, configMap[env]);
