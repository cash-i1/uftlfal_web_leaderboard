function get_scores() {
    return fetch("http://dreamlo.com/lb/653c92588f40bb11fc5689e2/json")
        .then(resp => resp.json());

}


function print_scores() {
    get_scores()
        .then(data => {
            console.log(data)
            scores = data["dreamlo"]["leaderboard"]["entry"].reverse()
            for (person of scores) {
                console.log(person.name)
            }
        })
}


String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
} //thank you https://stackoverflow.com/questions/6312993/javascript-seconds-to-time-string-with-format-hhmmss#6313008


function populate_leaderboard() {
    var leaderboard_div =  document.querySelector(".leaderboard");
    
    get_scores()
        .then(data => {


            scores = data["dreamlo"]["leaderboard"]["entry"].reverse()
            var place = 1;
            for (person of scores) {
                var temp = null        
                var temp = document.createElement("div");
                temp.classList.add("score")

                console.log(person.score, place)
                var place_span = document.createElement("span") 
                place_span.classList.add("place")
                place_span.textContent = `${place}. `;
                
                var name_span = document.createElement("span") 
                name_span.classList.add("name")
                name_span.textContent = person.name;

                var score_span = document.createElement("span") 
                score_span.classList.add("score")
                
                var formatted_score = new Date(parseInt(person.score));
                var minutes = formatted_score.getUTCMinutes().toString().padStart(2, '0');
                var seconds = formatted_score.getUTCSeconds().toString().padStart(2, '0');
                var milliseconds = formatted_score.getUTCMilliseconds().toString().padStart(3, '0');

                var formatted_score_string = `${minutes}:${seconds}:${milliseconds}`;


                score_span.textContent = `: ${formatted_score_string}`;

                if (place == 1) {
                    temp.classList.add("first-place")
                }

                if (place == 2) {
                    temp.classList.add("second-place")
                }

                if (place == 3) {
                    temp.classList.add("third-place")
                }

                place += 1;

                temp.appendChild(place_span)
                temp.appendChild(name_span)
                temp.appendChild(score_span)

                leaderboard_div.appendChild(temp);

            }
        })
    
}
document.addEventListener("DOMContentLoaded", function() {
    populate_leaderboard();
});

