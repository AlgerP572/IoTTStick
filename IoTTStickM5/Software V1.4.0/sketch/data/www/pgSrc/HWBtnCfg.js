function saveConfigFileSettings(){saveJSONConfig(scriptList.Pages[currentPage].ID,scriptList.Pages[currentPage].FileName,configData[workCfg],null)}function setThreshold(a){if("holdthreshold"==a.id&&(configData[2].HoldThreshold=verifyNumber(a.value,configData[2].HoldThreshold)),"dblclkthreshold"==a.id&&(configData[2].DblClickThreshold=verifyNumber(a.value,configData[2].DblClickThreshold)),"analogrefresh"==a.id&&(configData[2].RefreshInterval=verifyNumber(a.value,configData[2].RefreshInterval)),"analogsensitivity"==a.id&&(configData[2].Sensitivity=verifyNumber(a.value,configData[2].Sensitivity)),"baseaddress"==a.id&&(configData[2].BoardBaseAddr=verifyNumber(a.value,configData[2].BoardBaseAddr),1==confirm("Set all Button Addresses?")))for(var b=0;b<configData[2].Buttons.length;b++){configData[2].Buttons[b].ButtonAddr=configData[2].BoardBaseAddr+b;var c=document.getElementById(buttonTable.id+"_"+b.toString()+"_3");c.childNodes[0].value=configData[2].Buttons[b].ButtonAddr}"mqbtnask"==a.id&&(configData[2].MQTT.Subscribe[0].Topic=a.value),"inclbtnask"==a.id&&(configData[2].MQTT.Subscribe[0].InclAddr=a.checked),"mqbtnreport"==a.id&&(configData[2].MQTT.Publish[0].Topic=a.value),"inclbtnreport"==a.id&&(configData[2].MQTT.Publish[0].InclAddr=a.checked),"mqbtnreply"==a.id&&(configData[2].MQTT.Publish[1].Topic=a.value),"inclbtnreply"==a.id&&(configData[2].MQTT.Publish[1].InclAddr=a.checked)}function downloadSettings(){downloadConfig(16)}function setButtonData(a){var b=parseInt(a.getAttribute("col")),c=parseInt(a.getAttribute("row"));switch(b){case 2:configData[2].Buttons[c].ButtonType=btnStatus[a.selectedIndex];break;case 3:configData[2].Buttons[c].ButtonAddr=verifyNumber(a.value,configData[2].Buttons[c].ButtonAddr);break;case 5:var d=parseInt(a.getAttribute("index"));a.checked?configData[2].Buttons[c].EventMask|=1<<d:configData[2].Buttons[c].EventMask&=~(1<<d),0==(31&configData[2].Buttons[c].EventMask)?configData[2].Buttons[c].EventMask=32:configData[2].Buttons[c].EventMask&=31}}function loadTableData(a,b){function h(a){return a==b[g].ButtonType}for(;b.length>maxButtons;)b.pop();for(;b.length<maxButtons;){var c={PortNr:0,ButtonType:"off",ButtonAddr:0,EventMask:31};c.PortNr=b.length,b.push(c)}{var d=document.getElementById(buttonTable.id+"_head");document.getElementById(buttonTable.id+"_body"),d.childNodes[0].children.length}createDataTableLines(a,[tfPos,tfText,tfBtnEvtSel,tfNumeric,tfText,tfBtnEvtMask],b.length,"setButtonData(this)");for(var g=0;g<b.length;g++){var i=Math.trunc(g/8)+1,j=g%8+1,k=document.getElementById(a.id+"_"+g.toString()+"_1");writeTextField(k.id,"Pin "+j.toString()+" Port "+String.fromCharCode(64+i));var k=document.getElementById(a.id+"_"+g.toString()+"_2");k.childNodes[0].selectedIndex=btnStatus.findIndex(h);var k=document.getElementById(a.id+"_"+g.toString()+"_3");k.childNodes[0].value=b[g].ButtonAddr;var k=document.getElementById(a.id+"_"+g.toString()+"_4");writeTextField(k.id,"");for(var k=document.getElementById(a.id+"_"+g.toString()+"_5"),l=1,m=0;m<5;m++){var n=document.getElementById("eventmask_"+g.toString()+"_5_"+m.toString());setVisibility(2!=btnStatus.findIndex(h),n.parentElement),n.checked=(b[g].EventMask&l<<m)>0}}}function setButtonStatus(a,b,c,d){var e=document.getElementById(buttonTable.id+"_"+b.toString()+"_4");if(e)switch(a){case 0:switch(d){case 0:writeTextField(e.id,"Btn Down"),e.style.backgroundColor="hsl(39, 50%, 50%)";break;case 1:writeTextField(e.id,"Btn Up"),e.style.backgroundColor="hsl(116, 100%, 22%)";break;case 2:writeTextField(e.id,"Btn Click"),e.style.backgroundColor="hsl(116, 100%, 50%)";break;case 3:writeTextField(e.id,"Btn Hold"),e.style.backgroundColor="hsl(0, 50%, 50%)";break;case 4:writeTextField(e.id,"Btn Dbl Click"),e.style.backgroundColor="hsl(240, 50%, 50%)";break;default:writeTextField(e.id,"Unkown Status"),e.style.backgroundColor="hsl(0, 0%, 50%)"}break;case 1:writeTextField(e.id,"Analog "+d.toString());var f=Math.round(240*(1-d/4096));e.style.backgroundColor="hsl("+f.toString()+", 100%, 50%)"}}function constructPageContent(a){var b;mainScrollBox=createEmptyDiv(a,"div","pagetopicboxscroll-y","btnconfigdiv"),createPageTitle(mainScrollBox,"div","tile-1","","h1","Hardware Button Setup"),createPageTitle(mainScrollBox,"div","tile-1","","h2","Basic Settings"),b=createEmptyDiv(mainScrollBox,"div","tile-1",""),createTextInput(b,"tile-1_4","Hold Threshold (ms)","n/a","holdthreshold","setThreshold(this)"),createTextInput(b,"tile-1_4","Dbl Clk Threshold (ms)","n/a","dblclkthreshold","setThreshold(this)"),b=createEmptyDiv(mainScrollBox,"div","tile-1",""),createTextInput(b,"tile-1_4","Analog Refresh (ms)","n/a","analogrefresh","setThreshold(this)"),createTextInput(b,"tile-1_4","Analog Sensitivity (%)","n/a","analogsensitivity","setThreshold(this)"),b=createEmptyDiv(mainScrollBox,"div","tile-1","wificb"),createTextInput(b,"tile-1_4","Board Base Address","n/a","baseaddress","setThreshold(this)"),mqttTitle=createPageTitle(mainScrollBox,"div","tile-1","","h2","MQTT Settings"),mqttBox=createEmptyDiv(mainScrollBox,"div","tile-1",""),b=createEmptyDiv(mqttBox,"div","tile-1",""),createTextInput(b,"tile-1_4","(S) Btn Query. Topic:","n/a","mqbtnask","setThreshold(this)"),createCheckbox(b,"tile-1_4","Include Btn #","inclbtnask","setThreshold(this)"),b=createEmptyDiv(mqttBox,"div","tile-1",""),createTextInput(b,"tile-1_4","(P) Btn Status Topic:","n/a","mqbtnreport","setThreshold(this)"),createCheckbox(b,"tile-1_4","Include Btn #","inclbtnreport","setThreshold(this)"),b=createEmptyDiv(mqttBox,"div","tile-1",""),createTextInput(b,"tile-1_4","(P) Btn Reply Topic:","n/a","mqbtnreply","setThreshold(this)"),createCheckbox(b,"tile-1_4","Include Btn #","inclbtnreply","setThreshold(this)"),createPageTitle(mainScrollBox,"div","tile-1","","h2","Button Configuration"),b=createEmptyDiv(mainScrollBox,"div","tile-1","wificb"),createDispText(b,"tile-1_4","# of Buttons","n/a","maxbuttons"),buttonTable=createDataTable(mainScrollBox,"tile-1",["Pos","Port #","HW Button Type","LN Button Address","Input Status","Send Messages"],"btnconfig",""),b=createEmptyDiv(mainScrollBox,"div","tile-1",""),createButton(b,"","Save & Restart","btnSave","saveSettings(this)"),createButton(b,"","Cancel","btnCancel","cancelSettings(this)"),b=createEmptyDiv(mainScrollBox,"div","tile-1",""),createButton(b,"","Save to File","btnDownload","downloadSettings(this)")}function loadNodeDataFields(a){maxButtons=32,writeTextField("maxbuttons",maxButtons);var b=a.InterfaceTypeList[a.InterfaceIndex].Type;setVisibility(3==b,mqttTitle),setVisibility(3==b,mqttBox)}function loadDataFields(a){a=upgradeJSONVersionBtn(a),configData[2]=JSON.parse(JSON.stringify(a)),writeInputField("holdthreshold",a.HoldThreshold),writeInputField("dblclkthreshold",a.DblClickThreshold),writeInputField("baseaddress",a.BoardBaseAddr),writeInputField("analogrefresh",a.RefreshInterval),writeInputField("analogsensitivity",a.Sensitivity),writeInputField("mqbtnask",a.MQTT.Subscribe[0].Topic),writeCBInputField("inclbtnask",a.MQTT.Subscribe[0].InclAddr),writeInputField("mqbtnreport",a.MQTT.Publish[0].Topic),writeCBInputField("inclbtnreport",a.MQTT.Publish[0].InclAddr),writeInputField("mqbtnreply",a.MQTT.Publish[1].Topic),writeCBInputField("inclbtnreply",a.MQTT.Publish[1].InclAddr),loadTableData(buttonTable,a.Buttons)}function processLocoNetInput(a){setButtonStatus(a[0],a[1],a[2],a[3])}var mainScrollBox,buttonTable,mqttTitle,mqttBox,maxButtons=0,btnStatus=["off","digital","analog"];
