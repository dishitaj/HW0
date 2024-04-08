 // DrawRectangle.js
 // Function to draw a vector on the canvas


//  var canvas = document.getElementById('example');
//  var ctx = canvas.getContext('2d');

function main() {
    // Retrieve <canvas> element <- (1)
    var canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return false;
    }
    canvas.style.backgroundColor = "black";
    // Get the rendering context for 2DCG <- (2)
    var ctx = canvas.getContext('2d');

    // Draw a blue rectangle <- (3)
    // ctx.fillStyle = 'rgba(0, 0, 255, 1.0)'; // Set a blue color
    // ctx.fillRect(120, 10, 150, 150); // Fill a rectangle with the color

    let v1 = new Vector3([2.25,2.25,0]);
    drawVector(v1, "red");
}
function drawVector(v, color) {
    var canvas = document.getElementById("example");
    var ctx = canvas.getContext('2d');
    // ctx.clearRect(0, 0, canvas.width, canvas.height);


    //center to the canvas
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;

    // scale the vector by 20
    var scaledX = v.elements[0] * 20;
    var scaledY = v.elements[1] * 20;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + scaledX, centerY - scaledY); // subtracting scaledY because canvas y-axis is inverted
    ctx.strokeStyle = color;
    ctx.stroke();
}
function handleDrawEvent() {
    var x1Value = parseFloat(document.getElementById("x1coord").value);
    var y1Value = parseFloat(document.getElementById("y1coord").value);

    var x2Value = parseFloat(document.getElementById("x2coord").value);
    var y2Value = parseFloat(document.getElementById("y2coord").value);

    // clear canvas 
    var canvas = document.getElementById("example");
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var v1 = new Vector3([x1Value, y1Value, 0]);
    drawVector(v1, "red");

    var v2 = new Vector3([x2Value, y2Value, 0]);
    drawVector(v2, "blue");
}

function handleDrawOperationEvent() {
    var canvas = document.getElementById("example");
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var x1Value = parseFloat(document.getElementById("x1coord").value);
    var y1Value = parseFloat(document.getElementById("y1coord").value);

    var x2Value = parseFloat(document.getElementById("x2coord").value);
    var y2Value = parseFloat(document.getElementById("y2coord").value);
    var scalar = parseFloat(document.getElementById("scalar").value);

    var operation = document.getElementById("operation").value;

    var v1 = new Vector3([x1Value, y1Value, 0]);
    drawVector(v1, "red");

    var v2 = new Vector3([x2Value, y2Value, 0]);
    drawVector(v2, "blue");

    
    if (operation === "add") {
        var v3 = new Vector3().set(v1).add(v2);
        drawVector(v3, "green");
    } else if (operation === "sub") {
        var v3 = new Vector3().set(v1).sub(v2);
        drawVector(v3, "green");
    } else if (operation === "mul") {
        var v3 = new Vector3().set(v1).mul(scalar);
        var v4 = new Vector3().set(v2).mul(scalar);
        drawVector(v3, "green");
        drawVector(v4, "green");
    } else if (operation === "div") {
        var v3 = new Vector3().set(v1).div(scalar);
        var v4 = new Vector3().set(v2).div(scalar);
        drawVector(v3, "green");
        drawVector(v4, "green");
    }
    else if (operation == "mag"){
        var v1_magnitude = new Vector3().set(v1).magnitude();
        var v2_magnitude = new Vector3().set(v2).magnitude();
        console.log("Magnitude v1: ", v1_magnitude);
        console.log("Magnitude v2: ", v2_magnitude);
    }
    else if (operation == "norm"){
        var v3 = new Vector3().set(v1).normalize(v3);
        var v4 = new Vector3().set(v2).normalize(v4);
        drawVector(v3, "green");
        drawVector(v4, "green");
    }
    else if (operation == "angle"){
        angleBetween(v1, v2);
    }
    else if (operation == "area"){
        var cross_vector = Vector3.cross(v1, v2); 
        var cross_magnitude = new Vector3().set(cross_vector).magnitude();
        let area = cross_magnitude / 2 
        console.log("Area of the triangle: ", area);
    }
}


function angleBetween(v1, v2){
    var dot_product = Vector3.dot(v1, v2); 
    var v1_magnitude = new Vector3().set(v1).magnitude();
    var v2_magnitude = new Vector3().set(v2).magnitude();
    var alpha = dot_product/(v1_magnitude * v2_magnitude);
    var angle = Math.acos(alpha);
    var angleDegrees = angle * (180 / Math.PI);

    console.log("Angle: ", angleDegrees);
}