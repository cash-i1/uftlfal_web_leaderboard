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
                place_span.textContent = place.toString();
                
                var name_span = document.createElement("span") 
                name_span.classList.add("name")
                name_span.textContent = person.name;

                var score_span = document.createElement("span") 
                score_span.classList.add("score")
                score_span.textContent = person.score.toString();

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

