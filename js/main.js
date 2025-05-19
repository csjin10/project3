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
        const querys = ['역사', '에세이', '소설', '로맨스판타지'];

        querys.forEach(async (query, i) => {
            const data = await fetchBooks(query);

            const booksImg = $('section').eq(i).find('.book_img');
            const booksInf = $('section').eq(i).find('.book_inf');

            for (let j = 0; j < booksImg.length; j++) {
                booksImg.eq(j).append("<img src=" + data.documents[j].thumbnail + ">");
            }
            for (let j = 0; j < booksInf.length; j++) {
                booksInf.eq(j).append("<p>" + data.documents[j].title + "</p>");
            }


            
            // for문
            const bookDetail = $('section').eq(i).find('.book_detail');

            for (let j = 0; j < bookDetail.length; j++) {
                bookDetail.eq(j).append("<img src=" + data.documents[j].thumbnail + ">");
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










// slider
function prev(){
    $("#slider> div:last").prependTo("#slider").css({"flex-grow":0,"flex-basis":"41px"});
    $("#slider> div:first").stop().animate({"flex-grow":1,"flex-basis":"0px"},800);
    $("#slider> div:nth-of-type(3)").stop().animate({"flex-grow":0,"flex-basis":"41px"},800);
    $("#slider> div:nth-of-type(2)").stop().animate({"flex-grow":0,"flex-basis":"41px"},800);
}

function next(){
    $("#slider> div:first").stop().animate({"flex-grow":0,"flex-basis":"0px"},800);
    // $("#slider> div:nth-of-type(3)").stop().animate({"flex-grow":0,"flex-basis":"41px"},800);
    $("#slider> div:nth-of-type(2)").stop().animate({"flex-grow":1,"flex-basis":"0px"},800,function(){
        $("#slider> div:first").appendTo("#slider");
    });
}

// setInterval(next,5000); // 자동 슬라이드

// 버튼 슬라이드
$("#slider_wrap .prev").click(function(){
    prev();
});

$("#slider_wrap .next").click(function(){
    next();
});



// slider sec1
$("sec1 .prev").click(function(){
    $(".book_inf:last")
});