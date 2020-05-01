var Version = "2-3";
var total_timer = new Timer();

var generate_survey_code = function () {
  let s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = [];
  const code_length = 6;
  for (let i = 0; i < code_length; i++) {
    let index = Math.floor((Math.random() * 100) % s.length);
    result.push(s[index]);
  }

  return result.join("");
};

var highlight_card = function (name) {
  $(`[name='${name}']`).closest("div.card").addClass("error-highlight");
};

var remove_all_highlight_card = function () {
  $(`.error-highlight`).removeClass("error-highlight");
};

var hide_description_img = function () {
  document.getElementsByName("des_img").forEach((element) => {
    element.style.display = "none";
  });
};

var page1 = {
  description: {
    a: {
      title: "How well do you like this Instagram story?",
      contents: [
        "This research is to observe the effect of descriptions on story effectiveness.",
        "Your participation is voluntary and you can withdraw at any time.",
        "It will take you no more than 10 minutes. Your responses will be confidential and used ONLY for scholarly purposes.",
      ],
      img: "",
    },
    b: {
      title: "Please select your choice below.",
      contents: [
        'Clicking on the "agree" button below indicates that: ',
        "• you have read the above information",
        "• you voluntarily agree to participate",
        "• you are at least 18 years of age ",
        'If you do not wish to participate in the research study, please decline participation by clicking on the "disagree" button.',
      ],
      img: "",
    },
  },
  multiple_choice_question: {
    a: {
      title: "Agreement",
      name: "Agreement",
      options: ["Agree", "Disagree"],
    },
  },
  prePage: function () {
    hide_description_img();
  },
  postPage: function () {
    let result = $(
      `[name='${this.multiple_choice_question.a.name}']:checked`
    ).val();

    if (result === "Agree") {
      current_page_count++;
      current_page = page2;
      storeData[this.multiple_choice_question.a.name] = result;
      total_timer.startTimer();
    } else {
      current_page = disagreementPage;
    }
  },
  check: function () {
    remove_all_highlight_card();
    let multiple_choice = current_page["multiple_choice_question"];
    let result = true;

    for (var key in multiple_choice) {
      let name = multiple_choice[key].name;
      let value = $(`[name='${name}']:checked`).val();
      if (value === undefined) {
        highlight_card(name);
        result = false;
      }
    }
    return result;
  },
};

var page2 = {
  description: {
    a: {
      title: "The experience of using Instagram Story",
      contents: [],
      img: "",
    },
  },
  multiple_choice_question: {
    a: {
      title: 'Have you ever seen an Instagram or Facebook "Story"?',
      name: "Experience_Story",
      options: ["Yes", "No"],
    },
  },
  prePage: function () {
    hide_description_img();
  },
  postPage: function () {
    let result = $(
      `[name='${this.multiple_choice_question.a.name}']:checked`
    ).val();
    storeData[this.multiple_choice_question.a.name] = result;
    current_page_count++;
    current_page = page3;
  },
  check: function () {
    remove_all_highlight_card();
    let multiple_choice = current_page["multiple_choice_question"];
    let result = true;

    for (var key in multiple_choice) {
      let name = multiple_choice[key].name;
      let value = $(`[name='${name}']:checked`).val();
      if (value === undefined) {
        highlight_card(name);
        result = false;
      }
    }
    return result;
  },
};

var page3 = {
  description: {
    a: {
      title: "Looking at this picture and answer the following question.",
      contents: [
        "Please answer according to your initial thoughts or opinions.",
      ],
      img: "image/page1.jpg",
    },
  },
  normal_question: {
    a: {
      title:
        "I feel the product information the above picture provides is complete.",
      name: "Feel_Complete",
      least: "Strongly disagree",
      most: "Strongly agree",
    },
    b: {
      title:
        "I feel knowledgeable about this product after viewing this picture. ",
      name: "Feel_Knowledgeable",
      least: "Strongly disagree",
      most: "Strongly agree",
    },
    c: {
      title: "I instantly know what kind of product it is in this picture.",
      name: "Know_What_Find_Of_Product",
      least: "Strongly disagree",
      most: "Strongly agree",
    },
  },
  prePage: function () {},
  postPage: function () {
    let result1 = $(`[name='${this.normal_question.a.name}']:checked`).val();
    let result2 = $(`[name='${this.normal_question.b.name}']:checked`).val();
    let result3 = $(`[name='${this.normal_question.c.name}']:checked`).val();

    storeData[this.normal_question.a.name] = result1;
    storeData[this.normal_question.b.name] = result2;
    storeData[this.normal_question.c.name] = result3;
    current_page_count++;
    current_page = page4;
  },
  check: function () {
    remove_all_highlight_card();
    let normal = current_page["normal_question"];
    let result = true;

    for (var key in normal) {
      let name = normal[key].name;
      let value = $(`[name='${name}']:checked`).val();
      if (value === undefined) {
        highlight_card(name);
        result = false;
      }
    }

    return result;
  },
};

