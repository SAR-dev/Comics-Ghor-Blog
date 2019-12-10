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

let galleryhtml = document.querySelector("#tutorial");
let itemhtml = ``;
let finalhtml = ``;
let gallery = (data, id) => {

    itemhtml = `
                <div class="col-lg-4 col-md-4 col-6 my-3 text-center">
                        
                    <div class="modal fade" id="${id}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg" role="document">
                            <div class="modal-content">
                                <div class="modal-body mb-0 p-2">
                                    <div class="embed-responsive embed-responsive-16by9 z-depth-1-half">
                                        ${data.Video}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <a><img class="img-fluid img-thumbnail z-depth-1" src="${data.Image}" alt="video" data-toggle="modal" data-target="#${id}"><p class="mt-3" style="font-size: .8rem">${data.Title}</p></a>

                </div>
`;
    finalhtml += itemhtml;
    galleryhtml.innerHTML = finalhtml;
};


///fetch data
db.collection('tutorial').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        let data = change.doc.data();
        let id = change.doc.id;
        gallery(data, id);
    });
});
