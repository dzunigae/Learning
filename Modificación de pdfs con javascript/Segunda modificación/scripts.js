//Función principal encargada de mostrar el pdf y ofrecer las funciones (Será llamada más adelante)
var PDFAnnotate = function (container_id, url, options = {}) {
  //Variables de la función
  this.number_of_pages = 0;
  this.pages_rendered = 0;
  this.active_tool = 1;
  this.fabricObjects = [];
  this.fabricObjectsData = [];
  this.color = "#212121";
  this.font_size = 16;
  this.active_canvas = 0;
  this.container_id = container_id;
  this.url = url;
  var inst = this; //???

  //Establece un nivel de compresión del documento
  if (options.pageImageCompression) {
    this.pageImageCompression = options.pageImageCompression.toUpperCase();
  } else {
    this.pageImageCompression = "NONE";
  }

  //Carga el documento con una promesa
  var loadingTask = pdfjsLib.getDocument(this.url);

  //Código cuando la promesa se cumple satisfactoriamente
  loadingTask.promise.then(
    function (pdf) {

      //Opción de escalamiento del pdf
      var scale;
      if (options.scale) {
        scale = options.scale;
      } else {
        scale = 1.3;
      }

      inst.number_of_pages = pdf.numPages;

      //Renderización página por página del documento en un canvas dentro del HTML
      for (var i = 1; i <= pdf.numPages; i++) {
        pdf.getPage(i).then(function (page) {
          var viewport = page.getViewport({ scale: scale });
          var canvas = document.createElement("canvas");
          document.getElementById(inst.container_id).appendChild(canvas);
          canvas.className = "pdf-canvas";
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          context = canvas.getContext("2d");
          
          var renderContext = {
            canvasContext: context,
            viewport: viewport,
          };
          var renderTask = page.render(renderContext);

          //Se inicializa la biblioteca Fabric.js para poder generar anotaciones en el pdf
          renderTask.promise.then(function () {
            $(".pdf-canvas").each(function (index, el) {
              $(el).attr("id", "page-" + (index + 1) + "-canvas");
            });
            inst.pages_rendered++;
            if (inst.pages_rendered == inst.number_of_pages) inst.initFabric();
          });
        });
      }
    },
    //Si hay algún error, se imprime el error
    function (reason) {
      console.error(reason);
    }
  );
  
  //Se inicializa el objeto de la biblioteca fabric.js para cada página renderizada del pdf.
  this.initFabric = function () {
    var inst = this;
    let canvases = $("#" + inst.container_id + " canvas");

    canvases.each(function (index, el) {
      var background = el.toDataURL("image/png");

      //Se establece el objeto del pincel para cada página del pdf
      var fabricObj = new fabric.Canvas(el.id, {
        freeDrawingBrush: {
          width: 1,
          color: inst.color,
        },
      });
      inst.fabricObjects.push(fabricObj);

      //Guarda los objetos creados dentro cada página
      if (typeof options.onPageUpdated == "function") {
        fabricObj.on("object:added", function () {
          var oldValue = Object.assign({}, inst.fabricObjectsData[index]);
          inst.fabricObjectsData[index] = fabricObj.toJSON();
          options.onPageUpdated(
            index + 1,
            oldValue,
            inst.fabricObjectsData[index]
          );
        });
      }
      //Renderiza cada página con los cambios hechos con Fabric
      fabricObj.setBackgroundImage(
        background,
        fabricObj.renderAll.bind(fabricObj)
      );
      //Añdir objetos tipo texto haciendo click
      $(fabricObj.upperCanvasEl).click(function (event) {
        inst.active_canvas = index;
        inst.fabricClickHandler(event, fabricObj);
      });
      //Esto garantiza que cualquier cambio que se haga en el lienzo se guarde.
      fabricObj.on("after:render", function () {
        inst.fabricObjectsData[index] = fabricObj.toJSON();
        fabricObj.off("after:render");
      });

      //Finaliza exitosamente el renderizado
      if (
        index === canvases.length - 1 &&
        typeof options.ready === "function"
      ) {
        options.ready();
      }
    });
  };

  //Función para añadir los objetos tipo texto
  this.fabricClickHandler = function (event, fabricObj) {
    var inst = this;
    if (inst.active_tool == 2) {
      var text = new fabric.IText("Sample text", {
        left:
          event.clientX - fabricObj.upperCanvasEl.getBoundingClientRect().left,
        top:
          event.clientY - fabricObj.upperCanvasEl.getBoundingClientRect().top,
        fill: inst.color,
        fontSize: inst.font_size,
        selectable: true,
      });
      fabricObj.add(text);
      inst.active_tool = 0;
    }
  };
};

//Función que habilita la herramienta de selección
PDFAnnotate.prototype.enableSelector = function () {
  var inst = this;
  inst.active_tool = 0;
  if (inst.fabricObjects.length > 0) {
    $.each(inst.fabricObjects, function (index, fabricObj) {
      fabricObj.isDrawingMode = false;
    });
  }
};

