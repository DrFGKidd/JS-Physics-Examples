!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.decomp=e()}}(function(){return function e(f,o,n){function d(t,l){if(!o[t]){if(!f[t]){var u="function"==typeof require&&require;if(!l&&u)return u(t,!0);if(i)return i(t,!0);throw new Error("Cannot find module '"+t+"'")}var p=o[t]={exports:{}};f[t][0].call(p.exports,function(e){var o=f[t][1][e];return d(o?o:e)},p,p.exports,e,f,o,n)}return o[t].exports}for(var i="function"==typeof require&&require,t=0;t<n.length;t++)d(n[t]);return d}({1:[function(e,f,o){function n(e,f,o){o=o||0;var n,d,i,t,l,u,p,s=[0,0];return n=e[1][1]-e[0][1],d=e[0][0]-e[1][0],i=n*e[0][0]+d*e[0][1],t=f[1][1]-f[0][1],l=f[0][0]-f[1][0],u=t*f[0][0]+l*f[0][1],p=n*l-t*d,D(p,0,o)||(s[0]=(l*i-d*u)/p,s[1]=(n*u-t*i)/p),s}function d(e,f,o,n){var d=f[0]-e[0],i=f[1]-e[1],t=n[0]-o[0],l=n[1]-o[1];if(t*i-l*d===0)return!1;var u=(d*(o[1]-e[1])+i*(e[0]-o[0]))/(t*i-l*d),p=(t*(e[1]-o[1])+l*(o[0]-e[0]))/(l*d-t*i);return u>=0&&1>=u&&p>=0&&1>=p}function i(e,f,o){return(f[0]-e[0])*(o[1]-e[1])-(o[0]-e[0])*(f[1]-e[1])}function t(e,f,o){return i(e,f,o)>0}function l(e,f,o){return i(e,f,o)>=0}function u(e,f,o){return i(e,f,o)<0}function p(e,f,o){return i(e,f,o)<=0}function s(e,f,o,n){if(n){var d=F,t=G;d[0]=f[0]-e[0],d[1]=f[1]-e[1],t[0]=o[0]-f[0],t[1]=o[1]-f[1];var l=d[0]*t[0]+d[1]*t[1],u=Math.sqrt(d[0]*d[0]+d[1]*d[1]),p=Math.sqrt(t[0]*t[0]+t[1]*t[1]),s=Math.acos(l/(u*p));return n>s}return 0===i(e,f,o)}function c(e,f){var o=f[0]-e[0],n=f[1]-e[1];return o*o+n*n}function y(e,f){var o=e.length;return e[0>f?f%o+o:f%o]}function a(e){e.length=0}function m(e,f,o,n){for(var d=o;n>d;d++)e.push(f[d])}function r(e){for(var f=0,o=e,n=1;n<e.length;++n)(o[n][1]<o[f][1]||o[n][1]===o[f][1]&&o[n][0]>o[f][0])&&(f=n);return t(y(e,f-1),y(e,f),y(e,f+1))?!1:(w(e),!0)}function w(e){for(var f=[],o=e.length,n=0;n!==o;n++)f.push(e.pop());for(var n=0;n!==o;n++)e[n]=f[n]}function b(e,f){return u(y(e,f-1),y(e,f),y(e,f+1))}function g(e,f,o){var d,i,t=H,u=I;if(l(y(e,f+1),y(e,f),y(e,o))&&p(y(e,f-1),y(e,f),y(e,o)))return!1;i=c(y(e,f),y(e,o));for(var s=0;s!==e.length;++s)if((s+1)%e.length!==f&&s!==f&&l(y(e,f),y(e,o),y(e,s+1))&&p(y(e,f),y(e,o),y(e,s))&&(t[0]=y(e,f),t[1]=y(e,o),u[0]=y(e,s),u[1]=y(e,s+1),d=n(t,u),c(y(e,f),d)<i))return!1;return!0}function x(e,f,o){for(var n=0;n!==e.length;++n)if(n!==f&&n!==o&&(n+1)%e.length!==f&&(n+1)%e.length!==o&&d(y(e,f),y(e,o),y(e,n),y(e,n+1)))return!1;return!0}function j(e,f,o,n){var d=n||[];if(a(d),o>f)for(var i=f;o>=i;i++)d.push(e[i]);else{for(var i=0;o>=i;i++)d.push(e[i]);for(var i=f;i<e.length;i++)d.push(e[i])}return d}function v(e){for(var f=[],o=[],n=[],d=[],i=Number.MAX_VALUE,t=0;t<e.length;++t)if(b(e,t))for(var l=0;l<e.length;++l)if(g(e,t,l)){o=v(j(e,t,l,d)),n=v(j(e,l,t,d));for(var u=0;u<n.length;u++)o.push(n[u]);o.length<i&&(f=o,i=o.length,f.push([y(e,t),y(e,l)]))}return f}function h(e){var f=v(e);return f.length>0?k(e,f):[e]}function k(e,f){if(0===f.length)return[e];if(f instanceof Array&&f.length&&f[0]instanceof Array&&2===f[0].length&&f[0][0]instanceof Array){for(var o=[e],n=0;n<f.length;n++)for(var d=f[n],i=0;i<o.length;i++){var t=o[i],l=k(t,d);if(l){o.splice(i,1),o.push(l[0],l[1]);break}}return o}var d=f,n=e.indexOf(d[0]),i=e.indexOf(d[1]);return-1!==n&&-1!==i?[j(e,n,i),j(e,i,n)]:!1}function q(e){var f,o=e;for(f=0;f<o.length-1;f++)for(var n=0;f-1>n;n++)if(d(o[f],o[f+1],o[n],o[n+1]))return!1;for(f=1;f<o.length-2;f++)if(d(o[0],o[o.length-1],o[f],o[f+1]))return!1;return!0}function z(e,f,o,n,d){d=d||0;var i=f[1]-e[1],t=e[0]-f[0],l=i*e[0]+t*e[1],u=n[1]-o[1],p=o[0]-n[0],s=u*o[0]+p*o[1],c=i*p-u*t;return D(c,0,d)?[0,0]:[(p*l-t*s)/c,(i*s-u*l)/c]}function A(e,f,o,n,d,i,s){i=i||100,s=s||0,d=d||25,f="undefined"!=typeof f?f:[],o=o||[],n=n||[];var a=[0,0],r=[0,0],w=[0,0],g=0,j=0,v=0,h=0,k=0,q=0,B=0,C=[],D=[],E=e,F=e;if(F.length<3)return f;if(s++,s>i)return console.warn("quickDecomp: max level ("+i+") reached."),f;for(var G=0;G<e.length;++G)if(b(E,G)){o.push(E[G]),g=j=Number.MAX_VALUE;for(var H=0;H<e.length;++H)t(y(E,G-1),y(E,G),y(E,H))&&p(y(E,G-1),y(E,G),y(E,H-1))&&(w=z(y(E,G-1),y(E,G),y(E,H),y(E,H-1)),u(y(E,G+1),y(E,G),w)&&(v=c(E[G],w),j>v&&(j=v,r=w,q=H))),t(y(E,G+1),y(E,G),y(E,H+1))&&p(y(E,G+1),y(E,G),y(E,H))&&(w=z(y(E,G+1),y(E,G),y(E,H),y(E,H+1)),t(y(E,G-1),y(E,G),w)&&(v=c(E[G],w),g>v&&(g=v,a=w,k=H)));if(q===(k+1)%e.length)w[0]=(r[0]+a[0])/2,w[1]=(r[1]+a[1])/2,n.push(w),k>G?(m(C,E,G,k+1),C.push(w),D.push(w),0!==q&&m(D,E,q,E.length),m(D,E,0,G+1)):(0!==G&&m(C,E,G,E.length),m(C,E,0,k+1),C.push(w),D.push(w),m(D,E,q,G+1));else{if(q>k&&(k+=e.length),h=Number.MAX_VALUE,q>k)return f;for(var H=q;k>=H;++H)l(y(E,G-1),y(E,G),y(E,H))&&p(y(E,G+1),y(E,G),y(E,H))&&(v=c(y(E,G),y(E,H)),h>v&&x(E,G,H)&&(h=v,B=H%e.length));B>G?(m(C,E,G,B+1),0!==B&&m(D,E,B,F.length),m(D,E,0,G+1)):(0!==G&&m(C,E,G,F.length),m(C,E,0,B+1),m(D,E,B,G+1))}return C.length<D.length?(A(C,f,o,n,d,i,s),A(D,f,o,n,d,i,s)):(A(D,f,o,n,d,i,s),A(C,f,o,n,d,i,s)),f}return f.push(e),f}function B(e,f){for(var o=0,n=e.length-1;e.length>3&&n>=0;--n)s(y(e,n-1),y(e,n),y(e,n+1),f)&&(e.splice(n%e.length,1),o++);return o}function C(e,f){for(var o=e.length-1;o>=1;--o)for(var n=e[o],d=o-1;d>=0;--d)E(n,e[d],f)&&e.splice(o,1)}function D(e,f,o){return o=o||0,Math.abs(e-f)<=o}function E(e,f,o){return D(e[0],f[0],o)&&D(e[1],f[1],o)}f.exports={decomp:h,quickDecomp:A,isSimple:q,removeCollinearPoints:B,removeDuplicatePoints:C,makeCCW:r};var F=[],G=[],H=[],I=[]},{}]},{},[1])(1)});

