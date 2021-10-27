window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;

window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

if(!window.indexedDB){
    alert("Browser does not support indexdb");
}

var db;
var request = window.indexedDB.open("CodeToDodb", 1);

request.onerror = function(event){
    console.log("error"+ event.target.result)
}

request.onsuccess = function(event){
    db = request.result;
    console.log("success " +db)
}

request.onupgradeneeded = function(event){
    var db = event.target.result;
    var objectStore = db.createObjectStore("CodeToDodb")
}