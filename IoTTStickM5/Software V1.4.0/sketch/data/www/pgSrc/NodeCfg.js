function saveConfigFileSettings(){saveJSONConfig(scriptList.Pages[currentPage].ID,scriptList.Pages[currentPage].FileName,configData[workCfg],null)}function loadSettings(){function c(a){return a.ID==b}var b="",d=document.getElementById("btnLoad").files[0],e=new FileReader;e.onload=function(){try{var a=JSON.parse(e.result);b=a[0].Type;var d=scriptList.Pages.findIndex(c),f=a.length>0&&!isNaN(d);if(!f)return void alert("Error in configuration data")}catch(g){return void alert("Configuration data not valid")}uploadConfig(a)},e.readAsText(d)}function downloadSettings(){downloadConfig(event.ctrlKey?1:65535)}function setDisplayOptions(){setVisibility((2&configData[2].wifiMode)>0,configAPModuleBox),setVisibility((2&configData[2].wifiMode)>0,configAPBox),setVisibility((1&configData[2].wifiMode)>0,configNTPSection),setVisibility(configData[2].useNTP,configNTPBox),setVisibility((1&configData[2].wifiMode)>0,configDHCPSection),setVisibility(configData[2].useStaticIP,configDHCPBox),setVisibility(configData[2].InterfaceIndex>1&&9!=configData[2].InterfaceIndex,configBushbyBox)}function setProdType(a){function b(a,b){configData[2].ALMTypeList[a].Type>configData[2].InterfaceTypeList[d].Type&&configData[2].ALMIndex.splice(b,1)}var c=configData[2].HatIndex,d=configData[2].InterfaceIndex;return"selecthattype"==a.id&&(c=a.selectedIndex),"selectcommtype"==a.id&&(d=a.selectedIndex),configData[2].HatTypeList[c].InterfaceList.indexOf(configData[2].InterfaceTypeList[d].IntfId)<0?(alert("Invalid Combination of Hat and Interface"),"selecthattype"==a.id&&setDropdownValue("selecthattype",configData[2].HatIndex),void("selectcommtype"==a.id&&setDropdownValue("selectcommtype",configData[2].InterfaceIndex))):1==configData[2].InterfaceTypeList[d].ReqSTA&&2==configData[2].wifiMode?(alert("This interface requires active WiFi connection"),void("selectcommtype"==a.id&&setDropdownValue("selectcommtype",configData[2].InterfaceIndex))):(configData[2].ALMIndex.forEach(b),loadALMOptions(configData[2]),configData[2].HatIndex=c,configData[2].InterfaceIndex=d,configData[2].InterfaceIndex>=2,setDisplayOptions(),void console.log(configData[2]))}function setUseALM(a){function b(a){return a.ALMId==d}var c=configData[2].InterfaceIndex,d=parseInt(a.getAttribute("ALMId")),e=configData[2].ALMTypeList.findIndex(b);if(a.checked)console.log(c,d,e),configData[2].InterfaceTypeList[c].Type>=configData[2].ALMTypeList[e].Type?configData[2].ALMIndex.indexOf(d)<0&&configData[2].ALMIndex.push(d):(alert("This Logic Module does not work with the selected command source"),a.checked=!1);else{var f=configData[2].ALMIndex.indexOf(d);f>=0&&configData[2].ALMIndex.splice(f,1)}console.log(configData[2].ALMIndex)}function setWifiStatus(a){configData[2].useWifiTimeout=a.checked?1:0,setDisplayOptions()}function setNTPStatus(a){configData[2].useNTP=a.checked?1:0,setDisplayOptions()}function setNTPServer(a){configData[2].ntpConfig.NTPServer=a.value}function setNTPTimeZone(a){configData[2].ntpConfig.ntpTimeZone=a.value}function setNodeName(a){configData[2].devName=a.value}function setUseMac(a){configData[2].inclMAC=a.checked?1:0}function setUseDHCP(a){configData[2].useStaticIP=a.checked?1:0,setDisplayOptions()}function setDHCP(a){"staticip"==a.id&&(configData[2].staticConfig.staticIP=a.value),"gatewayip"==a.id&&(configData[2].staticConfig.staticGateway=a.value),"netmask"==a.id&&(configData[2].staticConfig.staticNetmask=a.value),"dnsserver"==a.id&&(configData[2].staticConfig.staticDNS=a.value),console.log(configData[2].staticConfig)}function setAP(a){"ap_ip"==a.id&&(configData[2].apConfig.apGateway=a.value),"ap_password"==a.id&&(configData[2].apConfig.apPassword=a.value),console.log(configData[2].apConfig)}function setWifiMode(a){if("selectwifimode_0"==a.id&&(configData[2].wifiMode=1),"selectwifimode_1"==a.id){if(1==configData[2].InterfaceTypeList[configData[2].InterfaceIndex].ReqSTA)return alert("This interface requires active WiFi connction"),void writeRBInputField("selectwifimode",configData[2].wifiMode-1);configData[2].wifiMode=2}setDisplayOptions()}function setUseBushbyBit(a){configData[2].useBushby=a.checked?1:0}function constructPageContent(a){var b;mainScrollBox=createEmptyDiv(a,"div","pagetopicboxscroll-y","nodeconfigdiv"),createPageTitle(mainScrollBox,"div","tile-1","","h1","Node Configuration"),createPageTitle(mainScrollBox,"div","tile-1","","h2","Basic Setup"),b=createEmptyDiv(mainScrollBox,"div","tile-1",""),createDropdownselector(b,"tile-1_4","Command Source:",[],"selectcommtype","setProdType(this, id)"),createDropdownselector(b,"tile-1_4","Hat Module:",[],"selecthattype","setProdType(this, id)"),b=createEmptyDiv(mainScrollBox,"div","tile-1","configBushbyBox"),createCheckbox(b,"tile-1_4","respect Bushby Bit","cbUseBushbyBit","setUseBushbyBit(this)"),createPageTitle(mainScrollBox,"div","tile-1","","h2","Embedded Logic Modules Activation"),b=createEmptyDiv(mainScrollBox,"div","tile-1","ALMBox"),createPageTitle(mainScrollBox,"div","tile-1","","h2","Wifi Setup"),b=createEmptyDiv(mainScrollBox,"div","tile-1",""),createTextInput(b,"tile-1_4","Node Name:","n/a","nodename","setNodeName(this)"),createCheckbox(b,"tile-1_4","Add MAC Address","cbUseMac","setUseMac(this)"),b=createEmptyDiv(mainScrollBox,"div","tile-1",""),createRadiobox(b,"tile-1_2","",["Connect to WiFi","Device A/P on Demand"],"selectwifimode","setWifiMode(this, id)"),configDHCPSection=createEmptyDiv(mainScrollBox,"div","",""),createPageTitle(configDHCPSection,"div","tile-1","","h3","DHCP Configuration"),b=createEmptyDiv(configDHCPSection,"div","tile-1",""),createCheckbox(b,"tile-1_4","Use Static IP","cbDHCP","setUseDHCP(this)"),configDHCPBox=createEmptyDiv(configDHCPSection,"div","",""),configDHCPBox.style.display="none",b=createEmptyDiv(configDHCPBox,"div","tile-1",""),createTextInput(b,"tile-1_4","Static IP:","n/a","staticip","setDHCP(this)"),createTextInput(b,"tile-1_4","Gateway IP:","n/a","gatewayip","setDHCP(this)"),b=createEmptyDiv(configDHCPBox,"div","tile-1",""),createTextInput(b,"tile-1_4","Netmask:","n/a","netmask","setDHCP(this)"),createTextInput(b,"tile-1_4","DNS Server:","n/a","dnsserver","setDHCP(this)"),configAPModuleBox=createEmptyDiv(mainScrollBox,"div","",""),createPageTitle(configAPModuleBox,"div","tile-1","","h3","Access Point Configuration"),configAPBox=createEmptyDiv(mainScrollBox,"div","tile-1",""),configAPBox.style.display="none",b=createEmptyDiv(configAPBox,"div","tile-1",""),createTextInput(b,"tile-1_4","Access Point IP:","n/a","ap_ip","setAP(this)"),createTextInput(b,"tile-1_4","AP Password:","n/a","ap_password","setAP(this)"),configNTPSection=createEmptyDiv(mainScrollBox,"div","",""),createPageTitle(configNTPSection,"div","tile-1","","h3","Network Time Setup"),b=createEmptyDiv(configNTPSection,"div","tile-1",""),createCheckbox(b,"tile-1_4","Use Internet Time","cbUseNTP","setNTPStatus(this)"),configNTPBox=createEmptyDiv(configNTPSection,"div","",""),configNTPBox.style.display="none",createTextInput(configNTPBox,"tile-1_4","NTP Server:","n/a","ntpserverurl","setNTPServer(this)"),createTextInput(configNTPBox,"tile-1_4","Timezone:","0","ntptimezone","setNTPTimeZone(this)"),b=createEmptyDiv(mainScrollBox,"div","tile-1",""),createButton(b,"","Save & Restart","btnSave","saveSettings(this)"),createButton(b,"","Cancel","btnCancel","cancelSettings(this)"),b=createEmptyDiv(mainScrollBox,"div","tile-1",""),createButton(b,"","Save to File","btnDownload","downloadSettings(this)"),createFileDlg(b,"","Load from File","btnLoad",".json","loadSettings(this)")}function loadNodeDataFields(){}function loadHatOptions(a){for(var b=[],c=0;c<a.HatTypeList.length;c++)b.push(a.HatTypeList[c].Name);createOptions(document.getElementById("selecthattype"),b),setDropdownValue("selecthattype",a.HatIndex)}function loadInterfaceOptions(a){for(var b=[],c=0;c<a.InterfaceTypeList.length;c++)b.push(a.InterfaceTypeList[c].Name);createOptions(document.getElementById("selectcommtype"),b),setDropdownValue("selectcommtype",a.InterfaceIndex)}function loadALMOptions(a){for(var c,b=document.getElementById("ALMBox");b.hasChildNodes();)b.removeChild(b.childNodes[0]);for(var d=0;d<a.ALMTypeList.length;d++)0==(1&d)&&(c=createEmptyDiv(b,"div","tile-1","")),createCheckbox(c,"tile-1_4",a.ALMTypeList[d].Name,"cbUseALM_"+d.toString(),"setUseALM(this)"),writeCBInputField("cbUseALM_"+d.toString(),a.ALMIndex.indexOf(a.ALMTypeList[d].ALMId)>=0),document.getElementById("cbUseALM_"+d.toString()).setAttribute("ALMId",a.ALMTypeList[d].ALMId)}function loadDataFields(a){console.log("Loading ",a),loadHatOptions(a),loadInterfaceOptions(a),loadALMOptions(a),writeRBInputField("selectwifimode",a.wifiMode-1),writeInputField("nodename",a.devName),writeCBInputField("cbUseMac",a.inclMAC),writeCBInputField("cbDHCP",a.useStaticIP),setVisibility(a.useStaticIP,configDHCPBox,!0),writeInputField("staticip",a.staticConfig.staticIP),writeInputField("gatewayip",a.staticConfig.staticGateway),writeInputField("netmask",a.staticConfig.staticNetmask),writeInputField("dnsserver",a.staticConfig.staticDNS),writeInputField("ap_ip",a.apConfig.apGateway),writeInputField("ap_password",a.apConfig.apPassword),writeCBInputField("cbUseBushbyBit",a.useBushby),writeCBInputField("cbUseNTP",a.useNTP),setVisibility(a.useNTP,configNTPBox),writeInputField("ntpserverurl",a.ntpConfig.NTPServer),writeInputField("ntptimezone",a.ntpConfig.ntpTimeZone),setDisplayOptions()}var mainScrollBox,topicStats1,topicStats2,topicWificb,configAPModuleBox,configNTPSection,configNTPBox,configDHCPBox,configDHCPSection,configAPBox,moduleConfig,modDCCConfig,modHWBtnConfig,modLNConfig,modALMOnly,modAlwaysOn,modWifiOnly,modDecoderOnly,modWifiALMOnly,modalDialog=null,galleryUploader=null,_gaq;
