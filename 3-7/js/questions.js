var Version = "3-7";
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
      title: "Instagram 限時動態觀看調查",
      contents: [
        "親愛的受訪者您好：",
        "本問卷採不記名方式 ，過程中不會紀錄任何個人資料，收集的資料僅供學術研究使用 ，絕不對外公開，你可以自由決定要參與及退出參與該研究。在此衷心感謝您的合作與協助。",
        "國立臺北大學企業管理系研究所",
        "指導教授：丁姵如 博士",
        "研 究 生：陳怡瑄 ",
      ],
      img: "",
    },
  },
  multiple_choice_question: {
    a: {
      title: "請問你是否同意參與該研究?",
      name: "Agreement",
      options: ["同意", "不同意"],
    },
  },
  prePage: function () {
    hide_description_img();
  },
  postPage: function () {
    let result = $(
      `[name='${this.multiple_choice_question.a.name}']:checked`
    ).val();

    if (result === "同意") {
      current_page_count++;
      current_page = page2;
      total_timer.startTimer();
    } else {
      current_page = disagreePage;
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
      title: "使用限時動態的經驗",
      contents: ["請您依照個人實際情況或想法進行填答"],
      img: "",
    },
  },
  multiple_choice_question: {
    a: {
      title: "請問您是否使用過facebook或Instagram中的「限時動態」?",
      name: "Experience_Story",
      options: ["是", "否"],
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
      title: "觀看以下的圖片並回答以下問題",
      contents: [" "],
      img: "image/page1.jpg",
    },
  },
  normal_question: {
    a: {
      title: "我可以馬上知道圖片中的品牌",
      name: "Know_Brand_Immediately",
      least: "非常不同意",
      most: "非常同意",
    },
  },
  prePage: function () {},
  postPage: function () {
    let result1 = $(`[name='${this.normal_question.a.name}']:checked`).val();

    storeData[this.normal_question.a.name] = result1;
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
      title: "限時動態",
      contents: [
        "你將會在下一頁看到一則「限時動態」",
        "操作方法：",
        "你可以藉由點擊圖片旁的箭頭，切換到下一頁",
        "當你想關掉這則限時動態時，你隨時可以點擊畫面中的叉叉，或者黑色的地方。",
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
      title: "點擊下方限時動態的圖示",
      contents: ["前往下一頁前，請先觀看這則「限時動態」"],
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
      title: "實際觀看頁數",
      contents: ["請您依照個人實際情況或想法進行填答"],
      img: "",
    },
  },
  image_multiple_choice_question: {
    a: {
      title: "實際上，看到第幾頁時，就不想再繼續看下去",
      name: "Stop_Read_Page",
      options: [
        {
          option_title: "第一頁",
          img: "image/page1.jpg",
        },
        {
          option_title: "第二頁",
          img: "image/page2.jpg",
        },
        {
          option_title: "第三頁",
          img: "image/page3.jpg",
        },
        {
          option_title: "第四頁",
          img: "image/page4.jpg",
        },
        {
          option_title: "第五頁",
          img: "image/page5.jpg",
        },
        {
          option_title: "我從頭到尾都沒有想關掉這則限時動態",
          img: "image/page6.jpg",
        },
      ],
    },
  },
  normal_question: {
    a: {
      title: "我是願意把這則限時動態看完的",
      name: "Happy_To_Finish_Story",
      least: "非常不同意",
      most: "非常同意",
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
      title: "請您依照個人實際情況或想法進行填答",
      contents: [],
      img: "",
    },
  },
  normal_question: {
    a: {
      title: "這則限時動態有引起我的好奇心",
      name: "Cause_My_Curious",
      least: "非常不同意",
      most: "非常同意",
    },
    b: {
      title: "看這則限時動態時，我想知道這個品牌是什麼",
      name: "Want_To_Know_The_Brand",
      least: "非常不同意",
      most: "非常同意",
    },
    c: {
      title: "看這則限時動態的時候，我對這個品牌不怎麼感興趣",
      name: "Is_Not_Interested_In_The_Brand",
      least: "非常不同意",
      most: "非常同意",
    },
    d: {
      title: "這則限時動態讓我感到好奇",
      name: "Make_Me_Curious",
      least: "非常不同意",
      most: "非常同意",
    },
    e: {
      title: "看這則限時動態的時候，我想快點知道是哪個品牌",
      name: "Want_To_Know_The_Brand_Quickly",
      least: "非常不同意",
      most: "非常同意",
    },
    f: {
      title: "看這則限時動態的時候，我有意願認識這個品牌",
      name: "Is_Willing_To_Know_The_Brand",
      least: "非常不同意",
      most: "非常同意",
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
      title: "請您依照個人實際情況或想法進行填答",
      contents: [],
      img: "",
    },
  },
  normal_question: {
    a: {
      title: "我知道可以透過點擊螢幕上的箭頭切換到下一頁 ",
      name: "Understand_Can_Proceed_To_Next_By_Arrow",
      least: "非常不同意",
      most: "非常同意",
    },
    b: {
      title: "我感覺我被迫要看完這則限時動態",
      name: "Feel_Forced_To_Finish_Story",
      least: "非常不同意",
      most: "非常同意",
    },
    c: {
      title: "我覺得我可以控制觀看速度",
      name: "Can_Control_Viewing_Speed",
      least: "非常不同意",
      most: "非常同意",
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
      title: "請您依照個人實際情況或想法進行填答",
      contents: [],
      img: "",
    },
  },
  normal_question: {
    a: {
      title: "我喜歡這則限時動態",
      name: "Enjoy_Story",
      least: "非常不同意",
      most: "非常同意",
    },
    b: {
      title: "看這則限時動態很好玩",
      name: "Watching_This_Story_Is_Fun",
      least: "非常不同意",
      most: "非常同意",
    },
    c: {
      title: "我認為這則限時動態一點都不有趣",
      name: "Not_Interesting_In_Story",
      least: "非常不同意",
      most: "非常同意",
    },
    d: {
      title: "在看這則限時動態時，我覺得樂在其中",
      name: "Thinking_About_How_Much_I_Enjoyed",
      least: "非常不同意",
      most: "非常同意",
    },
    e: {
      title: "在看這則限時動態時，我的注意力不容易分散。",
      name: "Attention_Dose_Not_Get_Diverted",
      least: "非常不同意",
      most: "非常同意",
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

    storeData[this.normal_question.a.name] = result1;
    storeData[this.normal_question.b.name] = result2;
    storeData[this.normal_question.c.name] = result3;
    storeData[this.normal_question.d.name] = result4;
    storeData[this.normal_question.e.name] = result5;

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
      title: "請您依照個人實際情況或想法進行填答",
      contents: [],
      img: "",
    },
  },
  normal_question: {
    a: {
      title: "這則限時動態整體感覺是好的",
      name: "Overall_Story_Evaluation",
      least: "非常不同意",
      most: "非常同意",
    },
    b: {
      title: "觀看這則限時動態是令人感到愉悅",
      name: "Watching_Story_Feel_Pleasant",
      least: "非常不同意",
      most: "非常同意",
    },
    c: {
      title: "這則限時動態是討人喜歡的",
      name: "Story_Is_Favorable",
      least: "非常不同意",
      most: "非常同意",
    },
    d: {
      title: "這則限時動態是有吸引力的",
      name: "This_Story_Is_Appeal",
      least: "非常不同意",
      most: "非常同意",
    },
    e: {
      title: "看完這則限時動態後，我記得限時動態中的內容",
      name: "Remember_The_Story",
      least: "非常不同意",
      most: "非常同意",
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

    storeData[this.normal_question.a.name] = result1;
    storeData[this.normal_question.b.name] = result2;
    storeData[this.normal_question.c.name] = result3;
    storeData[this.normal_question.d.name] = result4;
    storeData[this.normal_question.e.name] = result5;

    current_page_count++;
    current_page = page11;
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

var page11 = {
  description: {
    a: {
      title: "請您依照個人實際情況或想法進行填答",
      contents: [],
      img: "",
    },
  },
  normal_question: {
    a: {
      title: "觀看這個品牌的限時動態是令人感到愉悅",
      name: "Watching_This_Brand_Story_Is_Pleasant",
      least: "非常不同意",
      most: "非常同意",
    },
    b: {
      title: "這個品牌是有吸引力的 ",
      name: "Brand_Is_Attractive",
      least: "非常不同意",
      most: "非常同意",
    },
    c: {
      title: "這品牌整體感覺是好的",
      name: "Overall_Brand_Evaluation",
      least: "非常不同意",
      most: "非常同意",
    },
    d: {
      title: "這個品牌是討人喜歡的",
      name: "Brand_Is_Favorable",
      least: "非常不同意",
      most: "非常同意",
    },
    e: {
      title: "看完這則限時動態後，我記得限時動態中的品牌",
      name: "Remember_The_Brand",
      least: "非常不同意",
      most: "非常同意",
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
      title: "請您依照個人實際情況或想法進行填答",
      contents: [],
      img: "",
    },
  },
  normal_question: {
    a: {
      title: "接下來三個月內，我可能購買該品牌的可能性有多少？",
      name: "May_Buy_Product_Next_Three_Month",
      least: "非常不同意",
      most: "非常同意",
    },
    b: {
      title: "這則限時動態讓我想購買該品牌的產品",
      name: "Did_Story_Motivate_To_Purchase",
      least: "非常不同意",
      most: "非常同意",
    },
    c: {
      title: "下次若有機會，我會考慮購買該品牌產品",
      name: "I_Will_Consider_Buying_This_Brand",
      least: "非常不同意",
      most: "非常同意",
    },
    d: {
      title: "我原本就喜歡這個品牌",
      name: "Originally_Like_The_Brand",
      least: "非常不同意",
      most: "非常同意",
    },
    e: {
      title: "當選擇這類商品時，我會優先考量這個品牌",
      name: "This_Brand_Top_Priority",
      least: "非常不同意",
      most: "非常同意",
    },
    f: {
      title: "我可以在眾多競爭品牌中辨認出該品牌",
      name: "Can_Recognize_From_Other_Brand",
      least: "非常不同意",
      most: "非常同意",
    },
    g: {
      title: "如果可以，我不會購買其他品牌",
      name: "I_Wont_Buy_Other_Brand",
      least: "非常不同意",
      most: "非常同意",
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
    current_page = page13;
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

var page13 = {
  description: {
    a: {
      title: "請您依照個人實際情況或想法進行填答",
      contents: [],
      img: "",
    },
  },
  normal_question: {
    a: {
      title: "我認為挑戰是成長和學習的機會",
      name: "View_Challenging_As_Opportunity_To_Grow_And_Learn",
      least: "非常不同意",
      most: "非常同意",
    },
    b: {
      title: "我一直追求不同體驗，來探索更好的自己",
      name: "Looking_For_Experience_Challenge_How_I_Think_About_Myself",
      least: "非常不同意",
      most: "非常同意",
    },
    c: {
      title: "我喜歡學習我不熟悉的事物",
      name: "Enjoy_Learning_About_Subjects_That_Are_Unfamiliar",
      least: "非常不同意",
      most: "非常同意",
    },
    d: {
      title: "我喜歡深入思考某些事情",
      name: "Think_In_Depth",
      least: "非常不同意",
      most: "非常同意",
    },
    e: {
      title: "我認為學習新知識是一件快樂的事",
      name: "Fascinating_To_Learn_New_Information",
      least: "非常不同意",
      most: "非常同意",
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

    storeData[this.normal_question.a.name] = result1;
    storeData[this.normal_question.b.name] = result2;
    storeData[this.normal_question.c.name] = result3;
    storeData[this.normal_question.d.name] = result4;
    storeData[this.normal_question.e.name] = result5;

    current_page_count++;
    current_page = page14;
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

var page14 = {
  description: {
    a: {
      title: "請您依照個人實際情況或想法進行填答",
      contents: [],
      img: "",
    },
  },
  normal_question: {
    a: {
      title: "我會因為思考某個問題而徹夜難眠",
      name: "Thinking_About_Difficult_Solution_Keep_Me_Awake",
      least: "非常不同意",
      most: "非常同意",
    },
    b: {
      title: "我可以花很長的時間解題，因為沒有找到答案前我無法停止思考",
      name: "I_Cant_Rest_Without_Knowing_The_Answer",
      least: "非常不同意",
      most: "非常同意",
    },
    c: {
      title: "當無法解決問題時，我會感到沮喪，所以我會更加努力的尋找解答",
      name: "I_Feel_Frustrated_If_I_Cant_Figure_Out_Solution",
      least: "非常不同意",
      most: "非常同意",
    },
    d: {
      title: "對於必須解決的問題我不會輕易放棄",
      name: "Work_Relentlessly_At_Problems_That_I_Feel_Must_Be_Solved",
      least: "非常不同意",
      most: "非常同意",
    },
    e: {
      title: "沒有獲得我需要的資訊會讓我感到懊惱",
      name: "Frustrates_Me_Not_Having_All_The_Information",
      least: "非常不同意",
      most: "非常同意",
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

    storeData[this.normal_question.a.name] = result1;
    storeData[this.normal_question.b.name] = result2;
    storeData[this.normal_question.c.name] = result3;
    storeData[this.normal_question.d.name] = result4;
    storeData[this.normal_question.e.name] = result5;

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
      title: "基本資料填寫",
      contents: [""],
      img: "",
    },
  },
  input_question: {
    a: {
      title: "請填入手機後三碼",
      name: "Last_Three_Digits_Of_Phone_Number",
    },
  },
  multiple_choice_question: {
    a: {
      title: "性別",
      name: "Gender",
      options: ["男", "女"],
    },
    b: {
      title: "年齡",
      name: "Age",
      options: [
        "18歲以下",
        "18-24歲",
        "25-34歲",
        "35-44歲",
        "45-54歲",
        "55-64歲",
        "65歲以上",
      ],
    },
    c: {
      title: "教育程度",
      name: "Education",
      options: ["國中及以下", "高中(職)", "專科/大學", "研究所(含)以上"],
    },
    d: {
      title: "職業",
      name: "Career",
      options: ["學生", "非學生"],
    },
    e: {
      title: "您每天花費多少時間在社群媒體上？",
      name: "Social_Media_Per_Day",
      options: ["少於30分鐘", "30-60分鐘", "1-2時", "2-3時", "超過3小時"],
    },
  },
  prePage: function () {
    hide_description_img();
  },
  postPage: function () {
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

    return result;
  },
};

var finishPage = {
  description: {
    a: {
      title: "問卷完成!",
      contents: ["非常感謝您！我們已經收到您填寫的問卷 。"],
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

var disagreePage = {
  description: {
    a: {
      title: "問卷完成!",
      contents: ["非常感謝您！我們已經收到您填寫的問卷 。"],
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
