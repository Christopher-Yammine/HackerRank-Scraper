let user_names_arr = [];
let user_info = [];
// To display the final output, injecting content
let final_output = document.getElementById("final-output");
// To handle uploads of files
let inputFile = document.getElementById("uploadFile");
//To handle submit button
let display_btn = document.getElementById("submit");

let init_htmlbody = document.getElementById("initial-output");

display_btn.addEventListener("click", displayUsers);

async function getUserPages(hackerRank_username, index) {
    const res = await axios.get(
        `https://api.allorigins.win/get?url=${encodeURIComponent(
            "https://www.hackerrank.com/"
        )}` + hackerRank_username
    );

    let url_content = res.data.contents;
    init_htmlbody.innerHTML += url_content;

    return new Promise((resolve) => {
        setTimeout(function () {
            try {

                let badge = document.getElementsByClassName("section-card-content")[0].innerHTML;
                let username = document.getElementsByClassName("profile-username-heading")[0].innerHTML;
                let name = document.getElementsByClassName("profile-heading")[0].innerHTML;
                init_htmlbody.innerHTML = "";
                let scraped_info = `<div class="user-container">${username}  ${name}  ${badge}</div>`;
                user_info.push(scraped_info);
            } catch {
                console.log("Skipped");
            }

            resolve();
        }, 10);
    });
}

function ReadFile(file) {
    return file.text();
}

// Whenever a file is uploaded, this fires up
inputFile.onchange = async () => {
    const selectedFile = document.getElementById("uploadFile").files[0];

    const fileContent = await ReadFile(selectedFile);

    const myObj = $.csv.toObjects(fileContent);

    for (let j = 0; j < myObj.length; j++) {
        user_names_arr.push(myObj[j].Username);
    }
};

//This calls get User Pages for every username on the csv file
async function displayUsers() {
    for (let i = 0; i < user_names_arr.length; i++) {
        await getUserPages(user_names_arr[i], i);
    }

    for (let i = 0; i < user_info.length; i++) {
        let element = user_info[i];
        final_output.innerHTML += element;
    }

}