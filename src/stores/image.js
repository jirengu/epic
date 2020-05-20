import { observable, action } from 'mobx';
import { Uploader } from '../models';
import { message } from 'antd';

class ImageStore {
  @observable filename = "";
  @observable file = null;
  @observable isUpoading = false;
  @observable serverFile = null;

  @action setFilename(newFilename) {
    this.filename = newFilename;
  }

  @action setFile(newFile) {
    this.file = newFile;
  }

  @action upload() {
    this.isUpoading = true;
    this.serverFile = null;
    return new Promise((resolve, reject) => {
      Uploader.add(this.file, this.filename)
      .then(serverFile => {
        this.serverFile = serverFile;
        resolve(serverFile);
      }).catch(err => {
        message.error('上传失败');
        reject(err);
      }).finally(() => {
        this.isUpoading = false;
      });
    })
      
  }


}


export default new ImageStore();
