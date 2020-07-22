import Realm from 'realm';

export interface IProgram {
  id: string;
  title: string;
  thumbnailUrl: string;
  currentTime: number;
  duration: number;
  rate: number;
}

class Program {
  static schema = {
    name: 'Program',
    primaryKey: 'id',
    properties: {
      id: 'string',
      title: 'string',
      thumbnailUrl: 'string',
      currentTime: {type: 'double', default: 0},
      duration: {type: 'double', default: 0},
      rate: {type: 'double', default: 0},
    },
  };
}

const realm = new Realm({
  schema: [Program],
  schemaVersion: 1,
  migration: (oldRealm, newRealm) => {
    if (oldRealm.schemaVersion < 1) {
      const oldObjects = oldRealm.objects<IProgram>('Program');
      const newObjects = newRealm.objects<IProgram>('Program');
      for (let i = 0; i < oldObjects.length; i++) {
        newObjects[i].rate =
          Math.floor(
            ((oldObjects[i].currentTime * 100) / oldObjects[i].duration) * 100,
          ) / 100;
      }
    }
  },
});

export function saveProgram(data: Partial<IProgram>) {
  try {
    realm.write(() => {
      realm.create('Program', data, true);
    });
  } catch (error) {
    console.log('保存失败');
  }
}

export default realm;
