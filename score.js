// function readTextFile(file)
// {
//     var rawFile = new XMLHttpRequest();
//     rawFile.open("GET", file, false);
//     rawFile.onreadystatechange = function ()
//     {
//         if(rawFile.readyState === 4)
//         {
//             if(rawFile.status === 200 || rawFile.status == 0)
//             {
//                 var allText = rawFile.responseText;
//                 alert(allText);
//             }
//         }
//     }
//     rawFile.send(null);
// }
var reader = new FileReader();
reader.onload = function(event) {
    var contents = event.target.result;
    console.log("File contents: " + contents);
};

reader.onerror = function(event) {
    console.error("File could not be read! Code " + event.target.error.code);
};

reader.readAsText("./score.txt");