var page4 = {
  description: {
    a: {
      title: "You will see a story at next page.",
      contents: [
        "Click the arrow button to proceed to the next page of the story.",
        'Click the dark area or "X" button to close the story.',
      ],
      img: "",
    },
  },
  check: function () {
    return true;
  },
  prePage: function () {
    hide_description_img();
    $("#nextBtn").addClass("disabled");
    var count = new CountDownTimer();
    btn = document.getElementById("nextBtn");

    count.count_down(
      10,
      () => {
        btn.innerHTML = count.countDownTime;
      },
      () => {
        btn.innerHTML = "Next";
        $("#nextBtn").removeClass("disabled");
      }
    );
  },
  postPage: function () {
    current_page_count++;
    current_page = page5;
  },
};

var page5 = {
  description: {
    a: {
      title: "Click the icon below",
      contents: ["Watch the story before you progress to the next page"],
      img: "",
    },
  },
  check: function () {
    return true;
  },
  prePage: function () {
    hide_description_img();
    $("#nextBtn").addClass("disabled");
    $("#story").show();
  },
  postPage: function () {
    storyTimer.stopTimer();
    storeData["Story_Watch_Time"] = storyTimer.get_timer_second();
    $("#story").hide();

    current_page_count++;
    current_page = page6;
  },
};

var page6 = {
  description: {
    a: {
      title: "Please answer according to your real-life situation or opinions.",
      contents: [" "],
      img: "",
    },
  },
  image_multiple_choice_question: {
    a: {
      title:
        "Honestly speaking, at which page did you want to stop watching this story? *",
      name: "Stop_Read_Page",
      options: [
        {
          option_title: "Page 1",
          img: "image/page1.jpg",
        },
        {
          option_title: "Page 2",
          img: "image/page2.jpg",
        },
        {
          option_title: "Page 3",
          img: "image/page3.jpg",
        },
        {
          option_title: "Page 4",
          img: "image/page4.jpg",
        },
        {
          option_title: "Page 5",
          img: "image/page5.jpg",
        },
        {
          option_title: "I find this ad is interesting from start to finish.",
          img: "image/lastpage.jpg",
        },
      ],
    },
  },
  normal_question: {
    a: {
      title: "I am happy to finish watching the whole story.",
      name: "Happy_To_Finish_Story",
      least: "Strongly disagree",
      most: "Strongly agree",
    },
  },
  check: function () {
    remove_all_highlight_card();
    let image_multiple_choice = current_page["image_multiple_choice_question"];
    let normal = current_page["normal_question"];
    let result = true;

    for (var key in image_multiple_choice) {
      let name = image_multiple_choice[key].name;
      let value = $(`[name='${name}']:checked`).val();
      if (value === undefined) {
        highlight_card(name);
        result = false;
      }
    }

    for (var key in normal) {
      let name = normal[key].name;
      let value = $(`[name='${name}']:checked`).val();
      if (value === undefined) {
        highlight_card(name);
        result = false;
      }
    }
    return result;
  },
  prePage: function () {
    hide_description_img();
  },
  postPage: function () {
    let result = $(
      `[name='${this.image_multiple_choice_question.a.name}']:checked`
    ).val();
    let result1 = $(`[name='${this.normal_question.a.name}']:checked`).val();

    storeData[this.image_multiple_choice_question.a.name] = result;
    storeData[this.normal_question.a.name] = result1;

    current_page_count++;
    current_page = page7;
  },
};

