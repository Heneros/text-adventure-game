


const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('option-buttons');


let state = {}

function startGame() {
    state = {}
    showTextNode(1)
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
                // if (option.audio) {
                //     playAudio(option.audio);
                // }
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
                nextText: 2
            },
            {
                text: 'Nothing do',
                nextText: 2,

            }

        ]
    }, {
        id: 2,
        text: 'You appear in train and see people in blue cloth.',
        image: "assets/img/2screen.jpg",
        options: [
            {
                text: 'Exit from train',
                nextText: 3
            },
            {
                text: 'Wait and watch',
                nextText: 3
            }
        ]
    }, {
        id: 3,
        text: 'You stay in inside train and nothing happend',
        image: "assets/img/4screen.png",
        options: [
            {
                text: 'Exit train',
                nextText: 5
            },
            {
                text: 'Keep staying',
                nextText: 3
            },
        ]
    }, {
        id: 5,
        text: 'You see huge billboard ',
        image: "assets/img/5screen.png",
        options: [
            {
                text: 'Turn right',
                nextText: 8
            },
            {
                text: 'Turn left',
                nextText: 7
            }
        ]
    },{
        id: 7,
        text: 'You see vortigon cleaning train station, you can collect jar, collect jar? ',
        image: "assets/img/6screen.png",
        options: [
            {
                text: 'Turn left and dont collect jar',
                nextText: 8
            },
            {
                text: 'Turn left and collect jar',
                setState: { garbageCollect: true },
                nextText: 8
            },
        ]
    }, {
        id: 8,
        text: 'You see combain officer with shoker, what are you do?',
        image: "",
        options: [
            {
                text: 'Pass him',
                nextText: 9
            }, {
                text: 'Throw jar to him',
                requiredState: (currentState) => currentState.garbageCollect,
                setState: { garbageCollect: false },
                nextText: 9
            },
        ]
    }, {
        id: 9,
        text: 'Yo',
        image: "assets/img/6screen.png",
        options: [
            {
                text: 'Pass him',
                nextText: 9
            }, {
                text: 'Test',
                requiredState: (currentState) => currentState.garbageCollect,
                setState: { garbageCollect: false },
                nextText: 9
            },
        ]
    },
]
startGame()
