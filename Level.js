var text = '{"Project":[' +
    '{ "Name": "1", "Description": "blabla1", "Images":["blabla.png"] },' +
    '{ "Name": "2", "Description": "blabla2", "Images":["blabla.png","blabla2.jpg"] },' +
    '{ "Name": "3", "Description": "blabla3", "Images":["blabla.png","blabla2.jpg","fahmy.gif"] }]}';
var obj = JSON.parse(text);
console.log(obj.Project[0].Description);