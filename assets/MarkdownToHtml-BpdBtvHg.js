import{r as Pu,u as P0,j as k,H as N0,I as O0}from"./index-Bty-QInu.js";import{C as B0,a as z0,B as ee}from"./Button-CCPPGs9u.js";import{u as U0}from"./useClipboard-COVLFtXx.js";const Dt={};function j0(u){let e=Dt[u];if(e)return e;e=Dt[u]=[];for(let t=0;t<128;t++){const n=String.fromCharCode(t);e.push(n)}for(let t=0;t<u.length;t++){const n=u.charCodeAt(t);e[n]="%"+("0"+n.toString(16).toUpperCase()).slice(-2)}return e}function Fu(u,e){typeof e!="string"&&(e=Fu.defaultChars);const t=j0(e);return u.replace(/(%[a-f0-9]{2})+/gi,function(n){let r="";for(let i=0,c=n.length;i<c;i+=3){const o=parseInt(n.slice(i+1,i+3),16);if(o<128){r+=t[o];continue}if((o&224)===192&&i+3<c){const a=parseInt(n.slice(i+4,i+6),16);if((a&192)===128){const s=o<<6&1984|a&63;s<128?r+="��":r+=String.fromCharCode(s),i+=3;continue}}if((o&240)===224&&i+6<c){const a=parseInt(n.slice(i+4,i+6),16),s=parseInt(n.slice(i+7,i+9),16);if((a&192)===128&&(s&192)===128){const f=o<<12&61440|a<<6&4032|s&63;f<2048||f>=55296&&f<=57343?r+="���":r+=String.fromCharCode(f),i+=6;continue}}if((o&248)===240&&i+9<c){const a=parseInt(n.slice(i+4,i+6),16),s=parseInt(n.slice(i+7,i+9),16),f=parseInt(n.slice(i+10,i+12),16);if((a&192)===128&&(s&192)===128&&(f&192)===128){let p=o<<18&1835008|a<<12&258048|s<<6&4032|f&63;p<65536||p>1114111?r+="����":(p-=65536,r+=String.fromCharCode(55296+(p>>10),56320+(p&1023))),i+=9;continue}}r+="�"}return r})}Fu.defaultChars=";/?:@&=+$,#";Fu.componentChars="";const Ct={};function q0(u){let e=Ct[u];if(e)return e;e=Ct[u]=[];for(let t=0;t<128;t++){const n=String.fromCharCode(t);/^[0-9a-z]$/i.test(n)?e.push(n):e.push("%"+("0"+t.toString(16).toUpperCase()).slice(-2))}for(let t=0;t<u.length;t++)e[u.charCodeAt(t)]=u[t];return e}function Gu(u,e,t){typeof e!="string"&&(t=e,e=Gu.defaultChars),typeof t>"u"&&(t=!0);const n=q0(e);let r="";for(let i=0,c=u.length;i<c;i++){const o=u.charCodeAt(i);if(t&&o===37&&i+2<c&&/^[0-9a-f]{2}$/i.test(u.slice(i+1,i+3))){r+=u.slice(i,i+3),i+=2;continue}if(o<128){r+=n[o];continue}if(o>=55296&&o<=57343){if(o>=55296&&o<=56319&&i+1<c){const a=u.charCodeAt(i+1);if(a>=56320&&a<=57343){r+=encodeURIComponent(u[i]+u[i+1]),i++;continue}}r+="%EF%BF%BD";continue}r+=encodeURIComponent(u[i])}return r}Gu.defaultChars=";/?:@&=+$,-_.!~*'()#";Gu.componentChars="-_.!~*'()";function $e(u){let e="";return e+=u.protocol||"",e+=u.slashes?"//":"",e+=u.auth?u.auth+"@":"",u.hostname&&u.hostname.indexOf(":")!==-1?e+="["+u.hostname+"]":e+=u.hostname||"",e+=u.port?":"+u.port:"",e+=u.pathname||"",e+=u.search||"",e+=u.hash||"",e}function ce(){this.protocol=null,this.slashes=null,this.auth=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.pathname=null}const H0=/^([a-z0-9.+-]+:)/i,$0=/:[0-9]*$/,G0=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,W0=["<",">",'"',"`"," ","\r",`
`,"	"],Z0=["{","}","|","\\","^","`"].concat(W0),V0=["'"].concat(Z0),yt=["%","/","?",";","#"].concat(V0),Tt=["/","?","#"],Y0=255,Ft=/^[+a-z0-9A-Z_-]{0,63}$/,X0=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,St={javascript:!0,"javascript:":!0},wt={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0};function Ge(u,e){if(u&&u instanceof ce)return u;const t=new ce;return t.parse(u,e),t}ce.prototype.parse=function(u,e){let t,n,r,i=u;if(i=i.trim(),!e&&u.split("#").length===1){const s=G0.exec(i);if(s)return this.pathname=s[1],s[2]&&(this.search=s[2]),this}let c=H0.exec(i);if(c&&(c=c[0],t=c.toLowerCase(),this.protocol=c,i=i.substr(c.length)),(e||c||i.match(/^\/\/[^@\/]+@[^@\/]+/))&&(r=i.substr(0,2)==="//",r&&!(c&&St[c])&&(i=i.substr(2),this.slashes=!0)),!St[c]&&(r||c&&!wt[c])){let s=-1;for(let d=0;d<Tt.length;d++)n=i.indexOf(Tt[d]),n!==-1&&(s===-1||n<s)&&(s=n);let f,p;s===-1?p=i.lastIndexOf("@"):p=i.lastIndexOf("@",s),p!==-1&&(f=i.slice(0,p),i=i.slice(p+1),this.auth=f),s=-1;for(let d=0;d<yt.length;d++)n=i.indexOf(yt[d]),n!==-1&&(s===-1||n<s)&&(s=n);s===-1&&(s=i.length),i[s-1]===":"&&s--;const m=i.slice(0,s);i=i.slice(s),this.parseHost(m),this.hostname=this.hostname||"";const h=this.hostname[0]==="["&&this.hostname[this.hostname.length-1]==="]";if(!h){const d=this.hostname.split(/\./);for(let D=0,y=d.length;D<y;D++){const S=d[D];if(S&&!S.match(Ft)){let E="";for(let A=0,x=S.length;A<x;A++)S.charCodeAt(A)>127?E+="x":E+=S[A];if(!E.match(Ft)){const A=d.slice(0,D),x=d.slice(D+1),C=S.match(X0);C&&(A.push(C[1]),x.unshift(C[2])),x.length&&(i=x.join(".")+i),this.hostname=A.join(".");break}}}}this.hostname.length>Y0&&(this.hostname=""),h&&(this.hostname=this.hostname.substr(1,this.hostname.length-2))}const o=i.indexOf("#");o!==-1&&(this.hash=i.substr(o),i=i.slice(0,o));const a=i.indexOf("?");return a!==-1&&(this.search=i.substr(a),i=i.slice(0,a)),i&&(this.pathname=i),wt[t]&&this.hostname&&!this.pathname&&(this.pathname=""),this};ce.prototype.parseHost=function(u){let e=$0.exec(u);e&&(e=e[0],e!==":"&&(this.port=e.substr(1)),u=u.substr(0,u.length-e.length)),u&&(this.hostname=u)};const J0=Object.freeze(Object.defineProperty({__proto__:null,decode:Fu,encode:Gu,format:$e,parse:Ge},Symbol.toStringTag,{value:"Module"})),Yt=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,Xt=/[\0-\x1F\x7F-\x9F]/,Q0=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/,We=/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/,Jt=/[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/,Qt=/[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/,K0=Object.freeze(Object.defineProperty({__proto__:null,Any:Yt,Cc:Xt,Cf:Q0,P:We,S:Jt,Z:Qt},Symbol.toStringTag,{value:"Module"})),un=new Uint16Array('ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map(u=>u.charCodeAt(0))),en=new Uint16Array("Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map(u=>u.charCodeAt(0)));var Te;const tn=new Map([[0,65533],[128,8364],[130,8218],[131,402],[132,8222],[133,8230],[134,8224],[135,8225],[136,710],[137,8240],[138,352],[139,8249],[140,338],[142,381],[145,8216],[146,8217],[147,8220],[148,8221],[149,8226],[150,8211],[151,8212],[152,732],[153,8482],[154,353],[155,8250],[156,339],[158,382],[159,376]]),nn=(Te=String.fromCodePoint)!==null&&Te!==void 0?Te:function(u){let e="";return u>65535&&(u-=65536,e+=String.fromCharCode(u>>>10&1023|55296),u=56320|u&1023),e+=String.fromCharCode(u),e};function rn(u){var e;return u>=55296&&u<=57343||u>1114111?65533:(e=tn.get(u))!==null&&e!==void 0?e:u}var B;(function(u){u[u.NUM=35]="NUM",u[u.SEMI=59]="SEMI",u[u.EQUALS=61]="EQUALS",u[u.ZERO=48]="ZERO",u[u.NINE=57]="NINE",u[u.LOWER_A=97]="LOWER_A",u[u.LOWER_F=102]="LOWER_F",u[u.LOWER_X=120]="LOWER_X",u[u.LOWER_Z=122]="LOWER_Z",u[u.UPPER_A=65]="UPPER_A",u[u.UPPER_F=70]="UPPER_F",u[u.UPPER_Z=90]="UPPER_Z"})(B||(B={}));const on=32;var fu;(function(u){u[u.VALUE_LENGTH=49152]="VALUE_LENGTH",u[u.BRANCH_LENGTH=16256]="BRANCH_LENGTH",u[u.JUMP_TABLE=127]="JUMP_TABLE"})(fu||(fu={}));function ze(u){return u>=B.ZERO&&u<=B.NINE}function cn(u){return u>=B.UPPER_A&&u<=B.UPPER_F||u>=B.LOWER_A&&u<=B.LOWER_F}function an(u){return u>=B.UPPER_A&&u<=B.UPPER_Z||u>=B.LOWER_A&&u<=B.LOWER_Z||ze(u)}function sn(u){return u===B.EQUALS||an(u)}var O;(function(u){u[u.EntityStart=0]="EntityStart",u[u.NumericStart=1]="NumericStart",u[u.NumericDecimal=2]="NumericDecimal",u[u.NumericHex=3]="NumericHex",u[u.NamedEntity=4]="NamedEntity"})(O||(O={}));var du;(function(u){u[u.Legacy=0]="Legacy",u[u.Strict=1]="Strict",u[u.Attribute=2]="Attribute"})(du||(du={}));class ln{constructor(e,t,n){this.decodeTree=e,this.emitCodePoint=t,this.errors=n,this.state=O.EntityStart,this.consumed=1,this.result=0,this.treeIndex=0,this.excess=1,this.decodeMode=du.Strict}startEntity(e){this.decodeMode=e,this.state=O.EntityStart,this.result=0,this.treeIndex=0,this.excess=1,this.consumed=1}write(e,t){switch(this.state){case O.EntityStart:return e.charCodeAt(t)===B.NUM?(this.state=O.NumericStart,this.consumed+=1,this.stateNumericStart(e,t+1)):(this.state=O.NamedEntity,this.stateNamedEntity(e,t));case O.NumericStart:return this.stateNumericStart(e,t);case O.NumericDecimal:return this.stateNumericDecimal(e,t);case O.NumericHex:return this.stateNumericHex(e,t);case O.NamedEntity:return this.stateNamedEntity(e,t)}}stateNumericStart(e,t){return t>=e.length?-1:(e.charCodeAt(t)|on)===B.LOWER_X?(this.state=O.NumericHex,this.consumed+=1,this.stateNumericHex(e,t+1)):(this.state=O.NumericDecimal,this.stateNumericDecimal(e,t))}addToNumericResult(e,t,n,r){if(t!==n){const i=n-t;this.result=this.result*Math.pow(r,i)+parseInt(e.substr(t,i),r),this.consumed+=i}}stateNumericHex(e,t){const n=t;for(;t<e.length;){const r=e.charCodeAt(t);if(ze(r)||cn(r))t+=1;else return this.addToNumericResult(e,n,t,16),this.emitNumericEntity(r,3)}return this.addToNumericResult(e,n,t,16),-1}stateNumericDecimal(e,t){const n=t;for(;t<e.length;){const r=e.charCodeAt(t);if(ze(r))t+=1;else return this.addToNumericResult(e,n,t,10),this.emitNumericEntity(r,2)}return this.addToNumericResult(e,n,t,10),-1}emitNumericEntity(e,t){var n;if(this.consumed<=t)return(n=this.errors)===null||n===void 0||n.absenceOfDigitsInNumericCharacterReference(this.consumed),0;if(e===B.SEMI)this.consumed+=1;else if(this.decodeMode===du.Strict)return 0;return this.emitCodePoint(rn(this.result),this.consumed),this.errors&&(e!==B.SEMI&&this.errors.missingSemicolonAfterCharacterReference(),this.errors.validateNumericCharacterReference(this.result)),this.consumed}stateNamedEntity(e,t){const{decodeTree:n}=this;let r=n[this.treeIndex],i=(r&fu.VALUE_LENGTH)>>14;for(;t<e.length;t++,this.excess++){const c=e.charCodeAt(t);if(this.treeIndex=dn(n,r,this.treeIndex+Math.max(1,i),c),this.treeIndex<0)return this.result===0||this.decodeMode===du.Attribute&&(i===0||sn(c))?0:this.emitNotTerminatedNamedEntity();if(r=n[this.treeIndex],i=(r&fu.VALUE_LENGTH)>>14,i!==0){if(c===B.SEMI)return this.emitNamedEntityData(this.treeIndex,i,this.consumed+this.excess);this.decodeMode!==du.Strict&&(this.result=this.treeIndex,this.consumed+=this.excess,this.excess=0)}}return-1}emitNotTerminatedNamedEntity(){var e;const{result:t,decodeTree:n}=this,r=(n[t]&fu.VALUE_LENGTH)>>14;return this.emitNamedEntityData(t,r,this.consumed),(e=this.errors)===null||e===void 0||e.missingSemicolonAfterCharacterReference(),this.consumed}emitNamedEntityData(e,t,n){const{decodeTree:r}=this;return this.emitCodePoint(t===1?r[e]&~fu.VALUE_LENGTH:r[e+1],n),t===3&&this.emitCodePoint(r[e+2],n),n}end(){var e;switch(this.state){case O.NamedEntity:return this.result!==0&&(this.decodeMode!==du.Attribute||this.result===this.treeIndex)?this.emitNotTerminatedNamedEntity():0;case O.NumericDecimal:return this.emitNumericEntity(0,2);case O.NumericHex:return this.emitNumericEntity(0,3);case O.NumericStart:return(e=this.errors)===null||e===void 0||e.absenceOfDigitsInNumericCharacterReference(this.consumed),0;case O.EntityStart:return 0}}}function Kt(u){let e="";const t=new ln(u,n=>e+=nn(n));return function(r,i){let c=0,o=0;for(;(o=r.indexOf("&",o))>=0;){e+=r.slice(c,o),t.startEntity(i);const s=t.write(r,o+1);if(s<0){c=o+t.end();break}c=o+s,o=s===0?c+1:c}const a=e+r.slice(c);return e="",a}}function dn(u,e,t,n){const r=(e&fu.BRANCH_LENGTH)>>7,i=e&fu.JUMP_TABLE;if(r===0)return i!==0&&n===i?t:-1;if(i){const a=n-i;return a<0||a>=r?-1:u[t+a]-1}let c=t,o=c+r-1;for(;c<=o;){const a=c+o>>>1,s=u[a];if(s<n)c=a+1;else if(s>n)o=a-1;else return u[a+r]}return-1}const fn=Kt(un);Kt(en);function u0(u,e=du.Legacy){return fn(u,e)}function pn(u){return Object.prototype.toString.call(u)}function Ze(u){return pn(u)==="[object String]"}const hn=Object.prototype.hasOwnProperty;function bn(u,e){return hn.call(u,e)}function le(u){return Array.prototype.slice.call(arguments,1).forEach(function(t){if(t){if(typeof t!="object")throw new TypeError(t+"must be object");Object.keys(t).forEach(function(n){u[n]=t[n]})}}),u}function e0(u,e,t){return[].concat(u.slice(0,e),t,u.slice(e+1))}function Ve(u){return!(u>=55296&&u<=57343||u>=64976&&u<=65007||(u&65535)===65535||(u&65535)===65534||u>=0&&u<=8||u===11||u>=14&&u<=31||u>=127&&u<=159||u>1114111)}function ae(u){if(u>65535){u-=65536;const e=55296+(u>>10),t=56320+(u&1023);return String.fromCharCode(e,t)}return String.fromCharCode(u)}const t0=/\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g,mn=/&([a-z#][a-z0-9]{1,31});/gi,xn=new RegExp(t0.source+"|"+mn.source,"gi"),_n=/^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;function gn(u,e){if(e.charCodeAt(0)===35&&_n.test(e)){const n=e[1].toLowerCase()==="x"?parseInt(e.slice(2),16):parseInt(e.slice(1),10);return Ve(n)?ae(n):u}const t=u0(u);return t!==u?t:u}function kn(u){return u.indexOf("\\")<0?u:u.replace(t0,"$1")}function Su(u){return u.indexOf("\\")<0&&u.indexOf("&")<0?u:u.replace(xn,function(e,t,n){return t||gn(e,n)})}const En=/[&<>"]/,An=/[&<>"]/g,Dn={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function Cn(u){return Dn[u]}function pu(u){return En.test(u)?u.replace(An,Cn):u}const yn=/[.?*+^$[\]\\(){}|-]/g;function Tn(u){return u.replace(yn,"\\$&")}function w(u){switch(u){case 9:case 32:return!0}return!1}function ju(u){if(u>=8192&&u<=8202)return!0;switch(u){case 9:case 10:case 11:case 12:case 13:case 32:case 160:case 5760:case 8239:case 8287:case 12288:return!0}return!1}function qu(u){return We.test(u)||Jt.test(u)}function Hu(u){switch(u){case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 41:case 42:case 43:case 44:case 45:case 46:case 47:case 58:case 59:case 60:case 61:case 62:case 63:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 124:case 125:case 126:return!0;default:return!1}}function de(u){return u=u.trim().replace(/\s+/g," "),"ẞ".toLowerCase()==="Ṿ"&&(u=u.replace(/ẞ/g,"ß")),u.toLowerCase().toUpperCase()}const Fn={mdurl:J0,ucmicro:K0},Sn=Object.freeze(Object.defineProperty({__proto__:null,arrayReplaceAt:e0,assign:le,escapeHtml:pu,escapeRE:Tn,fromCodePoint:ae,has:bn,isMdAsciiPunct:Hu,isPunctChar:qu,isSpace:w,isString:Ze,isValidEntityCode:Ve,isWhiteSpace:ju,lib:Fn,normalizeReference:de,unescapeAll:Su,unescapeMd:kn},Symbol.toStringTag,{value:"Module"}));function wn(u,e,t){let n,r,i,c;const o=u.posMax,a=u.pos;for(u.pos=e+1,n=1;u.pos<o;){if(i=u.src.charCodeAt(u.pos),i===93&&(n--,n===0)){r=!0;break}if(c=u.pos,u.md.inline.skipToken(u),i===91){if(c===u.pos-1)n++;else if(t)return u.pos=a,-1}}let s=-1;return r&&(s=u.pos),u.pos=a,s}function vn(u,e,t){let n,r=e;const i={ok:!1,pos:0,str:""};if(u.charCodeAt(r)===60){for(r++;r<t;){if(n=u.charCodeAt(r),n===10||n===60)return i;if(n===62)return i.pos=r+1,i.str=Su(u.slice(e+1,r)),i.ok=!0,i;if(n===92&&r+1<t){r+=2;continue}r++}return i}let c=0;for(;r<t&&(n=u.charCodeAt(r),!(n===32||n<32||n===127));){if(n===92&&r+1<t){if(u.charCodeAt(r+1)===32)break;r+=2;continue}if(n===40&&(c++,c>32))return i;if(n===41){if(c===0)break;c--}r++}return e===r||c!==0||(i.str=Su(u.slice(e,r)),i.pos=r,i.ok=!0),i}function Rn(u,e,t,n){let r,i=e;const c={ok:!1,can_continue:!1,pos:0,str:"",marker:0};if(n)c.str=n.str,c.marker=n.marker;else{if(i>=t)return c;let o=u.charCodeAt(i);if(o!==34&&o!==39&&o!==40)return c;e++,i++,o===40&&(o=41),c.marker=o}for(;i<t;){if(r=u.charCodeAt(i),r===c.marker)return c.pos=i+1,c.str+=Su(u.slice(e,i)),c.ok=!0,c;if(r===40&&c.marker===41)return c;r===92&&i+1<t&&i++,i++}return c.can_continue=!0,c.str+=Su(u.slice(e,i)),c}const Mn=Object.freeze(Object.defineProperty({__proto__:null,parseLinkDestination:vn,parseLinkLabel:wn,parseLinkTitle:Rn},Symbol.toStringTag,{value:"Module"})),nu={};nu.code_inline=function(u,e,t,n,r){const i=u[e];return"<code"+r.renderAttrs(i)+">"+pu(i.content)+"</code>"};nu.code_block=function(u,e,t,n,r){const i=u[e];return"<pre"+r.renderAttrs(i)+"><code>"+pu(u[e].content)+`</code></pre>
`};nu.fence=function(u,e,t,n,r){const i=u[e],c=i.info?Su(i.info).trim():"";let o="",a="";if(c){const f=c.split(/(\s+)/g);o=f[0],a=f.slice(2).join("")}let s;if(t.highlight?s=t.highlight(i.content,o,a)||pu(i.content):s=pu(i.content),s.indexOf("<pre")===0)return s+`
`;if(c){const f=i.attrIndex("class"),p=i.attrs?i.attrs.slice():[];f<0?p.push(["class",t.langPrefix+o]):(p[f]=p[f].slice(),p[f][1]+=" "+t.langPrefix+o);const m={attrs:p};return`<pre><code${r.renderAttrs(m)}>${s}</code></pre>
`}return`<pre><code${r.renderAttrs(i)}>${s}</code></pre>
`};nu.image=function(u,e,t,n,r){const i=u[e];return i.attrs[i.attrIndex("alt")][1]=r.renderInlineAsText(i.children,t,n),r.renderToken(u,e,t)};nu.hardbreak=function(u,e,t){return t.xhtmlOut?`<br />
`:`<br>
`};nu.softbreak=function(u,e,t){return t.breaks?t.xhtmlOut?`<br />
`:`<br>
`:`
`};nu.text=function(u,e){return pu(u[e].content)};nu.html_block=function(u,e){return u[e].content};nu.html_inline=function(u,e){return u[e].content};function wu(){this.rules=le({},nu)}wu.prototype.renderAttrs=function(e){let t,n,r;if(!e.attrs)return"";for(r="",t=0,n=e.attrs.length;t<n;t++)r+=" "+pu(e.attrs[t][0])+'="'+pu(e.attrs[t][1])+'"';return r};wu.prototype.renderToken=function(e,t,n){const r=e[t];let i="";if(r.hidden)return"";r.block&&r.nesting!==-1&&t&&e[t-1].hidden&&(i+=`
`),i+=(r.nesting===-1?"</":"<")+r.tag,i+=this.renderAttrs(r),r.nesting===0&&n.xhtmlOut&&(i+=" /");let c=!1;if(r.block&&(c=!0,r.nesting===1&&t+1<e.length)){const o=e[t+1];(o.type==="inline"||o.hidden||o.nesting===-1&&o.tag===r.tag)&&(c=!1)}return i+=c?`>
`:">",i};wu.prototype.renderInline=function(u,e,t){let n="";const r=this.rules;for(let i=0,c=u.length;i<c;i++){const o=u[i].type;typeof r[o]<"u"?n+=r[o](u,i,e,t,this):n+=this.renderToken(u,i,e)}return n};wu.prototype.renderInlineAsText=function(u,e,t){let n="";for(let r=0,i=u.length;r<i;r++)switch(u[r].type){case"text":n+=u[r].content;break;case"image":n+=this.renderInlineAsText(u[r].children,e,t);break;case"html_inline":case"html_block":n+=u[r].content;break;case"softbreak":case"hardbreak":n+=`
`;break}return n};wu.prototype.render=function(u,e,t){let n="";const r=this.rules;for(let i=0,c=u.length;i<c;i++){const o=u[i].type;o==="inline"?n+=this.renderInline(u[i].children,e,t):typeof r[o]<"u"?n+=r[o](u,i,e,t,this):n+=this.renderToken(u,i,e,t)}return n};function W(){this.__rules__=[],this.__cache__=null}W.prototype.__find__=function(u){for(let e=0;e<this.__rules__.length;e++)if(this.__rules__[e].name===u)return e;return-1};W.prototype.__compile__=function(){const u=this,e=[""];u.__rules__.forEach(function(t){t.enabled&&t.alt.forEach(function(n){e.indexOf(n)<0&&e.push(n)})}),u.__cache__={},e.forEach(function(t){u.__cache__[t]=[],u.__rules__.forEach(function(n){n.enabled&&(t&&n.alt.indexOf(t)<0||u.__cache__[t].push(n.fn))})})};W.prototype.at=function(u,e,t){const n=this.__find__(u),r=t||{};if(n===-1)throw new Error("Parser rule not found: "+u);this.__rules__[n].fn=e,this.__rules__[n].alt=r.alt||[],this.__cache__=null};W.prototype.before=function(u,e,t,n){const r=this.__find__(u),i=n||{};if(r===-1)throw new Error("Parser rule not found: "+u);this.__rules__.splice(r,0,{name:e,enabled:!0,fn:t,alt:i.alt||[]}),this.__cache__=null};W.prototype.after=function(u,e,t,n){const r=this.__find__(u),i=n||{};if(r===-1)throw new Error("Parser rule not found: "+u);this.__rules__.splice(r+1,0,{name:e,enabled:!0,fn:t,alt:i.alt||[]}),this.__cache__=null};W.prototype.push=function(u,e,t){const n=t||{};this.__rules__.push({name:u,enabled:!0,fn:e,alt:n.alt||[]}),this.__cache__=null};W.prototype.enable=function(u,e){Array.isArray(u)||(u=[u]);const t=[];return u.forEach(function(n){const r=this.__find__(n);if(r<0){if(e)return;throw new Error("Rules manager: invalid rule name "+n)}this.__rules__[r].enabled=!0,t.push(n)},this),this.__cache__=null,t};W.prototype.enableOnly=function(u,e){Array.isArray(u)||(u=[u]),this.__rules__.forEach(function(t){t.enabled=!1}),this.enable(u,e)};W.prototype.disable=function(u,e){Array.isArray(u)||(u=[u]);const t=[];return u.forEach(function(n){const r=this.__find__(n);if(r<0){if(e)return;throw new Error("Rules manager: invalid rule name "+n)}this.__rules__[r].enabled=!1,t.push(n)},this),this.__cache__=null,t};W.prototype.getRules=function(u){return this.__cache__===null&&this.__compile__(),this.__cache__[u]||[]};function Q(u,e,t){this.type=u,this.tag=e,this.attrs=null,this.map=null,this.nesting=t,this.level=0,this.children=null,this.content="",this.markup="",this.info="",this.meta=null,this.block=!1,this.hidden=!1}Q.prototype.attrIndex=function(e){if(!this.attrs)return-1;const t=this.attrs;for(let n=0,r=t.length;n<r;n++)if(t[n][0]===e)return n;return-1};Q.prototype.attrPush=function(e){this.attrs?this.attrs.push(e):this.attrs=[e]};Q.prototype.attrSet=function(e,t){const n=this.attrIndex(e),r=[e,t];n<0?this.attrPush(r):this.attrs[n]=r};Q.prototype.attrGet=function(e){const t=this.attrIndex(e);let n=null;return t>=0&&(n=this.attrs[t][1]),n};Q.prototype.attrJoin=function(e,t){const n=this.attrIndex(e);n<0?this.attrPush([e,t]):this.attrs[n][1]=this.attrs[n][1]+" "+t};function n0(u,e,t){this.src=u,this.env=t,this.tokens=[],this.inlineMode=!1,this.md=e}n0.prototype.Token=Q;const In=/\r\n?|\n/g,Ln=/\0/g;function Pn(u){let e;e=u.src.replace(In,`
`),e=e.replace(Ln,"�"),u.src=e}function Nn(u){let e;u.inlineMode?(e=new u.Token("inline","",0),e.content=u.src,e.map=[0,1],e.children=[],u.tokens.push(e)):u.md.block.parse(u.src,u.md,u.env,u.tokens)}function On(u){const e=u.tokens;for(let t=0,n=e.length;t<n;t++){const r=e[t];r.type==="inline"&&u.md.inline.parse(r.content,u.md,u.env,r.children)}}function Bn(u){return/^<a[>\s]/i.test(u)}function zn(u){return/^<\/a\s*>/i.test(u)}function Un(u){const e=u.tokens;if(u.md.options.linkify)for(let t=0,n=e.length;t<n;t++){if(e[t].type!=="inline"||!u.md.linkify.pretest(e[t].content))continue;let r=e[t].children,i=0;for(let c=r.length-1;c>=0;c--){const o=r[c];if(o.type==="link_close"){for(c--;r[c].level!==o.level&&r[c].type!=="link_open";)c--;continue}if(o.type==="html_inline"&&(Bn(o.content)&&i>0&&i--,zn(o.content)&&i++),!(i>0)&&o.type==="text"&&u.md.linkify.test(o.content)){const a=o.content;let s=u.md.linkify.match(a);const f=[];let p=o.level,m=0;s.length>0&&s[0].index===0&&c>0&&r[c-1].type==="text_special"&&(s=s.slice(1));for(let h=0;h<s.length;h++){const d=s[h].url,D=u.md.normalizeLink(d);if(!u.md.validateLink(D))continue;let y=s[h].text;s[h].schema?s[h].schema==="mailto:"&&!/^mailto:/i.test(y)?y=u.md.normalizeLinkText("mailto:"+y).replace(/^mailto:/,""):y=u.md.normalizeLinkText(y):y=u.md.normalizeLinkText("http://"+y).replace(/^http:\/\//,"");const S=s[h].index;if(S>m){const C=new u.Token("text","",0);C.content=a.slice(m,S),C.level=p,f.push(C)}const E=new u.Token("link_open","a",1);E.attrs=[["href",D]],E.level=p++,E.markup="linkify",E.info="auto",f.push(E);const A=new u.Token("text","",0);A.content=y,A.level=p,f.push(A);const x=new u.Token("link_close","a",-1);x.level=--p,x.markup="linkify",x.info="auto",f.push(x),m=s[h].lastIndex}if(m<a.length){const h=new u.Token("text","",0);h.content=a.slice(m),h.level=p,f.push(h)}e[t].children=r=e0(r,c,f)}}}}const r0=/\+-|\.\.|\?\?\?\?|!!!!|,,|--/,jn=/\((c|tm|r)\)/i,qn=/\((c|tm|r)\)/ig,Hn={c:"©",r:"®",tm:"™"};function $n(u,e){return Hn[e.toLowerCase()]}function Gn(u){let e=0;for(let t=u.length-1;t>=0;t--){const n=u[t];n.type==="text"&&!e&&(n.content=n.content.replace(qn,$n)),n.type==="link_open"&&n.info==="auto"&&e--,n.type==="link_close"&&n.info==="auto"&&e++}}function Wn(u){let e=0;for(let t=u.length-1;t>=0;t--){const n=u[t];n.type==="text"&&!e&&r0.test(n.content)&&(n.content=n.content.replace(/\+-/g,"±").replace(/\.{2,}/g,"…").replace(/([?!])…/g,"$1..").replace(/([?!]){4,}/g,"$1$1$1").replace(/,{2,}/g,",").replace(/(^|[^-])---(?=[^-]|$)/mg,"$1—").replace(/(^|\s)--(?=\s|$)/mg,"$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg,"$1–")),n.type==="link_open"&&n.info==="auto"&&e--,n.type==="link_close"&&n.info==="auto"&&e++}}function Zn(u){let e;if(u.md.options.typographer)for(e=u.tokens.length-1;e>=0;e--)u.tokens[e].type==="inline"&&(jn.test(u.tokens[e].content)&&Gn(u.tokens[e].children),r0.test(u.tokens[e].content)&&Wn(u.tokens[e].children))}const Vn=/['"]/,vt=/['"]/g,Rt="’";function te(u,e,t){return u.slice(0,e)+t+u.slice(e+1)}function Yn(u,e){let t;const n=[];for(let r=0;r<u.length;r++){const i=u[r],c=u[r].level;for(t=n.length-1;t>=0&&!(n[t].level<=c);t--);if(n.length=t+1,i.type!=="text")continue;let o=i.content,a=0,s=o.length;u:for(;a<s;){vt.lastIndex=a;const f=vt.exec(o);if(!f)break;let p=!0,m=!0;a=f.index+1;const h=f[0]==="'";let d=32;if(f.index-1>=0)d=o.charCodeAt(f.index-1);else for(t=r-1;t>=0&&!(u[t].type==="softbreak"||u[t].type==="hardbreak");t--)if(u[t].content){d=u[t].content.charCodeAt(u[t].content.length-1);break}let D=32;if(a<s)D=o.charCodeAt(a);else for(t=r+1;t<u.length&&!(u[t].type==="softbreak"||u[t].type==="hardbreak");t++)if(u[t].content){D=u[t].content.charCodeAt(0);break}const y=Hu(d)||qu(String.fromCharCode(d)),S=Hu(D)||qu(String.fromCharCode(D)),E=ju(d),A=ju(D);if(A?p=!1:S&&(E||y||(p=!1)),E?m=!1:y&&(A||S||(m=!1)),D===34&&f[0]==='"'&&d>=48&&d<=57&&(m=p=!1),p&&m&&(p=y,m=S),!p&&!m){h&&(i.content=te(i.content,f.index,Rt));continue}if(m)for(t=n.length-1;t>=0;t--){let x=n[t];if(n[t].level<c)break;if(x.single===h&&n[t].level===c){x=n[t];let C,T;h?(C=e.md.options.quotes[2],T=e.md.options.quotes[3]):(C=e.md.options.quotes[0],T=e.md.options.quotes[1]),i.content=te(i.content,f.index,T),u[x.token].content=te(u[x.token].content,x.pos,C),a+=T.length-1,x.token===r&&(a+=C.length-1),o=i.content,s=o.length,n.length=t;continue u}}p?n.push({token:r,pos:f.index,single:h,level:c}):m&&h&&(i.content=te(i.content,f.index,Rt))}}}function Xn(u){if(u.md.options.typographer)for(let e=u.tokens.length-1;e>=0;e--)u.tokens[e].type!=="inline"||!Vn.test(u.tokens[e].content)||Yn(u.tokens[e].children,u)}function Jn(u){let e,t;const n=u.tokens,r=n.length;for(let i=0;i<r;i++){if(n[i].type!=="inline")continue;const c=n[i].children,o=c.length;for(e=0;e<o;e++)c[e].type==="text_special"&&(c[e].type="text");for(e=t=0;e<o;e++)c[e].type==="text"&&e+1<o&&c[e+1].type==="text"?c[e+1].content=c[e].content+c[e+1].content:(e!==t&&(c[t]=c[e]),t++);e!==t&&(c.length=t)}}const Fe=[["normalize",Pn],["block",Nn],["inline",On],["linkify",Un],["replacements",Zn],["smartquotes",Xn],["text_join",Jn]];function Ye(){this.ruler=new W;for(let u=0;u<Fe.length;u++)this.ruler.push(Fe[u][0],Fe[u][1])}Ye.prototype.process=function(u){const e=this.ruler.getRules("");for(let t=0,n=e.length;t<n;t++)e[t](u)};Ye.prototype.State=n0;function ru(u,e,t,n){this.src=u,this.md=e,this.env=t,this.tokens=n,this.bMarks=[],this.eMarks=[],this.tShift=[],this.sCount=[],this.bsCount=[],this.blkIndent=0,this.line=0,this.lineMax=0,this.tight=!1,this.ddIndent=-1,this.listIndent=-1,this.parentType="root",this.level=0;const r=this.src;for(let i=0,c=0,o=0,a=0,s=r.length,f=!1;c<s;c++){const p=r.charCodeAt(c);if(!f)if(w(p)){o++,p===9?a+=4-a%4:a++;continue}else f=!0;(p===10||c===s-1)&&(p!==10&&c++,this.bMarks.push(i),this.eMarks.push(c),this.tShift.push(o),this.sCount.push(a),this.bsCount.push(0),f=!1,o=0,a=0,i=c+1)}this.bMarks.push(r.length),this.eMarks.push(r.length),this.tShift.push(0),this.sCount.push(0),this.bsCount.push(0),this.lineMax=this.bMarks.length-1}ru.prototype.push=function(u,e,t){const n=new Q(u,e,t);return n.block=!0,t<0&&this.level--,n.level=this.level,t>0&&this.level++,this.tokens.push(n),n};ru.prototype.isEmpty=function(e){return this.bMarks[e]+this.tShift[e]>=this.eMarks[e]};ru.prototype.skipEmptyLines=function(e){for(let t=this.lineMax;e<t&&!(this.bMarks[e]+this.tShift[e]<this.eMarks[e]);e++);return e};ru.prototype.skipSpaces=function(e){for(let t=this.src.length;e<t;e++){const n=this.src.charCodeAt(e);if(!w(n))break}return e};ru.prototype.skipSpacesBack=function(e,t){if(e<=t)return e;for(;e>t;)if(!w(this.src.charCodeAt(--e)))return e+1;return e};ru.prototype.skipChars=function(e,t){for(let n=this.src.length;e<n&&this.src.charCodeAt(e)===t;e++);return e};ru.prototype.skipCharsBack=function(e,t,n){if(e<=n)return e;for(;e>n;)if(t!==this.src.charCodeAt(--e))return e+1;return e};ru.prototype.getLines=function(e,t,n,r){if(e>=t)return"";const i=new Array(t-e);for(let c=0,o=e;o<t;o++,c++){let a=0;const s=this.bMarks[o];let f=s,p;for(o+1<t||r?p=this.eMarks[o]+1:p=this.eMarks[o];f<p&&a<n;){const m=this.src.charCodeAt(f);if(w(m))m===9?a+=4-(a+this.bsCount[o])%4:a++;else if(f-s<this.tShift[o])a++;else break;f++}a>n?i[c]=new Array(a-n+1).join(" ")+this.src.slice(f,p):i[c]=this.src.slice(f,p)}return i.join("")};ru.prototype.Token=Q;const Qn=65536;function Se(u,e){const t=u.bMarks[e]+u.tShift[e],n=u.eMarks[e];return u.src.slice(t,n)}function Mt(u){const e=[],t=u.length;let n=0,r=u.charCodeAt(n),i=!1,c=0,o="";for(;n<t;)r===124&&(i?(o+=u.substring(c,n-1),c=n):(e.push(o+u.substring(c,n)),o="",c=n+1)),i=r===92,n++,r=u.charCodeAt(n);return e.push(o+u.substring(c)),e}function Kn(u,e,t,n){if(e+2>t)return!1;let r=e+1;if(u.sCount[r]<u.blkIndent||u.sCount[r]-u.blkIndent>=4)return!1;let i=u.bMarks[r]+u.tShift[r];if(i>=u.eMarks[r])return!1;const c=u.src.charCodeAt(i++);if(c!==124&&c!==45&&c!==58||i>=u.eMarks[r])return!1;const o=u.src.charCodeAt(i++);if(o!==124&&o!==45&&o!==58&&!w(o)||c===45&&w(o))return!1;for(;i<u.eMarks[r];){const x=u.src.charCodeAt(i);if(x!==124&&x!==45&&x!==58&&!w(x))return!1;i++}let a=Se(u,e+1),s=a.split("|");const f=[];for(let x=0;x<s.length;x++){const C=s[x].trim();if(!C){if(x===0||x===s.length-1)continue;return!1}if(!/^:?-+:?$/.test(C))return!1;C.charCodeAt(C.length-1)===58?f.push(C.charCodeAt(0)===58?"center":"right"):C.charCodeAt(0)===58?f.push("left"):f.push("")}if(a=Se(u,e).trim(),a.indexOf("|")===-1||u.sCount[e]-u.blkIndent>=4)return!1;s=Mt(a),s.length&&s[0]===""&&s.shift(),s.length&&s[s.length-1]===""&&s.pop();const p=s.length;if(p===0||p!==f.length)return!1;if(n)return!0;const m=u.parentType;u.parentType="table";const h=u.md.block.ruler.getRules("blockquote"),d=u.push("table_open","table",1),D=[e,0];d.map=D;const y=u.push("thead_open","thead",1);y.map=[e,e+1];const S=u.push("tr_open","tr",1);S.map=[e,e+1];for(let x=0;x<s.length;x++){const C=u.push("th_open","th",1);f[x]&&(C.attrs=[["style","text-align:"+f[x]]]);const T=u.push("inline","",0);T.content=s[x].trim(),T.children=[],u.push("th_close","th",-1)}u.push("tr_close","tr",-1),u.push("thead_close","thead",-1);let E,A=0;for(r=e+2;r<t&&!(u.sCount[r]<u.blkIndent);r++){let x=!1;for(let T=0,I=h.length;T<I;T++)if(h[T](u,r,t,!0)){x=!0;break}if(x||(a=Se(u,r).trim(),!a)||u.sCount[r]-u.blkIndent>=4||(s=Mt(a),s.length&&s[0]===""&&s.shift(),s.length&&s[s.length-1]===""&&s.pop(),A+=p-s.length,A>Qn))break;if(r===e+2){const T=u.push("tbody_open","tbody",1);T.map=E=[e+2,0]}const C=u.push("tr_open","tr",1);C.map=[r,r+1];for(let T=0;T<p;T++){const I=u.push("td_open","td",1);f[T]&&(I.attrs=[["style","text-align:"+f[T]]]);const Z=u.push("inline","",0);Z.content=s[T]?s[T].trim():"",Z.children=[],u.push("td_close","td",-1)}u.push("tr_close","tr",-1)}return E&&(u.push("tbody_close","tbody",-1),E[1]=r),u.push("table_close","table",-1),D[1]=r,u.parentType=m,u.line=r,!0}function ur(u,e,t){if(u.sCount[e]-u.blkIndent<4)return!1;let n=e+1,r=n;for(;n<t;){if(u.isEmpty(n)){n++;continue}if(u.sCount[n]-u.blkIndent>=4){n++,r=n;continue}break}u.line=r;const i=u.push("code_block","code",0);return i.content=u.getLines(e,r,4+u.blkIndent,!1)+`
`,i.map=[e,u.line],!0}function er(u,e,t,n){let r=u.bMarks[e]+u.tShift[e],i=u.eMarks[e];if(u.sCount[e]-u.blkIndent>=4||r+3>i)return!1;const c=u.src.charCodeAt(r);if(c!==126&&c!==96)return!1;let o=r;r=u.skipChars(r,c);let a=r-o;if(a<3)return!1;const s=u.src.slice(o,r),f=u.src.slice(r,i);if(c===96&&f.indexOf(String.fromCharCode(c))>=0)return!1;if(n)return!0;let p=e,m=!1;for(;p++,!(p>=t||(r=o=u.bMarks[p]+u.tShift[p],i=u.eMarks[p],r<i&&u.sCount[p]<u.blkIndent));)if(u.src.charCodeAt(r)===c&&!(u.sCount[p]-u.blkIndent>=4)&&(r=u.skipChars(r,c),!(r-o<a)&&(r=u.skipSpaces(r),!(r<i)))){m=!0;break}a=u.sCount[e],u.line=p+(m?1:0);const h=u.push("fence","code",0);return h.info=f,h.content=u.getLines(e+1,p,a,!0),h.markup=s,h.map=[e,u.line],!0}function tr(u,e,t,n){let r=u.bMarks[e]+u.tShift[e],i=u.eMarks[e];const c=u.lineMax;if(u.sCount[e]-u.blkIndent>=4||u.src.charCodeAt(r)!==62)return!1;if(n)return!0;const o=[],a=[],s=[],f=[],p=u.md.block.ruler.getRules("blockquote"),m=u.parentType;u.parentType="blockquote";let h=!1,d;for(d=e;d<t;d++){const A=u.sCount[d]<u.blkIndent;if(r=u.bMarks[d]+u.tShift[d],i=u.eMarks[d],r>=i)break;if(u.src.charCodeAt(r++)===62&&!A){let C=u.sCount[d]+1,T,I;u.src.charCodeAt(r)===32?(r++,C++,I=!1,T=!0):u.src.charCodeAt(r)===9?(T=!0,(u.bsCount[d]+C)%4===3?(r++,C++,I=!1):I=!0):T=!1;let Z=C;for(o.push(u.bMarks[d]),u.bMarks[d]=r;r<i;){const K=u.src.charCodeAt(r);if(w(K))K===9?Z+=4-(Z+u.bsCount[d]+(I?1:0))%4:Z++;else break;r++}h=r>=i,a.push(u.bsCount[d]),u.bsCount[d]=u.sCount[d]+1+(T?1:0),s.push(u.sCount[d]),u.sCount[d]=Z-C,f.push(u.tShift[d]),u.tShift[d]=r-u.bMarks[d];continue}if(h)break;let x=!1;for(let C=0,T=p.length;C<T;C++)if(p[C](u,d,t,!0)){x=!0;break}if(x){u.lineMax=d,u.blkIndent!==0&&(o.push(u.bMarks[d]),a.push(u.bsCount[d]),f.push(u.tShift[d]),s.push(u.sCount[d]),u.sCount[d]-=u.blkIndent);break}o.push(u.bMarks[d]),a.push(u.bsCount[d]),f.push(u.tShift[d]),s.push(u.sCount[d]),u.sCount[d]=-1}const D=u.blkIndent;u.blkIndent=0;const y=u.push("blockquote_open","blockquote",1);y.markup=">";const S=[e,0];y.map=S,u.md.block.tokenize(u,e,d);const E=u.push("blockquote_close","blockquote",-1);E.markup=">",u.lineMax=c,u.parentType=m,S[1]=u.line;for(let A=0;A<f.length;A++)u.bMarks[A+e]=o[A],u.tShift[A+e]=f[A],u.sCount[A+e]=s[A],u.bsCount[A+e]=a[A];return u.blkIndent=D,!0}function nr(u,e,t,n){const r=u.eMarks[e];if(u.sCount[e]-u.blkIndent>=4)return!1;let i=u.bMarks[e]+u.tShift[e];const c=u.src.charCodeAt(i++);if(c!==42&&c!==45&&c!==95)return!1;let o=1;for(;i<r;){const s=u.src.charCodeAt(i++);if(s!==c&&!w(s))return!1;s===c&&o++}if(o<3)return!1;if(n)return!0;u.line=e+1;const a=u.push("hr","hr",0);return a.map=[e,u.line],a.markup=Array(o+1).join(String.fromCharCode(c)),!0}function It(u,e){const t=u.eMarks[e];let n=u.bMarks[e]+u.tShift[e];const r=u.src.charCodeAt(n++);if(r!==42&&r!==45&&r!==43)return-1;if(n<t){const i=u.src.charCodeAt(n);if(!w(i))return-1}return n}function Lt(u,e){const t=u.bMarks[e]+u.tShift[e],n=u.eMarks[e];let r=t;if(r+1>=n)return-1;let i=u.src.charCodeAt(r++);if(i<48||i>57)return-1;for(;;){if(r>=n)return-1;if(i=u.src.charCodeAt(r++),i>=48&&i<=57){if(r-t>=10)return-1;continue}if(i===41||i===46)break;return-1}return r<n&&(i=u.src.charCodeAt(r),!w(i))?-1:r}function rr(u,e){const t=u.level+2;for(let n=e+2,r=u.tokens.length-2;n<r;n++)u.tokens[n].level===t&&u.tokens[n].type==="paragraph_open"&&(u.tokens[n+2].hidden=!0,u.tokens[n].hidden=!0,n+=2)}function ir(u,e,t,n){let r,i,c,o,a=e,s=!0;if(u.sCount[a]-u.blkIndent>=4||u.listIndent>=0&&u.sCount[a]-u.listIndent>=4&&u.sCount[a]<u.blkIndent)return!1;let f=!1;n&&u.parentType==="paragraph"&&u.sCount[a]>=u.blkIndent&&(f=!0);let p,m,h;if((h=Lt(u,a))>=0){if(p=!0,c=u.bMarks[a]+u.tShift[a],m=Number(u.src.slice(c,h-1)),f&&m!==1)return!1}else if((h=It(u,a))>=0)p=!1;else return!1;if(f&&u.skipSpaces(h)>=u.eMarks[a])return!1;if(n)return!0;const d=u.src.charCodeAt(h-1),D=u.tokens.length;p?(o=u.push("ordered_list_open","ol",1),m!==1&&(o.attrs=[["start",m]])):o=u.push("bullet_list_open","ul",1);const y=[a,0];o.map=y,o.markup=String.fromCharCode(d);let S=!1;const E=u.md.block.ruler.getRules("list"),A=u.parentType;for(u.parentType="list";a<t;){i=h,r=u.eMarks[a];const x=u.sCount[a]+h-(u.bMarks[a]+u.tShift[a]);let C=x;for(;i<r;){const su=u.src.charCodeAt(i);if(su===9)C+=4-(C+u.bsCount[a])%4;else if(su===32)C++;else break;i++}const T=i;let I;T>=r?I=1:I=C-x,I>4&&(I=1);const Z=x+I;o=u.push("list_item_open","li",1),o.markup=String.fromCharCode(d);const K=[a,0];o.map=K,p&&(o.info=u.src.slice(c,h-1));const hu=u.tight,L=u.tShift[a],vu=u.sCount[a],Ru=u.listIndent;if(u.listIndent=u.blkIndent,u.blkIndent=Z,u.tight=!0,u.tShift[a]=T-u.bMarks[a],u.sCount[a]=C,T>=r&&u.isEmpty(a+1)?u.line=Math.min(u.line+2,t):u.md.block.tokenize(u,a,t,!0),(!u.tight||S)&&(s=!1),S=u.line-a>1&&u.isEmpty(u.line-1),u.blkIndent=u.listIndent,u.listIndent=Ru,u.tShift[a]=L,u.sCount[a]=vu,u.tight=hu,o=u.push("list_item_close","li",-1),o.markup=String.fromCharCode(d),a=u.line,K[1]=a,a>=t||u.sCount[a]<u.blkIndent||u.sCount[a]-u.blkIndent>=4)break;let xu=!1;for(let su=0,he=E.length;su<he;su++)if(E[su](u,a,t,!0)){xu=!0;break}if(xu)break;if(p){if(h=Lt(u,a),h<0)break;c=u.bMarks[a]+u.tShift[a]}else if(h=It(u,a),h<0)break;if(d!==u.src.charCodeAt(h-1))break}return p?o=u.push("ordered_list_close","ol",-1):o=u.push("bullet_list_close","ul",-1),o.markup=String.fromCharCode(d),y[1]=a,u.line=a,u.parentType=A,s&&rr(u,D),!0}function or(u,e,t,n){let r=u.bMarks[e]+u.tShift[e],i=u.eMarks[e],c=e+1;if(u.sCount[e]-u.blkIndent>=4||u.src.charCodeAt(r)!==91)return!1;function o(E){const A=u.lineMax;if(E>=A||u.isEmpty(E))return null;let x=!1;if(u.sCount[E]-u.blkIndent>3&&(x=!0),u.sCount[E]<0&&(x=!0),!x){const I=u.md.block.ruler.getRules("reference"),Z=u.parentType;u.parentType="reference";let K=!1;for(let hu=0,L=I.length;hu<L;hu++)if(I[hu](u,E,A,!0)){K=!0;break}if(u.parentType=Z,K)return null}const C=u.bMarks[E]+u.tShift[E],T=u.eMarks[E];return u.src.slice(C,T+1)}let a=u.src.slice(r,i+1);i=a.length;let s=-1;for(r=1;r<i;r++){const E=a.charCodeAt(r);if(E===91)return!1;if(E===93){s=r;break}else if(E===10){const A=o(c);A!==null&&(a+=A,i=a.length,c++)}else if(E===92&&(r++,r<i&&a.charCodeAt(r)===10)){const A=o(c);A!==null&&(a+=A,i=a.length,c++)}}if(s<0||a.charCodeAt(s+1)!==58)return!1;for(r=s+2;r<i;r++){const E=a.charCodeAt(r);if(E===10){const A=o(c);A!==null&&(a+=A,i=a.length,c++)}else if(!w(E))break}const f=u.md.helpers.parseLinkDestination(a,r,i);if(!f.ok)return!1;const p=u.md.normalizeLink(f.str);if(!u.md.validateLink(p))return!1;r=f.pos;const m=r,h=c,d=r;for(;r<i;r++){const E=a.charCodeAt(r);if(E===10){const A=o(c);A!==null&&(a+=A,i=a.length,c++)}else if(!w(E))break}let D=u.md.helpers.parseLinkTitle(a,r,i);for(;D.can_continue;){const E=o(c);if(E===null)break;a+=E,r=i,i=a.length,c++,D=u.md.helpers.parseLinkTitle(a,r,i,D)}let y;for(r<i&&d!==r&&D.ok?(y=D.str,r=D.pos):(y="",r=m,c=h);r<i;){const E=a.charCodeAt(r);if(!w(E))break;r++}if(r<i&&a.charCodeAt(r)!==10&&y)for(y="",r=m,c=h;r<i;){const E=a.charCodeAt(r);if(!w(E))break;r++}if(r<i&&a.charCodeAt(r)!==10)return!1;const S=de(a.slice(1,s));return S?(n||(typeof u.env.references>"u"&&(u.env.references={}),typeof u.env.references[S]>"u"&&(u.env.references[S]={title:y,href:p}),u.line=c),!0):!1}const cr=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],ar="[a-zA-Z_:][a-zA-Z0-9:._-]*",sr="[^\"'=<>`\\x00-\\x20]+",lr="'[^']*'",dr='"[^"]*"',fr="(?:"+sr+"|"+lr+"|"+dr+")",pr="(?:\\s+"+ar+"(?:\\s*=\\s*"+fr+")?)",i0="<[A-Za-z][A-Za-z0-9\\-]*"+pr+"*\\s*\\/?>",o0="<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>",hr="<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->",br="<[?][\\s\\S]*?[?]>",mr="<![A-Za-z][^>]*>",xr="<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",_r=new RegExp("^(?:"+i0+"|"+o0+"|"+hr+"|"+br+"|"+mr+"|"+xr+")"),gr=new RegExp("^(?:"+i0+"|"+o0+")"),yu=[[/^<(script|pre|style|textarea)(?=(\s|>|$))/i,/<\/(script|pre|style|textarea)>/i,!0],[/^<!--/,/-->/,!0],[/^<\?/,/\?>/,!0],[/^<![A-Z]/,/>/,!0],[/^<!\[CDATA\[/,/\]\]>/,!0],[new RegExp("^</?("+cr.join("|")+")(?=(\\s|/?>|$))","i"),/^$/,!0],[new RegExp(gr.source+"\\s*$"),/^$/,!1]];function kr(u,e,t,n){let r=u.bMarks[e]+u.tShift[e],i=u.eMarks[e];if(u.sCount[e]-u.blkIndent>=4||!u.md.options.html||u.src.charCodeAt(r)!==60)return!1;let c=u.src.slice(r,i),o=0;for(;o<yu.length&&!yu[o][0].test(c);o++);if(o===yu.length)return!1;if(n)return yu[o][2];let a=e+1;if(!yu[o][1].test(c)){for(;a<t&&!(u.sCount[a]<u.blkIndent);a++)if(r=u.bMarks[a]+u.tShift[a],i=u.eMarks[a],c=u.src.slice(r,i),yu[o][1].test(c)){c.length!==0&&a++;break}}u.line=a;const s=u.push("html_block","",0);return s.map=[e,a],s.content=u.getLines(e,a,u.blkIndent,!0),!0}function Er(u,e,t,n){let r=u.bMarks[e]+u.tShift[e],i=u.eMarks[e];if(u.sCount[e]-u.blkIndent>=4)return!1;let c=u.src.charCodeAt(r);if(c!==35||r>=i)return!1;let o=1;for(c=u.src.charCodeAt(++r);c===35&&r<i&&o<=6;)o++,c=u.src.charCodeAt(++r);if(o>6||r<i&&!w(c))return!1;if(n)return!0;i=u.skipSpacesBack(i,r);const a=u.skipCharsBack(i,35,r);a>r&&w(u.src.charCodeAt(a-1))&&(i=a),u.line=e+1;const s=u.push("heading_open","h"+String(o),1);s.markup="########".slice(0,o),s.map=[e,u.line];const f=u.push("inline","",0);f.content=u.src.slice(r,i).trim(),f.map=[e,u.line],f.children=[];const p=u.push("heading_close","h"+String(o),-1);return p.markup="########".slice(0,o),!0}function Ar(u,e,t){const n=u.md.block.ruler.getRules("paragraph");if(u.sCount[e]-u.blkIndent>=4)return!1;const r=u.parentType;u.parentType="paragraph";let i=0,c,o=e+1;for(;o<t&&!u.isEmpty(o);o++){if(u.sCount[o]-u.blkIndent>3)continue;if(u.sCount[o]>=u.blkIndent){let h=u.bMarks[o]+u.tShift[o];const d=u.eMarks[o];if(h<d&&(c=u.src.charCodeAt(h),(c===45||c===61)&&(h=u.skipChars(h,c),h=u.skipSpaces(h),h>=d))){i=c===61?1:2;break}}if(u.sCount[o]<0)continue;let m=!1;for(let h=0,d=n.length;h<d;h++)if(n[h](u,o,t,!0)){m=!0;break}if(m)break}if(!i)return!1;const a=u.getLines(e,o,u.blkIndent,!1).trim();u.line=o+1;const s=u.push("heading_open","h"+String(i),1);s.markup=String.fromCharCode(c),s.map=[e,u.line];const f=u.push("inline","",0);f.content=a,f.map=[e,u.line-1],f.children=[];const p=u.push("heading_close","h"+String(i),-1);return p.markup=String.fromCharCode(c),u.parentType=r,!0}function Dr(u,e,t){const n=u.md.block.ruler.getRules("paragraph"),r=u.parentType;let i=e+1;for(u.parentType="paragraph";i<t&&!u.isEmpty(i);i++){if(u.sCount[i]-u.blkIndent>3||u.sCount[i]<0)continue;let s=!1;for(let f=0,p=n.length;f<p;f++)if(n[f](u,i,t,!0)){s=!0;break}if(s)break}const c=u.getLines(e,i,u.blkIndent,!1).trim();u.line=i;const o=u.push("paragraph_open","p",1);o.map=[e,u.line];const a=u.push("inline","",0);return a.content=c,a.map=[e,u.line],a.children=[],u.push("paragraph_close","p",-1),u.parentType=r,!0}const ne=[["table",Kn,["paragraph","reference"]],["code",ur],["fence",er,["paragraph","reference","blockquote","list"]],["blockquote",tr,["paragraph","reference","blockquote","list"]],["hr",nr,["paragraph","reference","blockquote","list"]],["list",ir,["paragraph","reference","blockquote"]],["reference",or],["html_block",kr,["paragraph","reference","blockquote"]],["heading",Er,["paragraph","reference","blockquote"]],["lheading",Ar],["paragraph",Dr]];function fe(){this.ruler=new W;for(let u=0;u<ne.length;u++)this.ruler.push(ne[u][0],ne[u][1],{alt:(ne[u][2]||[]).slice()})}fe.prototype.tokenize=function(u,e,t){const n=this.ruler.getRules(""),r=n.length,i=u.md.options.maxNesting;let c=e,o=!1;for(;c<t&&(u.line=c=u.skipEmptyLines(c),!(c>=t||u.sCount[c]<u.blkIndent));){if(u.level>=i){u.line=t;break}const a=u.line;let s=!1;for(let f=0;f<r;f++)if(s=n[f](u,c,t,!1),s){if(a>=u.line)throw new Error("block rule didn't increment state.line");break}if(!s)throw new Error("none of the block rules matched");u.tight=!o,u.isEmpty(u.line-1)&&(o=!0),c=u.line,c<t&&u.isEmpty(c)&&(o=!0,c++,u.line=c)}};fe.prototype.parse=function(u,e,t,n){if(!u)return;const r=new this.State(u,e,t,n);this.tokenize(r,r.line,r.lineMax)};fe.prototype.State=ru;function Wu(u,e,t,n){this.src=u,this.env=t,this.md=e,this.tokens=n,this.tokens_meta=Array(n.length),this.pos=0,this.posMax=this.src.length,this.level=0,this.pending="",this.pendingLevel=0,this.cache={},this.delimiters=[],this._prev_delimiters=[],this.backticks={},this.backticksScanned=!1,this.linkLevel=0}Wu.prototype.pushPending=function(){const u=new Q("text","",0);return u.content=this.pending,u.level=this.pendingLevel,this.tokens.push(u),this.pending="",u};Wu.prototype.push=function(u,e,t){this.pending&&this.pushPending();const n=new Q(u,e,t);let r=null;return t<0&&(this.level--,this.delimiters=this._prev_delimiters.pop()),n.level=this.level,t>0&&(this.level++,this._prev_delimiters.push(this.delimiters),this.delimiters=[],r={delimiters:this.delimiters}),this.pendingLevel=this.level,this.tokens.push(n),this.tokens_meta.push(r),n};Wu.prototype.scanDelims=function(u,e){const t=this.posMax,n=this.src.charCodeAt(u),r=u>0?this.src.charCodeAt(u-1):32;let i=u;for(;i<t&&this.src.charCodeAt(i)===n;)i++;const c=i-u,o=i<t?this.src.charCodeAt(i):32,a=Hu(r)||qu(String.fromCharCode(r)),s=Hu(o)||qu(String.fromCharCode(o)),f=ju(r),p=ju(o),m=!p&&(!s||f||a),h=!f&&(!a||p||s);return{can_open:m&&(e||!h||a),can_close:h&&(e||!m||s),length:c}};Wu.prototype.Token=Q;function Cr(u){switch(u){case 10:case 33:case 35:case 36:case 37:case 38:case 42:case 43:case 45:case 58:case 60:case 61:case 62:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 125:case 126:return!0;default:return!1}}function yr(u,e){let t=u.pos;for(;t<u.posMax&&!Cr(u.src.charCodeAt(t));)t++;return t===u.pos?!1:(e||(u.pending+=u.src.slice(u.pos,t)),u.pos=t,!0)}const Tr=/(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;function Fr(u,e){if(!u.md.options.linkify||u.linkLevel>0)return!1;const t=u.pos,n=u.posMax;if(t+3>n||u.src.charCodeAt(t)!==58||u.src.charCodeAt(t+1)!==47||u.src.charCodeAt(t+2)!==47)return!1;const r=u.pending.match(Tr);if(!r)return!1;const i=r[1],c=u.md.linkify.matchAtStart(u.src.slice(t-i.length));if(!c)return!1;let o=c.url;if(o.length<=i.length)return!1;o=o.replace(/\*+$/,"");const a=u.md.normalizeLink(o);if(!u.md.validateLink(a))return!1;if(!e){u.pending=u.pending.slice(0,-i.length);const s=u.push("link_open","a",1);s.attrs=[["href",a]],s.markup="linkify",s.info="auto";const f=u.push("text","",0);f.content=u.md.normalizeLinkText(o);const p=u.push("link_close","a",-1);p.markup="linkify",p.info="auto"}return u.pos+=o.length-i.length,!0}function Sr(u,e){let t=u.pos;if(u.src.charCodeAt(t)!==10)return!1;const n=u.pending.length-1,r=u.posMax;if(!e)if(n>=0&&u.pending.charCodeAt(n)===32)if(n>=1&&u.pending.charCodeAt(n-1)===32){let i=n-1;for(;i>=1&&u.pending.charCodeAt(i-1)===32;)i--;u.pending=u.pending.slice(0,i),u.push("hardbreak","br",0)}else u.pending=u.pending.slice(0,-1),u.push("softbreak","br",0);else u.push("softbreak","br",0);for(t++;t<r&&w(u.src.charCodeAt(t));)t++;return u.pos=t,!0}const Xe=[];for(let u=0;u<256;u++)Xe.push(0);"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(u){Xe[u.charCodeAt(0)]=1});function wr(u,e){let t=u.pos;const n=u.posMax;if(u.src.charCodeAt(t)!==92||(t++,t>=n))return!1;let r=u.src.charCodeAt(t);if(r===10){for(e||u.push("hardbreak","br",0),t++;t<n&&(r=u.src.charCodeAt(t),!!w(r));)t++;return u.pos=t,!0}let i=u.src[t];if(r>=55296&&r<=56319&&t+1<n){const o=u.src.charCodeAt(t+1);o>=56320&&o<=57343&&(i+=u.src[t+1],t++)}const c="\\"+i;if(!e){const o=u.push("text_special","",0);r<256&&Xe[r]!==0?o.content=i:o.content=c,o.markup=c,o.info="escape"}return u.pos=t+1,!0}function vr(u,e){let t=u.pos;if(u.src.charCodeAt(t)!==96)return!1;const r=t;t++;const i=u.posMax;for(;t<i&&u.src.charCodeAt(t)===96;)t++;const c=u.src.slice(r,t),o=c.length;if(u.backticksScanned&&(u.backticks[o]||0)<=r)return e||(u.pending+=c),u.pos+=o,!0;let a=t,s;for(;(s=u.src.indexOf("`",a))!==-1;){for(a=s+1;a<i&&u.src.charCodeAt(a)===96;)a++;const f=a-s;if(f===o){if(!e){const p=u.push("code_inline","code",0);p.markup=c,p.content=u.src.slice(t,s).replace(/\n/g," ").replace(/^ (.+) $/,"$1")}return u.pos=a,!0}u.backticks[f]=s}return u.backticksScanned=!0,e||(u.pending+=c),u.pos+=o,!0}function Rr(u,e){const t=u.pos,n=u.src.charCodeAt(t);if(e||n!==126)return!1;const r=u.scanDelims(u.pos,!0);let i=r.length;const c=String.fromCharCode(n);if(i<2)return!1;let o;i%2&&(o=u.push("text","",0),o.content=c,i--);for(let a=0;a<i;a+=2)o=u.push("text","",0),o.content=c+c,u.delimiters.push({marker:n,length:0,token:u.tokens.length-1,end:-1,open:r.can_open,close:r.can_close});return u.pos+=r.length,!0}function Pt(u,e){let t;const n=[],r=e.length;for(let i=0;i<r;i++){const c=e[i];if(c.marker!==126||c.end===-1)continue;const o=e[c.end];t=u.tokens[c.token],t.type="s_open",t.tag="s",t.nesting=1,t.markup="~~",t.content="",t=u.tokens[o.token],t.type="s_close",t.tag="s",t.nesting=-1,t.markup="~~",t.content="",u.tokens[o.token-1].type==="text"&&u.tokens[o.token-1].content==="~"&&n.push(o.token-1)}for(;n.length;){const i=n.pop();let c=i+1;for(;c<u.tokens.length&&u.tokens[c].type==="s_close";)c++;c--,i!==c&&(t=u.tokens[c],u.tokens[c]=u.tokens[i],u.tokens[i]=t)}}function Mr(u){const e=u.tokens_meta,t=u.tokens_meta.length;Pt(u,u.delimiters);for(let n=0;n<t;n++)e[n]&&e[n].delimiters&&Pt(u,e[n].delimiters)}const c0={tokenize:Rr,postProcess:Mr};function Ir(u,e){const t=u.pos,n=u.src.charCodeAt(t);if(e||n!==95&&n!==42)return!1;const r=u.scanDelims(u.pos,n===42);for(let i=0;i<r.length;i++){const c=u.push("text","",0);c.content=String.fromCharCode(n),u.delimiters.push({marker:n,length:r.length,token:u.tokens.length-1,end:-1,open:r.can_open,close:r.can_close})}return u.pos+=r.length,!0}function Nt(u,e){const t=e.length;for(let n=t-1;n>=0;n--){const r=e[n];if(r.marker!==95&&r.marker!==42||r.end===-1)continue;const i=e[r.end],c=n>0&&e[n-1].end===r.end+1&&e[n-1].marker===r.marker&&e[n-1].token===r.token-1&&e[r.end+1].token===i.token+1,o=String.fromCharCode(r.marker),a=u.tokens[r.token];a.type=c?"strong_open":"em_open",a.tag=c?"strong":"em",a.nesting=1,a.markup=c?o+o:o,a.content="";const s=u.tokens[i.token];s.type=c?"strong_close":"em_close",s.tag=c?"strong":"em",s.nesting=-1,s.markup=c?o+o:o,s.content="",c&&(u.tokens[e[n-1].token].content="",u.tokens[e[r.end+1].token].content="",n--)}}function Lr(u){const e=u.tokens_meta,t=u.tokens_meta.length;Nt(u,u.delimiters);for(let n=0;n<t;n++)e[n]&&e[n].delimiters&&Nt(u,e[n].delimiters)}const a0={tokenize:Ir,postProcess:Lr};function Pr(u,e){let t,n,r,i,c="",o="",a=u.pos,s=!0;if(u.src.charCodeAt(u.pos)!==91)return!1;const f=u.pos,p=u.posMax,m=u.pos+1,h=u.md.helpers.parseLinkLabel(u,u.pos,!0);if(h<0)return!1;let d=h+1;if(d<p&&u.src.charCodeAt(d)===40){for(s=!1,d++;d<p&&(t=u.src.charCodeAt(d),!(!w(t)&&t!==10));d++);if(d>=p)return!1;if(a=d,r=u.md.helpers.parseLinkDestination(u.src,d,u.posMax),r.ok){for(c=u.md.normalizeLink(r.str),u.md.validateLink(c)?d=r.pos:c="",a=d;d<p&&(t=u.src.charCodeAt(d),!(!w(t)&&t!==10));d++);if(r=u.md.helpers.parseLinkTitle(u.src,d,u.posMax),d<p&&a!==d&&r.ok)for(o=r.str,d=r.pos;d<p&&(t=u.src.charCodeAt(d),!(!w(t)&&t!==10));d++);}(d>=p||u.src.charCodeAt(d)!==41)&&(s=!0),d++}if(s){if(typeof u.env.references>"u")return!1;if(d<p&&u.src.charCodeAt(d)===91?(a=d+1,d=u.md.helpers.parseLinkLabel(u,d),d>=0?n=u.src.slice(a,d++):d=h+1):d=h+1,n||(n=u.src.slice(m,h)),i=u.env.references[de(n)],!i)return u.pos=f,!1;c=i.href,o=i.title}if(!e){u.pos=m,u.posMax=h;const D=u.push("link_open","a",1),y=[["href",c]];D.attrs=y,o&&y.push(["title",o]),u.linkLevel++,u.md.inline.tokenize(u),u.linkLevel--,u.push("link_close","a",-1)}return u.pos=d,u.posMax=p,!0}function Nr(u,e){let t,n,r,i,c,o,a,s,f="";const p=u.pos,m=u.posMax;if(u.src.charCodeAt(u.pos)!==33||u.src.charCodeAt(u.pos+1)!==91)return!1;const h=u.pos+2,d=u.md.helpers.parseLinkLabel(u,u.pos+1,!1);if(d<0)return!1;if(i=d+1,i<m&&u.src.charCodeAt(i)===40){for(i++;i<m&&(t=u.src.charCodeAt(i),!(!w(t)&&t!==10));i++);if(i>=m)return!1;for(s=i,o=u.md.helpers.parseLinkDestination(u.src,i,u.posMax),o.ok&&(f=u.md.normalizeLink(o.str),u.md.validateLink(f)?i=o.pos:f=""),s=i;i<m&&(t=u.src.charCodeAt(i),!(!w(t)&&t!==10));i++);if(o=u.md.helpers.parseLinkTitle(u.src,i,u.posMax),i<m&&s!==i&&o.ok)for(a=o.str,i=o.pos;i<m&&(t=u.src.charCodeAt(i),!(!w(t)&&t!==10));i++);else a="";if(i>=m||u.src.charCodeAt(i)!==41)return u.pos=p,!1;i++}else{if(typeof u.env.references>"u")return!1;if(i<m&&u.src.charCodeAt(i)===91?(s=i+1,i=u.md.helpers.parseLinkLabel(u,i),i>=0?r=u.src.slice(s,i++):i=d+1):i=d+1,r||(r=u.src.slice(h,d)),c=u.env.references[de(r)],!c)return u.pos=p,!1;f=c.href,a=c.title}if(!e){n=u.src.slice(h,d);const D=[];u.md.inline.parse(n,u.md,u.env,D);const y=u.push("image","img",0),S=[["src",f],["alt",""]];y.attrs=S,y.children=D,y.content=n,a&&S.push(["title",a])}return u.pos=i,u.posMax=m,!0}const Or=/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/,Br=/^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;function zr(u,e){let t=u.pos;if(u.src.charCodeAt(t)!==60)return!1;const n=u.pos,r=u.posMax;for(;;){if(++t>=r)return!1;const c=u.src.charCodeAt(t);if(c===60)return!1;if(c===62)break}const i=u.src.slice(n+1,t);if(Br.test(i)){const c=u.md.normalizeLink(i);if(!u.md.validateLink(c))return!1;if(!e){const o=u.push("link_open","a",1);o.attrs=[["href",c]],o.markup="autolink",o.info="auto";const a=u.push("text","",0);a.content=u.md.normalizeLinkText(i);const s=u.push("link_close","a",-1);s.markup="autolink",s.info="auto"}return u.pos+=i.length+2,!0}if(Or.test(i)){const c=u.md.normalizeLink("mailto:"+i);if(!u.md.validateLink(c))return!1;if(!e){const o=u.push("link_open","a",1);o.attrs=[["href",c]],o.markup="autolink",o.info="auto";const a=u.push("text","",0);a.content=u.md.normalizeLinkText(i);const s=u.push("link_close","a",-1);s.markup="autolink",s.info="auto"}return u.pos+=i.length+2,!0}return!1}function Ur(u){return/^<a[>\s]/i.test(u)}function jr(u){return/^<\/a\s*>/i.test(u)}function qr(u){const e=u|32;return e>=97&&e<=122}function Hr(u,e){if(!u.md.options.html)return!1;const t=u.posMax,n=u.pos;if(u.src.charCodeAt(n)!==60||n+2>=t)return!1;const r=u.src.charCodeAt(n+1);if(r!==33&&r!==63&&r!==47&&!qr(r))return!1;const i=u.src.slice(n).match(_r);if(!i)return!1;if(!e){const c=u.push("html_inline","",0);c.content=i[0],Ur(c.content)&&u.linkLevel++,jr(c.content)&&u.linkLevel--}return u.pos+=i[0].length,!0}const $r=/^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i,Gr=/^&([a-z][a-z0-9]{1,31});/i;function Wr(u,e){const t=u.pos,n=u.posMax;if(u.src.charCodeAt(t)!==38||t+1>=n)return!1;if(u.src.charCodeAt(t+1)===35){const i=u.src.slice(t).match($r);if(i){if(!e){const c=i[1][0].toLowerCase()==="x"?parseInt(i[1].slice(1),16):parseInt(i[1],10),o=u.push("text_special","",0);o.content=Ve(c)?ae(c):ae(65533),o.markup=i[0],o.info="entity"}return u.pos+=i[0].length,!0}}else{const i=u.src.slice(t).match(Gr);if(i){const c=u0(i[0]);if(c!==i[0]){if(!e){const o=u.push("text_special","",0);o.content=c,o.markup=i[0],o.info="entity"}return u.pos+=i[0].length,!0}}}return!1}function Ot(u){const e={},t=u.length;if(!t)return;let n=0,r=-2;const i=[];for(let c=0;c<t;c++){const o=u[c];if(i.push(0),(u[n].marker!==o.marker||r!==o.token-1)&&(n=c),r=o.token,o.length=o.length||0,!o.close)continue;e.hasOwnProperty(o.marker)||(e[o.marker]=[-1,-1,-1,-1,-1,-1]);const a=e[o.marker][(o.open?3:0)+o.length%3];let s=n-i[n]-1,f=s;for(;s>a;s-=i[s]+1){const p=u[s];if(p.marker===o.marker&&p.open&&p.end<0){let m=!1;if((p.close||o.open)&&(p.length+o.length)%3===0&&(p.length%3!==0||o.length%3!==0)&&(m=!0),!m){const h=s>0&&!u[s-1].open?i[s-1]+1:0;i[c]=c-s+h,i[s]=h,o.open=!1,p.end=c,p.close=!1,f=-1,r=-2;break}}}f!==-1&&(e[o.marker][(o.open?3:0)+(o.length||0)%3]=f)}}function Zr(u){const e=u.tokens_meta,t=u.tokens_meta.length;Ot(u.delimiters);for(let n=0;n<t;n++)e[n]&&e[n].delimiters&&Ot(e[n].delimiters)}function Vr(u){let e,t,n=0;const r=u.tokens,i=u.tokens.length;for(e=t=0;e<i;e++)r[e].nesting<0&&n--,r[e].level=n,r[e].nesting>0&&n++,r[e].type==="text"&&e+1<i&&r[e+1].type==="text"?r[e+1].content=r[e].content+r[e+1].content:(e!==t&&(r[t]=r[e]),t++);e!==t&&(r.length=t)}const we=[["text",yr],["linkify",Fr],["newline",Sr],["escape",wr],["backticks",vr],["strikethrough",c0.tokenize],["emphasis",a0.tokenize],["link",Pr],["image",Nr],["autolink",zr],["html_inline",Hr],["entity",Wr]],ve=[["balance_pairs",Zr],["strikethrough",c0.postProcess],["emphasis",a0.postProcess],["fragments_join",Vr]];function Zu(){this.ruler=new W;for(let u=0;u<we.length;u++)this.ruler.push(we[u][0],we[u][1]);this.ruler2=new W;for(let u=0;u<ve.length;u++)this.ruler2.push(ve[u][0],ve[u][1])}Zu.prototype.skipToken=function(u){const e=u.pos,t=this.ruler.getRules(""),n=t.length,r=u.md.options.maxNesting,i=u.cache;if(typeof i[e]<"u"){u.pos=i[e];return}let c=!1;if(u.level<r){for(let o=0;o<n;o++)if(u.level++,c=t[o](u,!0),u.level--,c){if(e>=u.pos)throw new Error("inline rule didn't increment state.pos");break}}else u.pos=u.posMax;c||u.pos++,i[e]=u.pos};Zu.prototype.tokenize=function(u){const e=this.ruler.getRules(""),t=e.length,n=u.posMax,r=u.md.options.maxNesting;for(;u.pos<n;){const i=u.pos;let c=!1;if(u.level<r){for(let o=0;o<t;o++)if(c=e[o](u,!1),c){if(i>=u.pos)throw new Error("inline rule didn't increment state.pos");break}}if(c){if(u.pos>=n)break;continue}u.pending+=u.src[u.pos++]}u.pending&&u.pushPending()};Zu.prototype.parse=function(u,e,t,n){const r=new this.State(u,e,t,n);this.tokenize(r);const i=this.ruler2.getRules(""),c=i.length;for(let o=0;o<c;o++)i[o](r)};Zu.prototype.State=Wu;function Yr(u){const e={};u=u||{},e.src_Any=Yt.source,e.src_Cc=Xt.source,e.src_Z=Qt.source,e.src_P=We.source,e.src_ZPCc=[e.src_Z,e.src_P,e.src_Cc].join("|"),e.src_ZCc=[e.src_Z,e.src_Cc].join("|");const t="[><｜]";return e.src_pseudo_letter="(?:(?!"+t+"|"+e.src_ZPCc+")"+e.src_Any+")",e.src_ip4="(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)",e.src_auth="(?:(?:(?!"+e.src_ZCc+"|[@/\\[\\]()]).)+@)?",e.src_port="(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?",e.src_host_terminator="(?=$|"+t+"|"+e.src_ZPCc+")(?!"+(u["---"]?"-(?!--)|":"-|")+"_|:\\d|\\.-|\\.(?!$|"+e.src_ZPCc+"))",e.src_path="(?:[/?#](?:(?!"+e.src_ZCc+"|"+t+`|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!`+e.src_ZCc+"|\\]).)*\\]|\\((?:(?!"+e.src_ZCc+"|[)]).)*\\)|\\{(?:(?!"+e.src_ZCc+'|[}]).)*\\}|\\"(?:(?!'+e.src_ZCc+`|["]).)+\\"|\\'(?:(?!`+e.src_ZCc+"|[']).)+\\'|\\'(?="+e.src_pseudo_letter+"|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!"+e.src_ZCc+"|[.]|$)|"+(u["---"]?"\\-(?!--(?:[^-]|$))(?:-*)|":"\\-+|")+",(?!"+e.src_ZCc+"|$)|;(?!"+e.src_ZCc+"|$)|\\!+(?!"+e.src_ZCc+"|[!]|$)|\\?(?!"+e.src_ZCc+"|[?]|$))+|\\/)?",e.src_email_name='[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*',e.src_xn="xn--[a-z0-9\\-]{1,59}",e.src_domain_root="(?:"+e.src_xn+"|"+e.src_pseudo_letter+"{1,63})",e.src_domain="(?:"+e.src_xn+"|(?:"+e.src_pseudo_letter+")|(?:"+e.src_pseudo_letter+"(?:-|"+e.src_pseudo_letter+"){0,61}"+e.src_pseudo_letter+"))",e.src_host="(?:(?:(?:(?:"+e.src_domain+")\\.)*"+e.src_domain+"))",e.tpl_host_fuzzy="(?:"+e.src_ip4+"|(?:(?:(?:"+e.src_domain+")\\.)+(?:%TLDS%)))",e.tpl_host_no_ip_fuzzy="(?:(?:(?:"+e.src_domain+")\\.)+(?:%TLDS%))",e.src_host_strict=e.src_host+e.src_host_terminator,e.tpl_host_fuzzy_strict=e.tpl_host_fuzzy+e.src_host_terminator,e.src_host_port_strict=e.src_host+e.src_port+e.src_host_terminator,e.tpl_host_port_fuzzy_strict=e.tpl_host_fuzzy+e.src_port+e.src_host_terminator,e.tpl_host_port_no_ip_fuzzy_strict=e.tpl_host_no_ip_fuzzy+e.src_port+e.src_host_terminator,e.tpl_host_fuzzy_test="localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:"+e.src_ZPCc+"|>|$))",e.tpl_email_fuzzy="(^|"+t+'|"|\\(|'+e.src_ZCc+")("+e.src_email_name+"@"+e.tpl_host_fuzzy_strict+")",e.tpl_link_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|"+e.src_ZPCc+"))((?![$+<=>^`|｜])"+e.tpl_host_port_fuzzy_strict+e.src_path+")",e.tpl_link_no_ip_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|"+e.src_ZPCc+"))((?![$+<=>^`|｜])"+e.tpl_host_port_no_ip_fuzzy_strict+e.src_path+")",e}function Ue(u){return Array.prototype.slice.call(arguments,1).forEach(function(t){t&&Object.keys(t).forEach(function(n){u[n]=t[n]})}),u}function pe(u){return Object.prototype.toString.call(u)}function Xr(u){return pe(u)==="[object String]"}function Jr(u){return pe(u)==="[object Object]"}function Qr(u){return pe(u)==="[object RegExp]"}function Bt(u){return pe(u)==="[object Function]"}function Kr(u){return u.replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}const s0={fuzzyLink:!0,fuzzyEmail:!0,fuzzyIP:!1};function ui(u){return Object.keys(u||{}).reduce(function(e,t){return e||s0.hasOwnProperty(t)},!1)}const ei={"http:":{validate:function(u,e,t){const n=u.slice(e);return t.re.http||(t.re.http=new RegExp("^\\/\\/"+t.re.src_auth+t.re.src_host_port_strict+t.re.src_path,"i")),t.re.http.test(n)?n.match(t.re.http)[0].length:0}},"https:":"http:","ftp:":"http:","//":{validate:function(u,e,t){const n=u.slice(e);return t.re.no_http||(t.re.no_http=new RegExp("^"+t.re.src_auth+"(?:localhost|(?:(?:"+t.re.src_domain+")\\.)+"+t.re.src_domain_root+")"+t.re.src_port+t.re.src_host_terminator+t.re.src_path,"i")),t.re.no_http.test(n)?e>=3&&u[e-3]===":"||e>=3&&u[e-3]==="/"?0:n.match(t.re.no_http)[0].length:0}},"mailto:":{validate:function(u,e,t){const n=u.slice(e);return t.re.mailto||(t.re.mailto=new RegExp("^"+t.re.src_email_name+"@"+t.re.src_host_strict,"i")),t.re.mailto.test(n)?n.match(t.re.mailto)[0].length:0}}},ti="a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]",ni="biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");function ri(u){u.__index__=-1,u.__text_cache__=""}function ii(u){return function(e,t){const n=e.slice(t);return u.test(n)?n.match(u)[0].length:0}}function zt(){return function(u,e){e.normalize(u)}}function se(u){const e=u.re=Yr(u.__opts__),t=u.__tlds__.slice();u.onCompile(),u.__tlds_replaced__||t.push(ti),t.push(e.src_xn),e.src_tlds=t.join("|");function n(o){return o.replace("%TLDS%",e.src_tlds)}e.email_fuzzy=RegExp(n(e.tpl_email_fuzzy),"i"),e.link_fuzzy=RegExp(n(e.tpl_link_fuzzy),"i"),e.link_no_ip_fuzzy=RegExp(n(e.tpl_link_no_ip_fuzzy),"i"),e.host_fuzzy_test=RegExp(n(e.tpl_host_fuzzy_test),"i");const r=[];u.__compiled__={};function i(o,a){throw new Error('(LinkifyIt) Invalid schema "'+o+'": '+a)}Object.keys(u.__schemas__).forEach(function(o){const a=u.__schemas__[o];if(a===null)return;const s={validate:null,link:null};if(u.__compiled__[o]=s,Jr(a)){Qr(a.validate)?s.validate=ii(a.validate):Bt(a.validate)?s.validate=a.validate:i(o,a),Bt(a.normalize)?s.normalize=a.normalize:a.normalize?i(o,a):s.normalize=zt();return}if(Xr(a)){r.push(o);return}i(o,a)}),r.forEach(function(o){u.__compiled__[u.__schemas__[o]]&&(u.__compiled__[o].validate=u.__compiled__[u.__schemas__[o]].validate,u.__compiled__[o].normalize=u.__compiled__[u.__schemas__[o]].normalize)}),u.__compiled__[""]={validate:null,normalize:zt()};const c=Object.keys(u.__compiled__).filter(function(o){return o.length>0&&u.__compiled__[o]}).map(Kr).join("|");u.re.schema_test=RegExp("(^|(?!_)(?:[><｜]|"+e.src_ZPCc+"))("+c+")","i"),u.re.schema_search=RegExp("(^|(?!_)(?:[><｜]|"+e.src_ZPCc+"))("+c+")","ig"),u.re.schema_at_start=RegExp("^"+u.re.schema_search.source,"i"),u.re.pretest=RegExp("("+u.re.schema_test.source+")|("+u.re.host_fuzzy_test.source+")|@","i"),ri(u)}function oi(u,e){const t=u.__index__,n=u.__last_index__,r=u.__text_cache__.slice(t,n);this.schema=u.__schema__.toLowerCase(),this.index=t+e,this.lastIndex=n+e,this.raw=r,this.text=r,this.url=r}function je(u,e){const t=new oi(u,e);return u.__compiled__[t.schema].normalize(t,u),t}function V(u,e){if(!(this instanceof V))return new V(u,e);e||ui(u)&&(e=u,u={}),this.__opts__=Ue({},s0,e),this.__index__=-1,this.__last_index__=-1,this.__schema__="",this.__text_cache__="",this.__schemas__=Ue({},ei,u),this.__compiled__={},this.__tlds__=ni,this.__tlds_replaced__=!1,this.re={},se(this)}V.prototype.add=function(e,t){return this.__schemas__[e]=t,se(this),this};V.prototype.set=function(e){return this.__opts__=Ue(this.__opts__,e),this};V.prototype.test=function(e){if(this.__text_cache__=e,this.__index__=-1,!e.length)return!1;let t,n,r,i,c,o,a,s,f;if(this.re.schema_test.test(e)){for(a=this.re.schema_search,a.lastIndex=0;(t=a.exec(e))!==null;)if(i=this.testSchemaAt(e,t[2],a.lastIndex),i){this.__schema__=t[2],this.__index__=t.index+t[1].length,this.__last_index__=t.index+t[0].length+i;break}}return this.__opts__.fuzzyLink&&this.__compiled__["http:"]&&(s=e.search(this.re.host_fuzzy_test),s>=0&&(this.__index__<0||s<this.__index__)&&(n=e.match(this.__opts__.fuzzyIP?this.re.link_fuzzy:this.re.link_no_ip_fuzzy))!==null&&(c=n.index+n[1].length,(this.__index__<0||c<this.__index__)&&(this.__schema__="",this.__index__=c,this.__last_index__=n.index+n[0].length))),this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"]&&(f=e.indexOf("@"),f>=0&&(r=e.match(this.re.email_fuzzy))!==null&&(c=r.index+r[1].length,o=r.index+r[0].length,(this.__index__<0||c<this.__index__||c===this.__index__&&o>this.__last_index__)&&(this.__schema__="mailto:",this.__index__=c,this.__last_index__=o))),this.__index__>=0};V.prototype.pretest=function(e){return this.re.pretest.test(e)};V.prototype.testSchemaAt=function(e,t,n){return this.__compiled__[t.toLowerCase()]?this.__compiled__[t.toLowerCase()].validate(e,n,this):0};V.prototype.match=function(e){const t=[];let n=0;this.__index__>=0&&this.__text_cache__===e&&(t.push(je(this,n)),n=this.__last_index__);let r=n?e.slice(n):e;for(;this.test(r);)t.push(je(this,n)),r=r.slice(this.__last_index__),n+=this.__last_index__;return t.length?t:null};V.prototype.matchAtStart=function(e){if(this.__text_cache__=e,this.__index__=-1,!e.length)return null;const t=this.re.schema_at_start.exec(e);if(!t)return null;const n=this.testSchemaAt(e,t[2],t[0].length);return n?(this.__schema__=t[2],this.__index__=t.index+t[1].length,this.__last_index__=t.index+t[0].length+n,je(this,0)):null};V.prototype.tlds=function(e,t){return e=Array.isArray(e)?e:[e],t?(this.__tlds__=this.__tlds__.concat(e).sort().filter(function(n,r,i){return n!==i[r-1]}).reverse(),se(this),this):(this.__tlds__=e.slice(),this.__tlds_replaced__=!0,se(this),this)};V.prototype.normalize=function(e){e.schema||(e.url="http://"+e.url),e.schema==="mailto:"&&!/^mailto:/i.test(e.url)&&(e.url="mailto:"+e.url)};V.prototype.onCompile=function(){};const Tu=2147483647,eu=36,Je=1,$u=26,ci=38,ai=700,l0=72,d0=128,f0="-",si=/^xn--/,li=/[^\0-\x7F]/,di=/[\x2E\u3002\uFF0E\uFF61]/g,fi={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},Re=eu-Je,tu=Math.floor,Me=String.fromCharCode;function lu(u){throw new RangeError(fi[u])}function pi(u,e){const t=[];let n=u.length;for(;n--;)t[n]=e(u[n]);return t}function p0(u,e){const t=u.split("@");let n="";t.length>1&&(n=t[0]+"@",u=t[1]),u=u.replace(di,".");const r=u.split("."),i=pi(r,e).join(".");return n+i}function h0(u){const e=[];let t=0;const n=u.length;for(;t<n;){const r=u.charCodeAt(t++);if(r>=55296&&r<=56319&&t<n){const i=u.charCodeAt(t++);(i&64512)==56320?e.push(((r&1023)<<10)+(i&1023)+65536):(e.push(r),t--)}else e.push(r)}return e}const hi=u=>String.fromCodePoint(...u),bi=function(u){return u>=48&&u<58?26+(u-48):u>=65&&u<91?u-65:u>=97&&u<123?u-97:eu},Ut=function(u,e){return u+22+75*(u<26)-((e!=0)<<5)},b0=function(u,e,t){let n=0;for(u=t?tu(u/ai):u>>1,u+=tu(u/e);u>Re*$u>>1;n+=eu)u=tu(u/Re);return tu(n+(Re+1)*u/(u+ci))},m0=function(u){const e=[],t=u.length;let n=0,r=d0,i=l0,c=u.lastIndexOf(f0);c<0&&(c=0);for(let o=0;o<c;++o)u.charCodeAt(o)>=128&&lu("not-basic"),e.push(u.charCodeAt(o));for(let o=c>0?c+1:0;o<t;){const a=n;for(let f=1,p=eu;;p+=eu){o>=t&&lu("invalid-input");const m=bi(u.charCodeAt(o++));m>=eu&&lu("invalid-input"),m>tu((Tu-n)/f)&&lu("overflow"),n+=m*f;const h=p<=i?Je:p>=i+$u?$u:p-i;if(m<h)break;const d=eu-h;f>tu(Tu/d)&&lu("overflow"),f*=d}const s=e.length+1;i=b0(n-a,s,a==0),tu(n/s)>Tu-r&&lu("overflow"),r+=tu(n/s),n%=s,e.splice(n++,0,r)}return String.fromCodePoint(...e)},x0=function(u){const e=[];u=h0(u);const t=u.length;let n=d0,r=0,i=l0;for(const a of u)a<128&&e.push(Me(a));const c=e.length;let o=c;for(c&&e.push(f0);o<t;){let a=Tu;for(const f of u)f>=n&&f<a&&(a=f);const s=o+1;a-n>tu((Tu-r)/s)&&lu("overflow"),r+=(a-n)*s,n=a;for(const f of u)if(f<n&&++r>Tu&&lu("overflow"),f===n){let p=r;for(let m=eu;;m+=eu){const h=m<=i?Je:m>=i+$u?$u:m-i;if(p<h)break;const d=p-h,D=eu-h;e.push(Me(Ut(h+d%D,0))),p=tu(d/D)}e.push(Me(Ut(p,0))),i=b0(r,s,o===c),r=0,++o}++r,++n}return e.join("")},mi=function(u){return p0(u,function(e){return si.test(e)?m0(e.slice(4).toLowerCase()):e})},xi=function(u){return p0(u,function(e){return li.test(e)?"xn--"+x0(e):e})},_0={version:"2.3.1",ucs2:{decode:h0,encode:hi},decode:m0,encode:x0,toASCII:xi,toUnicode:mi},_i={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:100},components:{core:{},block:{},inline:{}}},gi={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["paragraph"]},inline:{rules:["text"],rules2:["balance_pairs","fragments_join"]}}},ki={options:{html:!0,xhtmlOut:!0,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["blockquote","code","fence","heading","hr","html_block","lheading","list","reference","paragraph"]},inline:{rules:["autolink","backticks","emphasis","entity","escape","html_inline","image","link","newline","text"],rules2:["balance_pairs","emphasis","fragments_join"]}}},Ei={default:_i,zero:gi,commonmark:ki},Ai=/^(vbscript|javascript|file|data):/,Di=/^data:image\/(gif|png|jpeg|webp);/;function Ci(u){const e=u.trim().toLowerCase();return Ai.test(e)?Di.test(e):!0}const g0=["http:","https:","mailto:"];function yi(u){const e=Ge(u,!0);if(e.hostname&&(!e.protocol||g0.indexOf(e.protocol)>=0))try{e.hostname=_0.toASCII(e.hostname)}catch{}return Gu($e(e))}function Ti(u){const e=Ge(u,!0);if(e.hostname&&(!e.protocol||g0.indexOf(e.protocol)>=0))try{e.hostname=_0.toUnicode(e.hostname)}catch{}return Fu($e(e),Fu.defaultChars+"%")}function Y(u,e){if(!(this instanceof Y))return new Y(u,e);e||Ze(u)||(e=u||{},u="default"),this.inline=new Zu,this.block=new fe,this.core=new Ye,this.renderer=new wu,this.linkify=new V,this.validateLink=Ci,this.normalizeLink=yi,this.normalizeLinkText=Ti,this.utils=Sn,this.helpers=le({},Mn),this.options={},this.configure(u),e&&this.set(e)}Y.prototype.set=function(u){return le(this.options,u),this};Y.prototype.configure=function(u){const e=this;if(Ze(u)){const t=u;if(u=Ei[t],!u)throw new Error('Wrong `markdown-it` preset "'+t+'", check name')}if(!u)throw new Error("Wrong `markdown-it` preset, can't be empty");return u.options&&e.set(u.options),u.components&&Object.keys(u.components).forEach(function(t){u.components[t].rules&&e[t].ruler.enableOnly(u.components[t].rules),u.components[t].rules2&&e[t].ruler2.enableOnly(u.components[t].rules2)}),this};Y.prototype.enable=function(u,e){let t=[];Array.isArray(u)||(u=[u]),["core","block","inline"].forEach(function(r){t=t.concat(this[r].ruler.enable(u,!0))},this),t=t.concat(this.inline.ruler2.enable(u,!0));const n=u.filter(function(r){return t.indexOf(r)<0});if(n.length&&!e)throw new Error("MarkdownIt. Failed to enable unknown rule(s): "+n);return this};Y.prototype.disable=function(u,e){let t=[];Array.isArray(u)||(u=[u]),["core","block","inline"].forEach(function(r){t=t.concat(this[r].ruler.disable(u,!0))},this),t=t.concat(this.inline.ruler2.disable(u,!0));const n=u.filter(function(r){return t.indexOf(r)<0});if(n.length&&!e)throw new Error("MarkdownIt. Failed to disable unknown rule(s): "+n);return this};Y.prototype.use=function(u){const e=[this].concat(Array.prototype.slice.call(arguments,1));return u.apply(u,e),this};Y.prototype.parse=function(u,e){if(typeof u!="string")throw new Error("Input data should be a String");const t=new this.core.State(u,this,e);return this.core.process(t),t.tokens};Y.prototype.render=function(u,e){return e=e||{},this.renderer.render(this.parse(u,e),this.options,e)};Y.prototype.parseInline=function(u,e){const t=new this.core.State(u,this,e);return t.inlineMode=!0,this.core.process(t),t.tokens};Y.prototype.renderInline=function(u,e){return e=e||{},this.renderer.render(this.parseInline(u,e),this.options,e)};/*! @license DOMPurify 3.2.7 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.2.7/LICENSE */const{entries:k0,setPrototypeOf:jt,isFrozen:Fi,getPrototypeOf:Si,getOwnPropertyDescriptor:wi}=Object;let{freeze:H,seal:X,create:E0}=Object,{apply:qe,construct:He}=typeof Reflect<"u"&&Reflect;H||(H=function(e){return e});X||(X=function(e){return e});qe||(qe=function(e,t){for(var n=arguments.length,r=new Array(n>2?n-2:0),i=2;i<n;i++)r[i-2]=arguments[i];return e.apply(t,r)});He||(He=function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return new e(...n)});const re=$(Array.prototype.forEach),vi=$(Array.prototype.lastIndexOf),qt=$(Array.prototype.pop),Nu=$(Array.prototype.push),Ri=$(Array.prototype.splice),oe=$(String.prototype.toLowerCase),Ie=$(String.prototype.toString),Le=$(String.prototype.match),Ou=$(String.prototype.replace),Mi=$(String.prototype.indexOf),Ii=$(String.prototype.trim),J=$(Object.prototype.hasOwnProperty),q=$(RegExp.prototype.test),Bu=Li(TypeError);function $(u){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return qe(u,e,n)}}function Li(u){return function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return He(u,t)}}function F(u,e){let t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:oe;jt&&jt(u,null);let n=e.length;for(;n--;){let r=e[n];if(typeof r=="string"){const i=t(r);i!==r&&(Fi(e)||(e[n]=i),r=i)}u[r]=!0}return u}function Pi(u){for(let e=0;e<u.length;e++)J(u,e)||(u[e]=null);return u}function au(u){const e=E0(null);for(const[t,n]of k0(u))J(u,t)&&(Array.isArray(n)?e[t]=Pi(n):n&&typeof n=="object"&&n.constructor===Object?e[t]=au(n):e[t]=n);return e}function zu(u,e){for(;u!==null;){const n=wi(u,e);if(n){if(n.get)return $(n.get);if(typeof n.value=="function")return $(n.value)}u=Si(u)}function t(){return null}return t}const Ht=H(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Pe=H(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","slot","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ne=H(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Ni=H(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Oe=H(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Oi=H(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),$t=H(["#text"]),Gt=H(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Be=H(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Wt=H(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ie=H(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Bi=X(/\{\{[\w\W]*|[\w\W]*\}\}/gm),zi=X(/<%[\w\W]*|[\w\W]*%>/gm),Ui=X(/\$\{[\w\W]*/gm),ji=X(/^data-[\-\w.\u00B7-\uFFFF]+$/),qi=X(/^aria-[\-\w]+$/),A0=X(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Hi=X(/^(?:\w+script|data):/i),$i=X(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),D0=X(/^html$/i),Gi=X(/^[a-z][.\w]*(-[.\w]+)+$/i);var Zt=Object.freeze({__proto__:null,ARIA_ATTR:qi,ATTR_WHITESPACE:$i,CUSTOM_ELEMENT:Gi,DATA_ATTR:ji,DOCTYPE_NAME:D0,ERB_EXPR:zi,IS_ALLOWED_URI:A0,IS_SCRIPT_OR_DATA:Hi,MUSTACHE_EXPR:Bi,TMPLIT_EXPR:Ui});const Uu={element:1,text:3,progressingInstruction:7,comment:8,document:9},Wi=function(){return typeof window>"u"?null:window},Zi=function(e,t){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null;const r="data-tt-policy-suffix";t&&t.hasAttribute(r)&&(n=t.getAttribute(r));const i="dompurify"+(n?"#"+n:"");try{return e.createPolicy(i,{createHTML(c){return c},createScriptURL(c){return c}})}catch{return console.warn("TrustedTypes policy "+i+" could not be created."),null}},Vt=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function C0(){let u=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Wi();const e=g=>C0(g);if(e.version="3.2.7",e.removed=[],!u||!u.document||u.document.nodeType!==Uu.document||!u.Element)return e.isSupported=!1,e;let{document:t}=u;const n=t,r=n.currentScript,{DocumentFragment:i,HTMLTemplateElement:c,Node:o,Element:a,NodeFilter:s,NamedNodeMap:f=u.NamedNodeMap||u.MozNamedAttrMap,HTMLFormElement:p,DOMParser:m,trustedTypes:h}=u,d=a.prototype,D=zu(d,"cloneNode"),y=zu(d,"remove"),S=zu(d,"nextSibling"),E=zu(d,"childNodes"),A=zu(d,"parentNode");if(typeof c=="function"){const g=t.createElement("template");g.content&&g.content.ownerDocument&&(t=g.content.ownerDocument)}let x,C="";const{implementation:T,createNodeIterator:I,createDocumentFragment:Z,getElementsByTagName:K}=t,{importNode:hu}=n;let L=Vt();e.isSupported=typeof k0=="function"&&typeof A=="function"&&T&&T.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:vu,ERB_EXPR:Ru,TMPLIT_EXPR:xu,DATA_ATTR:su,ARIA_ATTR:he,IS_SCRIPT_OR_DATA:y0,ATTR_WHITESPACE:Qe,CUSTOM_ELEMENT:T0}=Zt;let{IS_ALLOWED_URI:Ke}=Zt,P=null;const ut=F({},[...Ht,...Pe,...Ne,...Oe,...$t]);let z=null;const et=F({},[...Gt,...Be,...Wt,...ie]);let R=Object.seal(E0(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Mu=null,be=null,tt=!0,me=!0,nt=!1,rt=!0,_u=!1,Vu=!0,bu=!1,xe=!1,_e=!1,gu=!1,Yu=!1,Xu=!1,it=!0,ot=!1;const F0="user-content-";let ge=!0,Iu=!1,ku={},Eu=null;const ct=F({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let at=null;const st=F({},["audio","video","img","source","image","track"]);let ke=null;const lt=F({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Ju="http://www.w3.org/1998/Math/MathML",Qu="http://www.w3.org/2000/svg",iu="http://www.w3.org/1999/xhtml";let Au=iu,Ee=!1,Ae=null;const S0=F({},[Ju,Qu,iu],Ie);let Ku=F({},["mi","mo","mn","ms","mtext"]),ue=F({},["annotation-xml"]);const w0=F({},["title","style","font","a","script"]);let Lu=null;const v0=["application/xhtml+xml","text/html"],R0="text/html";let N=null,Du=null;const M0=t.createElement("form"),dt=function(l){return l instanceof RegExp||l instanceof Function},De=function(){let l=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Du&&Du===l)){if((!l||typeof l!="object")&&(l={}),l=au(l),Lu=v0.indexOf(l.PARSER_MEDIA_TYPE)===-1?R0:l.PARSER_MEDIA_TYPE,N=Lu==="application/xhtml+xml"?Ie:oe,P=J(l,"ALLOWED_TAGS")?F({},l.ALLOWED_TAGS,N):ut,z=J(l,"ALLOWED_ATTR")?F({},l.ALLOWED_ATTR,N):et,Ae=J(l,"ALLOWED_NAMESPACES")?F({},l.ALLOWED_NAMESPACES,Ie):S0,ke=J(l,"ADD_URI_SAFE_ATTR")?F(au(lt),l.ADD_URI_SAFE_ATTR,N):lt,at=J(l,"ADD_DATA_URI_TAGS")?F(au(st),l.ADD_DATA_URI_TAGS,N):st,Eu=J(l,"FORBID_CONTENTS")?F({},l.FORBID_CONTENTS,N):ct,Mu=J(l,"FORBID_TAGS")?F({},l.FORBID_TAGS,N):au({}),be=J(l,"FORBID_ATTR")?F({},l.FORBID_ATTR,N):au({}),ku=J(l,"USE_PROFILES")?l.USE_PROFILES:!1,tt=l.ALLOW_ARIA_ATTR!==!1,me=l.ALLOW_DATA_ATTR!==!1,nt=l.ALLOW_UNKNOWN_PROTOCOLS||!1,rt=l.ALLOW_SELF_CLOSE_IN_ATTR!==!1,_u=l.SAFE_FOR_TEMPLATES||!1,Vu=l.SAFE_FOR_XML!==!1,bu=l.WHOLE_DOCUMENT||!1,gu=l.RETURN_DOM||!1,Yu=l.RETURN_DOM_FRAGMENT||!1,Xu=l.RETURN_TRUSTED_TYPE||!1,_e=l.FORCE_BODY||!1,it=l.SANITIZE_DOM!==!1,ot=l.SANITIZE_NAMED_PROPS||!1,ge=l.KEEP_CONTENT!==!1,Iu=l.IN_PLACE||!1,Ke=l.ALLOWED_URI_REGEXP||A0,Au=l.NAMESPACE||iu,Ku=l.MATHML_TEXT_INTEGRATION_POINTS||Ku,ue=l.HTML_INTEGRATION_POINTS||ue,R=l.CUSTOM_ELEMENT_HANDLING||{},l.CUSTOM_ELEMENT_HANDLING&&dt(l.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(R.tagNameCheck=l.CUSTOM_ELEMENT_HANDLING.tagNameCheck),l.CUSTOM_ELEMENT_HANDLING&&dt(l.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(R.attributeNameCheck=l.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),l.CUSTOM_ELEMENT_HANDLING&&typeof l.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(R.allowCustomizedBuiltInElements=l.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),_u&&(me=!1),Yu&&(gu=!0),ku&&(P=F({},$t),z=[],ku.html===!0&&(F(P,Ht),F(z,Gt)),ku.svg===!0&&(F(P,Pe),F(z,Be),F(z,ie)),ku.svgFilters===!0&&(F(P,Ne),F(z,Be),F(z,ie)),ku.mathMl===!0&&(F(P,Oe),F(z,Wt),F(z,ie))),l.ADD_TAGS&&(P===ut&&(P=au(P)),F(P,l.ADD_TAGS,N)),l.ADD_ATTR&&(z===et&&(z=au(z)),F(z,l.ADD_ATTR,N)),l.ADD_URI_SAFE_ATTR&&F(ke,l.ADD_URI_SAFE_ATTR,N),l.FORBID_CONTENTS&&(Eu===ct&&(Eu=au(Eu)),F(Eu,l.FORBID_CONTENTS,N)),ge&&(P["#text"]=!0),bu&&F(P,["html","head","body"]),P.table&&(F(P,["tbody"]),delete Mu.tbody),l.TRUSTED_TYPES_POLICY){if(typeof l.TRUSTED_TYPES_POLICY.createHTML!="function")throw Bu('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof l.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Bu('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');x=l.TRUSTED_TYPES_POLICY,C=x.createHTML("")}else x===void 0&&(x=Zi(h,r)),x!==null&&typeof C=="string"&&(C=x.createHTML(""));H&&H(l),Du=l}},ft=F({},[...Pe,...Ne,...Ni]),pt=F({},[...Oe,...Oi]),I0=function(l){let b=A(l);(!b||!b.tagName)&&(b={namespaceURI:Au,tagName:"template"});const _=oe(l.tagName),v=oe(b.tagName);return Ae[l.namespaceURI]?l.namespaceURI===Qu?b.namespaceURI===iu?_==="svg":b.namespaceURI===Ju?_==="svg"&&(v==="annotation-xml"||Ku[v]):!!ft[_]:l.namespaceURI===Ju?b.namespaceURI===iu?_==="math":b.namespaceURI===Qu?_==="math"&&ue[v]:!!pt[_]:l.namespaceURI===iu?b.namespaceURI===Qu&&!ue[v]||b.namespaceURI===Ju&&!Ku[v]?!1:!pt[_]&&(w0[_]||!ft[_]):!!(Lu==="application/xhtml+xml"&&Ae[l.namespaceURI]):!1},uu=function(l){Nu(e.removed,{element:l});try{A(l).removeChild(l)}catch{y(l)}},mu=function(l,b){try{Nu(e.removed,{attribute:b.getAttributeNode(l),from:b})}catch{Nu(e.removed,{attribute:null,from:b})}if(b.removeAttribute(l),l==="is")if(gu||Yu)try{uu(b)}catch{}else try{b.setAttribute(l,"")}catch{}},ht=function(l){let b=null,_=null;if(_e)l="<remove></remove>"+l;else{const M=Le(l,/^[\r\n\t ]+/);_=M&&M[0]}Lu==="application/xhtml+xml"&&Au===iu&&(l='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+l+"</body></html>");const v=x?x.createHTML(l):l;if(Au===iu)try{b=new m().parseFromString(v,Lu)}catch{}if(!b||!b.documentElement){b=T.createDocument(Au,"template",null);try{b.documentElement.innerHTML=Ee?C:v}catch{}}const j=b.body||b.documentElement;return l&&_&&j.insertBefore(t.createTextNode(_),j.childNodes[0]||null),Au===iu?K.call(b,bu?"html":"body")[0]:bu?b.documentElement:j},bt=function(l){return I.call(l.ownerDocument||l,l,s.SHOW_ELEMENT|s.SHOW_COMMENT|s.SHOW_TEXT|s.SHOW_PROCESSING_INSTRUCTION|s.SHOW_CDATA_SECTION,null)},Ce=function(l){return l instanceof p&&(typeof l.nodeName!="string"||typeof l.textContent!="string"||typeof l.removeChild!="function"||!(l.attributes instanceof f)||typeof l.removeAttribute!="function"||typeof l.setAttribute!="function"||typeof l.namespaceURI!="string"||typeof l.insertBefore!="function"||typeof l.hasChildNodes!="function")},mt=function(l){return typeof o=="function"&&l instanceof o};function ou(g,l,b){re(g,_=>{_.call(e,l,b,Du)})}const xt=function(l){let b=null;if(ou(L.beforeSanitizeElements,l,null),Ce(l))return uu(l),!0;const _=N(l.nodeName);if(ou(L.uponSanitizeElement,l,{tagName:_,allowedTags:P}),Vu&&l.hasChildNodes()&&!mt(l.firstElementChild)&&q(/<[/\w!]/g,l.innerHTML)&&q(/<[/\w!]/g,l.textContent)||l.nodeType===Uu.progressingInstruction||Vu&&l.nodeType===Uu.comment&&q(/<[/\w]/g,l.data))return uu(l),!0;if(!P[_]||Mu[_]){if(!Mu[_]&&gt(_)&&(R.tagNameCheck instanceof RegExp&&q(R.tagNameCheck,_)||R.tagNameCheck instanceof Function&&R.tagNameCheck(_)))return!1;if(ge&&!Eu[_]){const v=A(l)||l.parentNode,j=E(l)||l.childNodes;if(j&&v){const M=j.length;for(let G=M-1;G>=0;--G){const cu=D(j[G],!0);cu.__removalCount=(l.__removalCount||0)+1,v.insertBefore(cu,S(l))}}}return uu(l),!0}return l instanceof a&&!I0(l)||(_==="noscript"||_==="noembed"||_==="noframes")&&q(/<\/no(script|embed|frames)/i,l.innerHTML)?(uu(l),!0):(_u&&l.nodeType===Uu.text&&(b=l.textContent,re([vu,Ru,xu],v=>{b=Ou(b,v," ")}),l.textContent!==b&&(Nu(e.removed,{element:l.cloneNode()}),l.textContent=b)),ou(L.afterSanitizeElements,l,null),!1)},_t=function(l,b,_){if(it&&(b==="id"||b==="name")&&(_ in t||_ in M0))return!1;if(!(me&&!be[b]&&q(su,b))){if(!(tt&&q(he,b))){if(!z[b]||be[b]){if(!(gt(l)&&(R.tagNameCheck instanceof RegExp&&q(R.tagNameCheck,l)||R.tagNameCheck instanceof Function&&R.tagNameCheck(l))&&(R.attributeNameCheck instanceof RegExp&&q(R.attributeNameCheck,b)||R.attributeNameCheck instanceof Function&&R.attributeNameCheck(b,l))||b==="is"&&R.allowCustomizedBuiltInElements&&(R.tagNameCheck instanceof RegExp&&q(R.tagNameCheck,_)||R.tagNameCheck instanceof Function&&R.tagNameCheck(_))))return!1}else if(!ke[b]){if(!q(Ke,Ou(_,Qe,""))){if(!((b==="src"||b==="xlink:href"||b==="href")&&l!=="script"&&Mi(_,"data:")===0&&at[l])){if(!(nt&&!q(y0,Ou(_,Qe,"")))){if(_)return!1}}}}}}return!0},gt=function(l){return l!=="annotation-xml"&&Le(l,T0)},kt=function(l){ou(L.beforeSanitizeAttributes,l,null);const{attributes:b}=l;if(!b||Ce(l))return;const _={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:z,forceKeepAttr:void 0};let v=b.length;for(;v--;){const j=b[v],{name:M,namespaceURI:G,value:cu}=j,Cu=N(M),ye=cu;let U=M==="value"?ye:Ii(ye);if(_.attrName=Cu,_.attrValue=U,_.keepAttr=!0,_.forceKeepAttr=void 0,ou(L.uponSanitizeAttribute,l,_),U=_.attrValue,ot&&(Cu==="id"||Cu==="name")&&(mu(M,l),U=F0+U),Vu&&q(/((--!?|])>)|<\/(style|title|textarea)/i,U)){mu(M,l);continue}if(Cu==="attributename"&&Le(U,"href")){mu(M,l);continue}if(_.forceKeepAttr)continue;if(!_.keepAttr){mu(M,l);continue}if(!rt&&q(/\/>/i,U)){mu(M,l);continue}_u&&re([vu,Ru,xu],At=>{U=Ou(U,At," ")});const Et=N(l.nodeName);if(!_t(Et,Cu,U)){mu(M,l);continue}if(x&&typeof h=="object"&&typeof h.getAttributeType=="function"&&!G)switch(h.getAttributeType(Et,Cu)){case"TrustedHTML":{U=x.createHTML(U);break}case"TrustedScriptURL":{U=x.createScriptURL(U);break}}if(U!==ye)try{G?l.setAttributeNS(G,M,U):l.setAttribute(M,U),Ce(l)?uu(l):qt(e.removed)}catch{mu(M,l)}}ou(L.afterSanitizeAttributes,l,null)},L0=function g(l){let b=null;const _=bt(l);for(ou(L.beforeSanitizeShadowDOM,l,null);b=_.nextNode();)ou(L.uponSanitizeShadowNode,b,null),xt(b),kt(b),b.content instanceof i&&g(b.content);ou(L.afterSanitizeShadowDOM,l,null)};return e.sanitize=function(g){let l=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},b=null,_=null,v=null,j=null;if(Ee=!g,Ee&&(g="<!-->"),typeof g!="string"&&!mt(g))if(typeof g.toString=="function"){if(g=g.toString(),typeof g!="string")throw Bu("dirty is not a string, aborting")}else throw Bu("toString is not a function");if(!e.isSupported)return g;if(xe||De(l),e.removed=[],typeof g=="string"&&(Iu=!1),Iu){if(g.nodeName){const cu=N(g.nodeName);if(!P[cu]||Mu[cu])throw Bu("root node is forbidden and cannot be sanitized in-place")}}else if(g instanceof o)b=ht("<!---->"),_=b.ownerDocument.importNode(g,!0),_.nodeType===Uu.element&&_.nodeName==="BODY"||_.nodeName==="HTML"?b=_:b.appendChild(_);else{if(!gu&&!_u&&!bu&&g.indexOf("<")===-1)return x&&Xu?x.createHTML(g):g;if(b=ht(g),!b)return gu?null:Xu?C:""}b&&_e&&uu(b.firstChild);const M=bt(Iu?g:b);for(;v=M.nextNode();)xt(v),kt(v),v.content instanceof i&&L0(v.content);if(Iu)return g;if(gu){if(Yu)for(j=Z.call(b.ownerDocument);b.firstChild;)j.appendChild(b.firstChild);else j=b;return(z.shadowroot||z.shadowrootmode)&&(j=hu.call(n,j,!0)),j}let G=bu?b.outerHTML:b.innerHTML;return bu&&P["!doctype"]&&b.ownerDocument&&b.ownerDocument.doctype&&b.ownerDocument.doctype.name&&q(D0,b.ownerDocument.doctype.name)&&(G="<!DOCTYPE "+b.ownerDocument.doctype.name+`>
`+G),_u&&re([vu,Ru,xu],cu=>{G=Ou(G,cu," ")}),x&&Xu?x.createHTML(G):G},e.setConfig=function(){let g=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};De(g),xe=!0},e.clearConfig=function(){Du=null,xe=!1},e.isValidAttribute=function(g,l,b){Du||De({});const _=N(g),v=N(l);return _t(_,v,b)},e.addHook=function(g,l){typeof l=="function"&&Nu(L[g],l)},e.removeHook=function(g,l){if(l!==void 0){const b=vi(L[g],l);return b===-1?void 0:Ri(L[g],b,1)[0]}return qt(L[g])},e.removeHooks=function(g){L[g]=[]},e.removeAllHooks=function(){L=Vt()},e}var Vi=C0();const Yi={blog:`# Sample Blog Post

