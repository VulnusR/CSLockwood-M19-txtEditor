const butInstall = document.getElementById('buttonInstall');
let deferredPrompt;

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Store the event for later use
    deferredPrompt = event;

    // Show the install button
    butInstall.style.display = 'block';
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const choiceResult = await deferredPrompt.userChoice;

    // Hide the install button
    butInstall.style.display = 'none';

    // Log the user's choice
    console.log(choiceResult.outcome);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // Show a confirmation message to the user
    console.log('The JATE was successfully installed!');

});