var letters= {
  "A":[
    {x:0, y:	67.41,isInternal:false},
    {x:36.58, y:	0,isInternal:false},
    {x:73.17, y:	66.73,isInternal:false},
    {x:56.23, y:	67.07,isInternal:false},
    {x:36.58, y:	34.55,isInternal:false},//internal
    {x:30.15, y:  46.07,isInternal:false},//internal
    {x:43.02, y:	46.07,isInternal:false},//internal
    {x:49.80, y:	55.22,isInternal:false},
    {x:23.37, y:	55.55,isInternal:false},
    {x:16.94 ,y:	67.41,isInternal:false},
  ],
  "1":[
    {x:7.64,y:	66.01},
    {x:7.64,y:	11.12},
    {x:0.00,y:	10.77},
    {x:0.00,y:	0.00},
    {x:22.93,y:	0.00},
    {x:22.93,y:	66.35},
  ],
  "2":[
    {x:14.59,y:	21.54},
    {x:0.69,y:	12.85},
    {x:7.30,y:	4.86},
    {x:19.80	,y:0.00},
    {x:31.96	,y:1.04},
    {x:40.65	,y:6.25},
    {x:45.86	,y:15.29},
    {x:46.55	,y:24.32},
    {x:44.81	,y:30.92},
    {x:41.34	,y:37.52},
    {x:29.53	,y:52.46},
    {x:49.33	,y:52.81},
    {x:49.33	,y:67.74},
    {x:0.00	,y:67.74},
    {x:27.44	,y:32.66},
    {x:30.92	,y:24.32},
    {x:29.18	,y:17.37},
    {x:23.28	,y:14.94},
    {x:18.06	,y:16.33},
  ],
  "3":[
    {x:0.35,y:	12.16},
    {x:15.29	,y:1.04},
    {x:27.44	,y:0.00},
    {x:36.13	,y:2.78},
    {x:42.73	,y:8.69},
    {x:45.51	,y:18.06},
    {x:44.81	,y:25.36},
    {x:39.26	,y:32.31},
    {x:43.77	,y:35.78},
    {x:47.25	,y:41.34},
    {x:48.29	,y:46.55},
    {x:47.59	,y:54.89},
    {x:43.43,y:61.84},
    {x:37.87	,y:66.01},
    {x:28.14	,y:69.13},
    {x:17.72	,y:68.79},
    {x:8.69	,y:65.66},
    {x:2.78	,y:61.49},
    {x:0.00	,y:58.71},
    {x:10.77	,y:47.94},
    {x:14.24	,y:51.42},
    {x:20.15	,y:54.19},
    {x:27.79,y:	53.15},
    {x:31.61	,y:47.94},
    {x:30.57	,y:42.38},
    {x:26.06	,y:39.95},
    {x:15.98	,y:39.26},
    {x:15.98	,y:27.79},
    {x:26.06	,y:27.10},
    {x:29.88	,y:22.93},
    {x:29.53	,y:18.06},
    {x:26.40	,y:14.24},
    {x:21.89	,y:13.55},
    {x:16.68,y:14.59},
    {x:11.81	,y:19.11},
  ],
  "4":[
    {x:42.04,y:	0.35},
    {x:42.38,y:	27.10},
    {x:50.37,y:	27.10},
    {x:50.72,y:	40.65},
    {x:42.38,y:	40.30},
    {x:42.38,y:	67.05},
    {x:26.75,y:	67.05},
    {x:26.75,y:	40.65},
    {x:0.00	,y:40.65},
    {x:0.00	,y:0.00},
    {x:15.63,y:	0.00},
    {x:15.98,y:	27.10},
    {x:26.40,y:	27.10},
    {x:26.75,y:	0.00},
  ],
  "5":[
    {x:4.17,y:	0.00},
    {x:38.21,y:	0.35},
    {x:38.21,y:	15.29},
    {x:19.45,y:	15.29},
    {x:19.45,y:	21.19},
    {x:26.06,y:	21.19},
    {x:34.74,y:	23.97},
    {x:42.73,y:	31.61},
    {x:45.86,y:	42.04},
    {x:45.16,y:	50.03},
    {x:40.99,y:	58.71},
    {x:33.70,y:	64.96},
    {x:22.93,y:	68.09},
    {x:11.81,y:	67.05},
    {x:0.00	,y:61.49},
    {x:8.34	,y:47.59},
    {x:12.85,y:	51.76},
    {x:20.84,y:	53.15},
    {x:28.14,y:	47.59},
    {x:27.79,y:	38.56},
    {x:21.54,y:	34.05},
    {x:12.51,y:	33.70},
    {x:4.17,y:	36.13},
  ],
  "6":[
    {x:22.93,y:	24.67},
    {x:32.31,y:	23.62},
    {x:42.38,y:	28.83},
    {x:47.94,y:	38.91},
    {x:48.29,y:	49.68},
    {x:44.12,y:	60.10},
    {x:30.92,y:	68.79},
    {x:15.63,y:	67.74},
    {x:6.60,y:	62.19},
    {x:1.74	,y:53.85},
    {x:0.00,y:41.69},
    {x:4.86	,y:25.36},
    {x:10.77,y:	16.33},
    {x:25.01,y:	0.00},
    {x:44.47,y:	0.35},
    {x:38.21,y:	6.95},
    {x:29.53,y:	15.63},
    {x:24.67,y:	21.89},
    {x:16.33,y:	40.65},
    {x:15.63,y:	46.55},
    {x:20.15,y:	53.15},
    {x:28.14,y:	53.50},
    {x:33.00,y:	47.25},
    {x:32.31,y:	41.34},
    {x:28.83,y:	37.17},
    {x:21.89,y:	36.48},
    {x:16.68,y:	40.30},
  ],
  "7":[
    {x:0.00,y:	0.35},
    {x:44.47,y:	0.00},
    {x:22.58,y:	66.70},
    {x:4.86,y:	66.70},
    {x:23.28,y:	14.94},
    {x:0.00,y:	15.63},
    {x:0.00	,y:15.29},
  ],
  "8":[
    {x:23.28,y:	33.00},
    {x:9.03,y:	33.70},
    {x:3.13,y:	27.44},
    {x:1.39,y:	17.02},
    {x:4.17,y:	8.69},
    {x:10.42,y:	3.13},
    {x:22.23,y:	0.00},
    {x:36.13,y:	3.13},
    {x:43.77,y:	11.46},
    {x:45.51,y:	19.11},
    {x:44.12,y:	26.06},
    {x:42.04,y:	29.88},
    {x:38.21,y:	33.00},
    {x:44.47,y:	38.56},
    {x:47.25,y:	45.51},
    {x:47.25,y:	53.15},
    {x:44.47,y:	59.75},
    {x:38.91,y:	65.31},
    {x:33.35,y:	68.09},
    {x:26.06,y:	69.48},
    {x:18.06,y:	69.13},
    {x:9.03,y:	66.01},
    {x:2.78,y:	60.10},
    {x:0.00,y:	53.15},
    {x:0.00,y:	46.20},
    {x:2.08,y:	40.65},
    {x:9.03,y:	34.05},
    {x:23.28,y:	33.70},
    {x:23.28,y:	39.60},
    {x:18.06,y:	42.73},
    {x:15.29,y:	46.90},
    {x:16.68,y:	52.81},
    {x:23.62,y:	55.93},
    {x:30.92,y:	52.46},
    {x:30.92,y:	44.81},
    {x:27.10,y:	41.34},
    {x:23.62,y:	39.60},
    {x:23.62,y:	25.71},
    {x:28.49,y:	22.58},
    {x:29.53,y:	16.68},
    {x:25.01,y:	13.90},
    {x:20.15,y:	14.24},
    {x:17.02,y:	18.76},
    {x:19.11,y:	22.93},
    {x:22.93,y:	25.71},
  ],
  "9":[
    {x:24.67,y:	43.77},
    {x:18.41,y:	44.81},
    {x:8.34	,y:41.69},
    {x:2.08,y:	34.39},
    {x:0.00	,y:27.79},
    {x:0.35,y:17.37},
    {x:3.82,y:	9.03},
    {x:10.77,y:	2.78},
    {x:19.80,y:	0.00},
    {x:30.22,y:	0.69},
    {x:39.26,y:	4.86},
    {x:44.81,y:	10.77},
    {x:47.94,y:	18.76},
    {x:47.94,y:	27.79},
    {x:46.55,y:	35.44},
    {x:42.38,y:	44.47},
    {x:22.93,y:	67.74},
    {x:3.13,y:	67.74},
    {x:19.11,y:	51.42},
    {x:25.01,y:	43.77},
    {x:32.31,y:	26.40},
    {x:30.92,y:	18.06},
    {x:25.36,y:	14.59},
    {x:16.68,y:	18.06},
    {x:15.63,y:	26.06},
    {x:19.45,y:	31.27},
    {x:25.71,y:	32.31},
    {x:31.96,y:	27.44},
  ],
  "0":[
    {x:24.32,y:	0.00},
    {x:31.61,y:	1.39},
    {x:39.95,y:	6.60},
    {x:44.12,y:	12.16},
    {x:46.90,y:	20.50},
    {x:48.64,y:	30.92},
    {x:48.64,y:	39.95},
    {x:46.90,y:	50.37},
    {x:43.43,y:	58.71},
    {x:38.91,y:	64.27},
    {x:30.92,y:	68.79},
    {x:24.32,y:	69.83},
    {x:13.20,y:	67.05},
    {x:7.30	,y:61.84},
    {x:2.78	,y:53.15},
    {x:0.35	,y:42.73},
    {x:0.00	,y:34.39},
    {x:0.69	,y:25.71},
    {x:2.78	,y:17.37},
    {x:6.60	,y:9.38},
    {x:12.85,y:	3.13},
    {x:19.45,y:	0.69},
    {x:23.97,y:	0.00},
    {x:23.97,y:	14.94},
    {x:20.50,y:	16.33},
    {x:17.02,y:	21.19},
    {x:15.63,y:	30.22},
    {x:15.63,y:	39.26},
    {x:16.33,y:	46.20},
    {x:19.11,y:	52.46},
    {x:23.62,y:	54.54},
    {x:28.49,y:	53.15},
    {x:31.96,y:	46.90},
    {x:33.00,y:	37.87},
    {x:33.00,y:	28.14},
    {x:31.61,y:	21.89},
    {x:29.18,y:	17.37},
    {x:24.67,y:	14.94},
  ],
  "a":[
    {x:40.13,y:	48.21},
    {x:34.56,y:	50},
    {x:28.98,y:	50},
    {x:19.51,y:	50},
    {x:10.59,y:	45.98},
    {x:4.46,y:	39.85},
    {x:0.84,y:	32.61},
    {x:0.00,y:	24.25},
    {x:1.67,y:	16.44},
    {x:6.41,y:	9.20},
    {x:14.49,y:	3.07},
    {x:24.80,y:	0.00},
    {x:36.23,y:	1.11},
    {x:43.47,y:	4.74},
    {x:49.60,y:	10.31},
    {x:54.06,y:	18.95},
    {x:54.90,y:	25.36},
    {x:54.90,y:	50},
    {x:40.13,y:	50},
    {x:39.85,y:	28.15},
    {x:39.29,y:	21.74},
    {x:34.56,y:	15.88},
    {x:27.31,y:	13.66},
    {x:20.06,y:	16.16},
    {x:15.88,y:	21.46},
    {x:15.05,y:	27.87},
    {x:18.95,y:	34.00},
    {x:25.08,y:	37.34},
    {x:31.49,y:	37.06},
    {x:36.79,y:	33.44},
    {x:39.85,y:	28.43},
  ],
  "m":[
    {x:0.00,y:	49.88},
    {x:0.00,y:	21.74},
    {x:0.56,y:	15.33},
    {x:3.07,y:	8.64},
    {x:7.52	,y:3.62},
    {x:14.49,y:	0.56},
    {x:21.74,y:	0.00},
    {x:29.26,y:	1.11},
    {x:34.83,y:	3.90},
    {x:40.97,y:	1.11},
    {x:47.65,y:	0.00},
    {x:54.34,y:	0.84},
    {x:60.75,y:	3.07},
    {x:65.77,y:	7.25},
    {x:68.56,y:	13.10},
    {x:69.39,y:	19.51},
    {x:69.67,y:	49.88},
    {x:54.62,y:	49.88},
    {x:54.62,y:	20.62},
    {x:53.23,y:	16.16},
    {x:48.77,y:	13.66},
    {x:44.31,y:	15.33},
    {x:42.36,y:	19.79},
    {x:42.36,y:	25.92},
    {x:42.36,y:	49.88},
    {x:27.03,y:	49.88},
    {x:27.31,y:	20.90},
    {x:26.20,y:	16.44},
    {x:22.85,y:	13.66},
    {x:18.39,y:	14.21},
    {x:15.61,y:	17.56},
    {x:15.05,y:	22.29},
    {x:15.05,y:	49.88},
],
"F":[
    {x:0.00,y:	66.39},
    {x:0.00,y:	0.00},
    {x:40.31,y:	0.00},
    {x:40.31,y:	14.23},
    {x:16.60,y:	14.23},
    {x:16.26,y:	25.41},
    {x:29.47,y:	25.74},
    {x:33.20,y:	39.63},
    {x:16.60,y:	39.63},
    {x:16.26,y:	66.39},
],
"=":[
  {x:0 ,y:0},
  {x:45 ,y:0},
  {x:45 ,y:30},
  {x:0 ,y:30},
  {x:0 ,y:20},
  {x:44.9 ,y:20},
  {x:44.9 ,y:10},
  {x:0 ,y:10},
]
}


