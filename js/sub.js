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
    const querys = ['팀 보울러', '오만과 편견', '류경희'];

    querys.forEach(async (query, i) => {
      const data = await fetchBooks(query);

      const titleList = $('.aside_text').eq(i).find('li');

      for (let j = 0; j < titleList.length; j++) {
        titleList.eq(j).append("<h5>" + (j + 1) + "</h5>" + "<p>" + data.documents[j].title + "</p>");
      }



      const booksImg = $('section').eq(i).find('.book_img');
      const booksInf = $('section').eq(i).find('.book_inf');

      for (let j = 0; j < booksImg.length; j++) {
        booksImg.eq(j).append("<img src=" + data.documents[j].thumbnail + ">");
        booksInf.eq(j).append("<div><h4>" + data.documents[j].title + "</h4><p>" + data.documents[j].authors + "</p></div>");
      }      

    })
  } catch (error) {
    console.log('에러발생', error);
  }
}

bookData();










// 이미지 뒷면 보임
$(".book_imgs").click(function(){
  $(this).toggleClass("rotate");
});










// 작품 정보 tab
$(function(){
  $(".tab li").click(function(){
    let index = $(this).index();

    $(".content li").eq(index).show().siblings().hide();
    $(this).addClass("click").siblings().removeClass("click");
  });
});

// 작가 tab
$(function(){
  $(".author_tab li").click(function(){
    let index = $(this).index();

    $(".author_content> li").eq(index).show().siblings().hide();
    $(this).addClass("click").siblings().removeClass("click");
  });
});

// 작가 sub tab
$(function(){
  $(".author_sub_tab li").click(function(){
    let index = $(this).index();

    $(".author_sub_content> li").eq(index).show().siblings().hide();
    $(this).addClass("click").siblings().removeClass("click");
  });
});









// 텍스트 불러오기
$(function(){
  $.get("./sub_txt/book_intro.txt", function(data){
    $("#book_inf .content li:first-child").html(data);
  })
});

$(function(){
  $.get("./sub_txt/book_contents.txt", function(data){
    $("#book_inf .content li:nth-of-type(2)").html(data);
  })
});

$(function(){
  $.get("./sub_txt/book_review.txt", function(data){
    $("#book_inf .content li:last-child").html(data);

    // 텍스트 더보기
    $(".scroll button").click(function(){
     // 텍스트 펼치기
      if($(".scroll p").outerHeight() === 255){
        $(".scroll p").css("height","auto");
        $(".scroll div").hide();
        $(this).html('접기&nbsp;<i class="fa-solid fa-chevron-down"></i>');
        $(this).children('i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
      } else {
        // 텍스트 접기
        $(".scroll p").css("height","255px");
        $(".scroll div").show();
        $(this).html('더보기&nbsp;<i class="fa-solid fa-chevron-down"></i>');
        $(this).children('i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
      }      
    });
  })
});

$(function(){
  $.get("./sub_txt/author_intro.txt", function(data){
    $(".author_content> li:last-child").html(data);
  })
});

// 텍스트 불러오기
// document.addEventListener("DOMContentLoaded", async function () {
//   try {
//     const response = await fetch("./sub_txt/book_intro.txt");
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const data = await response.text();
//     document.getElementById(".content li:first-child").innerHTML = data;
//   } catch (error) {
//     console.error("There was a problem with the fetch operation:", error);
//   }
// });







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










// 텍스트 더보기
