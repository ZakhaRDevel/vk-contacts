(function () {
  var MAIN_COUNTER = 23410183;
  var PROJECT_COUNTER = 103405696; // замените на нужный для вашего проекта

  window.dataLayer = window.dataLayer || [];
  window.siteInfo = window.siteInfo || {};

  function buildSiteInfo(event) {
    // Пример построения siteInfo для Custom event
    var siteInfo = { "Custom event": {} };
    var category = "";
    var action = "";
    var label = "";
    var eventId = "";
    var userParams = {};

    // Категория события
    if (event.event === "addEvents_makeEcommerce") {
      category = (event.constant_project_STORE || "") + " / ECOMMERCE";
      action =
        "ecommerceStep / [" +
        (event.event_cat || "") +
        "] / " +
        (event.event_name || "");
    } else if (event.event === "addEvents_useNavigations") {
      category = (event.constant_project_STORE || "") + " / NAVIGATIONS";
      action =
        "useNavigations / [" +
        (event.event_cat || "") +
        "] / " +
        (event.event_name || "");
    } else if (event.event === "addEvents_makeActions") {
      category = (event.constant_project_STORE || "") + " / ACTIONS";
      action =
        "makeActions / [" +
        (event.event_cat || "") +
        "] / " +
        (event.event_name || "");
    } else if (event.event === "addEvents_makeConversions") {
      category = (event.constant_project_STORE || "") + " / CONVERSIONS";
      action =
        "conversionStep / [" +
        (event.event_cat || "") +
        "] / " +
        (event.event_name || "");
    }
    label = event.event_param || "";
    eventId = event.event_id || "";
    try {
      userParams = event.JSONInfo ? JSON.parse(event.JSONInfo) : {};
    } catch (e) {
      userParams = {};
    }
    // ecommerce поддержка
    var ecom = event.ecommerce ? JSON.stringify(event.ecommerce) : "";
    var store = JSON.stringify({
      h_PagePathFull: window.location.href,
      constant_project_STORE: event.constant_project_STORE || "",
      hitID: getYmUid() + "." + Date.now(),
    });
    var eventObj = {};
    if (ecom) {
      eventObj[store] = ecom;
    } else if (Object.keys(userParams).length) {
      eventObj[store] = { "": JSON.stringify(userParams) };
    } else {
      eventObj[store] = {};
    }
    if (category && action && label && eventId) {
      if (!siteInfo["Custom event"][category])
        siteInfo["Custom event"][category] = {};
      if (!siteInfo["Custom event"][category][action])
        siteInfo["Custom event"][category][action] = {};
      if (!siteInfo["Custom event"][category][action][label])
        siteInfo["Custom event"][category][action][label] = {};
      siteInfo["Custom event"][category][action][label][eventId] = eventObj;
    }
    return siteInfo;
  }

  function getYmUid() {
    var matches = document.cookie.match(/_ym_uid=(\d+)/);
    return matches ? matches[1] : "";
  }

  function metrikaListener(event) {
    // Только нужные события
    if (
      [
        "addEvents_makeEcommerce",
        "addEvents_useNavigations",
        "addEvents_makeActions",
        "addEvents_makeConversions",
      ].includes(event.event)
    ) {
      var siteInfo = buildSiteInfo(event);
      window.siteInfo = siteInfo;
      if (window.ym) {
        window.ym(MAIN_COUNTER, "params", siteInfo || {});
        window.ym(PROJECT_COUNTER, "params", siteInfo || {});
      }
    }
    // reachGoal
    if (event.reachGoal) {
      if (window.ym) {
        window.ym(MAIN_COUNTER, "reachGoal", event.reachGoal);
        window.ym(PROJECT_COUNTER, "reachGoal", event.reachGoal);
      }
    }
  }

  // Переопределяем push для dataLayer
  var origPush = window.dataLayer.push;
  window.dataLayer.push = function () {
    for (var i = 0; i < arguments.length; i++) {
      metrikaListener(arguments[i]);
    }
    return origPush.apply(this, arguments);
  };

  // Обрабатываем уже существующие события
  if (window.dataLayer.length) {
    window.dataLayer.forEach(metrikaListener);
  }
})();
