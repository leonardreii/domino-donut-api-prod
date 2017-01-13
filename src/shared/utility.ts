export module Utility {
	export function replaceAll(pString, pSearch, pReplacement) {
		return pString.replace(new RegExp(pSearch, 'g'), pReplacement);
	};
	
	export function sortJSON(pJSONObject: any, pSortKey: string, pASC?: boolean) {
		let vAsc: boolean = pASC ? true : false;
		return pJSONObject.sort(function(a,b){
			if(typeof a[pSortKey] === 'number') {
				return vAsc ? a[pSortKey] - b[pSortKey] : b[pSortKey] - a[pSortKey];
			}
			else if (typeof a[pSortKey] === 'string') {
				if (vAsc) {
					return (a[pSortKey] > b[pSortKey]) ? 1 : ((a[pSortKey] < b[pSortKey]) ? -1 : 0);
				}
				else {
					return (b[pSortKey] > a[pSortKey]) ? 1 : ((b[pSortKey] < a[pSortKey]) ? -1 : 0);
				}
			}
		});
	}
	export function excludeJSON(obj,type,filter){
		var vData = obj;
		for(let i = 0;i<vData.length;i++){
			if(vData[i][type] == filter){
				vData.splice(i,1);
				i-=1;
			}
		}
		return vData;
	}
	export function findJSON(obj,type,filter){
		var temp = [];
		for(var data in obj){
			if(obj[data][type] == filter)
				temp.push(obj[data]);
		}
		return temp;
	}
	
	export function getMonth(date){
		var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
		"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
		];
		return monthNames[parseInt(date)-1];
	}
	export function getFormattedDate(datestr){
		var year = parseInt(datestr.substr(4,4));
		var month = parseInt(datestr.substr(2,2));
		var date = parseInt(datestr.substr(0,2));
		var d = new Date(year,month-1,date);
		d.setDate(d.getDate()+1);
		return d.getDate() +" "+ Utility.getMonth(d.getMonth()+1)+" "+d.getFullYear();
	}

	export function getTime(str){
		var hh = parseInt(str.substr(0,2)) * 60 *60;
		var mm = parseInt(str.substr(3,2)) * 60;
		var ss = parseInt(str.substr(6,2));
		return hh+mm+ss;
	}

	export function getHHMMSS(sec_num){
		var hours   = Math.floor(sec_num / 3600);
		var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
		var seconds = sec_num - (hours * 3600) - (minutes * 60);

		var h:any = hours;
		var m:any = minutes;
		var s:any = seconds;
		if (hours   < 10) {h   = "0"+hours;}
		if (minutes < 10) {m = "0"+minutes;}
		if (seconds < 10) {s = "0"+seconds;}
		return h+':'+m+':'+s;
	}
	export function cloneObject(obj) {
		if (obj === null || typeof obj !== 'object') {
			return obj;
		}
	
		var temp = obj.constructor(); // give temp the original obj's constructor
		for (var key in obj) {
			temp[key] = cloneObject(obj[key]);
		}
		return temp;
	}

	export function getRandomSerial(length: number) {
		var crypto = require("crypto");
		var chars = "0123456789";
        var max = length;
        var code = "";
        var rnd = crypto.randomBytes(max);
        var value = new Array(max);
        var len = chars.length;
        for (var i = 0; i < max; i++) {
            value[i] = chars[rnd[i] % len]
            code += value[i];
        };
        return (code);
	}

	export function getCurrentDateTime() {
		var current = new Date();
		var year = current.getFullYear();
		var month = ('0' + (current.getMonth()+1)).slice(-2);
		var day = ('0' + current.getDate()).slice(-2);
		var hour = ('0' + current.getHours()).slice(-2);
		var minute = ('0' + current.getMinutes()).slice(-2);
		var sec = ('0' + current.getSeconds()).slice(-2);

		var dateTime = {
			pYear : year,
			pMonth : month,
			pDay : day,
			pHour : hour,
			pMinute : minute,
			pSecond : sec
		}
		
		return dateTime;
	}
}