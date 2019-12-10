window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

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

let statup = document.getElementById('accordion-comic');
/// show data
let addstat = (data, id, chapters) => {

    let html = ``;
    let finalhtml = ``;
    let i = 0;
    for (var chapternames in chapters) {
        let finalLinkHtml = ``;
        chapters[chapternames].forEach(link => {
            let linkhtml = `<img src="${link}" class="my-2 img-fluid">`;
            finalLinkHtml += linkhtml;
        });
        html = `<div class="card bg-dark">
                        <div class="card-header">
                            <h2 class="mb-0">
                                <button class="btn w-btn collapsed btn-info" type="button" data-toggle="collapse" data-target="#${id + i}" aria-expanded="false">
                                    ${chapternames}
                                </button>
                            </h2>
                        </div>

                        <div id="${id + i}" class="collapse" data-parent="#accordion-comic">
                            <div class="card-body">
                                ${finalLinkHtml};
                            </div>
                        </div>
                    </div>`;
        finalhtml += html;
        i += 1;
    };
    statup.innerHTML = finalhtml;
};


///fetch data
db.collection('comic').where('Comic Name', '==', 'Honey').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        let data = change.doc.data();
        let id = change.doc.id;
        db.collection('comic').doc(id).collection('Chapters').onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                let chapters = change.doc.data();
                addstat(data, id, chapters);
            });
        });
    });
});
