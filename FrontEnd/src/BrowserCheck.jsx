import React, { useEffect } from 'react';

const BrowserCheck = () => {
    useEffect(() => {
        const isEdge = window.navigator.userAgent.indexOf("Edg") !== -1;
        const isFirefox = typeof InstallTrigger !== 'undefined';
        const isBrave = !!window.navigator.brave;
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        const isOpera = navigator.userAgent.indexOf('OPR/') > -1 || navigator.userAgent.indexOf('Opera') > -1;
        const isVivaldi = navigator.userAgent.indexOf("Vivaldi") !== -1;
        const isUCBrowser = navigator.userAgent.indexOf("UCBrowser") !== -1;
        const isYandexBrowser = navigator.userAgent.indexOf("YaBrowser") !== -1;
        const isMaxthon = navigator.userAgent.indexOf("Maxthon") !== -1;
        const isSamsungInternet = navigator.userAgent.indexOf("SamsungBrowser") !== -1;
    
        if (isEdge || isFirefox || isBrave || isSafari || isOpera || isVivaldi || isUCBrowser || isYandexBrowser || isMaxthon || isSamsungInternet) {
          alert("This application is only supported in Chrome browser for the best experience.");
          window.location.replace("about:blank"); // Replace the current page with a blank page
        }
      }, []);

  return null; // This component doesn't render anything
};

export default BrowserCheck;
