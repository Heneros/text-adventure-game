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
// const imageScreen = document.getElementById('screen')

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}


function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text;


    // imageScreen.innerHTML = '';

    // if (textNode.image) {
    //     const imageElement = document.createElement('img');
    //     imageElement.src = textNode.image;
    //     imageElement.alt = 'screen game'; // Добавьте атрибут alt для изображения
    //     imageScreen.appendChild(imageElement);
    // }

    const screenElement = document.getElementById('preview');


    screenElement.innerHTML = '';

    if (textNode.image) {
        const imageElement = document.createElement('img');
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
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
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
        image: "assets/img/3screen.jpg",
        // sound play
        options: [
            {
                text: 'Keep listen',
                setState: { blueGoo: true },
                nextText: 2
            },
            // {
            //     text: 'Leave the goo',
            //     nextText: 2
            // }

        ]
    },
    {
        id: 2,
        text: 'You appear in train station  ',
        options: [
            {
                text: '',
                requiredState: (currentState) => currentState.blueGoo,
                setState: { blueGoo: false, sword: true },
                nextText: 3
            },
            {
                text: '',
                requiredState: (currentState) => currentState.blueGoo,
                setState: { blueGoo: false, shield: true },
                nextText: 3
            },
            {
                text: '',
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text: '',
        options: [
            {
                text: '',
                nextText: 4
            },
            {
                text: '',
                nextText: 5
            },
            {
                text: '',
                nextText: 6
            }
        ]
    },
    {
        id: 4,
        text: '',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    }
]
startGame()