//Función que habilita la herramienta del lapiz
PDFAnnotate.prototype.enablePencil = function () {
  var inst = this;
  inst.active_tool = 1;
  if (inst.fabricObjects.length > 0) {
    $.each(inst.fabricObjects, function (index, fabricObj) {
      fabricObj.isDrawingMode = true;
    });
  }
};

//Función que habilita la herramienta de añadir texto
PDFAnnotate.prototype.enableAddText = function () {
  var inst = this;
  inst.active_tool = 2;
  if (inst.fabricObjects.length > 0) {
    $.each(inst.fabricObjects, function (index, fabricObj) {
      fabricObj.isDrawingMode = false;
    });
  }
};

//Función que habilita la opción de eliminar objetos
PDFAnnotate.prototype.deleteSelectedObject = function () {
  var inst = this;
  var activeObject = inst.fabricObjects[inst.active_canvas].getActiveObject();
  if (activeObject) {
    if (confirm("Are you sure ?"))
      inst.fabricObjects[inst.active_canvas].remove(activeObject);
  }
};

//Función que permite guardar el pdf
PDFAnnotate.prototype.savePdf = function (fileName) {
  var inst = this;
  var doc = new jspdf.jsPDF();
  if (typeof fileName === "undefined") {
    fileName = `${new Date().getTime()}.pdf`;
  }

  inst.fabricObjects.forEach(function (fabricObj, index) {
    if (index != 0) {
      doc.addPage();
      doc.setPage(index + 1);
    }
    doc.addImage(
      fabricObj.toDataURL({
        format: "png",
      }),
      inst.pageImageCompression == "NONE" ? "PNG" : "JPEG",
      0,
      0,
      doc.internal.pageSize.getWidth(),
      doc.internal.pageSize.getHeight(),
      `page-${index + 1}`,
      ["FAST", "MEDIUM", "SLOW"].indexOf(inst.pageImageCompression) >= 0
        ? inst.pageImageCompression
        : undefined
    );
    if (index === inst.fabricObjects.length - 1) {
      doc.save(fileName);
    }
  });
};

//Modifica el tamaño del pincel
PDFAnnotate.prototype.setBrushSize = function (size) {
  var inst = this;
  $.each(inst.fabricObjects, function (index, fabricObj) {
    fabricObj.freeDrawingBrush.width = size;
  });
};

//Modifica el color
PDFAnnotate.prototype.setColor = function (color) {
  var inst = this;
  inst.color = color;
  $.each(inst.fabricObjects, function (index, fabricObj) {
    fabricObj.freeDrawingBrush.color = color;
  });
};

//Modifica el tamaño de la fuente
PDFAnnotate.prototype.setFontSize = function (size) {
  this.font_size = size;
};

//Limpiar la página
PDFAnnotate.prototype.clearActivePage = function () {
  var inst = this;
  var fabricObj = inst.fabricObjects[inst.active_canvas];
  var bg = fabricObj.backgroundImage;
  if (confirm("Are you sure?")) {
    fabricObj.clear();
    fabricObj.setBackgroundImage(bg, fabricObj.renderAll.bind(fabricObj));
  }
};

//Llamada de la función principal
var pdf = new PDFAnnotate("pdf-container", "https://drive.google.com/file/d/1IJWz5UCMh7D0XRVAEFhW91HCI6szHKhC/preview", {
  onPageUpdated(page, oldData, newData) {
    console.log(page, oldData, newData);
  },
  ready() {
    console.log("Plugin initialized successfully");
  },
  scale: 1.5,
  pageImageCompression: "MEDIUM", // FAST, MEDIUM, SLOW(Helps to control the new PDF file size)
});

//Función que cambia la herramienta activa
function changeActiveTool(event) {
  var element = $(event.target).hasClass("tool-button")
    ? $(event.target)
    : $(event.target).parents(".tool-button").first();
  $(".tool-button.active").removeClass("active");
  $(element).addClass("active");
}

//Activar la manito
function enableSelector(event) {
  event.preventDefault();
  changeActiveTool(event);
  pdf.enableSelector();
}

//Activar el pincel
function enablePencil(event) {
  event.preventDefault();
  changeActiveTool(event);
  pdf.enablePencil();
}

//Activar el texto
function enableAddText(event) {
  event.preventDefault();
  changeActiveTool(event);
  pdf.enableAddText();
}

//Eliminar objeto seleccionado
function deleteSelectedObject(event) {
  event.preventDefault();
  pdf.deleteSelectedObject();
}

//Guardar PDF
function savePDF() {
  // pdf.savePdf();
  pdf.savePdf("sample.pdf"); // save with given file name
}

//Limpiar la página
function clearPage() {
  pdf.clearActivePage();
}

//Inicializador de ls opciones de cambio de tamaño de lápiz, texto y selección de color
$(function () {
  $(".color-tool").click(function () {
    $(".color-tool.active").removeClass("active");
    $(this).addClass("active");
    color = $(this).get(0).style.backgroundColor;
    pdf.setColor(color);
  });

  $("#brush-size").change(function () {
    var width = $(this).val();
    console.log(width);
    pdf.setBrushSize(width);
  });

  $("#font-size").change(function () {
    var font_size = $(this).val();
    pdf.setFontSize(font_size);
  });
});
