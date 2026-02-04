

var divWidth;
var divHeight;
var notchCount = 18;
var pteroNames = [];
let pteroCSV;
let font;

function preload() {

  pteroCSV = loadTable('pteroTimeline.csv', 'csv', 'header');
  // font = loadFont("ohno-softie-variable");

}

function setup() {

// create timeline that fills grid container div
    var canvasDiv = document.getElementsByClassName('grid-container')[0];
    // Get the actual computed width and height of the div
    divWidth = canvasDiv.offsetWidth;
    divHeight = canvasDiv.offsetHeight;
    console.log(divWidth, divHeight);
    // Create the canvas with the div's dimensions
    var canvas = createCanvas(divWidth, divHeight);
    // var canvas = createCanvas(700, 700);
    canvas.parent("timeline");

  background(220, 0);
  stroke(230,190,170, 255);  
  strokeWeight(0.005*divWidth);

  textAlign(RIGHT, CENTER);
  textSize(20);


//scroll parallax
let titlecard = document.getElementsByClassName('titlecard')[0];
let leafLeft = document.getElementsByClassName('leafLeft')[0];
let leafRight= document.getElementsByClassName('leafRight')[0];
let grass= document.getElementsByClassName('grass')[0];
let ground= document.getElementsByClassName('ground')[0];

window.addEventListener('scroll', () => {
  let parallax = window.scrollY;
  leafLeft.style.left = parallax * -1.2 + 'px';
  leafLeft.style.rotate = parallax * -0.08 + 'deg';
  // console.log(parallax);

  titlecard.style.top = Math.min(parallax * windowHeight * -0.00025, window.innerHeight) + 'px';


  // ptero.rotation.y += (targetRotY - ptero.rotation.y) 


  grass.style.top = Math.min(parallax * windowHeight * 0.0055, window.innerHeight) + 'px';
  grass.style.opacity = 1-parallax/80;

  leafRight.style.left = parallax * 0.8 + 'px';
  leafRight.style.rotate = parallax * 0.075 + 'deg';

  ground.style.top = Math.min(parallax * windowHeight * 0.0035, window.innerHeight) + 'px';
  ground.style.opacity = 1-parallax/100;

// solve: infinte scroll caused by elements moving vertically
})

// Creating timeline + notches
  textFont('ohno-softie-variable');
  let topX = divWidth / 2;
  let topY = divHeight * 0.1;
  let botX = divWidth / 2;
  let botY = divHeight * 0.9;
  line(topX, topY, botX, botY);
  for (var i=0; i <= notchCount; i++) {
        line(topX-50, topY+i*(botY-topY)/notchCount, topX+50, topY+i*(botY-topY)/notchCount);
        push();
          fill(134, 62, 78);
          noStroke();
          text(250-i*10+ ' MYA',topX-80,topY+i*(botY-topY)/notchCount);
        pop();
  console.log(i);
  }

var rowCount = pteroCSV.getRowCount();
var colCount = pteroCSV.getColumnCount();

var sciNameGet = pteroCSV.getColumn('SciName');
var etymologyGet = pteroCSV.getColumn('Etymology');
var wingspanGet = pteroCSV.getColumn('Wingspan');
var locationGet = pteroCSV.getColumn('Location');
var factGet = pteroCSV.getColumn('Fact');

var rowPlace = [0,0,0,0,0,6,7,8,8,9,9]
var colPlace = [0,0,0,0,0,1,2,3,2,1,4]

pteroNames = [
  "lagerpeton",
  "dimorphodon",
  "rhamphorynchus",
  "anurognathus",
  "pterodactylus",
  "guidraco",
  "pteranodon",
  "tapejara",
  "nemicolopterus",
  "quetzalcoatlus",
  "dsungaripterus"
];
// creates new desc divs for each new pterosaur
// for (var i=5; i <= sciNameGet.length; i++) {
//     const descDiv = document.createElement('div');
//     descDiv.classList.add("desc");
//     canvasDiv.appendChild(descDiv);

//     descDiv.style.gridRowStart = rowPlace[i];
//     descDiv.style.gridRowEnd = "span 4";
//     descDiv.style.gridColumnStart = colPlace[i];    
//     descDiv.style.gridColumnEnd = "span 4";
    

// }

// gets each description div and inserts 4 category divs into it
for (let j=0; j < sciNameGet.length; j++) {

  var desc = document.getElementsByClassName('desc')[j];

  desc.style.gridRowEnd = "span 3";
  desc.style.gridColumnEnd = "span 4";


      // <script type="module" src="./pteroJSfiles/lagerpeton.js"></script>
var scriptDiv = document.getElementsByClassName("scripts")[0];

for (let i = 0; i < sciNameGet.length; i++) {
      var script = document.createElement('script');
      script.type = "module";
      script.src="./pteroJSfiles/"+pteroNames[i]+".js";
      scriptDiv.appendChild(script);
}


//insert name as title
  //  var addCanvas = document.createElement('canvas');
  //   addCanvas.classList.add("dropshadow");
  //   addCanvas.id = pteroNamesJS[j];
  //   addCanvas.style.gridRowStart = rowPlace[j];
  //   // addCanvas.style.gridRowEnd = "span 4";
  //   addCanvas.style.gridColumnStart = colPlace[j];  
  //   addCanvas.style.width  = 400;
  //   addCanvas.style.height = 400;

    // addCanvas.style.griCollumnEnd = "span 4";
    // desc.appendChild(addCanvas);

    // desc.innerText('</canvas>'/);

    var newH1 = document.createElement('h1');
    newH1.classList.add('sciName');
    desc.appendChild(newH1);

    // <canvas class="dropshadow" id="rhampho" style="grid-column: col-start 2 / span 4; grid-row: 10 / span 3;"></canvas>
 


  const categories = ['etymology', 'wingspan', 'location', 'fact'];
  let divs = [];   // store created divs

  for (let i = 0; i < categories.length; i++) {

    const newDiv = document.createElement('div');
    newDiv.classList.add(categories[i]);
    // console.log(newDiv, categories[i]);

    desc.appendChild(newDiv);
    divs.push(newDiv);
  }
}


for (let i=0; i < sciNameGet.length; i++) {
var sciName = document.getElementsByClassName('sciName')[i];
sciName.innerText = sciNameGet[i];

var etymology = document.getElementsByClassName('etymology')[i];
etymology.innerText = etymologyGet[i];

var wingspan = document.getElementsByClassName('wingspan')[i];
wingspan.innerText = 'Wingspan: ' + wingspanGet[i];

var location = document.getElementsByClassName('location')[i];
location.innerText = 'Location: ' + locationGet[i];

var fact = document.getElementsByClassName('fact')[i];
fact.innerText = factGet[i];
console.log(i);
}

//ARRAY FOR LOCATION - customize each using list




}



function draw() {
  //   rect(200,200,500,500);   
// ptero[1].show();
}