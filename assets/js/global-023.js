'use strict'
// Cookies
const Cookie = {
  initialiseCookieconsent: function () {
    window.cookieconsent.initialise({
      "palette": {
        "popup": {
          "background": "#003399"
        },
        "button": {
          "background": "#ffcc00",
          "text": "#222121"
        }
      },
      "revokable":false,
      "position": "bottom-right",
      "type": "opt-out",
      "content": {
        "message": "This website uses cookies to increase reach of the hackathon (analytics purposes).",
        "dismiss": "Allow cookies",
        "deny": "Decline",
        "href": "./privacy/#cookies"
      },
      onInitialise: function (status) {
        var type = this.options.type;
        var didConsent = this.hasConsented();

        if (type === 'opt-in' && didConsent) {
          // enable cookies
        }

        if (type === 'opt-in' && !didConsent) {
          // disable cookies
          document.__defineGetter__("cookie", function () { return ''; });
          document.__defineSetter__("cookie", function () { });
          $('.video-container-wrapper').html('<div style="border: 1px solid #cecece; border-radius: 10px; padding: 10px;"><p style="color: grey">Das Video findest du auf Youtube:<br> https://www.youtube.com/watch?v=vUQLwaRBj8Y</p><p style="color: grey"><em>Hinweis: Wir binden keine Youtube Videos ein, da du der Nutzung von Cookies widersprochen hast</em></p></div>')
        }
      },
      onStatusChange: function (status, chosenBefore) {
        location.reload()
      }
    });
    Cookie.registerOptInServices()
  },
  registerOptInServices: function () {
    if (Cookie.getCookieConsent('cookieconsent_status')) {
      var head = document.getElementsByTagName('head')[0];
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://www.googletagmanager.com/gtag/js?id=UA-163274606-1';
      head.appendChild(script);
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', 'UA-163274606-1');
    }
  },
  getCookieConsent: function (cookieName) {
    if (Cookie.getCookie(cookieName) == 'allow') return true;
    else return false
  },

  // get cookie
  getCookie: function (cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  },
}

window.onload = function () {
  Cookie.initialiseCookieconsent();
}


const CHALLENGE_DOMAINS = ['health', 'business', 'social', 'remote', 'finance', 'other']


// challenges: show selected
function changeChallenge(element) {
  // receives the menu element (div) with id <challenges-menu-xyz>
  let hits = ['1–8', '9–15', '16–22', '23–29', '30–36', 'the last']
  // no element passed -> get hash of url
  if (!element) {
    let currentDomain = 'health'  // fallback
    if (CHALLENGE_DOMAINS.indexOf(location.hash.substr(1, location.hash.length)) > 1) {
      currentDomain = location.hash.substr(1, location.hash.length)
    }
    element = document.getElementById('challenges-menu-'+currentDomain)
  }
  // add filter to all images that are in div class <category-image>
  // IE workaround
  let html_categories = document.getElementsByClassName('category');
  for (var i = 0; i < html_categories.length; i++) {
    html_categories[i].classList.add('not-selected');
    html_categories[i].getElementsByTagName('img')[0].classList.add('img-greyed');
    html_categories[i].getElementsByTagName('img')[0].classList.remove('img-selected');
  }
  element.classList.remove('not-selected');

  element.getElementsByTagName('img')[0].classList.remove('img-greyed');
  element.getElementsByTagName('img')[0].classList.add('img-selected');

  // to all sections with class <challenge-content> add d-none
  // IE workaround
  let html_challenge_content = document.getElementsByClassName('challenge-content');
  for (var i = 0; i < html_challenge_content.length; i++) {
    html_challenge_content[i].classList.add('d-none');
  }
  // remove d-none of element with id in attribute data-target-id
  let target_id = element.getAttribute('data-target-id')
  document.getElementById(target_id).classList.remove('d-none')
  window.history.pushState('object or string', 'Title', '#' + target_id);

  document.getElementById('challenges-navigation-counter').innerHTML = hits[CHALLENGE_DOMAINS.indexOf(target_id)]
  window.scrollTo(0, 0);
}