Welcome to my **awesome** blog post! Here's what you'll learn:

## Key Topics

- Getting started with Markdown
- Best practices for writing
- Tips and tricks

## Code Example

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

> "The best way to learn is by doing!" - Someone wise

Happy coding! 🚀`,readme:`# Project README

Brief description of your amazing project.

## Installation

\`\`\`bash
npm install your-project
\`\`\`

## Usage

\`\`\`javascript
import YourProject from 'your-project';

const project = new YourProject();
project.start();
\`\`\`

## Features

- ✅ Feature 1
- ✅ Feature 2
- 🔄 Feature 3 (coming soon)

## Contributing

Pull requests are welcome!

## License

MIT © Your Name`,notes:u=>`# Quick Notes

## Today's Tasks

- [ ] Review documentation
- [x] Fix bug #123
- [ ] Update dependencies
- [x] Write tests

## Important Links

- [Documentation](https://example.com/docs)
- [GitHub Repo](https://github.com/user/repo)

## Code Snippet

\`\`\`python
def hello_world():
    print("Hello, World!")
\`\`\`

---

*Last updated: ${u}*`,apiDocs:`# API Documentation

## Overview
This API provides endpoints for managing user data and authentication.

## Authentication
All requests require an API key in the header:
\`\`\`
Authorization: Bearer YOUR_API_KEY
\`\`\`

## Endpoints

### GET /api/users
Get all users

**Response:**
\`\`\`json
{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    }
  ]
}
\`\`\`

### POST /api/users
Create a new user

**Request Body:**
\`\`\`json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
\`\`\`

## Error Codes
| Code | Description |
|------|-------------|
| 400  | Bad Request |
| 401  | Unauthorized |
| 404  | Not Found |
| 500  | Server Error |`,meetingNotes:u=>`# Meeting Notes - ${u}

## Attendees
- John Smith (Project Manager)
- Sarah Johnson (Developer)
- Mike Chen (Designer)

## Agenda
1. Project status update
2. Upcoming deadlines
3. Resource allocation
4. Next steps

## Discussion Points

### Project Status
- ✅ Phase 1 completed on schedule
- 🟡 Phase 2 in progress (75% complete)
- 🔴 Phase 3 delayed due to resource constraints

### Action Items
| Task | Assignee | Due Date | Status |
|------|----------|----------|--------|
| Update user interface | Mike | Oct 15 | In Progress |
| Fix login bug | Sarah | Oct 12 | Not Started |
| Review requirements | John | Oct 10 | Complete |

## Decisions Made
1. Extend Phase 2 deadline by 1 week
2. Hire additional developer for Phase 3
3. Schedule weekly check-ins

## Next Meeting
**Date:** October 16, 2025  
**Time:** 2:00 PM  
**Location:** Conference Room B`,tutorial:`# Tutorial: Getting Started with React

## Prerequisites
- Node.js (v14 or higher)
- Basic JavaScript knowledge
- Text editor (VS Code recommended)

## Step 1: Setup
First, create a new React application:

\`\`\`bash
npx create-react-app my-app
cd my-app
npm start
\`\`\`

## Step 2: Understanding Components
React is built around components. Here's a basic component:

\`\`\`jsx
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}
\`\`\`

## Step 3: State Management
Use the \`useState\` hook to manage component state:

\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
\`\`\`

## Key Concepts
- **JSX**: JavaScript XML syntax
- **Props**: Data passed to components
- **State**: Component's internal data
- **Hooks**: Functions that let you use React features

## Next Steps
1. Learn about useEffect hook
2. Explore React Router for navigation
3. Practice building small projects
4. Join the React community

> **Tip:** Practice regularly and build real projects to solidify your understanding!`,changelog:u=>`# Project Changelog

## [2.1.0] - ${u}

### Added ✨
- New user dashboard with analytics
- Dark mode support
- Email notification system
- Export data to CSV functionality

### Changed 🔄
- Updated user interface design
- Improved loading performance by 40%
- Enhanced mobile responsiveness
- Streamlined onboarding process

### Fixed 🐛
- Fixed login redirect issue
- Resolved memory leak in data processing
- Corrected timezone display problems
- Fixed broken links in documentation

### Security 🔒
- Updated all dependencies to latest versions
- Implemented rate limiting for API endpoints
- Added input validation for all forms
- Enhanced password encryption

---

## [2.0.0] - 2024-09-15

### Added ✨
- Complete redesign of user interface
- REST API for third-party integrations
- Multi-language support (EN, ES, FR)
- Advanced search and filtering

### Breaking Changes ⚠️
- API endpoints have changed (see migration guide)
- Minimum Node.js version is now 16
- Database schema updates required

### Deprecated 📋
- Old API v1 endpoints (will be removed in v3.0)
- Legacy authentication method

---

## [1.5.2] - 2024-08-01

### Fixed 🐛
- Critical security vulnerability in authentication
- Performance issues with large datasets
- Browser compatibility problems

## Migration Guide
For upgrading from v1.x to v2.x, please see our [migration guide](docs/migration.md).`,prd:u=>`# Product Requirements Document

## Product Overview
**Product Name:** DevToolsBox  
**Version:** 3.0  
**Date:** ${u}  
**Owner:** Product Team

## Executive Summary
Brief description of the product and its main purpose.

## Goals & Objectives
### Primary Goals
1. Increase user engagement by 50%
2. Reduce customer support tickets by 30%
3. Improve user onboarding completion rate

### Success Metrics
- Monthly Active Users (MAU)
- User Retention Rate
- Customer Satisfaction Score (CSAT)

## User Stories

### Epic 1: User Authentication
**As a** new user  
**I want to** easily create an account  
**So that** I can access the platform features

#### Acceptance Criteria
- [ ] User can register with email and password
- [ ] Email verification is required
- [ ] Password meets security requirements
- [ ] Social login options available

### Epic 2: Dashboard
**As a** logged-in user  
**I want to** see a personalized dashboard  
**So that** I can quickly access relevant information

#### Acceptance Criteria
- [ ] Dashboard loads within 2 seconds
- [ ] Shows relevant widgets based on user role
- [ ] Customizable layout options
- [ ] Mobile-responsive design

## Technical Requirements
### Performance
- Page load time < 3 seconds
- 99.9% uptime
- Support for 10,000 concurrent users

### Security
- HTTPS encryption
- Data encryption at rest
- Regular security audits
- GDPR compliance

### Browser Support
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Timeline
| Phase | Duration | Deliverables |
|-------|----------|--------------|
| Phase 1 | 4 weeks | User authentication |
| Phase 2 | 6 weeks | Core dashboard |
| Phase 3 | 4 weeks | Testing & optimization |

## Dependencies
- Design team mockups
- API development completion
- Third-party service integrations

## Risks & Mitigation
| Risk | Impact | Mitigation |
|------|--------|------------|
| Delayed API development | High | Start with mock data |
| Resource constraints | Medium | Prioritize core features |
| Browser compatibility | Low | Regular testing |`,weeklyReport:(u,e)=>`# Weekly Report - Week of ${u}

## Executive Summary
This week focused on completing Phase 2 deliverables and preparing for the upcoming product launch. Overall progress is on track with minor adjustments to timeline.

## Key Accomplishments ✅

### Development Team
- ✅ Completed user authentication system
- ✅ Implemented dashboard UI components
- ✅ Fixed 12 critical bugs
- ✅ Added unit tests (coverage: 85%)

### Design Team
- ✅ Finalized mobile app wireframes
- ✅ Created brand style guide
- ✅ Conducted 5 user interviews
- ✅ Updated design system components

### Marketing Team
- ✅ Launched social media campaign
- ✅ Created product demo video
- ✅ Updated website content
- ✅ Scheduled 3 customer interviews

## Metrics & KPIs 📊

| Metric | This Week | Last Week | Change |
|--------|-----------|-----------|--------|
| Active Users | 1,250 | 1,180 | +5.9% |
| Bug Reports | 8 | 15 | -46.7% |
| Feature Requests | 23 | 19 | +21.1% |
| Customer Satisfaction | 4.2/5 | 4.0/5 | +5% |

## Challenges & Blockers 🚨

### Technical Issues
- **Database Performance**: Query optimization needed for large datasets
- **Mobile Compatibility**: iOS Safari rendering issues identified
- **Third-party Integration**: API rate limits causing delays

### Resource Constraints
- Need additional QA engineer for testing phase
- Design review bottleneck due to team availability

## Upcoming Priorities (Next Week) 🎯

### High Priority
1. Resolve database performance issues
2. Complete mobile app testing
3. Finalize product launch checklist
4. Conduct stakeholder review meeting

### Medium Priority
- Update documentation
- Prepare marketing materials
- Schedule customer onboarding sessions
- Review and update project timeline

## Budget & Resource Update 💰
- **Budget Utilized**: 78% of quarterly allocation
- **Team Capacity**: Running at 95% utilization
- **Additional Resources Needed**: 1 QA Engineer, 0.5 Designer

## Risk Assessment ⚠️

| Risk | Probability | Impact | Mitigation Plan |
|------|-----------------|------------|---------------------|
| Launch Delay | Medium | High | Add weekend sprint |
| Resource Shortage | High | Medium | Hire contractor |
| Performance Issues | Low | High | Optimize queries |

## Action Items for Next Week 📝
- [ ] John: Fix database performance (Due: Oct 12)
- [ ] Sarah: Complete mobile testing (Due: Oct 14)
- [ ] Mike: Finalize launch materials (Due: Oct 13)
- [ ] Team: Stakeholder meeting prep (Due: Oct 11)

---

**Report prepared by:** Project Manager  
**Next report due:** ${e}`,codeReview:u=>`# Code Review Checklist

## Pre-Review Setup ✅
- [ ] Code compiles without errors
- [ ] All tests pass
- [ ] No merge conflicts
- [ ] Branch is up to date with main
- [ ] Self-review completed

## Code Quality 🔍

### Structure & Organization
- [ ] Code is well-organized and readable
- [ ] Functions are appropriately sized (< 50 lines)
- [ ] Classes have single responsibility
- [ ] Naming conventions are followed
- [ ] No duplicate code (DRY principle)

### Performance & Efficiency
- [ ] No obvious performance issues
- [ ] Database queries are optimized
- [ ] Memory usage is reasonable
- [ ] No infinite loops or recursion issues
- [ ] Appropriate data structures used

### Security & Safety
- [ ] Input validation implemented
- [ ] No hardcoded credentials
- [ ] Proper error handling
- [ ] SQL injection prevention
- [ ] XSS protection in place

## Testing 🧪
- [ ] Unit tests cover new functionality
- [ ] Integration tests updated
- [ ] Edge cases are tested
- [ ] Error conditions are tested
- [ ] Test coverage meets requirements (>80%)

## Documentation 📚
- [ ] Code is well-commented
- [ ] API documentation updated
- [ ] README updated if needed
- [ ] Changelog entries added
- [ ] Migration scripts documented

## Deployment Readiness 🚀
- [ ] Environment variables documented
- [ ] Database migrations tested
- [ ] Rollback plan exists
- [ ] Feature flags configured
- [ ] Monitoring/logging added

## Final Checklist ✅
- [ ] PR description is clear and complete
- [ ] Screenshots/GIFs added for UI changes
- [ ] Breaking changes highlighted
- [ ] Reviewers assigned
- [ ] Labels applied

---

**Reviewer:** [Name]  
**Review Date:** ${u}  
**Status:** [ ] Approved [ ] Needs Changes [ ] Rejected`,proposal:u=>`# Project Proposal

## Project Title
**DevToolsBox Enhancement Initiative**

## Executive Summary
Brief overview of the proposed project, its objectives, and expected outcomes. This project aims to enhance the existing DevToolsBox platform with new features and improved user experience.

## Problem Statement
### Current Challenges
- Limited user engagement with existing tools
- Outdated user interface design
- Performance issues with large datasets
- Lack of mobile optimization

### Impact of Problems
- 23% decrease in monthly active users
- Increased customer support tickets
- Lower user satisfaction scores
- Competitive disadvantage

## Proposed Solution
### Overview
Implement a comprehensive upgrade to DevToolsBox including:
- Modern, responsive UI/UX design
- Performance optimization
- Mobile-first approach
- New productivity tools

### Key Features
1. **Enhanced Dashboard**
   - Customizable widgets
   - Real-time analytics
   - Drag-and-drop interface

2. **Mobile Application**
   - Native iOS and Android apps
   - Offline functionality
   - Push notifications

3. **Performance Improvements**
   - Database optimization
   - Caching implementation
   - CDN integration

4. **New Tools**
   - AI-powered code analyzer
   - Collaborative workspace
   - Advanced reporting

## Project Scope
### In Scope
- Frontend redesign and development
- Backend performance optimization
- Mobile app development
- User testing and feedback integration

### Out of Scope
- Third-party integrations (Phase 2)
- Advanced AI features (Future release)
- Enterprise SSO (Separate project)

## Timeline & Milestones

| Phase | Duration | Key Deliverables | Budget |
|-------|----------|------------------|--------|
| Phase 1: Planning | 2 weeks | Requirements, Design mockups | $15K |
| Phase 2: Development | 12 weeks | Core features, Backend APIs | $120K |
| Phase 3: Testing | 4 weeks | QA, User testing, Bug fixes | $30K |
| Phase 4: Launch | 2 weeks | Deployment, Documentation | $10K |

**Total Duration:** 20 weeks  
**Total Budget:** $175,000

## Resource Requirements

### Team Structure
- **Project Manager** (1 FTE)
- **Frontend Developers** (2 FTE)
- **Backend Developers** (2 FTE)
- **Mobile Developer** (1 FTE)
- **UI/UX Designer** (1 FTE)
- **QA Engineer** (1 FTE)

### Technology Stack
- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express, PostgreSQL
- **Mobile:** React Native
- **Infrastructure:** AWS, Docker, GitHub Actions

## Expected Outcomes

### Business Benefits
- 40% increase in user engagement
- 50% reduction in support tickets
- 25% improvement in user satisfaction
- Competitive advantage in market

### Technical Benefits
- 60% faster page load times
- 99.9% uptime reliability
- Scalable architecture
- Modern development practices

## Risk Assessment

| Risk | Probability | Impact | Mitigation Strategy |
|------|-------------|--------|-------------------|
| Scope Creep | Medium | High | Clear requirements, change control |
| Resource Availability | High | Medium | Cross-training, backup resources |
| Technical Challenges | Medium | High | Proof of concepts, expert consultation |
| Budget Overrun | Low | High | Regular monitoring, contingency fund |

## Success Metrics
- User engagement rate increase by 40%
- Page load time improvement by 60%
- Customer satisfaction score > 4.5/5
- Zero critical bugs in production
- Project delivered on time and within budget

## Next Steps
1. **Stakeholder Review** - Present proposal to executive team
2. **Budget Approval** - Secure funding approval
3. **Team Assembly** - Recruit and onboard team members
4. **Project Kickoff** - Initialize project planning phase

---

**Prepared by:** [Your Name]  
**Date:** ${u}  
**Status:** Draft | Under Review | Approved`,techSpec:(u,e)=>`# Technical Specification

## Document Information
**Title:** User Authentication System  
**Version:** 1.0  
**Date:** ${u}  
**Author:** Development Team  
**Status:** Draft

## Overview
This document outlines the technical specifications for implementing a secure user authentication system with support for multiple authentication methods.

## Requirements

### Functional Requirements
1. **User Registration**
   - Email/password registration
   - Email verification required
   - Password strength validation
   - Duplicate email prevention

2. **User Login**
   - Email/password authentication
   - OAuth integration (Google, GitHub)
   - Remember me functionality
   - Account lockout after failed attempts

3. **Password Management**
   - Password reset via email
   - Password change for logged-in users
   - Password history tracking
   - Strong password enforcement

### Non-Functional Requirements
- **Performance:** Login response time < 500ms
- **Security:** OWASP compliance
- **Scalability:** Support 100,000 concurrent users
- **Availability:** 99.9% uptime

## System Architecture

### High-Level Architecture
\`\`\`
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Client    │────│   Gateway   │────│   Auth API  │
│ (React App) │    │   (Nginx)   │    │  (Node.js)  │
└─────────────┘    └─────────────┘    └─────────────┘
                                             │
                   ┌─────────────┐    ┌─────────────┐
                   │   Redis     │    │ PostgreSQL  │
                   │  (Sessions) │    │ (User Data) │
                   └─────────────┘    └─────────────┘
\`\`\`

### Component Design

#### Authentication Service
\`\`\`javascript
class AuthService {
  async register(userData) {
    // Registration logic
  }
  
  async login(credentials) {
    // Login logic
  }
  
  async resetPassword(email) {
    // Password reset logic
  }
}
\`\`\`

#### User Model
\`\`\`sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

## API Specification

### Authentication Endpoints

#### POST /api/auth/register
Register a new user account.

**Request Body:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "firstName": "John",
  "lastName": "Doe"
}
\`\`\`

**Response (201):**
\`\`\`json
{
  "success": true,
  "message": "Registration successful. Please verify your email.",
  "userId": "uuid-here"
}
\`\`\`

#### POST /api/auth/login
Authenticate user credentials.

**Request Body:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
\`\`\`

**Response (200):**
\`\`\`json
{
  "success": true,
  "accessToken": "jwt-token-here",
  "refreshToken": "refresh-token-here",
  "user": {
    "id": "uuid-here",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
\`\`\`

## Security Considerations

### Password Security
- **Hashing:** bcrypt with salt rounds = 12
- **Requirements:** Minimum 8 characters, uppercase, lowercase, number, special character
- **Storage:** Never store plain text passwords

### Token Security
- **JWT:** Access tokens expire in 15 minutes
- **Refresh Tokens:** Expire in 7 days, stored in secure HTTP-only cookies
- **Secret Rotation:** JWT secrets rotated monthly

### Rate Limiting
- **Login Attempts:** Max 5 attempts per IP per 15 minutes
- **Registration:** Max 3 registrations per IP per hour
- **Password Reset:** Max 5 requests per email per hour

## Database Schema

### Users Table
\`\`\`sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  failed_login_attempts INTEGER DEFAULT 0,
  locked_until TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);
\`\`\`

### Sessions Table
\`\`\`sql
CREATE TABLE user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  refresh_token_hash VARCHAR(255) NOT NULL,
  ip_address INET,
  user_agent TEXT,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_sessions_expires_at ON user_sessions(expires_at);
\`\`\`

## Testing Strategy

### Unit Tests
- Authentication service methods
- Password hashing/validation
- Token generation/validation
- Input validation functions

### Integration Tests
- API endpoint functionality
- Database operations
- External OAuth integration
- Email service integration

### Security Tests
- SQL injection attempts
- XSS prevention
- CSRF protection
- Rate limiting effectiveness

## Deployment Configuration

### Environment Variables
\`\`\`bash
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/authdb

# JWT Configuration
JWT_SECRET=your-super-secret-key
JWT_REFRESH_SECRET=your-refresh-secret-key

# Email Service
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-email-password

# OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
\`\`\`

### Monitoring
- **Metrics:** Login success/failure rates
- **Logging:** All authentication events
- **Alerts:** Multiple failed attempts, system errors
- **Health Checks:** Database connectivity, external services

---

**Document Status:** Ready for Review  
**Next Review Date:** ${e}`},Xi=[{key:"blog",label:"Blog Post",icon:"📝",color:"hover:border-purple-500/50 hover:bg-purple-950/20"},{key:"readme",label:"README",icon:"📚",color:"hover:border-green-500/50 hover:bg-green-950/20"},{key:"notes",label:"Notes",icon:"📋",color:"hover:border-orange-500/50 hover:bg-orange-950/20"},{key:"apiDocs",label:"API Docs",icon:"🔌",color:"hover:border-cyan-500/50 hover:bg-cyan-950/20"},{key:"meetingNotes",label:"Meeting Notes",icon:"🗓️",color:"hover:border-indigo-500/50 hover:bg-indigo-950/20"},{key:"tutorial",label:"Tutorial",icon:"📖",color:"hover:border-pink-500/50 hover:bg-pink-950/20"},{key:"changelog",label:"Changelog",icon:"📋",color:"hover:border-emerald-500/50 hover:bg-emerald-950/20"},{key:"prd",label:"PRD",icon:"📊",color:"hover:border-violet-500/50 hover:bg-violet-950/20"},{key:"weeklyReport",label:"Weekly Report",icon:"📈",color:"hover:border-amber-500/50 hover:bg-amber-950/20"},{key:"codeReview",label:"Code Review",icon:"✅",color:"hover:border-slate-500/50 hover:bg-slate-800/20"},{key:"proposal",label:"Project Proposal",icon:"💼",color:"hover:border-blue-500/50 hover:bg-blue-950/20"},{key:"techSpec",label:"Tech Spec",icon:"⚙️",color:"hover:border-rose-500/50 hover:bg-rose-950/20"}];function uo(){const[u,e]=Pu.useState(`# Welcome to DevToolsBox Markdown Previewer
Type your **Markdown** here to see real-time **HTML preview** 👇

- Supports headers, lists, links, code blocks, tables, etc.
- Safe and sanitized rendering using DOMPurify.`),[t,n]=Pu.useState(""),[r,i]=Pu.useState(!1),[c,o]=Pu.useState("dark"),{showToast:a}=P0(),{copy:s}=U0(),f=new Y({html:!0,linkify:!0,breaks:!0});Pu.useEffect(()=>{try{const d=f.render(u),D=Vi.sanitize(d);n(D)}catch(d){console.error("Markdown rendering error:",d)}},[u]);const p=()=>{if(!t.trim()){a("❌ No HTML content to copy","error");return}s(t,"HTML Output")},m=()=>{e(""),n(""),a("Content cleared!","success")},h=d=>{const D=Yi[d];let y="";const S=new Date().toLocaleDateString();if(typeof D=="function")if(d==="weeklyReport"){const E=new Date(Date.now()+6048e5).toLocaleDateString();y=D(S,E)}else if(d==="techSpec"){const E=new Date(Date.now()+6048e5).toLocaleDateString();y=D(S,E)}else y=D(S);else y=D;e(y),a("Template applied!","success")};return k.jsx("div",{className:"w-full max-w-6xl mx-auto px-4 py-8",children:k.jsxs(B0,{glow:!0,children:[k.jsx(z0,{title:"Markdown to HTML Converter",icon:k.jsx(N0,{}),actions:k.jsxs(k.Fragment,{children:[k.jsx(ee,{onClick:()=>i(!r),variant:"secondary",size:"sm",children:r?"Hide Guide":"Show Guide"}),k.jsx(ee,{onClick:p,variant:"primary",size:"sm",disabled:!t.trim(),children:"Copy HTML"}),k.jsx(ee,{onClick:m,variant:"danger",size:"sm",children:"Clear Workspace"})]})}),r&&k.jsxs("div",{className:"mb-6 p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4 text-xs leading-relaxed text-slate-300",children:[k.jsx("h3",{className:"font-semibold text-sm text-[var(--accent-color)] flex items-center gap-2",children:"📚 Markdown Guide & Features"}),k.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[k.jsxs("div",{children:[k.jsx("p",{className:"font-semibold text-slate-100 mb-1",children:"How to use:"}),k.jsx("p",{children:"• Type or paste Markdown into the left panel."}),k.jsx("p",{children:"• Review the live HTML presentation in the preview screen."}),k.jsx("p",{children:'• Click "Copy HTML" to save the sanitized code to your clipboard.'})]}),k.jsxs("div",{children:[k.jsx("p",{className:"font-semibold text-slate-100 mb-1",children:"Standard syntax cheat sheet:"}),k.jsxs("div",{className:"grid grid-cols-2 gap-2 text-[10px] font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-900",children:[k.jsx("div",{children:"# Header 1"}),k.jsx("div",{children:"## Header 2"}),k.jsx("div",{children:"**bold text**"}),k.jsx("div",{children:"*italic text*"}),k.jsx("div",{children:"[Link](url)"}),k.jsx("div",{children:"![Image](url)"}),k.jsx("div",{children:"- Bullet item"}),k.jsx("div",{children:"\\`inline code\\`"})]})]})]})]}),k.jsxs("div",{className:"mb-6 bg-slate-900/50 border border-slate-800/80 rounded-xl p-5",children:[k.jsx("h3",{className:"text-xs font-semibold text-slate-400 mb-3 select-none",children:"⚡ Quick Document Templates"}),k.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2",children:Xi.map(d=>k.jsxs("button",{onClick:()=>h(d.key),className:`flex items-center justify-center gap-1.5 py-2 px-3 border border-slate-800/80 rounded-lg text-slate-300 hover:text-white transition-all text-[11px] font-medium ${d.color} cursor-pointer`,children:[k.jsx("span",{children:d.icon}),k.jsx("span",{children:d.label})]},d.key))})]}),k.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[k.jsxs("div",{className:"flex flex-col gap-1.5",children:[k.jsx("label",{className:"text-[11px] font-semibold text-slate-400 font-brand",children:"Markdown Editor"}),k.jsx("textarea",{id:"markdown-input",value:u,onChange:d=>e(d.target.value),placeholder:"Type your markdown here...",rows:15,className:"w-full bg-slate-950 border border-slate-800 hover:border-slate-700/80 text-xs text-white placeholder:text-slate-700 rounded-lg px-3.5 py-3 outline-none transition-all focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 font-mono leading-relaxed resize-none custom-scrollbar"})]}),k.jsxs("div",{className:"flex flex-col gap-1.5",children:[k.jsxs("div",{className:"flex items-center justify-between",children:[k.jsx("label",{className:"text-[11px] font-semibold text-slate-400 font-brand",children:"HTML Preview"}),k.jsxs("div",{className:"flex bg-slate-950 border border-slate-800 rounded-lg p-0.5 text-[9px] font-semibold",children:[k.jsx("button",{type:"button",onClick:()=>o("dark"),className:`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${c==="dark"?"bg-slate-800 text-white":"text-slate-500"}`,children:"Dark Preview"}),k.jsx("button",{type:"button",onClick:()=>o("light"),className:`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${c==="light"?"bg-slate-200 text-slate-900":"text-slate-500"}`,children:"Light Preview"})]})]}),k.jsx("div",{className:`w-full h-[332px] p-4 border rounded-lg overflow-auto custom-scrollbar select-text ${c==="dark"?"bg-slate-950 border-slate-800 text-slate-200 prose prose-invert":"bg-white border-slate-200 text-slate-900 prose prose-slate"}`,style:{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",fontSize:"13px",lineHeight:"1.6"},dangerouslySetInnerHTML:{__html:t||"<p className='text-slate-500 italic'>HTML preview will appear here...</p>"}})]})]}),k.jsxs("div",{className:"mt-6 flex flex-col gap-2",children:[k.jsxs("div",{className:"flex items-center justify-between",children:[k.jsx("label",{className:"text-[11px] font-semibold text-slate-400 font-brand",children:"Generated HTML Source Code"}),k.jsx(ee,{onClick:p,variant:"secondary",size:"sm",disabled:!t.trim(),children:"Copy Code"})]}),k.jsx("pre",{className:"w-full h-48 bg-slate-950 border border-slate-800 hover:border-slate-700/80 rounded-lg px-4 py-3 text-emerald-400 text-xs font-mono overflow-auto custom-scrollbar",children:k.jsx("code",{children:t||"<!-- Generated HTML will appear here -->"})})]}),k.jsxs("div",{className:"mt-6 p-3 bg-emerald-950/20 border border-emerald-900/40 rounded-xl flex items-center gap-2.5 text-emerald-400",children:[k.jsx(O0,{className:"text-base flex-shrink-0"}),k.jsxs("p",{className:"text-[10px] leading-relaxed",children:[k.jsx("strong",{children:"Client-Side Security:"})," HTML parsing and DOM rendering is executed completely inside your browser sandbox. Output content is sanitized in real-time using DOMPurify to filter dangerous tags or scripts before rendering."]})]})]})})}export{uo as default};
