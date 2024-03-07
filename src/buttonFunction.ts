// buttonFunction.ts

export function changeButtonImage() {
    const buttonImage = document.getElementById('buttonImage') as HTMLImageElement;
    // Cambia la imagen del botón
    buttonImage.src = '/public/button2.png';
}