var page7 = {
  description: {
    a: {
      title: "Please answer according to your real-life situation or opinions.",
      contents: [],
      img: "",
    },
  },
  normal_question: {
    a: {
      title:
        "This story allows me to proceed to the next page by clicking on the arrow button.",
      name: "Understand_Can_Proceed_To_Next_By_Arrow",
      least: "Strongly disagree",
      most: "Strongly agree",
    },
    b: {
      title: "I feel I have no option but to finish watching this story.",
      name: "Feel_Forced_To_Finish_Story",
      least: "Strongly disagree",
      most: "Strongly agree",
    },
    c: {
      title: "I feel I can control the speed of this story.",
      name: "Can_Control_Viewing_Speed",
      least: "Strongly disagree",
      most: "Strongly agree",
    },
  },
  prePage: function () {
    hide_description_img();
  },
  postPage: function () {
    let result1 = $(`[name='${this.normal_question.a.name}']:checked`).val();
    let result2 = $(`[name='${this.normal_question.b.name}']:checked`).val();
    let result3 = $(`[name='${this.normal_question.c.name}']:checked`).val();

    storeData[this.normal_question.a.name] = result1;
    storeData[this.normal_question.b.name] = result2;
    storeData[this.normal_question.c.name] = result3;

    current_page_count++;
    current_page = page8;
  },
  check: function () {
    remove_all_highlight_card();
    let normal = current_page["normal_question"];
    let result = true;

    for (var key in normal) {
      let name = normal[key].name;
      let value = $(`[name='${name}']:checked`).val();
      if (value === undefined) {
        highlight_card(name);
        result = false;
      }
    }
    return result;
  },
};

var page8 = {
  description: {
    a: {
      title: "Please answer according to your real-life situation or opinions.",
      contents: [],
      img: "",
    },
  },
  normal_question: {
    a: {
      title: "I enjoyed this story very much.",
      name: "Enjoy_Story",
      least: "Strongly disagree",
      most: "Strongly agree",
    },
    b: {
      title: "Watching this story was fun.",
      name: "Watching_This_Story_Is_Fun",
      least: "Strongly disagree",
      most: "Strongly agree",
    },
    c: {
      title: "I would describe this story as NOT interesting at all.",
      name: "Not_Interesting_In_Story",
      least: "Strongly disagree",
      most: "Strongly agree",
    },
    d: {
      title:
        "While watching this story, I was thinking about how much I enjoyed it.",
      name: "Thinking_About_How_Much_I_Enjoyed",
      least: "Strongly disagree",
      most: "Strongly agree",
    },
    e: {
      title:
        "While watching the story, my attention did not get diverted easily.",
      name: "Attention_Dose_Not_Get_Diverted",
      least: "Strongly disagree",
      most: "Strongly agree",
    },
    f: {
      title: "After reading this story, I remember its content.",
      name: "Remember_The_Story",
      least: "Strongly disagree",
      most: "Strongly agree",
    },
    g: {
      title: "After reading this story, I remember the brand it mentioned.",
      name: "Remember_The_Brand",
      least: "Strongly disagree",
      most: "Strongly agree",
    },
  },
  prePage: function () {
    hide_description_img();
  },
  postPage: function () {
    let result1 = $(`[name='${this.normal_question.a.name}']:checked`).val();
    let result2 = $(`[name='${this.normal_question.b.name}']:checked`).val();
    let result3 = $(`[name='${this.normal_question.c.name}']:checked`).val();
    let result4 = $(`[name='${this.normal_question.d.name}']:checked`).val();
    let result5 = $(`[name='${this.normal_question.e.name}']:checked`).val();
    let result6 = $(`[name='${this.normal_question.d.name}']:checked`).val();
    let result7 = $(`[name='${this.normal_question.e.name}']:checked`).val();

    storeData[this.normal_question.a.name] = result1;
    storeData[this.normal_question.b.name] = result2;
    storeData[this.normal_question.c.name] = result3;
    storeData[this.normal_question.d.name] = result4;
    storeData[this.normal_question.e.name] = result5;
    storeData[this.normal_question.f.name] = result6;
    storeData[this.normal_question.g.name] = result7;

    current_page_count++;
    current_page = page9;
  },
  check: function () {
    remove_all_highlight_card();
    let normal = current_page["normal_question"];
    let result = true;

    for (var key in normal) {
      let name = normal[key].name;
      let value = $(`[name='${name}']:checked`).val();
      if (value === undefined) {
        highlight_card(name);
        result = false;
      }
    }
    return result;
  },
};