// blue blackground to selected meanu
(function () {
  // 'activate' menu item based on url
  let url = window.location.href
  if (url.indexOf('challenges') > -1) {
    resetMenuBar();
    activateMenuItem('.menu-challenges');
    if (url.indexOf('#health') > -1) { changeChallenge(document.getElementById('challenges-menu-health')) }
    else if (url.indexOf('#business') > -1) { changeChallenge(document.getElementById('challenges-menu-business')) }
    else if (url.indexOf('#social') > -1) { changeChallenge(document.getElementById('challenges-menu-social')) }
    else if (url.indexOf('#remote') > -1) { changeChallenge(document.getElementById('challenges-menu-education')) }
    else if (url.indexOf('#finance') > -1) { changeChallenge(document.getElementById('challenges-menu-finance')) }
    else if (url.indexOf('#other') > -1) { changeChallenge(document.getElementById('challenges-menu-other')) }

    // dont jump to anchor on challenges page
    if (location.hash) {
      setTimeout(function () {
        window.scrollTo(0, 0);
      }, 1);
    }

    // claculate position of horizontal scroll for domains: slected_challenge.x - scroller_container.x - 20 (margin)
    let selected_challenge = document.getElementsByClassName('img-selected')[0]
    let scroller = document.getElementById('challenges-menu-scroller')
    scroller.scrollLeft = selected_challenge.x - scroller.offsetLeft - 20;
  }
  else if (url.indexOf('agenda') > -1) { resetMenuBar(); activateMenuItem('.menu-agenda') }
  else if (url.indexOf('ambassadors') > -1) { resetMenuBar(); activateMenuItem('.menu-ambassadors') }
  else if (url.indexOf('partners') > -1) { resetMenuBar(); activateMenuItem('.menu-partners') }
  else if (url.indexOf('resources') > -1) { resetMenuBar(); activateMenuItem('.menu-resources') }
  else if (url.indexOf('press') > -1) { resetMenuBar(); activateMenuItem('.menu-press') }
  else if (url.indexOf('team') > -1) { resetMenuBar(); activateMenuItem('.menu-team') }
  else if (url.indexOf('faq') > -1) { resetMenuBar(); activateMenuItem('.menu-faq') }
  else if (url.indexOf('results') > -1) { resetMenuBar(); activateMenuItem('.menu-results') }
  else if (url.indexOf('nextsteps') > -1) { resetMenuBar(); activateMenuItem('.menu-nextsteps') }
  else if (url.indexOf('terms') > -1) { resetMenuBar(); }
  else if (url.indexOf('privacy') > -1) { resetMenuBar(); }
  else if (url.indexOf('terms') > -1) { resetMenuBar(); }
  else if (url.indexOf('imprint') > -1) { resetMenuBar(); }
  else if (url.indexOf('status') > -1) { resetMenuBar(); }
  else if (url.indexOf('statistics') > -1) { resetMenuBar(); }
  else { resetMenuBar(); activateMenuItem('.menu-hackathon'); }

  // add event listener
  if (url.indexOf('challenges') > -1) {
    document.getElementsByClassName('challenge-content')[0]
      .addEventListener('click', function (event) {
        // do something
      });
  }
})();

// mobile menu
function openNav() {
  document.getElementById('mobileNav').style.display = 'flex';
  document.getElementById('navbar-desktop').style.display = 'none';
  document.body.style.overflowY = 'hidden';
}

function closeNav() {
  document.getElementById('mobileNav').style.display = 'none';
  document.getElementById('navbar-desktop').style.display = 'block';
  document.body.style.overflowY = 'scroll';
}

