
let user_info = [];

function getUserPages(hackerRank_username) {
    axios({
        method: "GET",
        url: `https://api.allorigins.win/get?url=${encodeURIComponent('https://www.hackerrank.com/')}` + hackerRank_username,


    }).then(function (res) {
        let init_htmlbody = document.getElementById("initial-output");
        let url_content = res.data.contents;


        init_htmlbody.innerHTML += url_content;
        let badge = document.getElementsByClassName("section-card-content")[0].innerHTML;
        let username = document.getElementsByClassName("profile-username-heading")[0].innerHTML;
        let name = document.getElementsByClassName("profile-heading")[0].innerHTML;


        init_htmlbody.innerHTML = "";
        let scraped_info = `<div class="user-container">${username}  ${name}  ${badge}</div>`;
        user_info.push(scraped_info);
    })
}


let final_output = document.getElementById('final-output');
setTimeout(() => {
    for (let i = 0; i < user_info.length; i++) {
        let element = user_info[i];
        final_output.innerHTML += element;

    }
}, 1000);



