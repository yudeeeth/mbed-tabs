const runbutton = document.getElementById('project');

const themes = [
    'ambiance',
    'chaos',
    'chrome',
    'clouds',
    'clouds_midnight',
    'cobalt',
    'crimson_editor',
    'dawn',
    'dracula',
    'dreamweaver',
    'eclipse',
    'github',
    'gob',
    'gruvbox',
    'idle_fingers',
    'iplastic',
    'katzenmilch',
    'kr_theme',
    'kuroir',
    'merbivore',
    'merbivore_soft',
    'mono_industrial',
    'monokai',
    'nord_dark',
    'one_dark',
    'pastel_on_dark',
    'solarized_dark',
    'solarized_light',
    'sqlserver',
    'terminal',
    'textmate',
    'tomorrow',
    'tomorrow_night',
    'tomorrow_night_blue',
    'tomorrow_night_bright',
    'tomorrow_night_eighties',
    'twilight',
    'vibrant_ink',
    'xcode',
    ]
    
    
const dbg = (str,delim='\n')=> {
    document.getElementById('storediv').textContent = (str+delim);
}


const savebutt = () => {
    let currtosave = document.querySelector('.selected-tab');
    if(currtosave===null) return;
    let editor = ace.edit('editor');
    let currfilename = document.getElementById('storediv').getAttribute('curr');
    if(currfilename !== 'null') window.localStorage.setItem(currfilename,editor.getValue());
    document.getElementById('hacktext').value = editor.getValue();
    document.getElementById('compile').click();
}

function newTab(titlestr='def'){
    let button = document.getElementById('newfile');
    let newdiv = document.createElement('div');
    newdiv.className = 'top-tab';
    let tempid = Math.random()*100000000;
    newdiv.id = tempid;
    button.parentNode.appendChild(newdiv);

    // newdiv.onlick = 
    if(titlestr==='def'){

        let texarea = document.createElement('textarea');
        texarea.id = 'title'+tempid;
        texarea.className = 'tab-title';
        newdiv.appendChild(texarea);
    
        let cbutt = document.createElement('button');
        cbutt.id = 'c-'+tempid;
        cbutt.className = 'create-tab';
        cbutt.onclick = function(){ 
            let name = document.getElementById( 'title'+ tempid).value;
            if(Object.keys(localStorage).includes(name)){ return; }
            let editor = ace.edit('editor');
            let currfilename = document.getElementById('storediv').getAttribute('curr'); 
            if(currfilename !== 'null') window.localStorage.setItem(currfilename,editor.getValue());
            editor.setValue('');
            editor.selection.clearSelection();
            // dbg("");
            document.getElementById('hacktext').value = ''; document.getElementById('compile').click();
            document.getElementById('storediv').setAttribute( 'curr', name);
            window.localStorage.setItem(name, editor.getValue());
            document.getElementById('hacktext').value = editor.getValue();document.getElementById('compile').click();
            document.getElementById('c-' + tempid ).remove();
            let tx = document.getElementById('title'+ tempid);
            let reptx = document.createElement('button');
            reptx.className = 'tab-title';
            reptx.id = 'title'+ tempid;
            reptx.textContent = tx.value;
            reptx.onclick = function(){
                //save previous tab's work
                let prev = document.getElementById('storediv').getAttribute('curr');
                window.localStorage.setItem(prev ,editor.getValue());
                //get current tab's name
                let name = document.getElementById('title'+tempid).textContent;
                dbg('prev --> '+prev + ", curr --> "+name);
                // retrieve the content of the tab from localstorage 
                let res = window.localStorage.getItem(name);
                // set curr attribute to the current filename
                document.getElementById('storediv').setAttribute('curr',name);
                // set the editor's value to the retrieved content
                editor.setValue(res);
                editor.selection.clearSelection();
                // dbg(res);
                document.getElementById('hacktext').value = res;document.getElementById('compile').click();
                [...document.getElementsByClassName('selected-tab')].forEach(e=>{e.classList.toggle('selected-tab')});
                document.getElementById(tempid).classList.add('selected-tab');
            }
            tx.parentNode.insertBefore(reptx, tx);
            tx.remove();
            //highlight tabs
            [...document.getElementsByClassName('selected-tab')].forEach(e=>{e.classList.toggle('selected-tab')});
            document.getElementById(tempid).classList.add('selected-tab');
        }
        cbutt.textContent = '✔';
        newdiv.appendChild(cbutt);
    }
    else{
        let editor = ace.edit('editor');
        let texarea = document.createElement('button');
        texarea.id = 'title'+tempid;
        texarea.onclick = function(){
            //save previous tab's work
            let prev = document.getElementById('storediv').getAttribute('curr');
            window.localStorage.setItem(prev ,editor.getValue());
            //get current tab's name
            let name = document.getElementById('title'+tempid).textContent;
            dbg('prev --> '+prev + ", curr --> "+name);
            // retrieve the content of the tab from localstorage 
            let res = window.localStorage.getItem(name);
            // set curr attribute to the current filename
            document.getElementById('storediv').setAttribute('curr',name);
            // set the editor's value to the retrieved content
            editor.setValue(res);editor.selection.clearSelection();
            // dbg(res);
            document.getElementById('hacktext').value = res;document.getElementById('compile').click();
            [...document.getElementsByClassName('selected-tab')].forEach(e=>{e.classList.toggle('selected-tab')});
            document.getElementById(tempid).classList.add('selected-tab');
        }
        texarea.textContent = titlestr;
        [...document.getElementsByClassName('selected-tab')].forEach(e=>{e.classList.toggle('selected-tab')});
        document.getElementById(tempid).classList.add('selected-tab');
        document.getElementById('storediv').setAttribute('curr',titlestr);
        texarea.className = 'tab-title';
        newdiv.appendChild(texarea);
    }

    let dbutt = document.createElement('button');
    dbutt.id = 'd-'+tempid;
    dbutt.onclick = function(){
        let titletextcontent = document.getElementById('title'+tempid).textContent;
        document.getElementById(tempid).remove(); 
        const getanother = ()=>{
            let arr = [...document.querySelectorAll('.top-tab')];
            if(arr.length===0) return null;
            else return document.getElementById('title'+arr[0].id);
        }
        // if selected tab is currentfile
        if(document.getElementById('storediv').getAttribute('curr')===titletextcontent){
            //select a new random file
            let editor = ace.edit('editor');
            let newfilename = getanother();
            if(newfilename===null){
                document.getElementById('storediv').setAttribute('curr','null');
                document.getElementById('hacktext').value = '';
                document.getElementById('compile').click();
                editor.setValue('');editor.selection.clearSelection();
                return;
            }
            else{
                let res = window.localStorage.getItem(newfilename.textContent);
                document.getElementById('storediv').setAttribute('curr',newfilename.textContent);
                document.getElementById('hacktext').value = res;
                editor.setValue(res);editor.selection.clearSelection();
                document.getElementById('compile').click();
                newfilename.parentElement.classList.add('selected-tab');
            }
        }
        
    }
    dbutt.className = 'delete-tab';
    dbutt.textContent = '\u2716';
    newdiv.appendChild(dbutt);
}

