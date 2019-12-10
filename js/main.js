$(document).ready(function () {
    $('#day').click(function () {
        $(this).attr("disabled", true);
        $("#night").attr("disabled", false);
        $("body").removeClass("bg-dark").addClass("bg-light");
    });
});

$(document).ready(function () {
    $('#night').click(function () {
        $(this).attr("disabled", true);
        $("#day").attr("disabled", false);
        $("body").removeClass("bg-light").addClass("bg-dark")
    });
});

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


//=================================ONESHOT COMIC UPDATE STARTS======================================================
/// show data
let oneshotcomic = document.getElementById('oneshot-comic');

let finalhtmlcomiconeshot = ``;
let oneshotcomichtml = ``;
let finaloneshotcomichtml = ``;

function finaloneshotcomichtmlstore(finaloneshotcomichtml) {
    finalhtmlcomiconeshot = `
                    <div class="col-12 headerlink">
                        <a href="comic.html">
                            <h1 class="text-center text-white py-3 rounded border-2 shadow text-nowrap font-weight-bold" style="background-color: #d20962">ONESHOT COMIC</h1>
                        </a>
                    </div>
                    ${finaloneshotcomichtml}
                `;
    oneshotcomic.innerHTML = finalhtmlcomiconeshot;
}
let addoneshotcomic = (data, id, chapters) => {

    let chaptercounter = 0;
    for (i in chapters) {
        chaptercounter += 1
    };
    oneshotcomichtml = `
            <div class="col-lg-3 col-md-6 col-sm-6 col-12 mt-3">
                <a href="${data.Link}" class="list-group-item list-group-item-action flex-column align-items-start shadow text-white" style="background-color: #d20962">
                    <div class="d-flex w-100 my-2 justify-content-between"><img src="${data.Cover}" class="img-fluid img-thumbnail-custom rounded"> </div>
                    <div class="d-flex w-100 justify-content-between name">
                        <h5 class="mb-1 text-truncate"><i class="fas fa-dove mr-2"></i>${data["Comic Name"]}</h5>
                    </div>
                    
                    <p class="mb-1"><i class="fas fa-pen-square text-truncate mr-2 text-truncate"></i>${data["Author Name"]}</p>
                    <small><i class="fas fa-feather mr-2"></i>${data.Genre}</small>
                    <div><span class="badge badge-warning badge-pill">${chaptercounter} Chapters</span></div>
                </a>
            </div>
            `;
    finaloneshotcomichtml += oneshotcomichtml;
    finaloneshotcomichtmlstore(finaloneshotcomichtml);
};


///fetch data
db.collection('comic').where('Status', '==', 'One-shot').orderBy('Uptime', "desc").limit(4).onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        let data = change.doc.data();
        let id = change.doc.id;
        db.collection('comic').doc(id).collection('Chapters').onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                let chapters = change.doc.data();
                addoneshotcomic(data, id, chapters);
            });
        });
    });
});
//=================================ONESHOT COMIC UPDATE ENDS======================================================

//=================================ONESHOT NOVEL UPDATE STARTS======================================================
/// show data
let oneshotnovel = document.getElementById('oneshot-novel');

let finalhtmlnoveloneshot = ``;
let oneshotnovelhtml = ``;
let finaloneshotnovelhtml = ``;

function finaloneshotnovelstore(finaloneshotnovelhtml) {
    finalhtmlnoveloneshot = `
                    <div class="col-12 headerlink">
                        <a href="novel.html">
                            <h1 class="text-center text-white py-3 rounded border-2 shadow text-nowrap font-weight-bold" style="background-color: #008374">ONESHOT NOVEL</h1>
                        </a>
                    </div>
                    ${finaloneshotnovelhtml}
                `;
    oneshotnovel.innerHTML = finalhtmlnoveloneshot;
}
let addoneshotnovel = (data, id, chapters) => {

    let chaptercounter = 0;
    for (i in chapters) {
        chaptercounter += 1
    };
    oneshotnovelhtml = `
            <div class="col-lg-3 col-md-6 col-sm-6 col-12 mt-3">
                <a href="novel.html" class="list-group-item list-group-item-action flex-column align-items-start shadow text-white" style="background-color: #008374">
                    <div class="d-flex w-100 my-2 justify-content-between"><img src="${data.Cover}" class="img-fluid img-thumbnail-custom rounded"> </div>
                    <div class="d-flex w-100 justify-content-between name">
                        <h5 class="mb-1 text-truncate"><i class="fas fa-dove mr-2"></i>${data["Novel Name"]}</h5>
                    </div>
                    
                    <p class="mb-1 text-truncate"><i class="fas fa-pen-square mr-2"></i>${data["Author Name"]}</p>
                    <small><i class="fas fa-feather mr-2"></i>${data.Genre}</small>
                    <div><span class="badge badge-warning badge-pill">${chaptercounter} Chapters</span></div>
                </a>
            </div>
            `;
    finaloneshotnovelhtml += oneshotnovelhtml;
    finaloneshotnovelstore(finaloneshotnovelhtml);
};


