/////////////////Animation code starts

//console.log(LIST);

// let votesAll = []

// window.v = votesAll
// LIST[0].results.forEach((item) => {
//     const name = item.partName.replace(/\s/g, '')
//     votesAll.push({ name, votes: Number(item.votes) })
// })



//Votes excluding three top results
let localOthersVotes = 0
for (let i = 3; i < LIST[0].results.length; i++) {

    localOthersVotes += Number(LIST[0].results[i].votes);
}

//ANIMATION

var params = {
    container: document.getElementById('mainAnim'),
    renderer: 'svg',
    loop: false,
    autoplay: false, //important
    autoloadSegments: false,
    prerender: false,
    //initialSegment: [1, 150],
    //animationData: animationData,
    path: "https://raw.githubusercontent.com/kirillSkorodelov/idonix/main/idonixAnim.json"
};
var anim;

anim = lottie.loadAnimation(params);


anim.addEventListener("DOMLoaded", function() {
    anim.renderer.elements[0].updateDocumentData({ t: LIST[0].results[0].share })
    anim.renderer.elements[1].updateDocumentData({ t: LIST[0].results[1].share })
    anim.renderer.elements[2].updateDocumentData({ t: LIST[0].results[2].share })
    anim.renderer.elements[3].updateDocumentData({ t: (100 - (Number(LIST[0].results[0].share) + Number(LIST[0].results[1].share) + Number(LIST[0].results[2].share))).toFixed(2) })

    anim.renderer.elements[5].updateDocumentData({ t: LIST[0].regNames })
    anim.renderer.elements[6].updateDocumentData({ t: LIST[0].results[0].votes })
    anim.renderer.elements[7].updateDocumentData({ t: LIST[0].results[1].votes })
    anim.renderer.elements[8].updateDocumentData({ t: LIST[0].results[2].votes })
    anim.renderer.elements[9].updateDocumentData({ t: String(localOthersVotes) })
    anim.renderer.elements[10].updateDocumentData({ t: LIST[0].results[0].share })
    anim.renderer.elements[11].updateDocumentData({ t: LIST[0].results[1].share })
    anim.renderer.elements[12].updateDocumentData({ t: LIST[0].results[2].share })
    anim.renderer.elements[13].updateDocumentData({
        t: (100 - (Number(LIST[0].results[0].share) + Number(LIST[0].results[1].share) + Number(LIST[0].results[2].share))).toFixed(2)
    })
    anim.renderer.elements[14].updateDocumentData({ t: LIST[0].results[0].partName })
    anim.renderer.elements[15].updateDocumentData({ t: LIST[0].results[1].partName })
    anim.renderer.elements[16].updateDocumentData({ t: LIST[0].results[2].partName })
    anim.renderer.elements[17].updateDocumentData({ t: "Others" })

    anim.playSegments([0, 30], true)

});


//COUNTING NEXT REGIONS
var filesProcessed = 0

let votesLABTotal = Number(LIST[0].results[0].votes)
let votesCONTotal = Number(LIST[0].results[1].votes)
let votesLDTotal = Number(LIST[0].results[2].votes)
let votesOTHTotal = Number(localOthersVotes)
let votesALLTotal = Number(votesLABTotal) + Number(votesCONTotal) + Number(votesLDTotal) + Number(votesOTHTotal)

let seatsLAB = 1
let seatsCON = 0
let seatsLD = 0
let seatsOTH = 0

let seatsToWin = 10 //for example

// var LAB = "LAB ";

// var LABvotes;
// for (var i = 0; i < LIST[0].results.length; i++) {
//     if (LIST[0].results[i].partName == LAB) {
//         LABvotes = LIST[0].results[i].votes;
//         break;
//     }
// }
// console.log(LABvotes);

