const currentPage = window.location.pathname.split("/").pop();

switch (currentPage) {
  case "/Semester-Project-2/index.html":
    import("./homePage.js");
    import("./header.js");
    import("./auth/login.js");
    import("./api.js");
    break;

  case "/Semester-Project-2/category.html":
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

  case "/Semester-Project-2/create.html":
    import("./createAuction.js");
    import("./header.js");
    import("./api.js");
    import("./auth/login.js");
    break;

  case "/Semester-Project-2/postInfo.html":
    import("/postInfo.js");
    import("./api.js");
    import("./header.js");
    import("./auth/login.js");
    break;

  case "/Semester-Project-2/profile.html":
    import("./profile.js");
    import("./header.js");
    import("./api.js");
    import("./auth/login.js");
    break;

  case "/Semester-Project-2/register.html":
    import("./register.js");
    import("./auth/login.js");
    import("./header.js");
    break;

  case "/Semester-Project-2/info.html":
    import("./api.js");
    import("./header.js");
    import("./auth/login.js");
    break;

  default:
    console.warn("No scripts configured for this page:", currentPage);
    break;
}
