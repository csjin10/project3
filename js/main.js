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
                const querys = ['자바스크립트', '소설','판타지'];

                querys.forEach(async (query, i) => {
                    const data = await fetchBooks(query);

                    // for문 (8개)
                    const divs = $('section').eq(i).find('.book_detail');

                    for (let j = 0; j < divs.length; j++) {
                        divs.eq(j).append("<img src=" + data.documents[j].thumbnail + ">");
                        divs.eq(j).append("<h3>" + (j+1) + "</h3>");

                        let title = data.documents[j].title;
                        let str = title.substring(0, 13);

                        divs.eq(j).append("<div>"+"<h4>" + str + "</h4>"+"<h5>" + data.documents[j].authors + "</h5>"+"</div>");

                                             
                    }
                })
            } catch (error) {
                console.log('에러발생', error);
            }
        }

        bookData();