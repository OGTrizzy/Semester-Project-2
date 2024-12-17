let currentPage = window.location.pathname.split("/").pop();

if (!currentPage) {
  currentPage = "index.html";
}

switch (currentPage) {
  case "index.html":
    import("./header.js").then((module) => module.initHeader?.());
    import("./auth/login.js");
    import("./homePage.js")
      .then((module) => module.initHomePage?.())
      .catch((error) => console.error("Failed to load homePage script", error));
    break;

  case "category.html":
    import("./header.js").then((module) => module.initHeader?.());
    import("./auth/login.js");
    import("./category.js")
      .then((module) => module.initCategoryPage?.())
      .catch((error) =>
        console.error("Failed to load categoryPage script", error)
      );
    break;

  case "create.html":
    import("./header.js").then((module) => module.initHeader?.());
    import("./auth/login.js");
    import("./createAuction.js")
      .then((module) => module.initCreateAuctionPage?.())
      .catch((error) =>
        console.error("Failed to load createAuction script", error)
      );
    break;

  case "postInfo.html":
    import("./header.js").then((module) => module.initHeader?.());
    import("./auth/login.js");
    import("./postInfo.js")
      .then((module) => module.initAuctionDetailsPage?.())
      .catch((error) => console.error("Failed to load postInfo script", error));
    break;

  case "profile.html":
    import("./header.js").then((module) => module.initHeader?.());
    import("./auth/login.js");
    import("./profile.js")
      .then((module) => module.initProfilePage?.())
      .catch((error) => console.error("Failed to load profile script", error));
    break;

  case "register.html":
    import("./header.js").then((module) => module.initHeader?.());
    import("./auth/login.js");
    import("./register.js")
      .then((module) => module.initRegisterPage?.())
      .catch((error) => console.error("Failed to load register script", error));
    break;

  case "info.html":
    import("./header.js").then((module) => module.initHeader?.());
    import("./auth/login.js");
    break;

  default:
    console.warn("No scripts configured for this page:", currentPage);
    break;
}
