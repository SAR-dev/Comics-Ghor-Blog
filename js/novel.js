// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBewJA_m6_uj1kpdTBM9xJsqCTuDxIrIiQ",
    authDomain: "comics-ghor.firebaseapp.com",
    databaseURL: "https://comics-ghor.firebaseio.com",
    projectId: "comics-ghor",
    storageBucket: "comics-ghor.appspot.com",
    messagingSenderId: "576463013875",
    appId: "1:576463013875:web:c805a04d9c65c4dd"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
let statup = document.querySelector('#htmlcontent');

let finalhtml = ``;

/// show data
let addstat = (data, id, chapters) => {
    let chaptercounter = 0;
    for (i in chapters) {
        chaptercounter += 1
    };
    let time = formatDate(data.Uptime.toDate());
    let listhtml = ``;
    let modalhtml = ``;
    listhtml = `
            <div class="col-lg-3 col-md-4 col-sm-6 col-10 my-3">
                <div class="card shadow" style="height: 100%;background-color: #2f3542">
                    <img class="card-img" src="${data.Cover}" style="height: 200px; width: 100%; object-fit: cover" alt="Cover">
                    <div class="card-img-overlay">
                        <a href="${data.Link}" class="btn btn-sm shadow text-white" style="background-color: #d20962"><i class="fab fa-readme"></i></a>
                    </div>
                    <div class="card-body pt-2" style="background-color: #2f3542">
                        <h5 class="card-title text-white text-truncate">${data["Novel Name"]}</h5>
                        <small class="text-white cat mb-1">
                            <i class="fas fa-pen-square mr-2"></i>${data["Author Name"]}<br />
                        </small>
                        <p class="card-text text-white mb-1" style="font-size: .8rem"><i class="fas fa-hand-point-right mr-2"></i>${data.Genre}</p>
                        <p class="font-weight-light text-white" style="font-size: .8rem"><i class="fab fa-font-awesome mr-2"></i>${data.Status}</p>
                    </div>
                    <div class="card-footer text-muted d-flex justify-content-between border-top-0">
                        <div class="views text-warning mr-1">
                            <i class="fas fa-arrow-circle-up text-warning mr-1"></i>${time}
                        </div>
                        <div class="stats text-warning">
                            <i class="fas fa-paste text-warning mr-1"></i> ${chaptercounter} Chapters
                        </div>

                    </div>
                </div>
            </div>
            `;
    finalhtml += listhtml;
    statup.innerHTML = finalhtml;
};


///fetch data
db.collection('novel').orderBy('Novel Name', 'desc').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        let data = change.doc.data();
        let id = change.doc.id;
        db.collection('novel').doc(id).collection('Chapters').onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                let chapters = change.doc.data();
                addstat(data, id, chapters);
            });
        });
    });
});

//convert date
function formatDate(date) {
    var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
}
