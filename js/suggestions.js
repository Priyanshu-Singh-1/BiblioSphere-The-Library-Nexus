let names = [
        "Marvel Comics",
        "DC Comics",
        "Spider-Man",
        "Iron Man",
        "Captain America",
        "Thor",
        "Black Widow",
        "Hulk",
        "X-Men",
        "Fantastic Four",
        "Avengers",
        "Wolverine",
        "Guardians of the Galaxy",
        "The Amazing Spider-Man",
        "Spider-Man: Into the Spider-Verse",
        "Spider-Man: No Way Home",
        "Marvel vs. DC",
        "Superhero Fiction",
        "Comic Book Fiction",
        "Marvel Cinematic Universe",
        "Stan Lee",
        "Steve Ditko",
        "Comic Book Collecting",
        "Comic Book Artists",
        "Graphic Novels",
        "Civil War (Marvel)",
        "Infinity War (Marvel)",
        "Secret Wars (Marvel)",
        "Spider-Verse",
        "Venom",
        "Doctor Strange",
        "Deadpool",
        "Daredevil",
        "Luke Cage",
        "Jessica Jones",
        "Punisher",
        "X-Force",
        "Infinity Gauntlet",
        "Thanos",
        "Green Goblin",
        "Mary Jane Watson",
        "Gwen Stacy",
        "Miles Morales",
        "Spider-Gwen",
        "Carnage",
        "Black Panther",
        "Doctor Doom",
        "Inhumans",
        "Fantastic Four Reboot",
        "Superhero Movies",
        "Comic Book Adaptations",
        "Marvel Studios",
        "Spider-Man Villains",
        "Spider-Man Comics",
        "Spider-Man Animated Series",
        "Spider-Man Games",
        "Guardians of the Galaxy Vol. 2",
        "Ant-Man",
        "The Punisher (TV series)",
        "Jessica Jones (TV series)",
        "Agent Carter",
        "Howard the Duck",
        "Daredevil (TV series)",
        "Luke Cage (TV series)",
        "Iron Fist (TV series)",
        "The Defenders",
        "Avengers: Infinity War",
        "Avengers: Endgame",
        "The Avengers (2012)",
        "The Dark Knight",
        "Wonder Woman",
        "Aquaman",
        "X-Men: Days of Future Past",
        "X-Men: First Class",
        "Logan (film)",
        "Deadpool 2",
        "Doctor Strange (film)",
        "Black Panther (film)",
        "Guardians of the Galaxy Vol. 3",
        "Captain Marvel (film)",
        "Eternals (film)",
        "Fantastic Four (2023)",
        
];

let sortedname = names.sort();

// console.log(sortedname);

let input = document.getElementById("input");

input.addEventListener("keyup", (e) => {
        removeElements();

        for (let i of sortedname){
                // console.log(i);
                if(i.toLowerCase().startsWith(input.value.toLowerCase()) && input.value != ""){
                        let listitem = document.createElement("li");

                        listitem.classList.add("list-items");

                        listitem.style.cursor = "pointer";

                        listitem.setAttribute("onclick", "displayNames('"+i+"') ");

                        let word = "<b>" + i.substr(0, input.value.length)+"</b>";

                        word += i.substr(input.value.length);

                        console.log(word);

                        listitem.innerHTML = word;
                        document.querySelector(".list").appendChild(listitem);

                }
        }
});

function displayNames(value){
        input.value = value;
        removeElements();
}

function removeElements(){
        let items = document.querySelectorAll(".list-items");
        items.forEach((item) => {
                item.remove();
        });
}
      