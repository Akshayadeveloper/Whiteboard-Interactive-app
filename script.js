//This project is a simple whiteboard drawing application implemented using HTML, CSS, and JavaScript. 

//**Benefits:**
//- It allows users to draw on a canvas using different colors and brush sizes.
//- Users can undo and redo their drawing actions.
//- There's an option to clear the canvas and save the drawing as an image.

//**Target Audience:**
//- This project could benefit anyone who needs a simple drawing tool for brainstorming, sketching, or collaborative drawing sessions.

//**Usefulness:**
//- It's useful for quick sketches, brainstorming sessions, teaching, or collaborative drawing tasks.

//**Libraries/Frameworks Used:**
//- This project doesn't utilize any external libraries or frameworks. It's built solely with vanilla HTML, CSS, and JavaScript.

//**Key Features:**
//1. Drawing functionality with customizable color and brush size.
//2. Undo and redo functionality for correcting mistakes.
//3. Clearing the canvas to start over.
//4. Saving the drawing as an image file.

//**How it Works:**
//- The HTML file sets up the structure of the webpage, including the canvas element for drawing and various UI controls.
//- CSS is used for styling the elements to create a visually appealing interface.
//- JavaScript provides the functionality for drawing on the canvas, handling user interactions, and implementing features like undo, redo, clearing the canvas, and saving the drawing.

//Overall, this project offers a basic yet functional whiteboard drawing tool suitable for various purposes.

        const canvas = document.getElementById('whiteboard');
        const context = canvas.getContext('2d');
        let drawing = false;
        let currentColor = '#000';
        let currentBrushSize = 5;
        let undoStack = [];
        let redoStack = [];

        // Resize canvas to fill the entire viewport
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        function startPosition(e) {
            drawing = true;
            draw(e);
        }

        function endPosition() {
            drawing = false;
            context.beginPath();
            undoStack.push(context.getImageData(0, 0, canvas.width, canvas.height));
            redoStack = [];
        }

        function draw(e) {
            if (!drawing) return;

            const offsetX = e.clientX - canvas.offsetLeft;
            const offsetY = e.clientY - canvas.offsetTop;

            context.lineWidth = currentBrushSize;
            context.lineCap = 'round';
            context.strokeStyle = currentColor;

            context.lineTo(offsetX, offsetY);
            context.stroke();
        }

        function changeColor() {
            currentColor = colorPicker.value;
        }

        function changeBrushSize() {
            currentBrushSize = brushSize.value;
        }

        function undo() {
            if (undoStack.length > 0) {
                redoStack.push(context.getImageData(0, 0, canvas.width, canvas.height));
                context.putImageData(undoStack.pop(), 0, 0);
            }
        }

        function redo() {
            if (redoStack.length > 0) {
                undoStack.push(context.getImageData(0, 0, canvas.width, canvas.height));
                context.putImageData(redoStack.pop(), 0, 0);
            }
        }

        function clearCanvas() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            undoStack = [];
            redoStack = [];
        }

        function saveCanvas() {
            const img = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = img;
            link.download = 'whiteboard.png';
            link.click();
        }

        canvas.addEventListener('mousedown', startPosition);
        canvas.addEventListener('mouseup', endPosition);
        canvas.addEventListener('mousemove', draw);

        canvas.addEventListener('touchstart', function(e) {
            e.preventDefault();
            startPosition(e.touches[0]);
        });
        canvas.addEventListener('touchend', endPosition);
        canvas.addEventListener('touchmove', function(e) {
            e.preventDefault();
            draw(e.touches[0]);
        });

        colorPicker.addEventListener('input', changeColor);
        brushSize.addEventListener('input', changeBrushSize);