var page9 = {
  description: {
    a: {
      title: "Please answer according to your real-life situation or opinions.",
      contents: [],
      img: "",
    },
  },
  normal_question: {
    a: {
      title: "My overall evaluation of this story is good.",
      name: "Overall_Story_Evaluation",
      least: "Strongly disagree",
      most: "Strongly agree",
    },
    b: {
      title: "I feel this story is pleasant.",
      name: "Watching_Story_Feel_Pleasant",
      least: "Strongly disagree",
      most: "Strongly agree",
    },
    c: {
      title: "I think this story is favorable.",
      name: "Story_Is_Favorable",
      least: "Strongly disagree",
      most: "Strongly agree",
    },
    d: {
      title: "I find this story is likeable.",
      name: "Story_Is_Likable",
      least: "Strongly disagree",
      most: "Strongly agree",
    },
    e: {
      title: "The product in the story is good.",
      name: "Product_Is_Good",
      least: "Strongly disagree",
      most: "Strongly agree",
    },
    f: {
      title: "The product in the story is appealing.",
      name: "Product_Is_Appealing",
      least: "Strongly disagree",
      most: "Strongly agree",
    },
    g: {
      title: "The product in the story is interesting.",
      name: "Product_Is_Interesting",
      least: "Strongly disagree",
      most: "Strongly agree",
    },
  },
  prePage: function () {
    hide_description_img();
  },
  postPage: function () {
    let result1 = $(`[name='${this.normal_question.a.name}']:checked`).val();
    let result2 = $(`[name='${this.normal_question.b.name}']:checked`).val();
    let result3 = $(`[name='${this.normal_question.c.name}']:checked`).val();
    let result4 = $(`[name='${this.normal_question.d.name}']:checked`).val();
    let result5 = $(`[name='${this.normal_question.e.name}']:checked`).val();
    let result6 = $(`[name='${this.normal_question.f.name}']:checked`).val();
    let result7 = $(`[name='${this.normal_question.g.name}']:checked`).val();

    storeData[this.normal_question.a.name] = result1;
    storeData[this.normal_question.b.name] = result2;
    storeData[this.normal_question.c.name] = result3;
    storeData[this.normal_question.d.name] = result4;
    storeData[this.normal_question.e.name] = result5;
    storeData[this.normal_question.f.name] = result6;
    storeData[this.normal_question.g.name] = result7;

    current_page_count++;
    current_page = page10;
  },
  check: function () {
    remove_all_highlight_card();
    let normal = current_page["normal_question"];
    let result = true;

    for (var key in normal) {
      let name = normal[key].name;
      let value = $(`[name='${name}']:checked`).val();
      if (value === undefined) {
        highlight_card(name);
        result = false;
      }
    }

    return result;
  },
};

var page10 = {
  description: {
    a: {
      title: "Please answer according to your real-life situation or opinions.",
      contents: [],
      img: "",
    },
  },
  normal_question: {
    a: {
      title: "How likely are you to purchase this product?",
      name: "How_Likely_To_Purchase",
      least: "Very unlikely",
      most: "Very likely",
    },
    b: {
      title: "Did the story motivate you to purchase the product?",
      name: "Did_Story_Motivate_To_Purchase",
      least: "Not at all",
      most: "Very much",
    },
    c: {
      title: "Would you like to try the product if you never tried it?",
      name: "Want_To_Try_If_Never_Try",
      least: "Not at all",
      most: "Very much",
    },
    d: {
      title: "I like apple juice",
      name: "I_Like_Apple_Juice",
      least: "Strongly disagree",
      most: "Strongly agree",
    },
    e: {
      title: "I may drink apple juice in the next three months.",
      name: "May_Drink_Apple_Juice_Next_Three_Month",
      least: "Strongly disagree",
      most: "Strongly agree",
    },
  },
  prePage: function () {
    hide_description_img();
  },
  postPage: function () {
    let result1 = $(`[name='${this.normal_question.a.name}']:checked`).val();
    let result2 = $(`[name='${this.normal_question.b.name}']:checked`).val();
    let result3 = $(`[name='${this.normal_question.c.name}']:checked`).val();
    let result4 = $(`[name='${this.normal_question.d.name}']:checked`).val();
    let result5 = $(`[name='${this.normal_question.d.name}']:checked`).val();

    storeData[this.normal_question.a.name] = result1;
    storeData[this.normal_question.b.name] = result2;
    storeData[this.normal_question.c.name] = result3;
    storeData[this.normal_question.d.name] = result4;
    storeData[this.normal_question.e.name] = result5;

    current_page_count++;
    current_page = page12;
  },
  check: function () {
    remove_all_highlight_card();
    let normal = current_page["normal_question"];
    let result = true;

    for (var key in normal) {
      let name = normal[key].name;
      let value = $(`[name='${name}']:checked`).val();
      if (value === undefined) {
        highlight_card(name);
        result = false;
      }
    }

    return result;
  },
};

