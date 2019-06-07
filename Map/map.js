let roomDesc = document.getElementById('room-desc');

let roomIDArray = Array.from({length: 64}, () => Math.floor(Math.random() * 1000));

let roomDescArray = [];

let i=0


//pull numbers from JSON file based on IDarray
fetch('room-test.json') 
    .then(response => {
        return response.json();
    })
    .then(roomData => {
        roomIDArray.forEach(element => {
            roomDescArray.push(roomData[element]);
        });
    });

console.log(roomDescArray);

class UI {
    updateCurrentRoom(room){
        roomDesc.textContent = `${room.room_desc}`;
    }
}

ui = new UI();

ui.updateCurrentRoom(roomDescArray[i]);

console.log(roomDesc.textContent);
