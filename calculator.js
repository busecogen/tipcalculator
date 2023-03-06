//alert("imported")
$(function () {
  var resettable = false;
  function calculate(e = $(".selected")) {
    var bill = parseFloat($("#bill").val());
    var people = parseInt($("#people").val());
    var tip;
    if (e.attr("id") == "custom-td") {
      tip = parseInt($("#custom").val().split("%")[0]);
      if (tip > 100) {
        tip = 100.0;
      } else if (tip < 0) {
        tip = 0.0;
      }
    } else {
      tip = parseInt(e.text().split("%")[0]);
    }
    var tipamount = ((bill * tip) / 100 / people).toFixed(2);
    var total = ((bill + (bill * tip) / 100) / people).toFixed(2);
    if (
      isNaN(tipamount) ||
      isNaN(total) ||
      tipamount == Infinity ||
      total == Infinity
    ) {
      resettable = false;
      $("#tipmoney").text("$" + "0.00");
      $("#totalmoney").text("$" + "0.00");
    } else {
      resettable = true;
      $(".reset").css("background-color", "hsl(172, 67%, 45%)");
      $("#tipmoney").text("$" + tipamount);
      $("#totalmoney").text("$" + total);
    }
  }

  $(".user")
    .on("focus", function () {
      if (parseFloat(this.value) == 0) {
        this.value = "";
      }
    })
    .on("focusout", function () {
      if (this.value == "" || isNaN(this.value)) {
        this.value = 0;
      }
    })
    .on("click",function(){
      $(this).css("color","hsl(183, 100%, 15%)");
    })

  $("#bill")
    .mask("9999999.99", { reverse: true })
    .on("click", function () {
      $(this).css("border", "solid 2px hsl(172, 67%, 45%)");
    })
    .on("focusout", function () {
      $(this).css("border", "none");
    });

  $("#people")
    .mask("999")
    .focusout(function () {
      if (parseFloat(this.value) == 0) {
        $(this).css("border", "solid 2px hsl(25, 84%, 44%)");
        $(".zero").text("Can't be zero");
      } else {
        $(this).css("border", "none");
      }
    })
    .focus(function () {
      $(".zero").text("");
    });

  $("#custom")
    .on("focus", function () {
      if ((this.value = "Custom")) {
        this.value = "";
      }
    })
    .on("focusout", function () {
      let word = this.value;
      if (isNaN(word) || word == "") {
        this.value = "Custom";
      } else {
        if (parseInt(word) > 100) {
          this.value = "100%";
        } else if (parseInt(word) < 0) {
          this.value = "0%";
        } else {
          this.value = word + "%";
        }
      }
    });

  $(".grid-item").on("click", function () {
    $(this).addClass("selected");
    calculate($(this));
    if ($(this).attr("id") == "custom-td") {
      $(this).css("background-color", "hsl(189, 41%, 97%)");
      $(this).css("border", "solid 1px hsl(172, 67%, 45%)");
    } else {
      $("#custom-td").css("border", "none");
    }
    $(".selected").not(this).removeClass("selected");
  });

  $(".number").on("input", function () {
    calculate();
  });

  $(".reset")
    .on("click", function () {
      $(this).css("background-color", "hsl(186, 14%, 43%)");
      resettable = false;
      $("#bill").val("0");
      $(".selected").removeClass("selected");
      $("#people").val("0");
      $("#tipmoney").text("$" + "0.00");
      $("#totalmoney").text("$" + "0.00");
      $(".user").css("color","hsl(185, 41%, 84%)");

    })
    .on("mouseenter", function () {
      if (resettable) $(this).css("background-color", "hsl(185, 41%, 84%)");
    })
    .on("mouseleave", function () {
      if (resettable) {
        $(this).css("background-color", "hsl(172, 67%, 45%)");
      } else {
        $(this).css("background-color", "hsl(186, 14%, 43%);");
      }
    });
});
