var j = 0;
var wrong_attempts = 0;

function make_slides(f) {
  var slides = {};

  slides.i0 = slide({
    name: "i0",
    start: function() {
        exp.startT = Date.now();
        $(".start_over").hide();
    }
  });

  // Set up the introduction slides.
  for (var i = 0; i < 6; i++) {
    slides["introduction_" + i] = slide({
      name: "introduction_" + i,
      start: function() {},
      button: function() { exp.go(); }
    });
  }

// Set up the catch trial slide.
  slides.catch_trial = slide({
    name: "catch_trial",
    start: function() {
      $(".catch_error").hide();

      exp.question = ["How many corners is each person walking to?",
                      "Are people always on their way to an corner?",
                      "Can people move diagonally?",
                      "What color are the walls?"];

      $(".catch_slide").html(
        "<p>" + exp.question[0] + "</p>" +
        "<p>" +
        "<label><input type=\"radio\" name=\"question_0\" value=\"0\"/>1</label>" +
        "<label><input type=\"radio\" name=\"question_0\" value=\"1\"/>2</label>" + 
        "<label><input type=\"radio\" name=\"question_0\" value=\"2\"/>3</label>" +
        "<label><input type=\"radio\" name=\"question_0\" value=\"-1\"/>Not sure</label>" +
        "</p>" +
        "<p>" + exp.question[1] + "</p>" +
        "<p>" +
        "<label><input type=\"radio\" name=\"question_1\" value=\"0\"/>Yes</label>" +
        "<label><input type=\"radio\" name=\"question_1\" value=\"1\"/>No</label>" +
        "<label><input type=\"radio\" name=\"question_1\" value=\"-1\"/>Not sure</label>" +
        "</p>" +
        "<p>" + exp.question[2] + "</p>" + 
        "<p>" +
        "<label><input type=\"radio\" name=\"question_2\" value=\"0\"/>Yes</label>" +
        "<label><input type=\"radio\" name=\"question_2\" value=\"1\"/>No</label>" + 
        "<label><input type=\"radio\" name=\"question_2\" value=\"-1\"/>Not sure</label>" +
        "</p>" +
        "<p>" + exp.question[3] + "</p>" +
        "<p>" +
        "<label><input type=\"radio\" name=\"question_3\" value=\"0\"/>White</label>" +
        "<label><input type=\"radio\" name=\"question_3\" value=\"1\"/>Gray</label>" +
        "<label><input type=\"radio\" name=\"question_3\" value=\"2\"/>Red</label>" +
        "<label><input type=\"radio\" name=\"question_3\" value=\"-1\"/>Not sure</label>" +
        "</p>");
    },
    button: function() {
      exp.target_0 = $("input[name='question_0']:checked").val();
      exp.target_1 = $("input[name='question_1']:checked").val();
      exp.target_2 = $("input[name='question_2']:checked").val();
      exp.target_3 = $("input[name='question_3']:checked").val();

      // If a participant fails to answer every question.
      if ((exp.target_0 === undefined) || (exp.target_1 === undefined) || (exp.target_2 === undefined) ||
          (exp.target_3 === undefined)) {
          $(".catch_error").show();
      }

      // If a participant answers any question incorrectly..
      else if ((exp.target_0 != "0") || (exp.target_1 != "0") || (exp.target_2 != "1") || 
               (exp.target_3 != "1")) {
        $(".catch_error").hide();
        wrong_attempts++;
        exp.go(-6);
        $(".start_over").show();
      }
      else {
        exp.catch_trials.push({
          "question_0": exp.question[0],
          "target_0": exp.target_0,
          "question_1": exp.question[1],
          "target_1": exp.target_1,
          "question_2": exp.question[2],
          "target_2": exp.target_2,
          "question_3": exp.question[3],
          "target_3": exp.target_3,
          "wrong_attempts": wrong_attempts
        });
        exp.go();
      }
    }
  });

  // Set up a trial slide.
  function start() {
    $(".trial_error").hide();
    $(".slider_row").remove();

    $(".prompt").html("Consider the following new room and person.");
    $(".stimulus").html("<img style=\"height:250px;width:auto;border:1px solid black;\" " +
                        "src=\"../stimuli/experiment_1/" + exp.trials[j] + "\"></img>");


    exp.questions = ["Which door did they come from?",
                     "Which corner is the person going for?"];

    $("#multi_slider_table_" + j).append(
      "<tr>" + 
      (exp.num_doors[j] > 1 ? 
        "<th></th>" +
        "<th colspan=\"2\">" + exp.questions[0] + "</th>" : "") +
      "<th></th>" + 
      "<th colspan=\"2\">" + exp.questions[1] + "</th>" +
      "<tr>" +
      (exp.num_doors[j] > 1 ? 
        "<td></td>" +
        "<td style=\"text-align:left;\">definitely not</td>" +
        "<td style=\"text-align:right;\">definitely</td>" +
        "<td width=\"100px\"></td>": "<td></td>") +
      "<td style=\"text-align:left;\">definitely not</td>" +
      "<td style=\"text-align:right;\">definitely</td>" +
      "</tr>" +
      "<tr class=\"slider_row\">" +
      (exp.num_doors[j] > 1 ? 
        "<td class=\"slider_target\"><img src=\"../stimuli/experiment_1/1.png\" " +
        "alt=\"\" style=\"width:35px;height:auto;\"></td>" + 
        "<td colspan=\"2\">" +
        "<div id=\"door_0\" class=\"slider\">-------[ ]--------</div></td>" : "") +
      "<td class=\"slider_target\"><img src=\"../stimuli/experiment_1/A.png\" " +
      "alt=\"\" style=\"width:35px;height:auto;\"></td>" +
      "<td colspan=\"2\">" + 
      "<div id=\"goal_0\" class=\"slider\">-------[ ]--------</div>" + 
      "</td>" +
      "</tr>" + 
      "<tr>" +
      (exp.num_doors[j] > 1 ? 
        "<td></td>" +
        "<td style=\"text-align:left;\">definitely not</td>" +
        "<td style=\"text-align:right;\">definitely</td>" : "") +
      "<td></td>" +
      "<td style=\"text-align:left;\">definitely not</td>" +
      "<td style=\"text-align:right;\">definitely</td>" +
      "</tr>" +
      "<tr class=\"slider_row\">" +
      (exp.num_doors[j] > 1 ? 
        "<td class=\"slider_target\"><img src=\"../stimuli/experiment_1/2.png\" " +
        "alt=\"\" style=\"width:35px;height:auto;\"></td>" + 
        "<td colspan=\"2\">" +
        "<div id=\"door_1\" class=\"slider\">-------[ ]--------</div></td>" : "") +
      "<td class=\"slider_target\"><img src=\"../stimuli/experiment_1/B.png\" " +
      "alt=\"\" style=\"width:35px;height:auto;\"></td>" +
      "<td colspan=\"2\">" + 
      "<div id=\"goal_1\" class=\"slider\">-------[ ]--------</div>" + 
      "</td>" +
      "</tr>" + 
      "<tr>" +
      (exp.num_doors[j] > 2 ? 
        "<td></td>" +
        "<td style=\"text-align:left;\">definitely not</td>" +
        "<td style=\"text-align:right;\">definitely</td>" :
        (exp.num_doors[j] == 2 ? "<td></td><td colspan=\"2\"></td>" : "")) +
      "<td></td>" +
      "<td style=\"text-align:left;\">definitely not</td>" +
      "<td style=\"text-align:right;\">definitely</td>" +
      "</tr>" +
      "<tr class=\"slider_row\">" +
      (exp.num_doors[j] > 2 ? 
        "<td class=\"slider_target\"><img src=\"../stimuli/experiment_1/3.png\" " +
        "alt=\"\" style=\"width:35px;height:auto;\"></td>" +
        "<td colspan=\"2\">" + 
        "<div id=\"door_2\" class=\"slider\">-------[ ]--------</div></td>" :
        (exp.num_doors[j] == 2 ? "<td></td><td colspan=\"2\"></td>" : "")) +
      "<td class=\"slider_target\"><img src=\"../stimuli/experiment_1/C.png\" " +
      "alt=\"\" style=\"width:35px;height:auto;\"></td>" +
      "<td colspan=\"2\">" + 
      "<div id=\"goal_2\" class=\"slider\">-------[ ]--------</div>" + 
      "</td>" +
      "</tr>");
      utils.match_row_height("#multi_slider_table_" + j, ".slider_target");
      utils.make_slider("#door_0", make_slider_callback(0));
      utils.make_slider("#goal_0", make_slider_callback(1));
      utils.make_slider("#door_1", make_slider_callback(2));
      utils.make_slider("#goal_1", make_slider_callback(3));
      utils.make_slider("#door_2", make_slider_callback(4));
      utils.make_slider("#goal_2", make_slider_callback(5));

      exp.sliderPost = [];
      if (exp.num_doors[j] == 1) {
        exp.sliderPost[0] = -1;
        exp.sliderPost[2] = -1;
        exp.sliderPost[4] = -1;
      }
      else if (exp.num_doors[j] == 2) {
        exp.sliderPost[4] = -1;
      }
    }

  // Run when the "Continue" button is hit on a slide.
  function button() {
    if ((exp.sliderPost[0] === undefined) || (exp.sliderPost[1] === undefined) || 
        (exp.sliderPost[2] === undefined) || (exp.sliderPost[3] === undefined) ||
        (exp.sliderPost[4] === undefined) || (exp.sliderPost[5] === undefined)) { 
        $(".trial_error").show(); 
    }
    else {
        exp.data_trials.push({
          "trial_num": j + 1,
          "layout": exp.trials[j],
          "1": exp.sliderPost[0],
          "2": exp.sliderPost[2],
          "3": exp.sliderPost[4],
          "A": exp.sliderPost[1],
          "B": exp.sliderPost[3],
          "C": exp.sliderPost[5]
        });
        j++;
        exp.go();
    }
  }

  function make_slider_callback(i) {
    return function(event, ui) { exp.sliderPost[i] = ui.value; };
  }

  // Stitches together all of the trial slides.
  for (var i = 1; i <= exp.num_trials; i++) {
    slides["trial" + i] = slide({
      name: "trial" + i,
      start: start,
      button: button
    });
  }

  slides.subj_info = slide({
    name: "subj_info",
    start: function() {},
    submit: function(e) {
      exp.subj_data = {
        "language": $("#language").val(),
        "enjoyment": $("#enjoyment").val(),
        "asses": $("input[name='assess']:checked").val(),
        "age": $("#age").val(),
        "gender": $("#gender").val(),
        "education": $("#education").val(),
        "problems": $("#problems").val(),
        "fairprice": $("#fairprice").val(),
        "comments": $("#comments").val()
      };
      exp.go();
    }
  });

  slides.thanks = slide({
    name: "thanks",
    start: function() {
      exp.data = {
        "trials": exp.data_trials,
        "catch_trials": exp.catch_trials,
        "system": exp.system,
        "subject_information": exp.subj_data,
        "time_in_minutes": (Date.now() - exp.startT) / 60000
      };
      // setTimeout(function() {turk.submit(exp.data);}, 1000);
      $(".end").html("<form name=\"SendData\" method=\"post\" action=\"end.php\">" +
        "<input type=\"hidden\" name=\"ExperimentResult\" value='" + JSON.stringify(exp.data) + "' />" +
        "<button type=\"submit\">Get code</button>" +
        "</form>");
    }
  });

  return slides;
}

