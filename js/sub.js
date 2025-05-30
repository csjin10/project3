// 책 정보 불러오기
async function fetchBooks(query) {
  const params = new URLSearchParams({
    target: "title",
    query,
    size: 12
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
    const querys = ['팀 보울러', '오만과 편견', '류경희'];

    querys.forEach(async (query, i) => {
      const data = await fetchBooks(query);

      //썸네일이 빈 문자열인것은 제외
      // const origin = data.documents;
      // data = origin.filter((val) => {
      //   return val.thumbnail != '';
      // })

      if (i == 0) {
        const titleList = $('.aside_text').eq(i).find('li');

        for (let j = 0; j < titleList.length; j++) {
          titleList.eq(j).append("<h5>" + (j + 1) + "</h5>" + "<p>" + data.documents[j].title + "</p>");
        }
      } else {
        // const booksImg = $('section').eq(i-1).find('.book_img');
        // const booksInf = $('section').eq(i-1).find('.book_inf');

        // for (let j = 0; j < booksImg.length; j++) {
        //   booksImg.eq(j).append("<img src=" + data.documents[j].thumbnail + ">");
        //   booksInf.eq(j).append("<div><h4>" + data.documents[j].title + "</h4><p>" + data.documents[j].authors + "</p></div>");
        // }
        const sectionSlid = $('.author_book').eq(i-1).find('.author_slider ul');

        for (let j = 0; j < data.documents.length; j++) {
          sectionSlid.append(`
            <li class="book_inf">
              <a href="#">
                <div class="book_img">
                  <div>
                    <div class="select">
                      ${(j+1)%4==0 ? `<img src="./img/sec1_select.webp" alt="">` : `<img src="">`}
                    </div>
                  </div>
                  <img src=${data.documents[j].thumbnail}>
                </div>
              </a>
              <div>
                <h4>${data.documents[j].title}</h4>
                <p>${data.documents[j].authors}</p>
              </div>
            </li>
            `)
        }

      }
    })
  } catch (error) {
    console.log('에러발생', error);
  }
}

bookData();










// 이미지 뒷면 보임
$(".book_imgs").click(function () {
  $(this).toggleClass("rotate");
});










// 작품 정보 tab
$(function () {
  $(".tab li").click(function () {
    let index = $(this).index();

    $(".content li").eq(index).show().siblings().hide();
    $(this).addClass("click").siblings().removeClass("click");
  });
});

// 작가 tab
$(function () {
  $(".author_tab li").click(function () {
    let index = $(this).index();

    $(".author_content> li").eq(index).show().siblings().hide();
    $(this).addClass("click").siblings().removeClass("click");
  });
});

// 작가 sub tab
$(function () {
  $(".author_sub_tab li").click(function () {
    let index = $(this).index();

    $(".author_sub_content> li").eq(index).show().siblings().hide();
    $(this).addClass("click").siblings().removeClass("click");
  });
});

// 리뷰 tab
$(function () {
  $(".review_tab li").click(function () {
    let index = $(this).index();

    $(".review_content> li").eq(index).show().siblings().hide();
    $(this).addClass("click").siblings().removeClass("click");
  });
});

// 리뷰 sub tab1
$(function () {
  $(".review_content>li:first-child .review_sub_tab li").click(function () {
    let index = $(this).index();

    $(".review_content>li:first-child .review_sub_content> li").eq(index).show().siblings().hide();
    $(this).addClass("click").siblings().removeClass("click");
  });
});

// 리뷰 sub tab2
$(function () {
  $(".review_content>li:last-child .review_sub_tab li").click(function () {
    let index = $(this).index();

    $(".review_content>li:last-child .review_sub_content> li").eq(index).show().siblings().hide();
    $(this).addClass("click").siblings().removeClass("click");
  });
});

// 모달 tab
$(function () {
  $(".side_content li").click(function(){
    let index = $(this).index();
    
    $(".front_content> div").eq(index).show().siblings().hide();
    $(this).addClass("click").siblings().removeClass("click");
  });
});









// 텍스트 불러오기
$(function () {
  $.get("./sub_txt/book_intro.txt", function (data) {
    $("#book_inf .content li:first-child").html(data);
  })
});

$(function () {
  $.get("./sub_txt/book_contents.txt", function (data) {
    $("#book_inf .content li:nth-of-type(2)").html(data);
  })
});

$(function () {
  $.get("./sub_txt/book_review.txt", function (data) {
    $("#book_inf .content li:last-child").html(data);

    // 텍스트 더보기
    $(".scroll button").click(function () {
      // 텍스트 펼치기
      if ($(".scroll p").outerHeight() === 255) {
        $(".scroll p").css("height", "auto");
        $(".scroll div").hide();
        $(this).html('접기&nbsp;<i class="fa-solid fa-chevron-down"></i>');
        $(this).children('i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
      } else {
        // 텍스트 접기
        $(".scroll p").css("height", "255px");
        $(".scroll div").show();
        $(this).html('더보기&nbsp;<i class="fa-solid fa-chevron-down"></i>');
        $(this).children('i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
      }
    });
  })
});

$(function () {
  $.get("./sub_txt/author_intro.txt", function (data) {
    $(".author_content> li:last-child").html(data);
  })
});

// 리뷰 텍스트 불러오기
$(function () {
  $.get("./sub_txt/review_20250513.txt", function (data) {
    $(".box1 .review_text").html(data);
  })
});

$(function () {
  $.get("./sub_txt/review_20250228.txt", function (data) {
    $(".box2 .review_text").html(data);
  })  
});

$(function () {
  $.get("./sub_txt/review_20240430.txt", function (data) {
    $(".box3 .review_text").prepend(data);
  })

  // 리뷰 텍스트 더보기
    $(".review_text button").click(function () {
      console.log("text")
      $(".review_text div").css({"height":"auto","-webkit-box-orient":"horizontal"});

      // 버튼 숨기기
      $(this).hide();
    });
});

$(function () {
  $.get("./sub_txt/review_20190617.txt", function (data) {
    $(".box4 .review_text").html(data);
  })
});

// 미리보기 텍스트 불러오기
$(function () {
  $.get("./sub_txt/modal_text.txt", function (data) {
    $("#first_ch").html(data);
  })
});







// slider
$(".author_book .prev").click(function () {
  $('.author_book .author_slider ul').css({ "margin-left": -881 });
  $('.author_book .author_slider ul').stop().animate({ "margin-left": 0 }, 300, function () {
    $(".author_book .prev").css({ "display": "none" });
    $(".author_book .next").css({ "display": "block" });
  });
});

$(".author_book .next").click(function () {
  $(".author_book .author_slider ul").stop().animate({ "margin-left": -881 }, 300, function () {
    $('.author_book .author_slider ul').css({ "margin-left": -881 });
    $(".author_book .prev").css({ "display": "block" });
    $(".author_book .next").css({ "display": "none" });
  });
});










// 별점 색 바꾸기
$(".star_score i").hover(function(){
  $(this).css("color","#e54c43");
  $(this).prevAll().css("color","#e54c43");
},function(){
  $(this).css("color","#e6e6e6");
  $(this).prevAll().css("color","#e6e6e6");
});



// 경고창
$(".review_input textarea").click(function(){
  if(confirm("로그인 상태에서 가능합니다. 로그인 페이지로 이동합니다.") == true){
    console.log("확인");
  }else{
    console.log("취소");
  }
});


// 미리보기 클릭하면 모달창
$(".preview> h4").click(function(){
  $("#modal").show();
});

$(".front_header> button").click(function(){
  $("#modal").hide();
});
