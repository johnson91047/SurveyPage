var generate_survey_code = function() {
  let s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = [];
  const code_length = 6;
  for (let i = 0; i < code_length; i++) {
    let index = Math.floor((Math.random() * 100) % s.length);
    result.push(s[index]);
  }

  return result.join("");
};

var page1 = {
  description: {
    a: {
      title: "How well do you like this Instagram Story advertisement?",
      contents: [
        "The purpose of this research project is to observe the effect of juice description on the effect of Instagram advertising. This is a research project being conducted by Lucy TING and Yi-Hsuan CHEN at National Taipei University, TAIWAN.",
        "Your participation in this research study is voluntary. You may choose not to participate. If you decide to participate in this research survey, you may withdraw at any time. If you decide not to participate in this study or if you withdraw from participating at any time, you will not be penalized.",
        "The procedure involves filling an online survey that will take approximately 10 minutes. Your responses will be confidential and we do not collect identifying information such as your name, email address or IP address. The survey questions will be just about the effect of the description on Instagram advertising. The results of this study will be used for scholarly purposes only and may be shared with National Taipei University, TAIWAN representatives.",
        "If you have any questions about the research study, please contact us.",
        "Email：joy850303@gmail.com"
      ],
      img: ""
    },
    b: {
      title: "Please select your choice below.",
      contents: [
        'Clicking on the "agree" button below indicates that: ',
        "• you have read the above information",
        "• you voluntarily agree to participate",
        "• you are at least 18 years of age ",
        'If you do not wish to participate in the research study, please decline participation by clicking on the "disagree" button.'
      ],
      img: ""
    }
  },
  multiple_choice_question: {
    a: {
      title: "Agreement",
      name: "Agreement",
      options: ["Agree", "Disagree"]
    }
  },
  prePage: function() {},
  postPage: function() {
    let result = $(
      `[name='${this.multiple_choice_question.a.name}']:checked`
    ).val();

    if (result === "Agree") {
      current_page_count++;
      current_page = page2;
      storeData[this.multiple_choice_question.a.name] = result;
    } else {
      current_page = disagreementPage;
    }
  },
  check: function() {
    let multiple_choice = current_page["multiple_choice_question"];
    let result = true;

    for (var key in multiple_choice) {
      let name = multiple_choice[key].name;
      let value = $(`[name='${name}']:checked`).val();
      if (value === undefined) {
        result = false;
      }
    }
    return result;
  }
};

var page2 = {
  multiple_choice_question: {
    a: {
      title: 'Have you ever seen an Instagram or Facebook "Story"?',
      name: "Experience_Story",
      options: ["Yes", "No"]
    }
  },
  prePage: function() {},
  postPage: function() {
    let result = $(
      `[name='${this.multiple_choice_question.a.name}']:checked`
    ).val();
    storeData[this.multiple_choice_question.a.name] = result;
    current_page_count++;
    current_page = page3;
  },
  check: function() {
    let multiple_choice = current_page["multiple_choice_question"];
    let result = true;

    for (var key in multiple_choice) {
      let name = multiple_choice[key].name;
      let value = $(`[name='${name}']:checked`).val();
      if (value === undefined) {
        result = false;
      }
    }
    return result;
  }
};

var page3 = {
  description: {
    a: {
      title: "Looking at this ad and answer the following question.",
      contents: [
        "Please answer according to your initial thoughts or opinions."
      ],
      img: "image/uncertain.jpg"
    }
  },
  normal_question: {
    a: {
      title:
        "I feel the product information the above ad provides is complete.",
      name: "Feel_Complete",
      least: "Strongly disagree",
      most: "Strongly agree"
    },
    b: {
      title:
        "I feel knowledgeable about this product after reading the above ad. ",
      name: "Feel_Knowledgeable",
      least: "Strongly disagree",
      most: "Strongly agree"
    },
    c: {
      title: "I instantly know what kind of product it is advertised.",
      name: "Know_What_Find_Of_Product",
      least: "Strongly disagree",
      most: "Strongly agree"
    }
  },
  prePage: function() {},
  postPage: function() {
    let result1 = $(`[name='${this.normal_question.a.name}']:checked`).val();
    let result2 = $(`[name='${this.normal_question.b.name}']:checked`).val();
    let result3 = $(`[name='${this.normal_question.c.name}']:checked`).val();

    storeData[this.normal_question.a.name] = result1;
    storeData[this.normal_question.b.name] = result2;
    storeData[this.normal_question.c.name] = result3;
    current_page_count++;
    current_page = page4;
  },
  check: function() {
    let normal = current_page["normal_question"];
    let result = true;

    for (var key in normal) {
      let name = normal[key].name;
      let value = $(`[name='${name}']:checked`).val();
      if (value === undefined) {
        result = false;
      }
    }

    return result;
  }
};

