/**
 * Express routing checkpoint. Here, I used express with nodejs
 * to create a server and handle routes.
 *  I implemented a custom middleware to verify the time a user
 * make a request to a particular route.
 * My route pages are styled using pure CSS on ejs templating engine.
 *  */

const express = require("express");
const path = require("node:path");
const app = express();

// setting up ejs  template engine

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "./public")));

// custom middleware for verifying working hours
const workingHoursMiddleware = (req, res, next) => {
  // we  get the current day and time
  const getToday = new Date().getDay();
  const getCurrentTime = new Date().getHours();

  // check today is not sunday (0) or saturday (6)
  const isWeekday = getToday !== 0 && getToday !== 6;
  //  check if current time is within business hours
  const isBusinessHours = getCurrentTime >= 9 && getCurrentTime <= 17;
  /**
   * Conditional rendering:
   * if today is not weekday and the current time is not business hours,
   * render business closed page, else make the whole webpage available
   */
  if (!(isWeekday && isBusinessHours)) {
    return res.render("closed");
  }
  next();
};

/**
 * use the custom middleware function
 */
app.use(workingHoursMiddleware);

// handling request sent to the root path (homepage)
app.route("/").get((req, res) => {
  // some render action goes in here
  res.render("homepage");
});

//  handling all request for /services page
app.route("/services").get((req, res) => {
  // some render action goes in here
  res.render("services");
});

// handling request send to /contact page
app.route("/contact").get((req, res) => {
  // some render action goes in here
  res.render("contact");
});

app.listen(process.env.PORT || 3000, () =>
  console.log("Server is running on port 3000")
);
