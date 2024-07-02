const sectionList = document.querySelectorAll('section'); //query selectors needed for future reference
const navBar = document.querySelector('nav');
const navList = document.createElement('ul'); // creating elements dynamically via JavaScript
const navItem1 = document.createElement('li');
const navItem2 = document.createElement('li');
const navItem3 = document.createElement('li');
const navItem4 = document.createElement('li');

navList.appendChild(navItem1);
navList.appendChild(navItem2);
navList.appendChild(navItem3);
navList.appendChild(navItem4);
navBar.appendChild(navList);

const ListItems = document.querySelectorAll('li');

for (let i = 0; i < ListItems.length; i++) { // showing text on navigation items
    const item = ListItems[i];
    const sectNo = i+1;
    item.textContent = `section ${sectNo}`
}


for (let i = 0; i < ListItems.length; i++){ // smooth scrolling
    const item = ListItems[i];
    item.addEventListener('click', (event) => {
            const section = sectionList[i];
            event.preventDefault();
            section.scrollIntoView({ behavior: 'smooth' });
        })
}


function getPosition (sect) { // gets section position
    return sect.getBoundingClientRect()
}
function isActive (sect) { // checks if section is currently on active state
    const positionY = getPosition(sect).y
    return positionY <= 250 && positionY > -350
}

function applyClass (sect) { // changes the classes depending on active state
    if (isActive(sect)){
        sect.classList.add('active')
    }
    else {
        sect.classList.remove('active')
    }
}

document.addEventListener('scroll', function addActivity (event) { // event listener to change activity class
    for (let i = 0; i < sectionList.length; i++) {
        const element = sectionList[i];
        applyClass(element)
    }

})


document.getElementById('comment-form').addEventListener('submit', function(event) { //submits data
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const comment = document.getElementById('comment').value;

    if (name && email && comment) {
        const commentSection = document.getElementById('comments-display');
        const newComment = document.createElement('div');
        newComment.innerHTML = `
            <p><strong>${name}</strong></p>
            <p>${comment}</p>
            <hr>
        `;
        commentSection.appendChild(newComment);

        // clears comment bar and removes other details to avoid signing up twice
        document.getElementById('name-bar').classList.add('remove')
        document.getElementById('email-bar').classList.add('remove')
        document.getElementById('comment').reset();
    } else {
        alert('Please fill in all fields.'); // detects error
    }
});