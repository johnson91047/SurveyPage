let database = firebase.database();
const dataCount = 80;
var pages = ["2-1", "2-2", "2-3", "2-4"];

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
    record.set("2-1");
    window.location.href = "/SurveyPage/2-1";
  } else {
    let current = snapshot.val().toString();
    let [_, version] = current.split("-");
    let newVersion = parseInt(version, 10) % 4 + 1;
    record.set(`2-${newVersion}`);
    window.location.href = `/SurveyPage/2-${newVersion}`;
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
