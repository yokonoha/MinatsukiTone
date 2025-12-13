//////////////////////////
///   Splash Manager   ///
///  Universal Script  ///
///      Ver.1.0       ///
/// Y.Yokoha Studio P  ///
//////////////////////////


console.log("[spmgr] Splash Controler Service Started.");
window.addEventListener("load",()=>
{
setTimeout(()=>
{
document.getElementById("splash").style.display="none";
document.getElementById("main").style.display="flex";
document.getElementById("main").style.flexDirection="column";
document.getElementById("main").style.alignItems="center";
}
,3000);

}
);