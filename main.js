
// 全域變數
let area = {
  "kaohsiung": "高雄",
  "taichung": "台中",
  "taipei": "台北"
};


// data欄位名稱 : form欄位的name屬性及中文名稱
let formInputs = {
  "name": "套票名稱",
  "imgUrl": "圖片網址",
  "area": "景點地區",
  "price": "套票金額",
  "group": "套票組數",
  "rate": "套票星級",
  "description": "套票描述",

};


let data = [
  {
    "id": 0,
    "name": "肥宅心碎賞櫻3日",
    "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
    "area": "高雄",
    "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
    "group": 87,
    "price": 1400,
    "rate": 10
  },
  {
    "id": 1,
    "name": "貓空纜車雙程票",
    "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    "area": "台北",
    "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
    "group": 99,
    "price": 240,
    "rate": 2
  },
  {
    "id": 2,
    "name": "台中谷關溫泉會1日",
    "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    "area": "台中",
    "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
    "group": 16,
    "price": 3500,
    "rate": 6
  },
  {
    "id": 3,
    "name": "綠島自由行套裝行程",
    "imgUrl": "https://i.imgur.com/QXa1fMZ.png",
    "area": "高雄",
    "description": "嚴選超高CP值綠島自由行套裝行程，多種綠島套裝組合。",
    "group": 87,
    "price": 1400,
    "rate": 10
  },
  {
    "id": 4,
    "name": "清境高空觀景步道",
    "imgUrl": "https://i.imgur.com/4UHm8WX.png",
    "area": "台北",
    "description": "清境農場青青草原數十公頃碧草，這些景觀豐沛了清境觀景步道的風格，也涵養它無可取代的特色。",
    "group": 99,
    "price": 240,
    "rate": 2
  },
  {
    "id": 5,
    "name": "山林悠遊套票",
    "imgUrl": "https://i.imgur.com/H97Wgfn.png",
    "area": "台中",
    "description": "山林悠遊套票，結合南投清境高空步道、雙龍瀑布七彩吊橋、瑞龍瀑布園區之熱門景點。",
    "group": 20,
    "price": 1765,
    "rate": 2
  },

];
//END 全域變數

// common function
$.fn.pressEnter = function (fn) {

  return this.each(function () {
    $(this).bind('enterPress', fn);
    $(this).keyup(function (e) {
      if (e.keyCode == 13) {
        $(this).trigger("enterPress");
      }
    })
  });
};




