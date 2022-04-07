import fs from 'fs';

/**
 * 读取文件
 * @param path
 * @returns {any|null}
 */
const readFile = (path) => {
  if (fs.existsSync(path)) {
    const data = fs.readFileSync(path) as unknown as string;
    return data.toString() ? JSON.parse(data) : null;
  }
  // 如果不存在, 则创建空文件
  const pathArr = path.split('/');
  pathArr.pop();
  // 创建目录
  fs.mkdirSync(pathArr.join('/'), { recursive: true });
  fs.writeFileSync(path, JSON.stringify([]));
  return null;
};

export { readFile };