var page4 = {
  description: {},
  normal_question: {
    a: {
      title: "I enjoyed this ad very much. ",
      name: "Enjoy_Ad",
      least: "Strongly disagree",
      most: "Strongly agree"
    },
    b: {
      title: "Watching this ad was fun. ",
      name: "Watching_Is_Fun",
      least: "Strongly disagree",
      most: "Strongly agree"
    },
    c: {
      title: "I would describe this ad as not interesting at all.",
      name: "Not_Interesting",
      least: "Strongly disagree",
      most: "Strongly agree"
    },
    d: {
      title:
        "While watching this ad, I was thinking about how much I enjoyed it.",
      name: "Thinking_About_How_Much_I_Enjoyed",
      least: "Strongly disagree",
      most: "Strongly agree"
    },
    e: {
      title: "This ad held my attention. ",
      name: "Held_Attention",
      least: "Strongly disagree",
      most: "Strongly agree"
    }
  },
  multiple_choice_question: {
    a: {
      title: "Which product is advertised in this ad?",
      name: "Which_Product",
      options: ["Apple juice", "Apple pie"]
    }
  },
  prePage: function() {},
  postPage: function() {
    let result1 = $(`[name='${this.normal_question.a.name}']:checked`).val();
    let result2 = $(`[name='${this.normal_question.b.name}']:checked`).val();
    let result3 = $(`[name='${this.normal_question.c.name}']:checked`).val();
    let result4 = $(`[name='${this.normal_question.d.name}']:checked`).val();
    let result5 = $(`[name='${this.normal_question.e.name}']:checked`).val();
    let result6 = $(
      `[name='${this.multiple_choice_question.a.name}']:checked`
    ).val();

    storeData[this.multiple_choice_question.a.name] = result6;
    storeData[this.normal_question.a.name] = result1;
    storeData[this.normal_question.b.name] = result2;
    storeData[this.normal_question.c.name] = result3;
    storeData[this.normal_question.d.name] = result4;
    storeData[this.normal_question.e.name] = result5;

    current_page_count++;
    current_page = page5;
  },
  check: function() {
    let normal = current_page["normal_question"];
    let result = true;

    for (var key in normal) {
      let name = normal[key].name;
      let value = $(`[name='${name}']:checked`).val();
      if (value === undefined) {
        result = false;
      }
    }
    return result;
  }
};

var page5 = {
  description: {},
  normal_question: {
    a: {
      title: "What is your overall evaluation of the ad?",
      name: "Overall_Evaluation",
      least: "Very bad",
      most: "Very good"
    },
    b: {
      title: "Do you feel this ad pleasant?",
      name: "Feel_Pleasant",
      least: "Unpleasant",
      most: "Pleasant"
    },
    c: {
      title: "Do you think this ad favorable?",
      name: "Favorable",
      least: "Unfavorable",
      most: "Favorable"
    },
    d: {
      title: "Do you find this ad likable?",
      name: "Likable",
      least: "Not likable",
      most: "Likable"
    },
    e: {
      title: "The product is very good",
      name: "Is_Very_Good",
      least: "Strongly disagree",
      most: "Strongly agree"
    },
    f: {
      title: "The product is very appealing",
      name: "Is_Very_Appealing",
      least: "Strongly disagree",
      most: "Strongly agree"
    },
    g: {
      title: "The product is very interesting",
      name: "Is_Very_Interesting",
      least: "Strongly disagree",
      most: "Strongly agree"
    }
  },
  binary_question: {},
  prePage: function() {},
  postPage: function() {
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
    current_page = page6;
  },
  check: function() {
    let normal = current_page["normal_question"];
    let result = true;

    for (var key in normal) {
      let name = normal[key].name;
      let value = $(`[name='${name}']:checked`).val();
      if (value === undefined) {
        result = false;
      }
    }

    return result;
  }
};

