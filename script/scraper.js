let user_names_arr = [];
let user_info = [];
let final_output = document.getElementById('final-output');
let student_field = document.getElementById("requests-number");
let inputFile = document.getElementById("uploadFile")
let display_btn = document.getElementById('submit');

display_btn.addEventListener("click", displayUsers);

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


async function ReadFile(file) {
    return await file.text()
}

inputFile.onchange = () => {


    const selectedFile = document.getElementById('uploadFile').files[0]
    const promise = new Promise(resolve => {
        const fileContent = ReadFile(selectedFile)
        resolve(fileContent)
    })

    promise.then(fileContent => {

        const myObj = $.csv.toObjects(fileContent)
        for (let j = 0; j < myObj.length; j++) {
            user_names_arr.push(myObj[j].Username)
        }



    })
}


function displayUsers() {
    for (let una = 0; una < user_names_arr.length; una++) {
        getUserPages(user_names_arr[una])
        console.log(user_names_arr[una])
        console.log(user_info)
    }
    setTimeout(() => {
        for (let i = 0; i < user_info.length; i++) {
            let element = user_info[i];
            final_output.innerHTML += element;

        }
    }, 16500);
}
