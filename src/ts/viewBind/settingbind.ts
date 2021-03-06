import {remote,shell} from 'electron'
const dialog=remote.dialog;


let filepath:string='';

function settingbind(settings:any){
    if(localStorage.getItem('filepath')){
        settings.folderp.innerText=localStorage.getItem('filepath');
    }else{
        localStorage.setItem('filepath', remote.app.getPath('userData'));
    }

    if(localStorage.getItem('interval')){
        settings.intervalinput.value=localStorage.getItem('interval');
    }else{
        localStorage.setItem('interval', '0.2');
    }

    if(localStorage.getItem('outputType')){
        let value=localStorage.getItem('outputType');
        for(let i of settings.outputType){
            if(i.value==value){
                i.checked=true;
                break;
            }
        }
    }else{
        localStorage.setItem('outputType', 'txt');
        for(let i of settings.outputType){
            if(i.value=='txt'){
                i.checked=true;
                break;
            }
        }
    }

    if(localStorage.getItem('encoding')){
        let value=localStorage.getItem('encoding');
        for(let i of settings.encoding){
            if(i.value==value){
                i.checked=true;
                break;
            }
        }
    }else{
        localStorage.setItem('encoding', 'utf8');
        for(let i of settings.encoding){
            if(i.value=='utf8'){
                i.checked=true;
                break;
            }
        }
    }

    settings.folderselection.onclick=()=>{
        
            dialog.showOpenDialog({properties:["openDirectory","createDirectory","promptToCreate"]},(filepaths)=>{
                if(filepaths){
                    filepath=filepaths[0];
                    settings.folderp.innerText=filepaths[0];
                }
                
            })
        
        
        
    }

    settings.btn.onclick=()=>{
        localStorage.setItem('interval', settings.intervalinput.value);
        if(filepath){
            localStorage.setItem('filepath', filepath);
        }
        
        for(let i of settings.outputType){
            if(i.checked==true){
                localStorage.setItem('outputType', i.value);
			    break;
            }
        }

        for(let i of settings.encoding){
            if(i.checked==true){
                localStorage.setItem('encoding', i.value);
			    break;
            }
        }
    }
    settings.openfolder.onclick=()=>{
        shell.openExternal(localStorage.getItem('filepath'));
    }

    settings.setting.addEventListener('click',(e:Event)=>{
        e.stopPropagation(); 
    })
    
    
    
}



export default settingbind;

