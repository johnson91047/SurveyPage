let database = firebase.database();
const dataCount = 20;
var pages = ["3-1", "3-2", "3-3", "3-4", "3-5", "3-6", "3-7", "3-8"];

var get_page = async function (page_name) {
  let count = database.ref(`/data/${page_name}/count`);

  var snapshot = await count.once("value");

  let snapshot_value = snapshot.val() || 0;

  if (snapshot_value < dataCount) {
    window.location.href = `/SurveyPage/${page_name}`;
    return true;
  }

  return false;
};

var random_get_page = async function () {
  let page_name = pages[Math.floor(Math.random() * pages.length)];
  let count = database.ref(`/data/${page_name}/count`);

  var snapshot = await count.once("value");

  let snapshot_value = snapshot.val() || 0;

  if (snapshot_value < dataCount) {
    window.location.href = `/SurveyPage/${page_name}`;
    return true;
  }

  return false;
};

var main_get_page = async function () {
  for (let i = 0; i < pages.length; i++) {
    let result = await get_page(pages[i]);
    if (result === true) {
      return;
    }
  }

  return false;
};

var redirect = async function () {
  let record = database.ref(`/record`);
  var snapshot = await record.once("value");
  if (snapshot.val() == null) {
    record.set("3-1");
    window.location.href = "/SurveyPage/3-1";
  } else {
    let current = snapshot.val().toString();
    let [_, version] = current.split("-");
    let newVersion = (parseInt(version, 10) % pages.length) + 1;
    record.set(`3-${newVersion}`);
    window.location.href = `/SurveyPage/3-${newVersion}`;
  }
};

var main = async function () {
  let result = await main_get_page();
  console.log(`get page ${result}`);
  if (result === false) {
    redirect();
  }
};

main();