function navigateChallenges(element) {
  // all domains
  let next_domain_index = 0  // default: first domain
  let next = false
  if (element.id.indexOf('next') > 1) next = true

  // get selected image and extract current select domain 
  let selected_domain_image = document.getElementsByClassName('img-selected')[0]
  //  iterate over domain names and find current domain name and index in list
  for (var i = 0; i < CHALLENGE_DOMAINS.length; i++) {
    if (selected_domain_image.id.indexOf(CHALLENGE_DOMAINS[i]) > -1) {
      let current_domain_name = CHALLENGE_DOMAINS[i]
      let current_domain_index = CHALLENGE_DOMAINS.indexOf(current_domain_name)
      // get previous or next domain
      if (next && current_domain_index < CHALLENGE_DOMAINS.length - 1) {
        next_domain_index = current_domain_index + 1
      }
      else if (!next && current_domain_index > 0) {
        next_domain_index = current_domain_index - 1
      }
      else if (!next && current_domain_index == 0) {
        next_domain_index = CHALLENGE_DOMAINS.length - 1
      }
      let next_domain_name = CHALLENGE_DOMAINS[next_domain_index]
      let next_domain_wrapper = document.getElementById('challenges-menu-' + next_domain_name)
      if (next_domain_wrapper) changeChallenge(next_domain_wrapper)
    }
  }
}

function resetMenuBar() {
  var menuItems = document.querySelectorAll('.menu-item')

  // IE workaround
  for (var i = 0; i < menuItems.length; i++) {
    menuItems[i].classList.remove('current-menu');
  }

}

function activateMenuItem(menuItem) {
  let menuItems = document.querySelectorAll(menuItem);

  // IE workaround
  for (var i = 0; i < menuItems.length; i++) {
    menuItems[i].classList.add('current-menu');
  }
}


