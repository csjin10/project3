// 책 정보 불러오기
async function fetchBooks(query) {
  const params = new URLSearchParams({
    target: "title",
    query,
    size: 50
  });
  const url = `https://dapi.kakao.com/v3/search/book?${params}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: "KakaoAK 8931dabb800641285ef0165e8be79e1b"
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP 오류!: ${response.status}`);
  }

  return response.json();


}

async function bookData() {
  try {
    const querys = ['역사', '에세이', '소설', '로맨스판타지', '이', '바다', '숲', '캘린더'];

    querys.forEach(async (query, i) => {
      const data = await fetchBooks(query);

      const booksImg = $('section').eq(i).find('.book_img');
      const booksInf = $('section').eq(i).find('.book_inf');

      for (let j = 0; j < booksImg.length; j++) {
        booksImg.eq(j).append("<img src=" + data.documents[j].thumbnail + ">");
      }
      for (let j = 0; j < booksInf.length; j++) {
        booksInf.eq(j).append("<div><h4>" + data.documents[j].title + "</h4><p>" + data.documents[j].authors + "</p></div>");
      }



      // for문
      const bookDetail = $('section').eq(i).find('.book_detail');

      for (let j = 0; j < bookDetail.length; j++) {
        bookDetail.eq(j).append("<a href='#'><img src=" + data.documents[j].thumbnail + "></a>");
        bookDetail.eq(j).append("<h3>" + (j + 1) + "</h3>");

        bookDetail.eq(j).append("<div>" + "<h4>" + data.documents[j].title + "</h4>" + "<h5>" + data.documents[j].authors + "</h5>" + "</div>");
      }



      const booksIg = $('section').eq(i).find('.books_Img');
      const booksText = $('section').eq(i).find('.books_text');

      for (let j = 0; j < booksIg.length; j++) {
        booksIg.eq(j).append("<img src=" + data.documents[j].thumbnail + ">");
      }
      for (let j = 0; j < booksText.length; j++) {
        booksText.eq(j).append("<h4><" + data.documents[j].title + "></h4>");
        booksText.eq(j).append("<p>" + data.documents[j].authors + "</p>");
      }



    })
  } catch (error) {
    console.log('에러발생', error);
  }
}

bookData();










// header
$(function () {
  $('.left_area > a').click(function () {
    $(this).addClass('header_click').siblings().removeClass('header_click');
  });
});










// area
$(function () {
  $('#area li').click(function () {
    $(this).addClass('area_click').siblings().removeClass('area_click');
  });
});










// slider

/* function prev(){
    $("#slider> div:last").prependTo("#slider").css({"flex-grow":0,"flex-basis":"41px"});
    $("#slider> div:first").stop().animate({"flex-grow":1,"flex-basis":"0px"},800);
    $("#slider> div:nth-of-type(3)").stop().animate({"flex-grow":0,"flex-basis":"41px"},800);
    $("#slider> div:nth-of-type(2)").stop().animate({"flex-grow":0,"flex-basis":"41px"},800);
}

function next(){
    $("#slider> div:first").stop().animate({"flex-grow":0,"flex-basis":"0px"},800);
    // $("#slider> div:nth-of-type(4)").animate({"flex-grow":0,"flex-basis":"41px"},800);
    $("#slider> div:nth-of-type(2)").animate({"flex-grow":1,"flex-basis":"0px"},800,function(){
        $("#slider> div:first").appendTo("#slider");
    });
} */





function prev() {
  $("#slider> div:last").prependTo("#slider").css({ "width": "41px" });
  $("#slider> div:first").stop().animate({ "width": "1010px" }, 800);
  $("#slider> div:nth-of-type(3)").stop().animate({ "width": "41px" }, 800);
  $("#slider> div:nth-of-type(2)").stop().animate({ "width": "41px" }, 800);
}

function next() {
  $("#slider> div:first").stop().animate({ "width": "41px" }, 800);
  $("#slider> div:nth-of-type(3)").stop().animate({ "width": "41px" }, 800);
  $("#slider> div:nth-of-type(2)").stop().animate({ "width": "1010px" }, 800, function () {
    $("#slider> div:first").appendTo("#slider");
  });
}

// setInterval(next,5000); // 자동 슬라이드

// 버튼 슬라이드
$("#slider_wrap .prev").click(function () {
  prev();
});

$("#slider_wrap .next").click(function () {
  next();
});







// slider sec1
$("#sec1 .prev").click(function () {
  $('#sec1 .sec1_slider> ul').css({ "margin-left": -185 });
  $('#sec1 .sec1_slider> ul').stop().animate({ "margin-left": 0 }, 300, function () {
    $("#sec1 .prev").css({ "display": "none" });
    $("#sec1 .next").css({ "display": "block" });
  });
});

$("#sec1 .next").click(function () {
  $("#sec1 .sec1_slider> ul").stop().animate({ "margin-left": -185 }, 300, function () {
    $('#sec1 .sec1_slider> ul').css({ "margin-left": -185 });
    $("#sec1 .prev").css({ "display": "block" });
    $("#sec1 .next").css({ "display": "none" });
  });
});



