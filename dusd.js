/////////////////////////////////////////
///  DUSD -Detect unsupported Device  ///
///        Appraise & Notice          ///
///     Ver.2.0  Y.Yokoha             ///
/////////////////////////////////////////

//localstorageの不自由なデバイス、またはファイルアップロード不能なブラウザーを対象としたスクリプトです。
const ua=navigator.userAgent;
const theimportanceofthisscript="This script will show the end users who are using restricted device in terms of local storage or basic functions how to use our applications correctly.";
const myplannings="Plan: My goal is to develop an app that works on various kinds of devices, and this web app is one of them!";
//...姑息..(こうしなければならないのにはちゃんとした意味があります。 あと作者の遊び心です。)
let restricteddevice1=theimportanceofthisscript[2]+myplannings[0]+theimportanceofthisscript[18]+theimportanceofthisscript[19]+theimportanceofthisscript[27];
let altrestricteddevice1=theimportanceofthisscript[2]+myplannings[26]+theimportanceofthisscript[18]+theimportanceofthisscript[19]+theimportanceofthisscript[27];
let restricteddevice2=theimportanceofthisscript[2]+myplannings[0]+myplannings[28];
let altrestricteddevice2=theimportanceofthisscript[2]+myplannings[26]+myplannings[28];
let restricteddevice3="C"+myplannings[10]+theimportanceofthisscript[103]+theimportanceofthisscript[103]+myplannings[67]+theimportanceofthisscript[92]+"/";

if (ua.includes(restricteddevice1)||ua.includes(altrestricteddevice1))
{

    let warnbox=document.createElement("div");
    warnbox.setAttribute("class","C");
    warnbox.setAttribute("id","warnboxclose");
    warnbox.style.backgroundColor="orange";
    warnbox.style.position="fixed";
    warnbox.style.top="0";
    let title=document.createElement("h3");
    title.innerHTML="お使いの端末における制約ついて/About restrictions of your device";
    let warntext1=document.createElement("p");
    warntext1.innerHTML="お使いのデバイス(ブラウザー)は機能が制約されているため、ファイルやフォルダを読み込む際は、ファイルアプリからドラッグアンドドロップで読み込む必要があります。詳しくはこのアプリ下部にあるリポジトリリンクからご覧ください。";
    let warntext2=document.createElement("p");
    warntext2.innerHTML="Your device (browser) has limited functionality, so when loading files and folders, you need to load them by drag-and-drop from the file app. For more information, please see the repository link at the bottom of this app.";
    let dontshowmeanymore=document.createElement("button");
    dontshowmeanymore.setAttribute("onclick","remember()");
    dontshowmeanymore.innerHTML="今後表示しない/Do not show in the future";
    warnbox.appendChild(dontshowmeanymore);
    warnbox.appendChild(title);
    warnbox.appendChild(warntext1);
    warnbox.appendChild(warntext2);
    if (!localStorage.getItem("dusdw001")=="1")
    {
    document.body.appendChild(warnbox);  
    console.log("[dusd] Warn code: W001 -7days restriction alert div is now displayed.");
    console.log("[dusd] 警告表示されているデバイスにてPWAとしてインストールしない状態で使用後7日アクセスがないとlocal storage内データが消失する可能性があります。これはブラウザーの仕様です。");  
    }
    else
    {
        console.log("[dusd] w001-このデバイスは警告表示を無効化する設定になっています。/This device has been set to disable warning display.");
    }

}
else if (ua.includes(restricteddevice2)||ua.includes(altrestricteddevice2))
    {

        let warnbox=document.createElement("div");
        warnbox.setAttribute("class","C");
        warnbox.setAttribute("id","warnboxclose");
        warnbox.style.backgroundColor="orange";
        warnbox.style.position="fixed";
        warnbox.style.top="0";
        let title=document.createElement("h3");
        title.innerHTML="お使いの端末における制約ついて/About restrictions of your device";
        let warntext1=document.createElement("p");
        warntext1.innerHTML="お使いのデバイス(ブラウザー)は機能が制約されているため、ファイルやフォルダを読み込む際は、ファイルアプリからドラッグアンドドロップで読み込む必要があります。詳しくはこのアプリ下部にあるリポジトリリンクからご覧ください。";
        let warntext2=document.createElement("p");
        warntext2.innerHTML="Your device (browser) has limited functionality, so when loading files and folders, you need to load them by drag-and-drop from the file app. For more information, please see the repository link at the bottom of this app.";
        let dontshowmeanymore=document.createElement("button");
        dontshowmeanymore.setAttribute("onclick","remember()");
        dontshowmeanymore.innerHTML="今後表示しない/Do not show in the future";
        warnbox.appendChild(dontshowmeanymore);
        warnbox.appendChild(title);
        warnbox.appendChild(warntext1);
        warnbox.appendChild(warntext2);
        if (!localStorage.getItem("dusdw001")=="1")
        {
        document.body.appendChild(warnbox);  

        }
        else
        {
            console.log("[dusd] w001-このデバイスは警告表示を無効化する設定になっています。/This device has been set to disable warning display.");
        }
       
    }
    else if(ua.includes(restricteddevice3))
        {
                console.log("[dusd] This browser might be the Coffee browser series created by Y.Yokoha!! Thanks for using!!!!");
        
            let warnbox=document.createElement("div");
            warnbox.setAttribute("class","C");
            warnbox.setAttribute("id","warnboxclose");
            warnbox.style.backgroundColor="orange";
            warnbox.style.position="fixed";
            warnbox.style.top="0";
            let title=document.createElement("h3");
            title.innerHTML="お使いの端末における制約ついて/About restrictions of your device";
            let warntext1=document.createElement("p");
            warntext1.innerHTML="お使いのブラウザーは機能が制約されているため、正常に動作しないアプリがあります。(制約内容:(スマートフォン版)Coffeeブラウザー(サポート終了済み)では外部ファイル読み込みが出来ません。 これはお使いのブラウザーの「仕様」であり、このアプリの欠陥ではありません。)";
            let warntext2=document.createElement("p");
            warntext2.innerHTML="Your browser has limited functionality and some applications may not work properly. (Restriction: Coffee browser (mobile) cannot load external files. This is a “specification” of your browser and not a defect of this app).";
            let dontshowmeanymore=document.createElement("button");
            dontshowmeanymore.setAttribute("onclick","remember2()");
            dontshowmeanymore.innerHTML="今後表示しない/Do not show in the future";
            if (!localStorage.getItem("dusdw003")=="1")
            {
                warnbox.appendChild(dontshowmeanymore);
                warnbox.appendChild(title);
                warnbox.appendChild(warntext1);
                warnbox.appendChild(warntext2);
                document.body.appendChild(warnbox);  
                console.log("[dusd] Warn code: W003 -Viewer restriction /Coffee browsers are unable to load external file(s) due to the Coffee's development limitations.");
                console.log("[dusd] Coffeeブラウザー(スマートフォン版)では外部ファイルを読み込む事が出来ません。これはブラウザーの仕様です。");  
            }
            else
            {
                console.log("[dusd] w003-このデバイスは警告表示を無効化する設定になっています。/This device has been set to disable warning display.");
            } 

        }
        else
            {
                console.log("[dusd] このデバイスは互換性チェックに合格しました。/Your device has passed the compatibility check.");
            }
    
function remember()
{
    localStorage.setItem("dusdw001","1");
    document.getElementById("warnboxclose").style.display="none";
}

function remember2()
{
    localStorage.setItem("dusdw003","1");
    document.getElementById("warnboxclose").style.display="none";
}