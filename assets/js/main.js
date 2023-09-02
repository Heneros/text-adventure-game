// const audioFilePath = 'assets/mp3/audio.mp3';
// const audio = new Audio(audioFilePath);


// const customCursor = document.querySelector('.custom-cursor');

// customCursor.addEventListener('click', () => {
//     audio.play();
// });

// document.addEventListener("mousemove", (e) => {
//     customCursor.style.left = e.pageX + "px";
//     customCursor.style.top = e.pageY + "px";
// });





const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('option-buttons');


let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}
function playAudio(audioPath) {
    var audio = new Audio(audioPath);
    audio.play();
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text;



    const screenElement = document.getElementById('preview');


    screenElement.innerHTML = '';

    if (textNode.image) {
        let imageElement = document.createElement('img');
        imageElement.src = textNode.image;
        imageElement.alt = 'screen game';
        screenElement.appendChild(imageElement);
    }


    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => {
                if (option.audio) {
                    playAudio(option.audio);
                }
                selectOption(option);
            });
            optionButtonsElement.appendChild(button);
        }
    })
}
function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}


function selectOption(option) {
    const nextTextNodeId = option.nextText;
    if (nextTextNodeId <= 0) {
        return startGame();
    }
    state = Object.assign(state, option.setState);
    showTextNode(nextTextNodeId);

}

const textNodes = [
    {
        id: 1,
        text: 'You wake up and hear voice: rise and shine mr freeman rise and shine not that i wish to imply you have been sleeping on the job no one is more deserving of a rest and all the effort in the world would have gone to waste until well lets just say your hour has come again the right man in the wrong place can make all the different',
        image: "assets/img/1screen.jpg",
        audio: 'assets/mp3/audio.mp3',
        options: [
            {
                text: 'Keep listen',
                setState: { do: true },
                nextText: 2
            },
            {
                text: 'Nothing do',
                setState: { do: false },
                nextText: 2,

            }

        ]
    },
    {
        id: 2,
        text: 'You appear in train and see people in blue cloth.',
        image: "assets/img/2screen.jpg",
        options: [
            {
                text: 'Exit from train',
                // requiredState: (currentState) => currentState.do,
                setState: { do: true},
                nextText: 3
            },
            {
                text: 'Wait and watch',
                // requiredState: (currentState) => currentState.do,

                setState: { do: false},
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text: 'You stay in inside train and nothing happend',
        image: "assets/img/4screen.png",
        options: [
            {
                text: 'Exit train',
                // requiredState: (currentState) => currentState.do,
                nextText: 5
            },
            {
                text: 'Keep staying',
                // requiredState: (currentState) => currentState.do,
                nextText: 3
            },
        ]
    },
    
    {
        id: 5,
        text: 'You see huge billboard ',
        image: "assets/img/5screen.png",
        options: [
            {
                text: 'Turn right',
                nextText: 6
            },
            {
                text: 'Turn left',
                nextText: 7
            }
        ]
    },
    {
        id: 7,
        text: 'You vortigon cleaning train station, you can collect garbage',
        options: [
            {
                text: 'Restart',
                nextText: 5
            },  
             {
                text: 'Restart',
                nextText: 5
            },
        ]
    },
]
startGame()
