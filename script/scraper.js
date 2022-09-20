
axios({
    method: "GET",
    url: `https://api.allorigins.win/get?url=${encodeURIComponent('https://www.hackerrank.com/hicham_hachem1?hr_r=1')}`,


}).then(function (res) {
    let htmlbody = document.getElementById("output");
    let url_content = res.data.contents;


    htmlbody.innerHTML += url_content;
    let badge = document.getElementsByClassName("section-card hacker-badges")[0].innerHTML;
    let username = document.getElementsByClassName("profile-username-heading")[0].innerHTML;
    let name = document.getElementsByClassName("profile-heading")[0].innerHTML;
    htmlbody.innerHTML = "";
    htmlbody.innerHTML += `<div class="user-container">${username}  ${name}  ${badge}</div>`;

})