// livestream stuff
function dismissWebinar() {
  var d = new Date;
  let offset_days = .125;
  d.setTime(d.getTime() + 24*60*60*1000*offset_days);
  document.cookie = 'dismisswebinar=dismiss;path=/;expires=' + d.toGMTString();
  document.getElementById('stream-container').style.display = 'none';
}
const STREAM_CARD_TEXTS = {
  title: 'Hackathon badge',
  date: '22 April 2020, 12:00 PM CEST',
  cta: 'Coming today',
  href: 'https://www.facebook.com/EUvsVirus/posts/108444284179296',
}
function setContextLive(stream_link, stream_time) {
  STREAM_CARD_TEXTS.title = 'Live Stream';
  STREAM_CARD_TEXTS.date = stream_time;
  STREAM_CARD_TEXTS.cta = 'Stay tuned';
  STREAM_CARD_TEXTS.href = '#';
}
function setContextBadge(badge_link) {
  STREAM_CARD_TEXTS.title = 'Hackathon badge';
  STREAM_CARD_TEXTS.date = '';
  STREAM_CARD_TEXTS.cta = 'Get your badge';
  STREAM_CARD_TEXTS.href = badge_link;
}
function getStreamCardContext() {
  var stream_now = new Date().getTime();

  // All in UTC time! UTC = CEST - 2
  // 22 April
  var ls21_s = new Date(Date.UTC(2020, 3, 22, 9, 45, 0)).getTime();
  var ls21_e = new Date(Date.UTC(2020, 3, 22, 10, 30, 0)).getTime();
  var ls22_s = new Date(Date.UTC(2020, 3, 22, 14, 45, 0)).getTime();
  var ls22_e = new Date(Date.UTC(2020, 3, 22, 15, 30, 0)).getTime();

  // 23 April
  var ls31_s = new Date(Date.UTC(2020, 3, 23, 9, 45, 0)).getTime();
  var ls31_e = new Date(Date.UTC(2020, 3, 23, 10, 30, 0)).getTime();
  var ls32_s = new Date(Date.UTC(2020, 3, 23, 14, 45, 0)).getTime();
  var ls32_e = new Date(Date.UTC(2020, 3, 23, 15, 30, 0)).getTime();

  // 24 April
  var ls41_s = new Date(Date.UTC(2020, 3, 24, 14, 45, 0)).getTime();
  var ls41_e = new Date(Date.UTC(2020, 3, 24, 16, 15, 0)).getTime();

  // 30 April, award ceremony
  var ls51_s = new Date(Date.UTC(2020, 3, 30, 8, 45, 0)).getTime();
  var ls51_e = new Date(Date.UTC(2020, 3, 30, 10, 15, 0)).getTime();

  // badge link, show for one week
  var badge_s = new Date(Date.UTC(2020, 4, 1, 8, 0, 0)).getTime();
  var badge_e = new Date(Date.UTC(2020, 4, 8, 12, 0, 0)).getTime();

  // links
  var ls21_link = 'https://www.facebook.com/EUvsVirus/posts/106308507726207';
  var ls22_link = 'https://www.facebook.com/EUvsVirus/posts/106866467670411';
  var ls31_link = 'https://www.facebook.com/EUvsVirus/posts/107554264268298';
  var ls32_link = 'https://www.facebook.com/EUvsVirus/posts/107555497601508';
  var ls41_link = 'https://www.facebook.com/EUvsVirus/posts/108444284179296';
  var ls51_link = 'https://www.facebook.com/EUvsVirus/posts/116610133362711';  // award ceremony
  var badge_link = 'https://euvsvirusbadges.azurewebsites.net/';

  // check if webinar is on (always 15 minutes earlier). If yes, set link and other banner content
  // if no set next webinar date
  if (ls21_s < stream_now && ls21_e > stream_now) { setContextLive(ls21_link, 'until 12:30 PM CEST'); }
  else if (ls22_s < stream_now && ls22_e > stream_now) { setContextLive(ls22_link, 'until 05:30 PM CEST'); }
  else if (ls31_s < stream_now && ls31_e > stream_now) { setContextLive(ls31_link, 'until 12:30 PM CEST'); }
  else if (ls32_s < stream_now && ls32_e > stream_now) { setContextLive(ls32_link, 'until 05:30 PM CEST'); }
  else if (ls41_s < stream_now && ls41_e > stream_now) { setContextLive(ls41_link, 'until 06:15 PM CEST'); }
  else if (ls51_s < stream_now && ls51_e > stream_now) { setContextLive(ls51_link, 'until 12:15 PM CEST'); }
  else if (badge_s < stream_now && badge_e > stream_now) { setContextBadge(badge_link); }
  else {
    // set new datetime of upcoming
    if ( stream_now > ls21_e ) {
      STREAM_CARD_TEXTS.date = '22 April 2020, 05:00 PM CEST';
      STREAM_CARD_TEXTS.href = ls22_link;
    }
    if ( stream_now > ls22_e ) {
      STREAM_CARD_TEXTS.date = '23 April 2020, 12:00 CEST';
      STREAM_CARD_TEXTS.href = ls31_link;
    }
    if ( stream_now > ls31_e ) {
      STREAM_CARD_TEXTS.date = '23 April 2020, 17:00 CEST';
      STREAM_CARD_TEXTS.href = ls32_link;
    }
    if ( stream_now > ls32_e ) { 
      STREAM_CARD_TEXTS.date = '24 April 2020, 17:00 CEST'; 
      STREAM_CARD_TEXTS.href = ls41_link;
    }
    if ( stream_now > ls41_e ) { 
      STREAM_CARD_TEXTS.date = '30 April 2020, 11:00 CEST'; 
      STREAM_CARD_TEXTS.href = ls51_link;
    }
    if (stream_now > ls51_e) {
      STREAM_CARD_TEXTS.date = '';
      STREAM_CARD_TEXTS.href = '#';
    }
    if ( stream_now > badge_e ) { STREAM_CARD_TEXTS.date = '-1'; }
}
}
(function () {
  if (Cookie.getCookie('dismisswebinar') != 'dismiss' && Cookie.getCookie('cookieconsent_status')) {
    // first assemble the context
    getStreamCardContext()
    const SHOW_TITLE = true;
    // then add the banner
    let webinar_banner_title = STREAM_CARD_TEXTS.title;
    let webinar_banner_date = STREAM_CARD_TEXTS.date;
    // no more scheduled
    if (webinar_banner_date == '-1') return

    // let webinar_banner_text = 'Follow the EU’s most important leaders and innovators in our free webinars.';
    let webinar_banner_text = 'The European Commission says thank you to every Hackathon participant for your contribution in these hard times.';
    webinar_banner_text += '<a href="';
    webinar_banner_text += STREAM_CARD_TEXTS.href;
    webinar_banner_text += '" target="_blank" rel="noreferrer" class="stream-button mt-3">';
    webinar_banner_text += STREAM_CARD_TEXTS.cta;
    webinar_banner_text += '</a>'

    // assemble banner
    let webinar_banner = '<div id="stream-container" class="stream-container"><div class="stream-card"><div class="stream-card-left"></div><div class="stream-card-right"><div><h3 style="font-size: 1.2rem;"'
    if (!SHOW_TITLE) webinar_banner += ' class="d-none"'
    webinar_banner += '>';
    webinar_banner += webinar_banner_title;
    webinar_banner += '</h3><p class="mt-1 stream-card-date">';
    webinar_banner += webinar_banner_date;
    webinar_banner += '</p><div><p class="mt-1" style="font-size: .9rem;">';
    webinar_banner += webinar_banner_text;
    webinar_banner += '</p></div></div><div><p class="stream-card-dismiss" onclick="dismissWebinar()">Dismiss</p></div></div></div></div>';
    var node = document.createElement('div');
    node.innerHTML = webinar_banner;
    document.body.appendChild(node)
    // document.getElementById('stream-outer').innerHTML = webinar_banner;
  }
})();