var page6 = {
  description: {},
  normal_question: {
    a: {
      title: "How likely are you to purchase this advertised product?",
      name: "How_Likely_To_Purchase",
      least: "Very unlikely",
      most: "Very likely"
    },
    b: {
      title: "Did the ads motivate you to purchase the product?",
      name: "Did_Ad_Motivate_To_Purchase",
      least: "Not at all",
      most: "Very much"
    },
    c: {
      title: "I like apple juice",
      name: "I_Like_Apple_Juice",
      least: "Unfavorable",
      most: "Favorable"
    },
    d: {
      title: "I may drink apple juice in the next six months.",
      name: "Drink_Apple_Juice_Next_Six_Month",
      least: "Not likable",
      most: "Likable"
    }
  },
  binary_question: {},
  prePage: function() {},
  postPage: function() {
    let result1 = $(`[name='${this.normal_question.a.name}']:checked`).val();
    let result2 = $(`[name='${this.normal_question.b.name}']:checked`).val();
    let result3 = $(`[name='${this.normal_question.c.name}']:checked`).val();
    let result4 = $(`[name='${this.normal_question.d.name}']:checked`).val();

    storeData[this.normal_question.a.name] = result1;
    storeData[this.normal_question.b.name] = result2;
    storeData[this.normal_question.c.name] = result3;
    storeData[this.normal_question.d.name] = result4;

    current_page_count++;
    current_page = page7;
  },
  check: function() {
    let normal = current_page["normal_question"];
    let result = true;

    for (var key in normal) {
      let name = normal[key].name;
      let value = $(`[name='${name}']:checked`).val();
      if (value === undefined) {
        result = false;
      }
    }

    return result;
  }
};

var page7 = {
  description: {},
  normal_question: {
    a: {
      title:
        "It is important to me that the food I eat on a typical day contains a lot of vitamins and minerals.",
      name: "Important_Contain_Vitamin_Minerals",
      least: "Not at all",
      most: "Very important"
    },
    b: {
      title:
        "It is important to me that the food I eat on a typical day keeps me healthy.",
      name: "Important_Keep_Me_Healthy",
      least: "Not at all",
      most: "Very important"
    },
    c: {
      title:
        "It is important to me that the food I eat on a typical day is nutritious",
      name: "Important_Is_Nutritious",
      least: "Not at all",
      most: "Very important"
    },
    d: {
      title:
        "It is important to me that the food I eat on a typical day is high in protein",
      name: "Important_High_Protein",
      least: "Not at all",
      most: "Very important"
    },
    e: {
      title:
        "It is important to me that the food I eat on a typical day is good for my skin/teeth/hair/nails etc",
      name: "Important_Good_For_skin-teeth-hair-nails",
      least: "Not at all",
      most: "Very important"
    },
    f: {
      title:
        "It is important to me that the food I eat on a typical day is high in fiber and roughage",
      name: "Important_High_Fiber_Roughage",
      least: "Not at all",
      most: "Very important"
    }
  },
  binary_question: {},
  prePage: function() {},
  postPage: function() {
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
    current_page = page8;
  },
  check: function() {
    let normal = current_page["normal_question"];
    let result = true;

    for (var key in normal) {
      let name = normal[key].name;
      let value = $(`[name='${name}']:checked`).val();
      if (value === undefined) {
        result = false;
      }
    }
    return result;
  }
};

