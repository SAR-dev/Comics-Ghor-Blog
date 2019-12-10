$(function () {
    $("#load").click(function (e) { // click event for load more
        e.preventDefault();
        $(".galleryContent:hidden").slice(0, 9).show(); // select next 10 hidden divs and show them
        if ($(".galleryContent:hidden").length == 0) { // check if any hidden divs still exist
            $("#load").addClass('hide'); // alert if there are none left
        }
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

let galleryhtml = document.querySelector("#galleryhtml");
let itemhtml = ``;
let finalhtml = ``;
let gallery = (data, id) => {
    itemhtml = `
                <div class="col-lg-4 col-md-6 col-sm-6 col-12 my-3 galleryContent">
                    <div class="float-left">
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${data.Link}" target="_blank" class="share-btn facebook"><i class="fab fa-facebook-square"></i></a>

                    <a href="http://www.tumblr.com/share/link?url=${data.Link}" target="blank_" class="share-btn tumblr"> <i class="fab fa-tumblr-square"></i></a>

                    <a href="https://twitter.com/share?url=${data.Link}&text=${data.Name}&via=Comics Ghor" target="_blank" class="share-btn twitter">
                        <i class="fab fa-twitter-square"></i>
                    </a>
                    <a href="https://reddit.com/submit?url=${data.Link}&title=Comics Ghor" target="_blank" class="share-btn reddit">
                        <i class="fab fa-reddit-square"></i>
                    </a>
                    </div>
                    <a href="${data.Link}" data-toggle="lightbox" data-gallery="example-gallery">
                        <img src="${data.Link}" class="img-fluid shadow-lg rounded w-100">
                        <p class="mt-2 text-dark" style="font-size: .8rem">${data.Name}</p>
                    </a>
                </div>
`;
    finalhtml += itemhtml;
    galleryhtml.innerHTML = finalhtml;
    $(".galleryContent").slice(0, 9).show();
};


///fetch data
db.collection('art').orderBy('Time', "desc").onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        let data = change.doc.data();
        let id = change.doc.id;
        gallery(data, id);
    });
});
