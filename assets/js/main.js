const currentPage = window.location.pathname.split("/").pop();

switch (currentPage) {
  case "index.html":
    import("./homePage.js");
    import("./header.js");
    import("./auth/login.js");
    import("./api.js");
    break;

  case "category.html":
    import("./category.js")
      .then((module) => {
        module.initCategoryPage();
      })
      .catch((error) => {
        console.error("failed to load category", error);
      });
    import("./header.js");
    import("./api.js");
    import("./auth/login.js");
    break;

  case "create.html":
    import("./createAuction.js");
    import("./header.js");
    import("./api.js");
    import("./auth/login.js");
    break;

  case "postInfo.html":
    import("/postInfo.js");
    import("./api.js");
    import("./header.js");
    import("./auth/login.js");
    break;

  case "profile.html":
    import("./profile.js");
    import("./header.js");
    import("./api.js");
    import("./auth/login.js");
    break;

  case "register.html":
    import("./register.js");
    import("./auth/login.js");
    import("./header.js");
    break;

  case "info.html":
    import("./api.js");
    import("./header.js");
    import("./auth/login.js");
    break;

  default:
    console.warn("No scripts configured for this page:", currentPage);
    break;
}