function nextRegion() {
    filesProcessed += 1;
    console.log(filesProcessed)

    let localWinner = String(LIST[filesProcessed].results[0].partName).split(' ')[0];

    // console.log(`the winner is ${localWinner}`) //; CON seats: ${seatsCON}; LAB seats: ${seatsLAB}; LD seats: ${seatsLD}`)

    if (localWinner === 'LAB') {
        seatsLAB += 1
    } else if (localWinner === 'CON') {
        seatsCON += 1
    } else if (localWinner === 'LD') {
        seatsLD += 1
    } else {
        seatsOTH += 1
    }

    //let votesALLTotal = 0
    for (let i = 0; i < LIST[filesProcessed].results.length; i++) {
        votesALLTotal += Number(LIST[filesProcessed].results[i].votes)
    }

    votesLABTotal += Number(LIST[filesProcessed].results.find(votes => votes.partName === 'LAB ').votes)
    console.log(votesLABTotal);

    votesCONTotal += Number(LIST[filesProcessed].results.find(votes => votes.partName === 'CON ').votes)
    console.log(votesCONTotal);

    votesLDTotal += Number(LIST[filesProcessed].results.find(votes => votes.partName === 'LD  ').votes)
    console.log(votesLDTotal);

    votesOTHTotal = (votesALLTotal - votesLABTotal - votesCONTotal - votesLDTotal)
    console.log(votesOTHTotal);

    let shareLABTotal = (votesLABTotal / votesALLTotal * 100).toFixed(2)
    let shareCONTotal = (votesCONTotal / votesALLTotal * 100).toFixed(2)
    let shareLDTotal = (votesLDTotal / votesALLTotal * 100).toFixed(2)
    let shareOTHTotal = (votesOTHTotal / votesALLTotal * 100).toFixed(2)

    console.log(votesALLTotal)
    console.log(shareLABTotal)
    console.log(shareCONTotal)
    console.log(shareLDTotal)
    console.log(shareOTHTotal)
        //console.log(votesOTHTotal)



    // console.log(`the winner is ${localWinner}; CON seats: ${seatsCON}; LAB seats: ${seatsLAB}; LD seats: ${seatsLD}; OTH seats: ${seatsOTH}`)

    //Counting total votes
    // LIST[filesProcessed].results.forEach((item) => {
    //     const name = item.partName.replace(/\s/g, '')
    //     const number = Number(item.votes)
    //     votesAll.forEach((item, idx) => {
    //         if (name === item.name) {
    //             votesAll[idx] = {...item, votes: item.votes + number }
    //         }
    //     })
    // })

    // //All local votes
    // let localAllVotes = 0
    // for (let i = 0; i < LIST[filesProcessed].results.length; i++) {
    //     localAllVotes += Number(LIST[filesProcessed].results[i].votes)
    //         // console.log(i)
    //}

    //Votes excluding three top results
    let localOthersVotes = 0
    for (let i = 3; i < LIST[filesProcessed].results.length; i++) {
        localOthersVotes += Number(LIST[filesProcessed].results[i].votes);
        // console.log(i)
    }



    //update graphics
    setTimeout(function() {
        anim.renderer.elements[0].updateDocumentData({ t: shareLABTotal })
        anim.renderer.elements[1].updateDocumentData({ t: shareCONTotal })
        anim.renderer.elements[2].updateDocumentData({ t: shareLDTotal })
        anim.renderer.elements[3].updateDocumentData({ t: shareOTHTotal })

        anim.renderer.elements[4].updateDocumentData({ t: filesProcessed + 1 })
            //     //Region name
        anim.renderer.elements[5].updateDocumentData({ t: LIST[filesProcessed].regNames.replace("&amp;", "&") })
            //     //local votes
        anim.renderer.elements[6].updateDocumentData({ t: LIST[filesProcessed].results[0].votes })
        anim.renderer.elements[7].updateDocumentData({ t: LIST[filesProcessed].results[1].votes })
        anim.renderer.elements[8].updateDocumentData({ t: LIST[filesProcessed].results[2].votes })
        anim.renderer.elements[9].updateDocumentData({ t: String(localOthersVotes) })
            //     //local share
        anim.renderer.elements[10].updateDocumentData({ t: LIST[filesProcessed].results[0].share })
        anim.renderer.elements[11].updateDocumentData({ t: LIST[filesProcessed].results[1].share })
        anim.renderer.elements[12].updateDocumentData({ t: LIST[filesProcessed].results[2].share })
        anim.renderer.elements[13].updateDocumentData({
                t: (100 - (Number(LIST[filesProcessed].results[0].share) + Number(LIST[filesProcessed].results[1].share) + Number(LIST[filesProcessed].results[2].share))).toFixed(2)
            })
            //     //Party names
        anim.renderer.elements[14].updateDocumentData({ t: LIST[filesProcessed].results[0].partName })
        anim.renderer.elements[15].updateDocumentData({ t: LIST[filesProcessed].results[1].partName })
        anim.renderer.elements[16].updateDocumentData({ t: LIST[filesProcessed].results[2].partName })
            //     //Seats
        anim.renderer.elements[18].updateDocumentData({ t: String(seatsLAB) })
        anim.renderer.elements[19].updateDocumentData({ t: String(seatsCON) })
        anim.renderer.elements[20].updateDocumentData({ t: String(seatsLD) })
        anim.renderer.elements[21].updateDocumentData({ t: String(seatsOTH) })
            //Total votes
        anim.renderer.elements[22].updateDocumentData({ t: String(votesLABTotal) })
        anim.renderer.elements[23].updateDocumentData({ t: String(votesCONTotal) })
        anim.renderer.elements[24].updateDocumentData({ t: String(votesLDTotal) })
        anim.renderer.elements[25].updateDocumentData({ t: String(votesOTHTotal) })



    }, 0);

    anim.playSegments([0, 30], true)
        //let seatsToWin = 10
    if (seatsLAB == seatsToWin || seatsCON == seatsToWin || seatsLD == seatsToWin) {
        anim.playSegments([0, 30], true)
        setTimeout(function() {
            anim.playSegments([64, 107], true)
            seatsToWin = 1000
        }, 400)
    }
};

///////////////////Kirill's code ends