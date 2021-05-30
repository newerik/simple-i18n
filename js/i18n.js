const i18n = (() => {
  // https://www.w3schools.com/js/js_cookies.asp
  function setI18nCookie(langCode) {
    // https://www.w3schools.com/jsref/jsref_obj_date.asp
    const d = new Date();
    // it will expire one year later
    d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000);
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
    document.cookie = `i18n=${langCode};expires=${d.toUTCString()};path=/;SameSite=Lax`;
  }

  function getI18nCookie() {
    var name = "i18n=";
    // https://www.w3schools.com/jsref/jsref_split.asp
    var cookies = document.cookie.split(";");
    // https://www.w3schools.com/jsref/jsref_find.asp
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
    const cookie = cookies.find((cookie) => cookie.trim().startsWith(name));
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring
    // https://mariusschulz.com/blog/the-and-and-or-operators-in-javascript
    return cookie && cookie.substring(name.length, cookie.length);
  }

  const settings = {
    dataAttr: "lang",
    langCode: "hu",
  };

  const dictionary = {};

  const setLang = (langCode) => {
    setI18nCookie(langCode);
    settings.langCode = langCode;
    // https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
    document.querySelectorAll(`[data-${settings.dataAttr}]`).forEach((elem) => {
      const label = elem.dataset[settings.dataAttr];
      if (settings.langCode in dictionary) {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get
        const text = dictionary[settings.langCode].get(label);
        if (text) elem.innerHTML = text;
      }
    });
  };

  return {
    init: (dataAttr, defaultLang) => {
      settings.dataAttr = dataAttr || settings.dataAttr;
      settings.langCode = getI18nCookie() || defaultLang || settings.langCode;
      setLang(settings.langCode);
    },
    addLocale: (lang, dictJSON) => {
      // https://javascript.info/map-set
      dictionary[lang] = new Map(dictJSON);
    },
    getLangCode: () => settings.langCode,
    setLang,
  };
})();
