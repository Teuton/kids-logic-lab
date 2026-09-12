export function navigate(hash){if(location.hash===hash)window.dispatchEvent(new HashChangeEvent('hashchange'));else location.hash=hash;}
export function currentRoute(){const raw=(location.hash||'#home').slice(1);const [pathPart]=raw.split('?');const [name,param]=pathPart.split('/');return{name:name||'home',param:param||null,raw};}
