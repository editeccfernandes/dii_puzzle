(function ($) {
  

  function download() {
    var svgInfo = document.querySelector('svg').outerHTML;
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(svgInfo, 'text/xml');
    var dl = document.createElement('a');
    document.body.appendChild(dl); // This line makes it work in Firefox.
    dl.setAttribute('href', 'data:image/svg+xml;base64,' + btoa(xmlDoc[0].outerHTML));
    dl.setAttribute('download', 'test.svg');
    dl.click();
  }


  function svgDownloadSVG() {
    var svgInfo = $(svgObject).clone();
    console.clear();
    console.log(svgInfo);
    $(this).attr({
      href: 'data:image/svg+xml;base64,' + btoa(svgInfo[0].outerHTML),
      download: 'coloringBook.svg',
      target: '_blank',
    });
  }

  window.svgDownloadPNG = function () {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var DOMURL = self.URL || self.webkitURL || self;
    var img = new Image();
    let clone = document.querySelector('#ActivityDIV svg').cloneNode(true);
    console.log(clone);
    clone.setAttribute('width', 1000);
    clone.setAttribute('height', 1000);
    var svg = new Blob([clone.outerHTML], {
      type: 'image/svg+xml;charset=utf-8'
    });
    console.log(svg);
    url = DOMURL.createObjectURL(svg);

    img.width = '1000px';
    img.height = '1000px';
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
      var png = canvas.toDataURL('image/png');
      //document.querySelector('#png-container').innerHTML = '<img src="' + png + '"/>';

      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = 'image.png';
      a.click();
      DOMURL.revokeObjectURL(png);
    };
    img.src = url;
    console.log(url + "image.png")
    //document.body.removeChild(a);
  };
  
  $.fn.btnDownload = function (type) {
    if (type == 'PNG') {
      btnDownloadPNG = this;
      // $(this).on('click', svgDownloadPNG);


    } else if (type == 'MAIL') {
      btnDownloadPNG = this;
      $("#sendImage").click();

    } else {
      btnDownloadSVG = this;
      $(this).on('click', svgDownloadSVG);
    }

  };

  $.fn.btnDownload2 = function () {
    btnClear = this;
    $(btnClear).on('click', download);
  };
})(jQuery);


$('#btnDownloadSVG').btnDownload('PNG');

$("#btnDownloadSVG").on("click", function (event) {
  event.preventDefault();
  svgDownloadPNG()
})

$("#saveImage").on("click", function (event) {
  event.preventDefault();
  svgDownloadPNG()
  setTimeout(function () {
    $("#sendImage").click();
  }, 3000);
})


$("#sendImage").on("click", function () {
  var email = 'sofia.pimentel@takeda.com';
  var subject = 'Imagem Dia Mundial da Hemofilia';
  var emailBody = 'Por favor, insira a imagem';
  window.location = 'mailto:' + email + '?subject=' + subject + '&body=' + emailBody;

})


snapfit.defaultMixed = true; //BOOLEAN mix pieces at startup
snapfit.defaultSimple = true; //BOOLEAN mix the positions only
snapfit.defaultNokeys = false; //BOOLEAN no keyboard control
snapfit.defaultTofront = true; //BOOLEAN on snap automatically set all pieces behind the current to front
snapfit.defaultPolygon = true; //BOOLEAN polygons instead of rectangles
snapfit.defaultLevel = 1; //INT 0-6 (0==simple and 6==difficult)
snapfit.defaultSpace = 0; //INT 0-50 (%) inner frame space
snapfit.defaultSnap = 8; //INT 0-24 (px) snap radius
snapfit.defaultCallback = function(){ {alert('You solved the puzzle!');} }
snapfit.defaultMatchcolor = '#00d000'; //STR '#000000'-'#ffffff'
snapfit.defaultFalsecolor = '#ff0000'; //STR '#000000'-'#ffffff'
snapfit.defaultAreacolor = '#000000'; //STR '#000000'-'#ffffff'
snapfit.defaultBgrndcolor = '#000000'; //STR '#000000'-'#ffffff'
snapfit.defaultAreaimage = false; //BOOLEAN image as background
snapfit.defaultAreaborder = false; //BOOLEAN background border
snapfit.defaultBorderwide = 0; //INT/FLOAT 1.0-6.0 (px) pieces border width
snapfit.defaultAreaopacity = 0; //FLOAT 0.0-1.0 background area/image opacity
snapfit.defaultBorderopacity = 0; //FLOAT 0.0-1.0 pieces border/backside opacity
snapfit.defaultShadowopacity = 1; //FLOAT 0.0-1.0 active piece shadow opacity
snapfit.defaultForcetouchui = true; //BOOLEAN forces touch UI over the mouse UI if both available