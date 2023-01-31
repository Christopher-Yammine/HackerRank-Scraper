let user_names_arr = [];
let user_info = [];

// To display the final output, injecting content
let final_output = document.getElementById("final-output");

// To handle uploads of files
let inputFile = document.getElementById("uploadFile");

//To handle submit button
let display_btn = document.getElementById("submit");

// HTML element to display the initial data
let init_htmlbody = document.getElementById("initial-output");
let csvdata = [];
display_btn.addEventListener("click", displayUsers);

async function getUserPages(hackerRank_username, index) {
    let res = '';
    try {
        res = await axios.get(
            `https://corsanywhere.herokuapp.com/https://www.hackerrank.com/${hackerRank_username}`
        );
    } catch (e) {
        console.log(e)
        console.log("doesnt exist")
    }


    let url_content = res.data;
    init_htmlbody.innerHTML += url_content;
    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(url_content, "text/html");
        let badges = doc.getElementsByClassName('hacker-badge');


        for (let i = 0; i < badges.length; i++) {
            let usernamecsv = doc.getElementsByClassName("profile-heading")[0].innerHTML;
            let language = badges[i].innerText
            let tier = badges[i].lastChild.lastChild.classList[1].split('-')[1]
            let stars_number = badges[i].children[0].children[0].children[0].children[0].children[3].getElementsByClassName('badge-star').length
            csvdata.push({
                'Username': usernamecsv,
                'Language': language,
                'Tier': tier,
                'Stars': stars_number
            });
        }


    } catch (csv) {
        console.log("skipped for csv")
    }

    return new Promise((resolve) => {
        setTimeout(function () {
            try {
                let badge = document.getElementsByClassName("section-card-content")[0].innerHTML;
                let username = document.getElementsByClassName("profile-username-heading")[0].innerHTML;
                let name = document.getElementsByClassName("profile-heading")[0].innerHTML;

                init_htmlbody.innerHTML = "";
                let scraped_info = `<div class="user-container">${username}  ${name}  ${badge}</div>`;

                user_info.push(scraped_info);
            } catch (e) {
                console.log("Skipped");
                console.log(e);
            }

            resolve();
        }, 10);
    });
}

async function ReadFile(file) {
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
    let csv = Papa.unparse(csvdata);

    // Save the CSV string to a file
    let blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, 'hackerrank_badges.csv');
    } else {
        let link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            let url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", 'hackerrank_badges.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}
