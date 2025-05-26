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
    const querys = ['팀 보울러', '에세이', '소설', '로맨스판타지', '이', '바다', '숲', '캘린더'];

    querys.forEach(async (query, i) => {
      const data = await fetchBooks(query);

      const titleList = $('.aside_text').eq(i).find('li');

      for (let j = 0; j < titleList.length; j++) {
        titleList.eq(j).append("<h5>" + (j + 1) + "</h5>" + "<p>" + data.documents[j].title + "</p>");
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










// 텍스트 불러오기
$(function(){
  $.get("./sub_txt/book_intro.txt", function(data){
    $(".content li:first-child").html(data);
  })
});

$(function(){
  $.get("./sub_txt/book_contents.txt", function(data){
    $(".content li:nth-of-type(2)").html(data);
  })
});

$(function(){
  $.get("./sub_txt/book_review.txt", function(data){
    $(".content li:last-child").html(data);
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