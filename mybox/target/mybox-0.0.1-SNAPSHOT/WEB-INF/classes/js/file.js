		$.ajax({
			url : 'http://localhost:8080/Auth/json/GrabFilesServlet',
			success : function(data) {
				var files = JSON.parse(data);
				var index;
				var list = document.getElementById('list');
				var path = document.getElementById('file-path');
				path.innerHTML = pathBeautifier(files[0].path);
				for (index = 0; index < files.length; ++index) {
						var isDir = files[index].isDirectory;
						var tr = document.createElement('TR');
						var td = document.createElement('TD');
						td.setAttribute("onClick", "getFiles(this.id);");
						td.setAttribute("id", files[index].name);
						td.setAttribute("class", "active");
						td.innerHTML = (files[index]).name;
						tr.appendChild(td);
						if (isDir === true) {
							td.innerHTML = " <input type=\"checkbox\" name=\"myTextEditBox\" value=\"checked\" />&nbsp;&nbsp;&nbsp;  <span class=\"glyphicon glyphicon-folder-open\" aria-hidden=\"true\"></span>&nbsp;&nbsp;&nbsp;    "
									+ "   " + (files[index]).name;
						} else {
							td.innerHTML = " <input type=\"checkbox\" name=\"myTextEditBox\" value=\"checked\" />&nbsp;&nbsp;&nbsp;  <span class=\"glyphicon glyphicon-duplicate\" aria-hidden=\"true\"></span>&nbsp;&nbsp;&nbsp;      "
									+ (files[index]).name;
						}
						list.appendChild(tr);

				}

			}
			

		});

function getFiles(id) {
			$.ajax({

				url : 'http://localhost:8080/Auth/json/GrabFilesServlet'.concat("?file=").concat(id),
				success : function(data) {
					parseDataAndDisplay(data);
				}

			});
}

function pathBeautifier(str) {
	var lastSlash = str.lastIndexOf("\\");
	return  str.slice(0,lastSlash).replace(/\\/g," / ");
}

var openSearch = document.getElementById("open-create-folder");
openSearch.onclick = function() {
	if (document.getElementById("create-folder").hidden === true) {
		document.getElementById("create-folder").hidden = false
	} else {
		document.getElementById("create-folder").hidden = true;
	}
}

var backBtn = document.getElementById("back");
backBtn.onclick = function() {
	$.ajax({

		url : 'http://localhost:8080/Auth/json/GrabFilesServlet'.concat("?file=").concat("back"),
		success : function(data) {
			parseDataAndDisplay(data);
		}

	});
}

var loutBtn = document.getElementById("logout");
loutBtn.onclick = function() {
	$.ajax({
		url : 'http://localhost:8080/Auth/json/LogoutServlet',
		success : function(data) {
			location.href = "index.html";
		}
	});
}

var addFolderButton = document.getElementById("create-folder-action");
addFolderButton.onclick = function() {
	var folderName = document.getElementById("folder-name").value;
	if (folderName != null) {
		$.ajax({
			url : 'http://localhost:8080/Auth/json/FileManagerServlet'.concat("?name=").concat(folderName),
			success : function(data) {
				document.getElementById("create-folder").hidden = true;
				parseDataAndDisplay(data);
			}
		});
	}
}



/*var uploadFile = document.getElementById("uploadFile");
uploadFile.onclick = function() {
	var hidenInput = document.getElementById('header');
	var inputField = document.getElementById('inputFile');
	if (document.getElementById("inputFile").hidden === true) {
		document.getElementById("inputFile").hidden = false;
	var input = document.createElement('INPUT');
	input.setAttribute("type", "file");
	input.setAttribute("id", "inputFile");
	input.setAttribute("name", "files[]");
	input.setAttribute("multiple", "");
	hidenInput.appendChild(input);
	} else {
		document.getElementById("inputFile").hidden = true;
	}
}*/



function parseDataAndDisplay(data) {
	var files = JSON.parse(data);
	var index;
	var list = document.getElementById('list');
	list.innerHTML="";
	var path = document.getElementById('file-path');
	path.innerHTML = pathBeautifier(files[0].path);
	for (index = 0; index < files.length; ++index) {
		if(files[0].isEmptyDir === true) {
			var li = document.createElement('LI');
			li.setAttribute("onClick", "getFiles(this.id);");
			li.setAttribute("id", files[index].name);
			li.innerHTML = "<i>Directory is empty.</i>";
			list.appendChild(li);
			return;
		} else {
			var isDir = files[index].isDirectory;
			var tr = document.createElement('TR');
			var td = document.createElement('TD');
			td.setAttribute("onClick", "getFiles(this.id);");
			td.setAttribute("id", files[index].name);
			td.setAttribute("class", "active");
			td.innerHTML = (files[index]).name;
			tr.appendChild(td);
			if (isDir === true) {
				td.innerHTML = " <input type=\"checkbox\" name=\"myTextEditBox\" value=\"checked\" />&nbsp;&nbsp;&nbsp;  <span class=\"glyphicon glyphicon-folder-open\" aria-hidden=\"true\"></span>&nbsp;&nbsp;&nbsp;    "
						+ "   " + (files[index]).name;
			} else {
				td.innerHTML = " <input type=\"checkbox\" name=\"myTextEditBox\" value=\"checked\" />&nbsp;&nbsp;&nbsp;  <span class=\"glyphicon glyphicon-duplicate\" aria-hidden=\"true\"></span>&nbsp;&nbsp;&nbsp;      "
						+ (files[index]).name;
			}
			list.appendChild(tr);
		}

	}

}