const createElements = () => {
    let editor = ace.edit('editor');

    editor.getSession().setMode("ace/mode/c_cpp");
    const scripthack = `<textarea hidden id="hacktext" onchange="(function(){ editor.setValue(document.getElementById('hacktext').value)})()"></textarea>`;
    const dbgtext = `<button hidden id="compile" class="compile" onclick="(function(){ editor.setValue(document.getElementById('hacktext').value)})()">Compile</button>`;
    const setdefbutt = `<button id="setdef" hidden onclick="(function(){ editor.setTheme('ace/theme/dracula'); console.log('print');})()">Set Default</button>`;

    const div = document.createElement('div');
    div.className = 'main-container';
    div.innerHTML = scripthack+dbgtext+setdefbutt;
    const butt = document.createElement('button');
    butt.id = 'newfile';
    div.appendChild(butt);
    runbutton.parentElement.insertBefore(div, runbutton);
    butt.textContent = '+';

    const themeholder = document.createElement('div');
    butt.parentNode.insertBefore(themeholder, butt);

    let themeopts = "";
    for(let i of themes){
        themeopts += '<option value="'+i+'">'+i+'</option>';
    }
    const themeselect = `<select id="theme-select" className="theme-select" onchange="(function(){editor.setTheme('ace/theme/'+document.getElementById('theme-select').value);})()">${themeopts}</select>`;
    themeholder.innerHTML += themeselect;

    //set selecttag for font size
    const fontsizeholder = document.createElement('div');
    butt.parentNode.insertBefore(fontsizeholder, butt);
    let fontsizeopts = "";
    let fontopts = [7,10,12,15,18,20,24,30,36,48,60,72,96];
    for(let i of fontopts){
        
        fontsizeopts += '<option value="'+i+'">'+i+'</option>';
    }
    const fontsizeselect = `<select id="font-size-select" className="font-size-select" onchange="(function(){document.getElementById('editor').style.fontSize= document.getElementById('font-size-select').value+'px';})()">${fontsizeopts}</select>`;
    fontsizeholder.innerHTML += fontsizeselect;

    
    const savebutton = document.createElement('button');
    savebutton.className = 'save-button';
    savebutton.innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAu0lEQVRIie2TwRGCMBREN45tKO1YgDN2QB0ebUm0AOuQDtSbh+clOMwfAz9Bvei7Bf7uZhOQ/uQArICWfLbegHOBuT+km8xsvQbuUbp7e0BWiA0YOxOj3bx6HmyAJIUQQn+doptL6SVpNmTwDuZDL+0OS/h4A1cAUAFH4AYcgGVRWuozjeZ9mhy9J+BqAi5evfcOTiNrHwMNKqCJTfapOyg+oikb/PqP1kpaTGkRPZ7YBrUdKDCvJ+h/kQfYyHqMnL1r7gAAAABJRU5ErkJggg==">';
    savebutton.onclick = savebutt;
    butt.parentNode.insertBefore(savebutton, butt);

    const sel = document.createElement('select');
    let opts = "";
    for(let i=0;i<window.localStorage.length;i++) {
        opts += `<option value="${window.localStorage.key(i)}">${window.localStorage.key(i)}</option>`;
    }
    sel.className = 'select-tab';
    sel.innerHTML = opts;
    sel.onchange = (e) => {

        let editor = ace.edit('editor');
        newTab(e.target.value);
        editor.setValue(window.localStorage.getItem(e.target.value));editor.selection.clearSelection();
        // dbg(window.localStorage.getItem(e.target.value));
        document.getElementById('hacktext').value = window.localStorage.getItem(e.target.value);document.getElementById('compile').click();
    }
    butt.parentNode.insertBefore(sel, butt);

    let storediv = document.createElement('div');
    storediv.id = 'storediv';
    storediv.hidden = true;
    document.body.appendChild(storediv);
    storediv.setAttribute('curr', 'null');
    
    butt.onclick = ()=>{newTab('def')};
    runbutton.parentElement.style.height = '40px';

    document.getElementById('editor').style.fontSize = '15px';
    document.getElementById('font-size-select').value = 15;

}

if(runbutton!=null){
    createElements();
    document.getElementById('setdef').click();
}
