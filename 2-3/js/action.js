var ctx = new Stamp.Context();
var storyTimer = new Timer();
var current_page_count = 0;
const current_total_page_count = 13;
var survey_normal_target = document.getElementById("survey_normal_section");
var survey_binary_target = document.getElementById("survey_binary_section");
var description_target = document.getElementById("description_section");
var survey_multiple_choice_target = document.getElementById(
  "survey_multiple_choice_section"
);
var survey_selection_target = document.getElementById(
  "survey_selection_section"
);
var survey_input_section_target = document.getElementById(
  "survey_input_section"
);
var survey_image_multiple_choice_section_target = document.getElementById(
  "survey_image_selection_section"
);
var page_indicator = document.getElementById("page");
var current_page = page1;
var iframeMouseOver = false;

var constructPage = function () {
  /////////// normal /////////////
  if (current_page.normal_question !== undefined) {
    let normal_question_expanded = Stamp.expand(
      ctx.import("normal_question_template"),
      current_page
    );

    Stamp.appendChildren(survey_normal_target, normal_question_expanded);
  }

  /////////// description /////////////
  if (current_page.description !== undefined) {
    let description_expanded = Stamp.expand(
      ctx.import("description_template"),
      current_page
    );

    Stamp.appendChildren(description_target, description_expanded);
  }

  /////////// multiple /////////////
  if (current_page.multiple_choice_question !== undefined) {
    let multiple_choice_question_expanded = Stamp.expand(
      ctx.import("multiple_choice_question_template"),
      current_page
    );

    Stamp.appendChildren(
      survey_multiple_choice_target,
      multiple_choice_question_expanded
    );
  }

  /////////// selection /////////////
  if (current_page.selection_question !== undefined) {
    let selection_question_expanded = Stamp.expand(
      ctx.import("selection_question_template"),
      current_page
    );

    Stamp.appendChildren(survey_selection_target, selection_question_expanded);
  }

  /////////// input /////////////
  if (current_page.input_question !== undefined) {
    let input_question_expanded = Stamp.expand(
      ctx.import("input_question_template"),
      current_page
    );

    Stamp.appendChildren(survey_input_section_target, input_question_expanded);
  }

  if (current_page.image_multiple_choice_question !== undefined) {
    let image_multiple_choice_expanded = Stamp.expand(
      ctx.import("image_multiple_choice_template"),
      current_page
    );

    Stamp.appendChildren(
      survey_image_multiple_choice_section_target,
      image_multiple_choice_expanded
    );
  }
};

var clearPage = function () {
  survey_normal_target.innerHTML = "";
  description_target.innerHTML = "";
  survey_multiple_choice_target.innerHTML = "";
  survey_selection_target.innerHTML = "";
  survey_input_section_target.innerHTML = "";
  survey_image_multiple_choice_section_target.innerHTML = "";
};

var updatePageIndicator = function () {
  let page_num = current_page_count + 1;
  page_indicator.innerText = page_num + "/" + current_total_page_count;
};

var OnNextClick = function () {
  if (!current_page.check()) {
    alert("you have not finished this page yet!");
    return;
  }
  current_page.postPage();
  clearPage();
  constructPage();
  updatePageIndicator();

  current_page.prePage();

  $("html, body").animate({ scrollTop: 0 }, "fast");
};

/// for story ///
document
  .getElementById("story_container")
  .addEventListener("mouseenter", function () {
    iframeMouseOver = true;
  });
document
  .getElementById("story_container")
  .addEventListener("mouseleave", function () {
    iframeMouseOver = false;
  });

window.addEventListener("blur", function () {
  window.setTimeout(function () {
    if (document.activeElement instanceof HTMLIFrameElement) {
      OnStoryClick();
    }
  }, 0);
});

var OnStoryClick = function () {
  storyTimer.startTimer();
  setTimeout(() => {
    $("#nextBtn").removeClass("disabled");
  }, 1500);
};

/////////////

constructPage();
current_page.prePage();
updatePageIndicator();
$("#story").hide();