// Back to top button. Source: https://github.com/vfeskov/vanilla-back-to-top
function addBackToTop(){var o,t,e,n,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=i.backgroundColor,d=void 0===r?"#000":r,a=i.cornerOffset,c=void 0===a?20:a,s=i.diameter,l=void 0===s?56:s,u=i.ease,p=void 0===u?function(o){return.5*(1-Math.cos(Math.PI*o))}:u,m=i.id,h=void 0===m?"back-to-top":m,b=i.innerHTML,v=void 0===b?'<svg viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path></svg>':b,f=i.onClickScrollTo,x=void 0===f?0:f,w=i.scrollContainer,g=void 0===w?document.body:w,k=i.scrollDuration,y=void 0===k?100:k,T=i.showWhenScrollTopIs,M=void 0===T?1:T,z=i.size,E=void 0===z?l:z,C=i.textColor,L=void 0===C?"#fff":C,N=i.zIndex,I=void 0===N?1:N,A=g===document.body,B=A&&document.documentElement;o=Math.round(.43*E),t=Math.round(.29*E),e="#"+h+"{background:"+d+";-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%;bottom:"+c+"px;-webkit-box-shadow:0 2px 5px 0 rgba(0,0,0,.26);-moz-box-shadow:0 2px 5px 0 rgba(0,0,0,.26);box-shadow:0 2px 5px 0 rgba(0,0,0,.26);color:"+L+";cursor:pointer;display:block;height:"+E+"px;opacity:1;outline:0;position:fixed;right:"+c+"px;-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none;-webkit-transition:bottom .2s,opacity .2s;-o-transition:bottom .2s,opacity .2s;-moz-transition:bottom .2s,opacity .2s;transition:bottom .2s,opacity .2s;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:"+E+"px;z-index:"+I+"}#"+h+" svg{display:block;fill:currentColor;height:"+o+"px;margin:"+t+"px auto 0;width:"+o+"px}#"+h+".hidden{bottom:-"+E+"px;opacity:0}",(n=document.createElement("style")).appendChild(document.createTextNode(e)),document.head.insertAdjacentElement("afterbegin",n);var D=function(){var o=document.createElement("div");return o.id=h,o.className="hidden",o.innerHTML=v,o.addEventListener("click",function(o){o.preventDefault(),function(){var o="function"==typeof x?x():x,t=window,e=t.performance,n=t.requestAnimationFrame;if(y<=0||void 0===e||void 0===n)return q(o);var i=e.now(),r=j(),d=r-o;n(function o(t){var e=Math.min((t-i)/y,1);q(r-Math.round(p(e)*d)),e<1&&n(o)})}()}),document.body.appendChild(o),o}(),H=!0;function S(){j()>=M?function(){if(!H)return;D.className="",H=!1}():function(){if(H)return;D.className="hidden",H=!0}()}function j(){return g.scrollTop||B&&document.documentElement.scrollTop||0}function q(o){g.scrollTop=o,B&&(document.documentElement.scrollTop=o)}(A?window:g).addEventListener("scroll",S),S()}
addBackToTop({
  diameter: 52,
  backgroundColor: 'rgb(4, 36, 99)',
  cornerOffset: 44, // px
  textColor: '#fff',
  zIndex: 8
})
