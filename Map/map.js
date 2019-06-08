let roomDesc = document.getElementById('room-desc');
let roomIDArray = Array.from({ length: 64 }, () => Math.floor(Math.random() * 1000));
let roomDescArray = [];
let i = 0;

class UI {
    updateCurrentRoom(room) {
        roomDesc.textContent = `${room.room_desc}`;
    }
}

ui = new UI();

//pull numbers from JSON file based on IDarray
fetch('room-test.json')
    .then(response => {
        return response.json();
    })
    .then(roomData => {
        roomIDArray.forEach(element => {
            roomDescArray.push(roomData[element]);
        });

        // Need to select a random item
        const room = roomDescArray[i];
        ui.updateCurrentRoom(room);
    });