function init() {

  // Set up the payment amount and Unique Turker.
  exp.time = 20;
  $(".time").html(exp.time);
  $(".payment").html("$" + (exp.time*6/60).toPrecision(3));
  repeatWorker = false;
  (function() {
    var ut_id = "lopez-brau_06-18-2019_ImageInference";
    if (UTWorkerLimitReached(ut_id)) {
      $('.slide').empty();
      repeatWorker = true;
      alert("You have already completed the maximum number of HITs allowed by this requester. Please click " + 
            "'Return HIT' to avoid any impact on your approval rating.");
    }
  })();

  // Set up trial slide information.
  trials = trials();
  exp.trials = _.pluck(trials, "name");
  exp.num_trials = exp.trials.length;
  $(".num_trials").html(exp.num_trials);
  exp.num_doors = _.pluck(trials, "num_doors");
  exp.character = get_characters(characters);
  $(".character").html(exp.character);
  exp.data_trials = [];
  exp.catch_trials = [];
  

  // Get user system specs.
  exp.system = {
    Browser: BrowserDetect.browser,
    OS: BrowserDetect.OS,
    screenH: screen.height,
    screenUH: exp.height,
    screenW: screen.width,
    screenUW: exp.width
  };

  // Stitch together the blocks of the experiment.
  exp.structure = ["i0", "introduction_0", "introduction_1", "introduction_2", "introduction_3",
                   "introduction_4", "introduction_5", "catch_trial"]; 
  for (var k = 1; k <= exp.num_trials; k++) {
    exp.structure.push("trial" + k);
  }
  exp.structure.push("subj_info");
  exp.structure.push("thanks");
 
  // Make and embed the slides.
  exp.slides = make_slides(exp);
  embed_slides(exp.num_trials);

  // Get the length of the experiment.
  exp.nQs = utils.get_exp_length();

  // Hide the slides.
  $(".slide").hide();

  // Make sure Turkers have accepted HIT (or you're not in MTurk).
  $("#start_button").click(function() {
    if (turk.previewMode) {
      $("#mustaccept").show();
    }
    else {
      $("#start_button").click(function() { $("#mustaccept").show(); });
      exp.go();
    }
  });

  // Launch the slides.
  exp.go();
}
