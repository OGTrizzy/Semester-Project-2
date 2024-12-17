let currentPage = window.location.pathname.split("/").pop();

if (!currentPage) {
  currentPage = "index.html";
}

switch (currentPage) {
  case "index.html":
    import("./homePage.js");
    import("./header.js");
    import("./auth/login.js");
    import("./api.js");
    break;

  case "category.html":
    import("./category.js")
      .then((module) => module.initCategoryPage())
      .catch((error) => console.error("Failed to load category script", error));
    import("./header.js");
    import("./api.js");
    import("./auth/login.js");
    break;

  case "create.html":
    import("./createAuction.js")
      .then((module) => module.initCreateAuctionPage())
      .catch((error) =>
        console.error("Failed to load createAuction script", error)
      );
    import("./header.js");
    import("./api.js");
    import("./auth/login.js");
    break;

  case "postInfo.html":
    import("./postInfo.js")
      .then((module) => module.initAuctionDetailsPage())
      .catch((error) => console.error("Failed to load postInfo script", error));
    import("./header.js");
    import("./api.js");
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
    import("./header.js");
    import("./auth/login.js");
    break;

  case "info.html":
    import("./header.js");
    import("./api.js");
    import("./auth/login.js");
    break;

  default:
    console.warn("No scripts configured for this page:", currentPage);
    break;
}
