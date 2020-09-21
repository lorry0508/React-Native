import { create } from 'dva-core-ts';
import models from '@/models';
import createloading from 'dva-loading-ts';
// 1.创建实例
const app = create();
// 2.加载model对象
models.forEach(model => {
    app.model(model);
});
app.use(createloading()); // dva中dva-loading-ts插件的使用
// 3.启动dva
app.start();
// 4.导出dva的数据仓库
export default app._store;