///fetch data
db.collection('novel').where('Status', '==', 'One-shot').orderBy('Uptime', "desc").limit(4).onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        let data = change.doc.data();
        let id = change.doc.id;
        db.collection('novel').doc(id).collection('Chapters').onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                let chapters = change.doc.data();
                addoneshotnovel(data, id, chapters);
            });
        });
    });
});
//=================================ONESHOT NOVEL UPDATE ENDS======================================================

//=================================ONGOING COMIC UPDATE STARTS======================================================
/// show data
let ongoingcomic = document.getElementById('ongoing-comic');

let finalhtmlcomicongoing = ``;
let ongoingcomichtml = ``;
let finalongoingcomichtml = ``;

function finalongoingcomicstore(finalongoingcomichtml) {
    finalhtmlcomicongoing = `
                    <div class="col-12 headerlink">
                        <a href="comic.html">
                            <h1 class="text-center text-white py-3 rounded border-2 shadow text-nowrap font-weight-bold" style="background-color: #0389ff">ONGOING COMIC</h1>
                        </a>
                    </div>
                    ${finalongoingcomichtml}
                `;
    ongoingcomic.innerHTML = finalhtmlcomicongoing;
}
let addongoingcomic = (data, id, chapters) => {

    let chaptercounter = 0;
    for (i in chapters) {
        chaptercounter += 1
    };
    ongoingcomichtml = `
            <div class="col-lg-3 col-md-6 col-sm-6 col-12 mt-3">
                <a href="comic.html" class="list-group-item list-group-item-action flex-column align-items-start shadow text-white" style="background-color: #0389ff">
                    <div class="d-flex w-100 my-2 justify-content-between"><img src="${data.Cover}" class="img-fluid img-thumbnail-custom rounded"> </div>
                    <div class="d-flex w-100 justify-content-between name">
                        <h5 class="mb-1 text-truncate"><i class="fas fa-dove mr-2"></i>${data["Comic Name"]}</h5>
                    </div>
                    
                    <p class="mb-1 text-truncate"><i class="fas fa-pen-square mr-2"></i>${data["Author Name"]}</p>
                    <small><i class="fas fa-feather mr-2"></i>${data.Genre}</small>
                    <div><span class="badge badge-warning badge-pill">${chaptercounter} Chapters</span></div>
                </a>
            </div>
            `;
    finalongoingcomichtml += ongoingcomichtml;
    finalongoingcomicstore(finalongoingcomichtml);
};


///fetch data
db.collection('comic').where('Status', '==', 'Ongoing').orderBy('Uptime', "desc").limit(4).onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        let data = change.doc.data();
        let id = change.doc.id;
        db.collection('comic').doc(id).collection('Chapters').onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                let chapters = change.doc.data();
                addongoingcomic(data, id, chapters);
            });
        });
    });
});
//=================================ONGOING COMIC UPDATE ENDS======================================================

//=================================ONGOING NOVEL UPDATE STARTS======================================================
/// show data
let ongoingnovel = document.getElementById('ongoing-novel');

let finalhtmlnovelongoing = ``;
let ongoingnovelhtml = ``;
let finalongoingnovelhtml = ``;

function finalongoingnovelstore(finalongoingnovelhtml) {
    finalhtmlnovelongoing = `
                    <div class="col-12 headerlink">
                        <a href="novel.html">
                            <h1 class="text-center text-white py-3 rounded border-2 shadow text-nowrap font-weight-bold" style="background-color: #6e2585">ONGOING NOVEL</h1>
                        </a>
                    </div>
                    ${finalongoingnovelhtml}
                `;
    ongoingnovel.innerHTML = finalhtmlnovelongoing;
}
let addongoingnovel = (data, id, chapters) => {

    let chaptercounter = 0;
    for (i in chapters) {
        chaptercounter += 1
    };
    ongoingnovelhtml = `
            <div class="col-lg-3 col-md-6 col-sm-6 col-12 mt-3">
                <a href="novel.html" class="list-group-item list-group-item-action flex-column align-items-start shadow text-white" style="background-color: #6e2585">
                    <div class="d-flex w-100 my-2 justify-content-between"><img src="${data.Cover}" class="img-fluid img-thumbnail-custom rounded"> </div>
                    <div class="d-flex w-100 justify-content-between name">
                        <h5 class="mb-1 text-truncate"><i class="fas fa-dove mr-2"></i>${data["Novel Name"]}</h5>
                    </div>
                    
                    <p class="mb-1 text-truncate"><i class="fas fa-pen-square mr-2"></i>${data["Author Name"]}</p>
                    <small><i class="fas fa-feather mr-2"></i>${data.Genre}</small>
                    <div><span class="badge badge-warning badge-pill">${chaptercounter} Chapters</span></div>
                </a>
            </div>
            `;
    finalongoingnovelhtml += ongoingnovelhtml;
    finalongoingnovelstore(finalongoingnovelhtml);
};


///fetch data
db.collection('novel').where('Status', '==', 'Ongoing').orderBy('Uptime', "desc").limit(4).onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        let data = change.doc.data();
        let id = change.doc.id;
        db.collection('novel').doc(id).collection('Chapters').onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                let chapters = change.doc.data();
                addongoingnovel(data, id, chapters);
            });
        });
    });
});
//=================================ONGOING NOVEL UPDATE ENDS======================================================
