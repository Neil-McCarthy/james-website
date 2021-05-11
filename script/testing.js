let keysPressed = {};

document.addEventListener('keydown', (event) => {
    keysPressed[event.key] = true;
});

document.addEventListener('keyup', (event) => {
    delete this.keysPressed[event.key];
 });

document.addEventListener('keydown', (event) => {
   keysPressed[event.key] = true;

   if (event.key == 'a') {
       console.log('a');
   }
});



document.addEventListener('keyup', (event) => {
   delete keysPressed[event.key];
});
