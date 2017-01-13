'use strict';
import {Logging} from './logging.service';
import {ErrorHandlingService} from './error-handling.service';

var vEnv = require('../config/mode.json')['mode'];
const config = require('../config/config.json')[vEnv];
var Archiver = require('archiver');
var fs = require('fs');

export class ArchiverZip {
    zip: any;
    constructor() {
        Logging('initialize Archiver Service');
        this.zip = Archiver('zip');
        this.zip.on('entry', function(data){
                Logging("Added file : "+data.name + " to zip.");
        });
        this.zip.on('error', function(err){
            Logging(err);
        });
    }
    async addFile(con, data, name): Promise<any> {
        return new Promise<any>(
            function (pResolve, pReject) {
                var callback = function(){
                    Logging('msk2 : ');
                };
                con.zip.append(data, { name: name },callback);
            });
    }
    addFileSync(data, name) {
        this.zip.append(data, { name: name });
    }
    async finalize(con, path): Promise<any> {
        return new Promise<any>(
            function (pResolve, pReject) {
                try {
                    con.zip.finalize();
                    var output = fs.createWriteStream(path);
                    con.zip.pipe(output);
                    output.on('close', function () {
                        Logging(con.zip.pointer() + ' total bytes');
                        Logging('file : ' + path);
                        pResolve(true);
                    });
                } catch (err) {
                    ErrorHandlingService.throwPromiseError(pReject, 3008, 'Unable to create zip');
                }
            });
    }
    getInstance() {
        return this.zip;
    }
}