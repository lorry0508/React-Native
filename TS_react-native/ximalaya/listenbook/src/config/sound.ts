import Sound from 'react-native-sound';

Sound.setCategory('Playback');

let sound: Sound;

// 创建播放器
const init = (url: string) => {
  return new Promise((resolve, reject) => {
    sound = new Sound(url, '', error => {
      if (error) {
          console.log('创建播放器失败', error)
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

// 播放，直到播放完成才会返回
const play = () => {
  return new Promise((resolve, reject) => {
    if (sound) {
      sound.play(success => {
        if (success) {
          resolve();
        } else {
          reject();
        }
      });
    } else {
        reject();
    }
  });
};

// 暂停
const pause = () => {
  return new Promise(resolve => {
    if (sound) {
      sound.pause(() => {
        resolve();
      });
    } else {
      resolve();
    }
  });
};

const stop = () => {
  return new Promise(resolve => {
    if (sound) {
      sound.stop(() => {
        resolve();
      });
    } else {
      resolve();
    }
  });
}

// 获取当前播放时间
const getCurrentTime = () => {
  return new Promise(resolve => {
    if (sound && sound.isLoaded()) {
      sound.getCurrentTime(resolve);
    } else {
      resolve(0);
    }
  });
};

// 获取音频时长
const getDuration = () => {
  if (sound) {
    return sound.getDuration();
  }
  return 0;
};

export {init, play, pause, stop, getCurrentTime, getDuration};