var page8 = {
  description: {},
  normal_question: {
    a: {
      title:
        "It is important to me that the food I eat on a typical day contains no additives",
      name: "Important_No_Additive",
      least: "Not at all",
      most: "Very important"
    },
    b: {
      title:
        "It is important to me that the food I eat on a typical day contains natural ingredients",
      name: "Important_Contain_Natural_Ingredients",
      least: "Not at all",
      most: "Very important"
    },
    c: {
      title:
        "It is important to me that the food I eat on a typical day is low in calories. ",
      name: "Important_Low_Calories",
      least: "Not at all",
      most: "Very important"
    },
    d: {
      title:
        "It is important to me that the food I eat on a typical day helps me control my weight.",
      name: "Important_Help_Control_Weight",
      least: "Not at all",
      most: "Very important"
    },
    e: {
      title:
        "It is important to me that the food I eat on a typical day is low in fat.",
      name: "Important_Low_Fat",
      least: "Not at all",
      most: "Very important"
    }
  },
  binary_question: {},
  prePage: function() {},
  postPage: function() {
    let result1 = $(`[name='${this.normal_question.a.name}']:checked`).val();
    let result2 = $(`[name='${this.normal_question.b.name}']:checked`).val();
    let result3 = $(`[name='${this.normal_question.c.name}']:checked`).val();
    let result4 = $(`[name='${this.normal_question.d.name}']:checked`).val();
    let result5 = $(`[name='${this.normal_question.e.name}']:checked`).val();

    storeData[this.normal_question.a.name] = result1;
    storeData[this.normal_question.b.name] = result2;
    storeData[this.normal_question.c.name] = result3;
    storeData[this.normal_question.d.name] = result4;
    storeData[this.normal_question.e.name] = result5;

    current_page_count++;
    current_page = personalPage;
  },
  check: function() {
    let normal = current_page["normal_question"];
    let result = true;

    for (var key in normal) {
      let name = normal[key].name;
      let value = $(`[name='${name}']:checked`).val();
      if (value === undefined) {
        result = false;
      }
    }
    return result;
  }
};

var personalPage = {
  description: {
    a: {
      title: `The survey code of Amazon Mechanical Turk is \"${generate_survey_code()}\"`,
      contents: ["Please answer this survey code into Amazon Mechanical Turk"],
      img: ""
    }
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
        "Other"
      ]
    }
  },
  input_question: {
    a: {
      title: "Please enter your Worker ID",
      name: "Worker_ID"
    }
  },
  multiple_choice_question: {
    a: {
      title: "Gender",
      name: "Gender",
      options: ["Male", "Female"]
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
        "Over 65"
      ]
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
        "Other"
      ]
    },
    d: {
      title: "Household Income",
      name: "Income",
      options: [
        "Below $10k",
        "$10 k - $50 k",
        "$50 k - $100 k",
        "$100 k - $150 k",
        "Over $150 k"
      ]
    },
    e: {
      title: "How much time do you spend on social media per day?",
      name: "Social_Media_Per_Day",
      options: [
        "Less than 30 minutes",
        "30-60 minutes",
        "1-2 hours",
        "2-3 hours",
        "Over 3 hours"
      ]
    }
  },
  prePage: function() {},
  postPage: function() {
    let selection_result = [];
    $(`[name='${current_page.selection_question.a.name}']:checked`).each(
      function() {
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
  check: function() {
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
        result = false;
      }
    }

    if (input === undefined || input === "") {
      result = false;
    }

    selection.each(function() {
      selection_result.push(this.value);
    });
    if (selection_result.length == 0) {
      result = false;
    }

    return result;
  }
};

var disagreementPage = {
  description: {
    a: {
      title: "Survey has completed !",
      contents: [
        'We are sorry about that since you select "disagree", you won\'t get the code.',
        "Thank you for your participation !"
      ],
      img: ""
    }
  },
  prePage: function() {
    $("#page").hide();
    $("#nextBtn").hide();
  },
  postPage: function() {},
  check: function() {}
};

var finishPage = {
  description: {
    a: {
      title: "Survey has completed !",
      contents: ["Thank you for your participation !"],
      img: ""
    }
  },
  prePage: function() {
    $("#page").hide();
    $("#nextBtn").hide();

    let database = firebase.database();
    let root = database.ref("/");
    let ref = root.push();
    ref.set(storeData);
  },
  postPage: function() {},
  check: function() {}
};