var page12 = {
  description: {
    a: {
      title: "Please answer according to your real-life situation or opinions.",
      contents: [],
      img: "",
    },
  },
  normal_question: {
    a: {
      title:
        "It is important to me that the food I eat on a typical day contains no additives",
      name: "Important_No_Additive",
      least: "Not at all",
      most: "Very important",
    },
    b: {
      title:
        "It is important to me that the food I eat on a typical day contains natural ingredients",
      name: "Important_Contain_Natural_Ingredients",
      least: "Not at all",
      most: "Very important",
    },
    c: {
      title:
        "It is important to me that the food I eat on a typical day contains no artificial ingredients",
      name: "Important_No_Artificial_Ingredients",
      least: "Not at all",
      most: "Very important",
    },
    d: {
      title:
        "It is important to me that the food I eat on a typical day is low in calories. ",
      name: "Important_Low_Calories",
      least: "Not at all",
      most: "Very important",
    },
    e: {
      title:
        "It is important to me that the food I eat on a typical day helps me control my weight.",
      name: "Important_Help_Control_Weight",
      least: "Not at all",
      most: "Very important",
    },
    f: {
      title:
        "It is important to me that the food I eat on a typical day is low in fat.",
      name: "Important_Low_Fat",
      least: "Not at all",
      most: "Very important",
    },
  },
  prePage: function () {
    hide_description_img();
  },
  postPage: function () {
    let result1 = $(`[name='${this.normal_question.a.name}']:checked`).val();
    let result2 = $(`[name='${this.normal_question.b.name}']:checked`).val();
    let result3 = $(`[name='${this.normal_question.c.name}']:checked`).val();
    let result4 = $(`[name='${this.normal_question.d.name}']:checked`).val();
    let result5 = $(`[name='${this.normal_question.e.name}']:checked`).val();
    let result6 = $(`[name='${this.normal_question.f.name}']:checked`).val();

    storeData[this.normal_question.a.name] = result1;
    storeData[this.normal_question.b.name] = result2;
    storeData[this.normal_question.c.name] = result3;
    storeData[this.normal_question.d.name] = result4;
    storeData[this.normal_question.e.name] = result5;
    storeData[this.normal_question.f.name] = result6;

    current_page_count++;
    current_page = personalPage;
  },
  check: function () {
    remove_all_highlight_card();
    let normal = current_page["normal_question"];
    let result = true;

    for (var key in normal) {
      let name = normal[key].name;
      let value = $(`[name='${name}']:checked`).val();
      if (value === undefined) {
        highlight_card(name);
        result = false;
      }
    }
    return result;
  },
};

