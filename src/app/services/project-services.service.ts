import { Injectable } from '@angular/core';
declare var db: any
@Injectable({
  providedIn: 'root'
})

export class ProjectServicesService {

  private storageName = 'CodeToDodb';

  constructor() {

   }

  addProject(keyname, value) {
    return new Promise(async(resolve, reject)=>{
    if(db != undefined){
      const request = db.transaction([this.storageName],"readwrite")
      .objectStore(this.storageName).put(value,keyname);
      request.onsuccess = await function(event){
        if(event.target.result){
            resolve('success')
        } else {
          resolve(false);
        }
      }
    }
    });
  }
  
  deleteProject(keyname) {
    return new Promise(async(resolve, reject)=>{
      if(db != undefined){
        const request = db.transaction([this.storageName],"readwrite")
        .objectStore(this.storageName).delete(keyname);
        request.onsuccess = await function(event){
          if(event.target.result){
              resolve('success')
          } else {
            resolve(false);
          }
        }
      }
      });
  }

  getProjects(keyname) {
    return new Promise(async(resolve, reject)=>{
      if(db != undefined){
        const request = db.transaction([this.storageName],"readwrite")
        .objectStore(this.storageName).get(keyname);
        request.onsuccess = await function(event){
          if(event.target.result){
              resolve(event.target.result)
          } else {
            resolve(false);
          }
        }
      }
      });
  }

  getAllProjects() {
    return new Promise(async(resolve, reject)=>{
      if(db != undefined){
        const request = db.transaction([this.storageName],"readwrite")
        .objectStore(this.storageName).getAll();
        request.onsuccess = await function(event){
          if(event.target.result){
              resolve(event.target.result)
          } else {
            resolve(false);
          }
        }
      }
      });
  }
  getAllKeys() {
    return new Promise(async(resolve, reject)=>{
      if(db != undefined){
        const request = db.transaction([this.storageName],"readwrite")
        .objectStore(this.storageName).getAllKeys();
        request.onsuccess = await function(event){
          if(event.target.result){
              resolve(event.target.result)
          } else {
            resolve(false);
          }
        }
      }
      });
  }
}
