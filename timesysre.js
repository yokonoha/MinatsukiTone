///////////////////////////////////
////  Timesys.js (Recreated)   ////
////    Y.Yokoha Studio        ////
///////////////////////////////////

// 使いやすい時刻表示スクリプトを制作しました。
//以下のIDをspan要素やp要素などのテキスト系要素に追記し、<script>タグをbodyタグ下に記載するだけで、
//使えます。様々なユースケースでの利用が出来ると思います!
// Available IDs
// year: 年のみ代入
//month: 月のみ代入
// date: 日のみ代入
// hour: 時のみ代入
//  min: 分のみ代入
//  sec:秒のみ代入
//  day:曜日のみ代入
//youbi:日本語表記での曜日を代入
//xingqi:星期。中文(簡体字) -Beta
//<script src="timesysre.js"></script>

//例
//<p><span id="year"></span>/<span id="month"></span>/<span id="date"></span></p>
//<p id="day"></p>
//<p><span id="hour"></span>:<span id="min"></span> <small><span id="sec"></span></small></p>
//プレビュー
//2025/02/20
//Thursday
//16:32 45
//このように表示されます。 


let xingqibackup;
let decentformatofdate;
let decentformatofhour;
let decentformatofmin;
let decentformatofsec;
let cnday;
let jpday;
let enday;
let errcode;
document.addEventListener("DOMContentLoaded", () => {
setInterval((()=>
    {
        let timemgr=new Date;
        let year=timemgr.getFullYear();
        let mon=timemgr.getMonth()+1;
        let xingqi=timemgr.getDay(); 
        let hour=timemgr.getHours();
        let min=timemgr.getMinutes();
        let sec=timemgr.getSeconds();
        let date=timemgr.getDate();
        
        if (hour<10)
        {
           decentformatofhour="0"+hour.toString();
        }
        else
        {
            decentformatofhour=hour.toString();
        }
        if(min<10)
        {
         decentformatofmin="0"+min.toString();
        }
        else
        {
            decentformatofmin=min.toString();
          
        }
        if(sec<10)
        {
            decentformatofsec="0"+sec.toString();
        }
        else
        {
            decentformatofsec=sec.toString();
        }
        if(xingqi==0)
        {
             cnday="星期天";
             jpday="日曜日";
            enday="Sunday";
        }
        else if(xingqi==1)
        {
            cnday="星期一";
            jpday="月曜日";
            enday="Monday";
        }
        else if(xingqi==2)
        {
            cnday="星期二";
            jpday="火曜日";
            enday="Tuesday";
        }
        else if(xingqi==3)
        {
            cnday="星期三";
            jpday="水曜日";
            enday="Wednesday";
        }
        else if(xingqi==4)
        {
            cnday="星期四";
            jpday="木曜日";
            enday="Thursday";
        }
        else if(xingqi==5)
        {
            cnday="星期五";
            jpday="金曜日";
            enday="Friday";
        }
        else if(xingqi==6)
        {
            cnday="星期六";
            jpday="土曜日";
            enday="Saturday";
        }
        else
        {
            cnday="不能检索星期信息。";
            jpday="曜日情報を取得できませんでした。";
            enday="Cannot retrieve day information";
            errcode=1;
            xingqibackup=xingqi;
        }
        if (date<10)
        {
            decentformatofdate="0"+date.toString();
        }
        else
        {
            decentformatofdate=date.toString();
        }
        if(mon<10)
        {
            decentformatofmonth="0"+mon.toString();
        }
        else
        {
            decentformatofmonth=mon.toString();
        }
if(document.getElementById("year"))
{
    document.getElementById("year").innerHTML=year;
}
if(document.getElementById("month"))
{
    document.getElementById("month").innerHTML=decentformatofmonth;
}
if(document.getElementById("date"))
{
    document.getElementById("date").innerHTML=decentformatofdate;
}
if(document.getElementById("hour"))
{
    document.getElementById("hour").innerHTML=decentformatofhour;
}
if(document.getElementById("min"))
{
    document.getElementById("min").innerHTML=decentformatofmin;
}
if(document.getElementById("sec"))
{
    document.getElementById("sec").innerHTML=decentformatofsec;
}
if(document.getElementById("day"))
{
    document.getElementById("day").innerHTML=enday;
}
if(document.getElementById("youbi"))
{
    document.getElementById("youbi").innerHTML=jpday;
}
if(document.getElementById("xingqi"))
{
    document.getElementById("xingqi").innerHTML=cnday;
}




    }),100);
});
    //エラーレポート 頻繁に表示されてDevToolsを埋め尽くさないように9秒ごとにエラーレポートを表示します。

setInterval(()=>
    {
               if(errcode==1)
    {
        console.log("[timesysre] 9 seconds error reporter");
        console.log("[timesysre] Error: Cannot retrieve day information.");
        console.log(`[timesysre] Raw value: ${xingqibackup}`);
    }     
    },9000);


    
