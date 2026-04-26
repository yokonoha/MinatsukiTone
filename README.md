# 💧MinatsukiTone  
<img src="./logo.png" style="width:10vw;">  
MinatsukiTone・水无月音乐・水無月音樂
MinatsukiTone A lightweight Web Music Player   
Service link: https://minatsuki.pages.dev  

🌐 Supported languages: JP(日本語 Default) |[Experimental=> EN | CN (簡体字・繁体字)]  

<img width="1623" height="847" alt="image" src="https://github.com/user-attachments/assets/3957bf19-5272-4070-bc90-d3d79aad0030" />

<a href="https://yokonoha.pages.dev/articles/minatsukiringo">警告メッセージが表示された場合はこちらをご参照ください(About warning messages)[Japanese Reference Guide]</a>  
## これは?? / What is this?  
MinatsukiToneは、歌詞表示対応のWebアプリです。  
なんでMinaduki・Minazukiにしなかったのかは、深い理由は特にないです...  
前作CaffeineMusicとほぼ同じですが、画面サイズ追従精度の強化、歌詞表示対応化、操作感の向上させる仕組みを備えています!  
ブラウザによって対応する音楽ファイル形式は異なりますが、一般的なブラウザはmp3, m4a, flac に対応しています。  
歌詞は同期歌詞(lrc)とm4a埋め込み歌詞(ID3 [flacは非対応])に対応しています。ご自身で歌詞ファイルを**自作(or 購入)**してご利用ください。  
(不正または違法な手段で歌詞ファイルや音楽ファイルを入手する行為は絶対におやめください。そのような不正なファイルをMinatsukiToneへ読み込ませることは一切禁止とさせていただいております。)  
LRCファイルのサンプルはsamplelrcフォルダに入っています!   

<img width="1103" height="659" alt="MinatsukiTone Screenshot" src="https://github.com/user-attachments/assets/28d8b6a1-200b-45a3-aec9-c6e8540c1973" />  

## 警告メッセージについて/About warning messages  
JP: 機能に制約のある特定のデバイスでは警告が表示されることがあります。  
ファイルピッカーから読み込むことができず、別な方法を使用しなければならない場合や、そもそもブラウザ自体がファイルピッカーに対応していない場合に表示されることがあります。  
この警告表示が表示されるデバイスでは一部またはすべての機能が使用できない場合があります。  

EN: Warnings may appear on certain devices with functional limitations.  
This warning may appear when files cannot be loaded from the file picker and an alternative method must be used, or when the browser itself does not support the file picker.  
On devices displaying this warning, some or all features may be unavailable.  

## スタイルシート(CSS)について/About this stylesheet(CSS)  
JP: このアプリのスタイルシートは横茶横葉作成のFSovwerrideを使用しています。このスタイルシートは配布ページの説明に従い、ご活用ください!  
EN:  The style sheet for this application uses FSoverride created by Y.Yokoha.  

## ウィジェット(TimeSysRe)について/About the clock widget(TimeSysRe)  
TimeSysRe by Y.Yokoha  
https://github.com/yokonoha/timesysRe  
License:None(Free)  

spmgr.js(Splash Manager Script for Caffeine Family CSS env) by Y.Yokoha  
https://github.com/yokonoha/splash_manager  
License:MIT License  

## 依存関係/Dependency  
JP: このWebアプリケーションではBSDライセンスの適用されたコンポーネント「jsmediatags」を使用させていただいています。  
便利なjsライブラリをありがとうございます!  
リンク: https://github.com/aadsm/jsmediatags  

EN: This web application uses the BSD licensed component “jsmediatags”.  
The rights notice and BSD license is listed at the bottom of the main screen, and I have also included them in this page and NOTICE file.    
Link: https://github.com/aadsm/jsmediatags  

jsmediatags(BSD License)  
<a href="https://github.com/aadsm/jsmediatags">https://github.com/aadsm/jsmediatags</a>  
    BSD License

    Copyright (c) 2009 Opera Software ASA
    
    Copyright (c) 2015 António Afonso
    
    Copyright (c) 2008 Jacob Seidelin, http://blog.nihilogic.dk/
    
    Copyright (c) 2010 Joshua Kifer
    
    All rights reserved.
    
    Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
    
    Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
    
    Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
    
    Neither the name Facebook nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
    
    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.