$(function () {

  init();


  //START jquery valdiation plugin

  /* 常用檢測屬性
     required:必填
     noSpace:空白
     minlength:最小長度
     maxlength:最大長度
     email:信箱格式
     number:數字格式
     url:網址格式
     */
  $('.addTicket-form').validate({
    onfocusout: false,
    onkeyup: false,
    debug: true,
    ignore: '.addTicket-btn.btn, :hidden',

    rules: {
      套票名稱: {
        required: true,

        // 自定義規則,避免使用者重複輸入相同套票名稱
        uniqueTicketName: true,
      },
      圖片網址: {
        url: true,
      },
      景點地區: {
        required: true,
      },
      套票金額: {
        required: true,
        number: true,
        min: 0,

      },
      套票星級: {
        required: true,
        number: true,
        min: 1,
        max: 10,
      },
      套票組數: {
        required: true,
        min: 1,
      },
      套票描述: {
        required: true,
        maxlength: 100
      },

    },
    messages: {
      套票描述: {
        maxlength: jQuery.validator.format("套票描述最多只能輸入{0}個字元")
      },
      套票組數: {
        min: $.validator.format("套票組數最少為{0}個"),
      },
      套票金額: {
        min: $.validator.format("請輸入有效金額,若為免費請輸入0"),

      },
      套票星級: {
        required: true,
        number: true,
        min: $.validator.format("套票星級最小為{0}"),
        max: $.validator.format("套票星級最大為{0}"),
      },
    },

    errorPlacement: function (error, element) {
      let obj = $(".addTicket-form").validate().settings.rules;
      let nameArr = Object.keys(obj);
      for (n of nameArr) {
        if (element.attr("name") == n) {
          let errIcon = ` <i class="fas fa-exclamation-circle"></i>`;

          // 星級欄位未填寫時會顯示true,找不出錯誤原因,先用取代的方式
          let errText = $(error).text() == "true" ? $.validator.messages.required : $(error).text();
          $(`p[data-message='${n}']`).html(`${errIcon} ${errText}`);
        }
      }
    },

    invalidHandler: function (event, validator) {

      // 'this' refers to the form
      var errors = validator.numberOfInvalids();
      if (errors) {
        var message = errors == 1
          ? 'You missed 1 field. It has been highlighted'
          : 'You missed ' + errors + ' fields. They have been highlighted';
      } else {
      }
    }
  });

  // 自定義驗證方法
  $.validator.addMethod("uniqueTicketName", function (value, element) {
    let result = true;
    value = (value + "").trim();
    for (o of data) {
      if (o["name"] == value) {
        result = false;
      }
    }
    return result;
  }, `此名稱已被使用`);

  // 覆蓋錯誤訊息的預設值
  $.extend($.validator.messages, {
    required: `此欄位為必填`,
    url: "請輸入有效網址",

    minlength: "最少需輸入{0}個字元",
    maxlength: $.validator.format("最多只能輸入{0}個字元"),

    min: $.validator.format("請輸入大或等於{0}的數字"),
    max: $.validator.format("請輸入小或等於{0}的數字"),
  });
  //END jquery valdiation plugin

  // function
  function init() {
    setAreaOption(area);
    showTicketCards(data);
    showTicketCardsTotal(data);

  }
  function setAreaOption(area) {
    let ticketRegionHtml = $("#ticketRegion").html();
    let regionSearchHtml = $("select[class='regionSearch']").html();

    let template = $("#areaOptionTemplate").html();
    let options = "";

    for (let k in area) {
      let t = template.replace("{{value}}", k).replace("{{name}}", area[k]);
      options += t;
    }

    $("#ticketRegion").html(ticketRegionHtml + options);
    $("select[class='regionSearch']").html(regionSearchHtml + options);
  }
  function showTicketCards(data) {
    $(".cantFind-area").hide();
    // $('.regionSearch').prop('disabled', false);

    if (data.length <= 0) {
      $(".ticketCard-area").html("");
      $(".cantFind-area").show();
      // $('.regionSearch').prop('disabled', 'disabled');
      return;
    };

    let ticketCardTemplateHtml = $("#ticketCardTemplate").html();
    let ticketCardsHtml = "";
    let keys = Object.keys(data[0]);

    let keyword = ($("#inputSearchTicketName").val() + "").trim();
    data.forEach((o) => {

      let template = ticketCardTemplateHtml;



      keys.forEach((k) => {
        if (keyword !== "") {

          let v = (o[k] + "").replace(keyword, `<span class='keyword-highlight'>${keyword}</span>`);
          template = template.replace(`{{${k}}}`, v);
        } else {
          template = template.replace(`{{${k}}}`, o[k]);

        }


      });

      ticketCardsHtml += template;
    })

    $(".ticketCard-area").html(ticketCardsHtml);


  }
  function showTicketCardsTotal(data) {
    let template = $("#ticketCardsTotalTemplate").html().trim();
    if (data.length <= 0) {
      $("#searchResult-text").html("目前無資料");
      return;
    }
    template = template.replace("{{length}}", data.length);
    $("#searchResult-text").html(template);
  }
  // ========================================================================

  // events
  $("#btnAddNewTicket").click(addNewTicket);
  $(".regionSearch").on("change", showSearchResult)
  $("#btnSearchTicketName").on("click", showSearchResult);
  $("#inputSearchTicketName").focusout(showSearchResult);
  $('#inputSearchTicketName').pressEnter(showSearchResult);



  // event functions
  function addNewTicket() {

    //清空所有錯誤訊息
    $("p[data-message]").html("");

    if ($('.addTicket-form').valid()) {

      // 驗證通過
      // 新增套票資料至全域變數data中
      let inputsArr = $(".addTicket-form").serializeArray();

      let newTicket = {};

      // 取得data中最大的id
      let id = 0;
      for (o of data) {
        if (o.id > id) id = o.id;
      }
      id++;
      newTicket.id = id;

      for (o of inputsArr) {
        let key = Object.keys(formInputs).find(k => formInputs[k] === o.name);
        newTicket[key] = o.value;
      }

      // 景點地區中英轉換
      newTicket.area = area[newTicket.area];

      // 轉換數字
      newTicket.group *= 1;
      newTicket.price *= 1;
      newTicket.rate *= 1;


      console.log(data);
      data.push(newTicket);
      showTicketCards(data);
      showTicketCardsTotal(data);

      // 用jquery-confirm plugin顯示訊息框
      $.dialog({
        boxWidth: '30%',
        useBootstrap: false,
        type: 'green',
        typeAnimated: true,
        draggable: true,
        animation: 'scale',
        title: '新增成功',
        content: `已成功新增旅遊套票'${newTicket.name}'!`,
      });

      // 清空表單
      $(':input', '.addTicket-form')
        .not(':button, :submit, :reset, :hidden')
        .val('')
        .prop('checked', false)
        .prop('selected', false);


      // 將搜尋下拉選單改為選擇全部
      $(".regionSearch select").val("all");
      return;

    }
    else {
      // 驗證未通過

      // console.log("validation failed");
      return;
    }

  }
  // END addNewTicket()

  function showSearchResult() {
    let filterData = data;

    let excludeAreaVal = ["all", "地區搜尋"];
    let selectedAreaVal = $(".regionSearch option:selected").val();
    let selectedAreaName = ($(".regionSearch option:selected").text() + "").trim();
    let keyword = ($("#inputSearchTicketName").val() + "").trim();

    // 下拉選單有選取特定地區
    if (excludeAreaVal.indexOf(selectedAreaVal) == -1) {

      if (keyword == "") {
        // 未輸入搜索關鍵字
        filterData = data.filter(o => (o.area + "").includes(selectedAreaName));
      } else {
        // 有輸入搜索關鍵字
        filterData = data.filter(o => (o.area + "").includes(selectedAreaName) &&
          ((o.name + "").includes(keyword) || (o.description + "").includes(keyword) || (o.price + "").includes(keyword)));

      }
    } else {

      // 地區下拉選單未選取或選擇全部地區
      filterData = data.filter(o => (o.name + "").includes(keyword) || (o.description + "").includes(keyword) || (o.price + "").includes(keyword));
    }
    showTicketCards(filterData);
    showTicketCardsTotal(filterData);

    return;

  }
  // END showSearchResult()




});
// END $(function () {