// slider sec2
$("#sec2 .prev").click(function () {
  $('#sec2 .books_wrap>div').css({ "margin-left": -1110 });
  $('#sec2 .books_wrap>div').stop().animate({ "margin-left": 0 }, 400, function () {
    $("#sec2 .prev").css({ "display": "none" });
    $("#sec2 .next").css({ "display": "block" });
  });
});

$("#sec2 .next").click(function () {
  $("#sec2 .books_wrap>div").stop().animate({ "margin-left": -1110 }, 400, function () {
    $('#sec2 .books_wrap>div').css({ "margin-left": -1110 });
    $("#sec2 .prev").css({ "display": "block" });
    $("#sec2 .next").css({ "display": "none" });
  });
});



// slider sec3
$("#sec3 .prev").click(function () {
  $('#sec3 .books_wrap>div').css({ "margin-left": -368 });
  $('#sec3 .books_wrap>div').stop().animate({ "margin-left": 0 }, 400, function () {
    $("#sec3 .prev").css({ "display": "none" });
    $("#sec3 .next").css({ "display": "block" });
  });
});

$("#sec3 .next").click(function () {
  $("#sec3 .books_wrap>div").stop().animate({ "margin-left": -368 }, 400, function () {
    $('#sec3 .books_wrap>div').css({ "margin-left": -368 });
    $("#sec3 .prev").css({ "display": "block" });
    $("#sec3 .next").css({ "display": "none" });
  });
});



// slider sec4
$("#sec4 .prev").click(function () {
  $('#sec4 .books_wrap>div').css({ "margin-left": -1110 });
  $('#sec4 .books_wrap>div').stop().animate({ "margin-left": 0 }, 400, function () {
    $("#sec4 .prev").css({ "display": "none" });
    $("#sec4 .next").css({ "display": "block" });
  });
});

$("#sec4 .next").click(function () {
  $("#sec4 .books_wrap>div").stop().animate({ "margin-left": -1110 }, 400, function () {
    $('#sec4 .books_wrap>div').css({ "margin-left": -1110 });
    $("#sec4 .prev").css({ "display": "block" });
    $("#sec4 .next").css({ "display": "none" });
  });
});



// slider sec5
$("#sec5 .prev").click(function () {
  $('#sec5 .sec1_slider> ul').css({ "margin-left": -185 });
  $('#sec5 .sec1_slider> ul').stop().animate({ "margin-left": 0 }, 300, function () {
    $("#sec5 .prev").css({ "display": "none" });
    $("#sec5 .next").css({ "display": "block" });
  });
});

$("#sec5 .next").click(function () {
  $("#sec5 .sec1_slider> ul").stop().animate({ "margin-left": -185 }, 300, function () {
    $('#sec5 .sec1_slider> ul').css({ "margin-left": -185 });
    $("#sec5 .prev").css({ "display": "block" });
    $("#sec5 .next").css({ "display": "none" });
  });
});



// slider sec6
$("#sec6 .prev").click(function () {
  $('#sec6 .sec1_slider> ul').css({ "margin-left": -185 });
  $('#sec6 .sec1_slider> ul').stop().animate({ "margin-left": 0 }, 300, function () {
    $("#sec6 .prev").css({ "display": "none" });
    $("#sec6 .next").css({ "display": "block" });
  });
});

$("#sec6 .next").click(function () {
  $("#sec6 .sec1_slider> ul").stop().animate({ "margin-left": -185 }, 300, function () {
    $('#sec6 .sec1_slider> ul').css({ "margin-left": -185 });
    $("#sec6 .prev").css({ "display": "block" });
    $("#sec6 .next").css({ "display": "none" });
  });
});



// slider sec7
$("#sec7 .prev").click(function () {
  $('#sec7 .books_wrap>div').css({ "margin-left": -368 });
  $('#sec7 .books_wrap>div').stop().animate({ "margin-left": 0 }, 400, function () {
    $("#sec7 .prev").css({ "display": "none" });
    $("#sec7 .next").css({ "display": "block" });
  });
});

$("#sec7 .next").click(function () {
  $("#sec7 .books_wrap>div").stop().animate({ "margin-left": -368 }, 400, function () {
    $('#sec7 .books_wrap>div').css({ "margin-left": -368 });
    $("#sec7 .prev").css({ "display": "block" });
    $("#sec7 .next").css({ "display": "none" });
  });
});



// slider sec8
$("#sec8 .prev").click(function () {
  $('#sec8 .books_wrap>div').css({ "margin-left": -368 });
  $('#sec8 .books_wrap>div').stop().animate({ "margin-left": 0 }, 400, function () {
    $("#sec8 .prev").css({ "display": "none" });
    $("#sec8 .next").css({ "display": "block" });
  });
});

$("#sec8 .next").click(function () {
  $("#sec8 .books_wrap>div").stop().animate({ "margin-left": -368 }, 400, function () {
    $('#sec8 .books_wrap>div').css({ "margin-left": -368 });
    $("#sec8 .prev").css({ "display": "block" });
    $("#sec8 .next").css({ "display": "none" });
  });
});