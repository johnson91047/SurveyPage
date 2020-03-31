var ctx = new Stamp.Context();

var survey_target = document.getElementById("survey_section");
var description_target = document.getElementById("description_section");

var normal_question_expanded = Stamp.expand(
  ctx.import("normal_question_template"),
  page1
);
var description_expanded = Stamp.expand(
  ctx.import("description_template"),
  page1
);
var binary_question_expanded = Stamp.expand(
  ctx.import("binary_question_template"),
  page1
);

Stamp.appendChildren(survey_target, normal_question_expanded);
Stamp.appendChildren(survey_target, binary_question_expanded);
Stamp.appendChildren(description_target, description_expanded);