var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composites = Matter.Composites,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite,
    Collision = Matter.Collision,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Query = Matter.Query,
    Vector = Matter.Vector,
    Vertices = Matter.Vertices,
    Events = Matter.Events;

var engine,
  world,
  runner,
  decomp,
  ground,
  scoreBoard,
  boxes = [],
  listOfColors,
  bgColor=51,
  font;

class Ball {
  constructor(x,y,radius,options,callbacks) {
    this.body = Bodies.circle(x,y,radius,options)
    Composite.add(world,this.body)
    this.radius = radius
    this.draw = true
    this.callbacks = callbacks || []
  }
  show() {
    if(this.draw) {
      let pos = this.body.position
      push();
      translate(pos.x,pos.y)
      rectMode(CENTER)
      circle(0,0,this.radius*2)
      pop()
      for (var c = 0;c<this.callbacks.length;c++) {
        this.callbacks[c](this)
      }
    }
  }
  remove() {
    Composite.remove(world,this.body)
    this.draw = false
  }
}
class Box {
  constructor(x,y,w,h,options) {
    this.body = Bodies.rectangle(x,y,w,h,options)
    Composite.add(world,this.body)
    this.w = w;
    this.h = h;
    this.color = listOfColors[1]//int(random(0, listOfColors.length))]
    this.draw=true
  }
  show(ang) {
    var pos = this.body.position
    var angle = ang || this.body.angle
    if (this.draw) {
      push();
      fill(this.color);
      translate(pos.x,pos.y);
      rotate(angle);
      rectMode(CENTER);
      rect(0,0,this.w,this.h)
      pop();
    }
  }
  remove() {
    Composite.remove(world,this.body)
    this.draw = false
  }
}
class ComboBox {
  constructor(bodies,options) {
    this.bodies = bodies
    this.parts = []
    for (var i = 0; i<bodies.length; i++) {
      this.parts.push(bodies[i].body)
      Composite.remove(world,bodies[i].body)
    }
    this.body = Body.create({parts:this.parts})
    Composite.add(world,this.body)
    this.draw = true
  }
  show() {
    if (this.draw) {
      for (var i = 0; i<this.bodies.length; i++) {this.bodies[i].show(this.body.angle)}
    }
  }
  remove() {
    Composite.remove(world,this.body)
    this.draw = false
  }
}
class Spring {
  constructor(options) {
    this.body = Constraint.create(options)
    this.options = options
    this.draw = true
    this.length = this.options["length"]
    Composite.add(world,this.body)
    if ((options["bodyA"] || false) && (options["bodyB"] || false)) {this.twoBody = true}
    else {
      if (options["bodyA"] || false) {
        this.oneBody=options["bodyA"].position;
        this.bodyPt =options["pointA"] || {x:0,y:0}
        this.otherPt = options["pointB"]
      } else {
        this.oneBody = options["bodyB"].position;
        this.bodyPt = options["pointB"] || {x:0,y:0}
        this.otherPt = options["pointA"]
      }
    }
  }
  show() {
    if (this.draw) {
      push()
        if (this.length==0) {
          let pos = this.options["pointB"]
          circle(pos.x,pos.y,5)
        } else if (this.length>0) {
          stroke(255)
          strokeWeight(3)
          if (this.twoBody) {
            let bodyApos=this.options.bodyA.position
            let bodyBpos=this.options.bodyB.position
            let ptA = this.options.pointA
            let ptB = this.options.pointB
            line(bodyApos.x+ptA.x,bodyApos.y+ptA.y,bodyBpos.x+ptB.x,bodyBpos.y+ptB.y)
          } else {
            line(this.oneBody.x+this.bodyPt.x,this.oneBody.y+this.bodyPt.y,this.otherPt.x,this.otherPt.y)
          }
        }
      pop()
    }

  }
  remove() {
    this.draw = false
    Composite.remove(world,this.body)
  }
}
class Catapult {
  constructor(position,options) {
    this._position = position
    if (Object.keys(options).length>0) {
      for (const key in options) {
        this.initialize(key,options[key])
      }
    }
    if (this._center === undefined) {this.initialize("center",this.width/2)};
    if (this._offset === undefined) {this.initialize("offset",0)};
    this.built = false
    this.draw = true
    this.build()
  };
  initialize(key,value) {
    this["_"+key] = value
    Object.defineProperty(this, key,{
      get() {return this["_"+key];},
      set(newValue) {this["_"+key] = newValue;},
      enumerable: true,
      configurable: true,
    })
  };
  build() {
    if (this.built) {
      this.remove();
      this.draw=true
    }
    let plank = new Box(this._position.x-this.width/2,this._position.y+this.offset,this.width,this.height)
    let cup = new Box(this._position.x-this.width+this.height/2,this._position.y+this.offset-35+this.height/2,this.height,30)
    let arm = new ComboBox([plank,cup])
    let options = {
      bodyA: arm.body,
      pointA: {x:this.center,y:0},
      pointB: {x:this._position.x+this.center,y:this._position.y+this.offset},
      stiffness: 1,
      length:0
    }
    let hinge = new Spring(options)
    let options2 = {
      bodyA: arm.body,
      pointA:{x:this.width/2,y:0},
      pointB:{x:this._position.x+this.width/2,y:this._position.y+60},
      stiffness: 0.01,
      length:60-this.offset
    }
    let spring = new Spring(options2)
    this.bodies = [arm,hinge,spring]
    this.built = true
  }
  show() {
    if (this.draw) {
      for (var i=0;i<this.bodies.length;i++) {this.bodies[i].show()}
    }
  }
  remove() {
    this.draw = false
    for (var i=0;i<this.bodies.length;i++) {this.bodies[i].remove()}
  }
};
class Slider {
  constructor(key,object,position,options) {
    this.key = key;
    this.object = object;
    this.currently_clicked = false;
    if (Object.keys(options).length>0) {
      for (const key in options) {
        this.initialize(key,options[key])
      }
    }
    if (this._offset === undefined) {this.initialize("offset",0)};
    if (this._scale === undefined) {this.initialize("scale",1)};
    this.oldPos = position.x+this._offset;
    this.slider = new Box(position.x+this._offset,position.y,100,20,{
      isStatic: true,
      label: "slider",
      collisionFilter: {group:-1}
    })
    this.body = this.slider.body
    Composite.add(world,this.body)
  };
  initialize(key,value) {
    this["_"+key] = value
    Object.defineProperty(this, key,{
      get() {return this["_"+key];},
      set(newValue) {this["_"+key] = newValue;},
      enumerable: true,
      configurable: true,
    })
  };
  being_clicked() {
    if (!clicking) {
      this.currently_clicked = false
      return false
    }
    if (this.currently_clicked) {return true}
    let maxBounds = this.body.bounds.max
    let minBounds = this.body.bounds.min
    if ((mouseX>minBounds.x && mouseX<maxBounds.x) && (mouseY>minBounds.y && mouseY<maxBounds.y)) {
      this.currently_clicked = true
      return true
    }
    return false
  }
  update() {
    let sliderDelta = this.body.position.x - this.oldPos
    this.oldPos = this.body.position.x
    if (sliderDelta != 0) {
      this.object[this.key]+=(sliderDelta)*this.scale
      this.object.build();
    }
  }
  show() {
    this.slider.show()
    if (this.being_clicked()) {
      Body.translate(this.body,{x:mouseX-this.body.position.x,y:0})
      sliderClicked = true
      this.update()
    }
  }
}
class Letter {
  constructor(x,y,letter,options) {
    this.letter = letter
    this.body = Bodies.fromVertices(x,y,letters[letter])//Vertices.fromPath(letters[letter]))
    Body.setPosition(this.body,{x:x,y:y})
    if(options.isStatic) {Body.setStatic(this.body,true)}
    Composite.add(world,this.body)
    this.draw = true
    this.bottom = this.body.bounds.max.y
  }
  show() {
    if (this.draw) {
      let parts = this.body.parts
      push()
      let pos = this.body.position
      for (var j=1;j<parts.length;j++) {
        let verts = parts[j].vertices
        beginShape();
        fill(255,0,0);
        noStroke();
        for (var i=0;i<verts.length;i++) {vertex(verts[i].x,verts[i].y)}
        endShape(CLOSE);
      }
      pop()
    }
  }
  remove() {
    Composite.remove(world,this.body)
    this.draw = false
  }
}
class Word {
  constructor(x,y,letters,options) {
    this.letters = []
    let addX = 0
    let bot = 0
    for (var i = 0;i<letters.length;i++) {

      let newLetter = new Letter(x+addX,y,letters[i],options)
      if (i==0) {bot = newLetter.bottom } else {
        let ypos = newLetter.body.position.y
        let delta = newLetter.bottom-bot
        Body.setPosition(newLetter.body,{x:x+addX,y:ypos-delta})
      }
      this.letters.push(newLetter)
      addX += Math.max(60,newLetter.body.bounds.max.x-newLetter.body.bounds.min.x)
    }
  }
  show() {
    for (var i=0;i<this.letters.length;i++) {
      this.letters[i].show()
    }
  }
  remove() {
    for (var i=0;i<this.letters.length;i++) {
      this.letters[i].remove()
    }
  }
}
function setup() {
  createCanvas(1300,600)
  listOfColors = [color('#A908B5'), color('#FF8000'), color('#00FFFF'), color('#FFFF00'), color('#FF00FF'), color('#FFFFFF'), color('#66ff00')];
  engine = Engine.create();
  world = engine.world;
  runner = Runner.create();
  Runner.run(runner, engine)
  var mouse = Mouse.create(),
      mouseConstraint = MouseConstraint.create(engine, {
          mouse: mouse,
          constraint: {
              stiffness: 0.2,
          }
      });
  Composite.add(world, mouseConstraint);
  //Add in the important stuff for this example.
  var initial_position = {x:400,y:540};
  options = {
    isStatic: true
  }
  ground = Bodies.rectangle(width/2, height+25, width, 50, options);
  options = {
    height: 20,
    width:320,
    offset:0,
    center:0,
  }
  scoreBoard = new Word(40,40,"0",{isStatic:true})
  const catapult = new Catapult(initial_position,options)
  const slider = new Slider("center",catapult,{x:400,y:50},{scale:.2,offset:0})
  const slider2 = new Slider("offset",catapult,{x:400,y:100},{scale:.1,offset:0})
  const slider3 = new Slider("width",catapult,{x:400,y:150},{scale:.1,offset:0})
  objects = [catapult,slider,slider2,slider3,scoreBoard]
  Composite.add(world,[ground]);
  for (var i=0; i<objects.length; i++) {boxes.push(objects[i])}
  Events.on(engine, 'afterUpdate', function(event) {
    if (score != oldScore) {
      scoreBoard.remove()
      scoreBoard = new Word(40,40,String(Math.abs(score)),{isStatic:true})
      boxes.push(scoreBoard)
    }
  });

}
var dragging = false,
    clicking = false,
    sliderClicked = false,
    bigBall,
    ball,
    score=0,
    oldScore=0;


function mousePressed() {
  clicking = true
}
function updateScore(object) {
  let pos = object.body.position
  if (600-pos.y<object.radius) {
    oldScore = score
    score = Math.floor(pos.x-800)
    if (score<0) {score = 0}
    object.remove()

  }
}
function keyPressed() {
  if (keyCode === 32) {
    try{bigBall.remove()} catch {pass =""}
    let filters = [-1, -1, -1, -1, -1, 1, 1, 1, 1, 1]
    let cFilter = filters[Math.floor(Math.random()*10)]
    console.log(cFilter)
    bigBall = new Ball(mouseX,mouseY,50,{density:.1, collisionFilter: {group:cFilter}})
    boxes.push(bigBall)
  }
  if (keyCode === 66) {
    try{ball.remove()} catch {pass =""}
    ball = new Ball(mouseX,mouseY,10,{density:.0001},[updateScore])
    boxes.push(ball)
  }
}
function mouseReleased() {
  dragging = false;
  clicking = false;
  sliderClicked = false;
}

function draw() {
  background(bgColor);
  for (var i=0;i<boxes.length; i++) {boxes[i].show()}

}