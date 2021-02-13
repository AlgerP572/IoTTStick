function constructFooterContent(a){var b;b=createEmptyDiv(a,"div","tile-1_4","footerstatsdiv1"),createDispText(b,"","Date / Time","n/a","sysdatetime"),createDispText(b,"","System Uptime","n/a","uptime"),createDispText(b,"","Core Temp.:","n/a","temp"),createDispText(b,"","Ext. Voltage:","n/a","uin"),b=createEmptyDiv(a,"div","tile-1_4","footerstatsdiv2"),createDispText(b,"","IP Address","n/a","IPID"),createDispText(b,"","Signal Strength","n/a","SigStrengthID"),createDispText(b,"","Bat. Voltage:","n/a","ubat"),createDispText(b,"","Bat. Current:","n/a","ibat"),b=createEmptyDiv(a,"div","tile-1_4","footerstatsdiv3"),createDispText(b,"","Firmware Version","n/a","firmware"),createDispText(b,"","Available RAM/Flash","n/a","heapavail")}function processStatsData(a){writeTextField("sysdatetime",a.systime),writeTextField("uptime",formatTime(Math.trunc(a.uptime/1e3))),writeTextField("IPID",a.ipaddress),writeTextField("SigStrengthID",a.sigstrength+" dBm"),writeTextField("firmware",a.version),writeTextField("heapavail",a.freemem+" / "+a.freedisk+" Bytes"),writeTextField("temp",a.temp.toFixed(2)+"\xb0C"),writeTextField("uin",a.uin.toFixed(2)+"V"),writeTextField("ubat",a.ubat.toFixed(2)+"V"),writeTextField("ibat",a.ibat.toFixed(2)+"mA")}