var personalPage = {
  description: {
    a: {
      title: "Basic Information",
      contents: [""],
      img: "",
    },
  },
  normal_question: {},
  selection_question: {
    a: {
      title: "What do you use social media for? (Please choose at least one)",
      name: "Use_Social_Media_For",
      options: [
        "Keeping in touch with friends and family",
        "Event planning",
        "Buying and selling",
        "Inspiration",
        "News",
        "Dating",
        "To meet new friends",
        "To find employment",
        "To browse/time waste",
        "Other",
      ],
    },
  },
  input_question: {
    a: {
      title: "Please enter your Worker ID",
      name: "Worker_ID",
    },
  },
  multiple_choice_question: {
    a: {
      title: "Gender",
      name: "Gender",
      options: ["Male", "Female"],
    },
    b: {
      title: "Age",
      name: "Age",
      options: [
        "Under 18",
        "18-24 years old",
        "25-34 years old",
        "35-44 years old",
        "45-54 years old",
        "55-64 years old",
        "Over 65",
      ],
    },
    c: {
      title: "Education",
      name: "Education",
      options: [
        "Less than a high school diploma",
        "High school degree or equivalent",
        "Bachelor's degree",
        "Master's degree",
        "Doctorate",
        "Other",
      ],
    },
    d: {
      title: "Household Income",
      name: "Income",
      options: [
        "Below $10k",
        "$10 k - $50 k",
        "$50 k - $100 k",
        "$100 k - $150 k",
        "Over $150 k",
      ],
    },
    e: {
      title: "How much time do you spend on social media per day?",
      name: "Social_Media_Per_Day",
      options: [
        "Less than 30 minutes",
        "30-60 minutes",
        "1-2 hours",
        "2-3 hours",
        "Over 3 hours",
      ],
    },
  },
  prePage: function () {
    hide_description_img();
  },
  postPage: function () {
    let selection_result = [];
    $(`[name='${current_page.selection_question.a.name}']:checked`).each(
      function () {
        selection_result.push(this.value);
      }
    );
    let result1 = $(
      `[name='${this.multiple_choice_question.a.name}']:checked`
    ).val();
    let result2 = $(
      `[name='${this.multiple_choice_question.b.name}']:checked`
    ).val();
    let result3 = $(
      `[name='${this.multiple_choice_question.c.name}']:checked`
    ).val();
    let result4 = $(
      `[name='${this.multiple_choice_question.d.name}']:checked`
    ).val();
    let result5 = $(
      `[name='${this.multiple_choice_question.e.name}']:checked`
    ).val();

    storeData[this.multiple_choice_question.a.name] = result1;
    storeData[this.multiple_choice_question.b.name] = result2;
    storeData[this.multiple_choice_question.c.name] = result3;
    storeData[this.multiple_choice_question.d.name] = result4;
    storeData[this.multiple_choice_question.e.name] = result5;
    storeData[this.selection_question.a.name] = selection_result.join();
    storeData[this.input_question.a.name] = $(
      `[name='${current_page.input_question.a.name}']`
    ).val();

    current_page_count++;
    current_page = finishPage;
  },
  check: function () {
    remove_all_highlight_card();
    let multiple_choice = current_page["multiple_choice_question"];
    let input = $(`[name='${current_page.input_question.a.name}']`).val();
    let selection = $(
      `[name='${current_page.selection_question.a.name}']:checked`
    );
    let selection_result = [];
    let result = true;

    for (var key in multiple_choice) {
      let name = multiple_choice[key].name;
      let value = $(`[name='${name}']:checked`).val();
      if (value === undefined) {
        highlight_card(name);
        result = false;
      }
    }

    if (input === undefined || input === "") {
      highlight_card(current_page.input_question.a.name);
      result = false;
    }

    selection.each(function () {
      selection_result.push(this.value);
    });
    if (selection_result.length == 0) {
      highlight_card(current_page.selection_question.a.name);
      result = false;
    }

    return result;
  },
};

var disagreementPage = {
  description: {
    a: {
      title: "Survey has completed !",
      contents: [
        "Thank you for participating in this research.  Your feedback is appreciated.",
        "We are looking for Instagram users.  If you are not one yet, we are sorry that you do not meet the qualification and you cannot get Amazon’s survey code.  Still, we sincerely thank you for your time and interest in our survey.",
      ],
      img: "",
    },
  },
  prePage: function () {
    hide_description_img();
    $("#page").hide();
    $("#nextBtn").hide();
  },
  postPage: function () {},
  check: function () {},
};

var finishPage = {
  description: {
    a: {
      title: `The survey code of Amazon Mechanical Turk is \"${generate_survey_code()}\"`,
      contents: ["Please answer this survey code into Amazon Mechanical Turk"],
      img: "",
    },
    b: {
      title: "Survey has completed !",
      contents: ["Thank you for your participation !"],
      img: "",
    },
  },
  prePage: function () {
    hide_description_img();
    $("#page").hide();
    $("#nextBtn").hide();
    total_timer.stopTimer();
    storeData["Total_Time"] = total_timer.get_timer_second();
    storeData["Version"] = Version;
    console.log(total_timer.get_timer_second());

    let database = firebase.database();
    let data = database.ref(`/data/${Version}`);
    let count = database.ref(`/data/${Version}/count`);
    let ref = data.push();
    ref.set(storeData);

    count.transaction(function (value) {
      return (value || 0) + 1;
    });
  },
  postPage: function () {},
  check: function () {},
};
