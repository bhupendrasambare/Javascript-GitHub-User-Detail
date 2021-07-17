const search = document.querySelector("#search");
const result = document.querySelector("#result");
const form = document.querySelector("#formSearch");
        var stars = document.getElementById('stars')
 
 // js randomly generates meteors
for (var j=0;j<30;j++) {
var newStar = document.createElement("div")
newStar.className = "star"
newStar.style.top = randomDistance(500, -100) + 'px'
newStar.style.left = randomDistance(1300, 300) + 'px'
stars.appendChild(newStar)
}

 // Encapsulate random number method
function randomDistance (max, min) {
var distance = Math.floor(Math.random() * (max - min + 1) + min)
return distance
}
var star = document.getElementsByClassName('star')

 // Add animation delay to the meteor
for (var i = 0, len = star.length; i < len; i++)
{
star[i].style.animationDelay = i % 6 == 0 ? '0s' : i * 0.8 + 's'
}
function reposotorynumber(repourl)
{
        var total='';
        fetch(repourl).then((resultData) => resultData.json()).then((data)=>{
                for(let i=0;i<data.length;i++)
                {
                    var discriptiuon = "Discription does not exist <br><br><br>";
                    var languagecode = data[i]["language"];
                    if(languagecode == null){
                        languagecode = "Document/Readme.md"
                    }
                    if(data[i]["description"] != null){
                        discriptiuon = data[i]["description"]
                        if(discriptiuon.length >80){
                            discriptiuon = discriptiuon.substring(0,79) + "..."
                        }
                    }
                    total += `<div class="repo-card">
                    <h1 class="reponame">${data[i]["name"]}</h1>
                    <h4 class="base">Project Base</h4>
                    <li class="language">${languagecode}</li><br>
                    <h4 class="base">About</h4>
                    <p>${discriptiuon}</p><br>
                    <h4 class="base"> Created at <span class="orange">${data[i]['created_at'].substring(0,10)}</span> </h4>
                    <h4 class="base"> Updated at <span class="green">${data[i]['updated_at'].substring(0,10)}</span> </h4>
                    <div class="watching">
                    <p class="watching-box"> Watching <span class="watchingnumber">${data[i]['watchers']}</span> </p></div>
                    <br>
                    <a class="repolink" href="${data[i]["html_url"]}">View Reposotory</a><br>
                </div>`
                }
                if(total == ""){
                    document.getElementById("repoArea").innerHTML = "No Repositories"
                }
                document.getElementById("repoArea").innerHTML = total
            })
    search.remove();
}
form.addEventListener('submit',function(e){
    e.preventDefault()

    var searchText = document.querySelector(".form-control").value

    var joinName = searchText.split(' ').join('')

    fetch("https://api.github.com/users/"+joinName).then((resultData) => resultData.json()).then((data)=>{
        if(data.message == 'Not Found'){
            document.getElementById("userName").innerHTML = "User not found"
        }else{
            document.getElementById("userImage").innerHTML = `<img href="${data.html_url}" src="${data.avatar_url}" width="150px" alt="">`
            document.getElementById("userName").innerHTML = data.name;
            document.getElementById("followers").innerHTML = `<button type="" class="btn btn-primary" id="follower">Followers <br> ${data.followers}</button>
            <button type="" class="btn btn-primary" id="following">Following <br> ${data.following}</button>`
            reposotorynumber(data.repos_url)
            search.remove();
        }
    
    
    })
})
